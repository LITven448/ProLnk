#!/usr/bin/env node
/**
 * Knowledge Base Sync Script
 *
 * Reads all markdown files from /knowledge/ directory,
 * chunks them into ~500-token segments, embeds with OpenAI,
 * and upserts into Qdrant.
 *
 * Run: node scripts/sync-knowledge-base.mjs
 * Run on deploy: Add to GitHub Actions workflow
 *
 * Prerequisites:
 *   - OPENAI_API_KEY set in .env
 *   - QDRANT_URL set (default: http://localhost:6333)
 *   - pnpm add @qdrant/js-client-rest
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const KNOWLEDGE_DIR = path.join(ROOT, "knowledge");
const QDRANT_URL = process.env.QDRANT_URL ?? "http://localhost:6333";
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const COLLECTION_NAME = "platform_knowledge";

if (!OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not set");
  process.exit(1);
}

// ─── Qdrant client ────────────────────────────────────────────────────────────

async function qdrantRequest(path, method = "GET", body) {
  const headers = { "Content-Type": "application/json" };
  if (QDRANT_API_KEY) headers["api-key"] = QDRANT_API_KEY;
  const res = await fetch(`${QDRANT_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Qdrant ${method} ${path} failed (${res.status}): ${text}`);
  }
  return res.json();
}

// ─── Text chunker ─────────────────────────────────────────────────────────────

function chunkText(text, maxTokens = 400) {
  const paragraphs = text.split(/\n\n+/);
  const chunks = [];
  let current = "";

  for (const para of paragraphs) {
    const combined = current ? `${current}\n\n${para}` : para;
    // Rough token estimate: 1 token ≈ 4 chars
    if (combined.length / 4 > maxTokens && current) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = combined;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(c => c.length > 50); // Skip tiny chunks
}

// ─── Embedding ────────────────────────────────────────────────────────────────

async function embedBatch(texts) {
  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "text-embedding-3-small", input: texts }),
  });
  if (!res.ok) throw new Error(`Embedding failed: ${res.status}`);
  const data = await res.json();
  return data.data.map(d => d.embedding);
}

// ─── Main sync ────────────────────────────────────────────────────────────────

async function getAllMarkdownFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function detectCategory(filePath) {
  if (filePath.includes("/compliance/")) return "compliance";
  if (filePath.includes("/trades/")) return "trades";
  if (filePath.includes("/dfw/")) return "dfw";
  return "platform";
}

async function main() {
  console.log("\n📚 ProLnk Knowledge Base Sync\n");

  // Ensure collection exists
  try {
    await qdrantRequest(`/collections/${COLLECTION_NAME}`);
    console.log(`✅ Collection "${COLLECTION_NAME}" exists`);
  } catch {
    await qdrantRequest(`/collections/${COLLECTION_NAME}`, "PUT", {
      vectors: { size: 1536, distance: "Cosine" },
    });
    console.log(`✅ Created collection "${COLLECTION_NAME}"`);
  }

  // Find all markdown files
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    console.error(`❌ Knowledge directory not found: ${KNOWLEDGE_DIR}`);
    process.exit(1);
  }

  const files = await getAllMarkdownFiles(KNOWLEDGE_DIR);
  console.log(`📄 Found ${files.length} knowledge files\n`);

  let totalChunks = 0;
  let upserted = 0;

  for (const filePath of files) {
    const relativePath = path.relative(ROOT, filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const category = detectCategory(filePath);
    const title = content.split("\n")[0].replace(/^#+\s*/, "");
    const chunks = chunkText(content);

    process.stdout.write(`  Processing: ${relativePath} (${chunks.length} chunks)...`);

    // Embed in batches of 10
    const BATCH_SIZE = 10;
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batch = chunks.slice(i, i + BATCH_SIZE);
      const embeddings = await embedBatch(batch);

      const points = batch.map((chunk, j) => {
        const chunkIdx = i + j;
        const id = Math.abs(
          `${relativePath}:${chunkIdx}`.split("").reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0)
        ) % 2147483647; // Qdrant needs numeric IDs within int32 range

        return {
          id,
          vector: embeddings[j],
          payload: {
            content: chunk,
            title,
            category,
            filePath: relativePath,
            chunkIndex: chunkIdx,
            docId: `${relativePath}:${chunkIdx}`,
            updatedAt: new Date().toISOString(),
          },
        };
      });

      await qdrantRequest(`/collections/${COLLECTION_NAME}/points`, "PUT", { points });
      upserted += points.length;

      // Rate limit
      if (i + BATCH_SIZE < chunks.length) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    totalChunks += chunks.length;
    console.log(" ✅");
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Sync complete!
   Files processed: ${files.length}
   Total chunks: ${totalChunks}
   Vectors upserted: ${upserted}
   Collection: ${COLLECTION_NAME}
   Qdrant URL: ${QDRANT_URL}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Agents can now query the knowledge base via:
  import { queryKnowledge } from "./server/knowledge";
  const context = await queryKnowledge("what are Scout commission rates?");
`);
}

main().catch(err => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
