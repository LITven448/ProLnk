import { ENV } from "./env";

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4" ;
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  messages: Message[];
  /**
   * AI provider routing.
   * - "forge" (default) — Manus Forge proxy (Gemini). Always available.
   * - "openai" — Direct OpenAI API. Requires OPENAI_API_KEY. Falls back to Forge if key missing.
   * - "anthropic" — Direct Anthropic API. Requires ANTHROPIC_API_KEY. Falls back to Forge if key missing.
   */
  provider?: "forge" | "openai" | "anthropic";
  /** Override the model. Defaults to provider's default. Use tier-specific constants from VLM_MODELS. */
  model?: string;
  tools?: Tool[];
  toolChoice?: ToolChoice;
  tool_choice?: ToolChoice;
  maxTokens?: number;
  max_tokens?: number;
  /** Set false to disable the thinking budget (reduces cost on simple tasks). Default: true. */
  thinking?: boolean;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
};

/**
 * Model identifiers for each tier of the VLM waterfall.
 * Each tier specifies both the model AND the provider so cost is controlled at the call site.
 *
 * Tier 1 (triage): Gemini Flash Lite via Forge — cheapest, no extended thinking
 * Tier 2 (classify): GPT-4o-mini via OpenAI — excellent classification, cheap vision
 * Tier 3 (analyze): GPT-4o via OpenAI — best-in-class visual reasoning, high detail
 * Tier 4 (render): handled by generateImage() with DALL-E 3 — not configured here
 *
 * If OPENAI_API_KEY is not configured, Tiers 2/3 fall back to Forge (Gemini).
 */
export const VLM_MODELS = {
  triage:   { model: "gemini-2.0-flash-lite",  provider: "forge"  as const },
  classify: { model: "gpt-4o-mini",             provider: "openai" as const },
  analyze:  { model: "gpt-4o",                  provider: "openai" as const },
  report:   { model: "claude-sonnet-4-5-20251022", provider: "anthropic" as const },
} as const;

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: Role;
      content: string | Array<TextContent | ImageContent | FileContent>;
      tool_calls?: ToolCall[];
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: JsonSchema };

const ensureArray = (
  value: MessageContent | MessageContent[]
): MessageContent[] => (Array.isArray(value) ? value : [value]);

const normalizeContentPart = (
  part: MessageContent
): TextContent | ImageContent | FileContent => {
  if (typeof part === "string") {
    return { type: "text", text: part };
  }

  if (part.type === "text") {
    return part;
  }

  if (part.type === "image_url") {
    return part;
  }

  if (part.type === "file_url") {
    return part;
  }

  throw new Error("Unsupported message content part");
};

const normalizeMessage = (message: Message) => {
  const { role, name, tool_call_id } = message;

  if (role === "tool" || role === "function") {
    const content = ensureArray(message.content)
      .map(part => (typeof part === "string" ? part : JSON.stringify(part)))
      .join("\n");

    return {
      role,
      name,
      tool_call_id,
      content,
    };
  }

  const contentParts = ensureArray(message.content).map(normalizeContentPart);

  // If there's only text content, collapse to a single string for compatibility
  if (contentParts.length === 1 && contentParts[0].type === "text") {
    return {
      role,
      name,
      content: contentParts[0].text,
    };
  }

  return {
    role,
    name,
    content: contentParts,
  };
};

const normalizeToolChoice = (
  toolChoice: ToolChoice | undefined,
  tools: Tool[] | undefined
): "none" | "auto" | ToolChoiceExplicit | undefined => {
  if (!toolChoice) return undefined;

  if (toolChoice === "none" || toolChoice === "auto") {
    return toolChoice;
  }

  if (toolChoice === "required") {
    if (!tools || tools.length === 0) {
      throw new Error(
        "tool_choice 'required' was provided but no tools were configured"
      );
    }

    if (tools.length > 1) {
      throw new Error(
        "tool_choice 'required' needs a single tool or specify the tool name explicitly"
      );
    }

    return {
      type: "function",
      function: { name: tools[0].function.name },
    };
  }

  if ("name" in toolChoice) {
    return {
      type: "function",
      function: { name: toolChoice.name },
    };
  }

  return toolChoice;
};

// ─── Provider routing ─────────────────────────────────────────────────────────

function resolveEndpointAndKey(provider?: "forge" | "openai" | "anthropic"): { url: string; key: string } {
  // OpenAI direct — preferred for Tier 2/3 VLM quality
  if (provider === "openai" || (!provider && !ENV.forgeApiKey)) {
    const key = process.env.OPENAI_API_KEY ?? "";
    if (!key) {
      // Fall back to Forge if OpenAI key not configured
      if (!ENV.forgeApiKey) throw new Error("No LLM API key configured. Set OPENAI_API_KEY or BUILT_IN_FORGE_API_KEY.");
      return {
        url: `${ENV.forgeApiUrl.replace(/\/$/, "")}/v1/chat/completions`,
        key: ENV.forgeApiKey,
      };
    }
    return { url: "https://api.openai.com/v1/chat/completions", key };
  }

  // Anthropic direct — best for text generation/report writing
  // Anthropic API format differs significantly; for now falls back to OpenAI if Anthropic key set
  if (provider === "anthropic") {
    const anthropicKey = process.env.ANTHROPIC_API_KEY ?? "";
    // Anthropic uses a different wire format — route through OpenAI-compatible fallback for now
    if (anthropicKey) {
      // TODO: implement native Anthropic API format; using OpenAI fallback until then
      const openaiKey = process.env.OPENAI_API_KEY ?? "";
      if (openaiKey) return { url: "https://api.openai.com/v1/chat/completions", key: openaiKey };
    }
  }

  // Forge (Manus proxy) — fallback / cheap tier default
  const forgeUrl = ENV.forgeApiUrl?.trim();
  const forgeKey = ENV.forgeApiKey;
  if (!forgeKey) throw new Error("BUILT_IN_FORGE_API_KEY not set. Configure OPENAI_API_KEY to move off Manus.");
  return {
    url: forgeUrl ? `${forgeUrl.replace(/\/$/, "")}/v1/chat/completions` : "https://forge.manus.im/v1/chat/completions",
    key: forgeKey,
  };
}

const assertApiKey = () => {
  const hasForge = !!ENV.forgeApiKey;
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  if (!hasForge && !hasOpenAI) {
    throw new Error("No LLM API key configured. Set OPENAI_API_KEY (recommended) or BUILT_IN_FORGE_API_KEY.");
  }
};

const normalizeResponseFormat = ({
  responseFormat,
  response_format,
  outputSchema,
  output_schema,
}: {
  responseFormat?: ResponseFormat;
  response_format?: ResponseFormat;
  outputSchema?: OutputSchema;
  output_schema?: OutputSchema;
}):
  | { type: "json_schema"; json_schema: JsonSchema }
  | { type: "text" }
  | { type: "json_object" }
  | undefined => {
  const explicitFormat = responseFormat || response_format;
  if (explicitFormat) {
    if (
      explicitFormat.type === "json_schema" &&
      !explicitFormat.json_schema?.schema
    ) {
      throw new Error(
        "responseFormat json_schema requires a defined schema object"
      );
    }
    return explicitFormat;
  }

  const schema = outputSchema || output_schema;
  if (!schema) return undefined;

  if (!schema.name || !schema.schema) {
    throw new Error("outputSchema requires both name and schema");
  }

  return {
    type: "json_schema",
    json_schema: {
      name: schema.name,
      schema: schema.schema,
      ...(typeof schema.strict === "boolean" ? { strict: schema.strict } : {}),
    },
  };
};

export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  assertApiKey();

  const {
    messages,
    model,
    tools,
    toolChoice,
    tool_choice,
    outputSchema,
    output_schema,
    responseFormat,
    response_format,
  } = params;

  const payload: Record<string, unknown> = {
    model: model ?? "gemini-2.5-flash",
    messages: messages.map(normalizeMessage),
  };

  if (tools && tools.length > 0) {
    payload.tools = tools;
  }

  const normalizedToolChoice = normalizeToolChoice(
    toolChoice || tool_choice,
    tools
  );
  if (normalizedToolChoice) {
    payload.tool_choice = normalizedToolChoice;
  }

  // Respect caller-supplied token limit; fall back to a generous default.
  const resolvedMaxTokens = params.maxTokens ?? params.max_tokens ?? 32768;
  payload.max_tokens = resolvedMaxTokens;
  // Thinking budget: disable when caller explicitly opts out (cheaper triage calls).
  if (params.thinking !== false) {
    payload.thinking = { budget_tokens: 128 };
  }

  const normalizedResponseFormat = normalizeResponseFormat({
    responseFormat,
    response_format,
    outputSchema,
    output_schema,
  });

  if (normalizedResponseFormat) {
    payload.response_format = normalizedResponseFormat;
  }

  const { url: apiUrl, key: apiKey } = resolveEndpointAndKey(params.provider);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `LLM invoke failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return (await response.json()) as InvokeResult;
}
