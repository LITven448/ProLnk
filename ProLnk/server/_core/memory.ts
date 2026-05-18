import { Mem0Config, ZepConfig, MemoryStalenessConfig } from "./memoryTypes";

export const memoryConfig = {
  mem0: {
    apiKey: process.env.MEM0_API_KEY || "",
    baseUrl: process.env.MEM0_BASE_URL || "https://api.mem0.ai/v1",
    orgId: process.env.MEM0_ORG_ID || "",
    userId: "prolnk-agents",
  } as Mem0Config,

  zep: {
    apiKey: process.env.ZEP_API_KEY || "",
    baseUrl: process.env.ZEP_BASE_URL || "http://localhost:8000",
    sessionTTL: 86400 * 7,
  } as ZepConfig,

  staleness: {
    deployStatus: 30 * 60,
    commission: 60 * 60,
    userData: 24 * 60 * 60,
    complianceCheck: 24 * 60 * 60,
    errorStatus: 15 * 60,
    dataPipeline: 3600,
    auditLog: 24 * 60 * 60,
  } as MemoryStalenessConfig,
};

export function isMemoryConfigured(): boolean {
  const hasMem0 = !!process.env.MEM0_API_KEY && !!process.env.MEM0_ORG_ID;
  const hasZep = !!process.env.ZEP_API_KEY;
  return hasMem0 || hasZep;
}

export function getMem0Configured(): boolean {
  return !!process.env.MEM0_API_KEY && !!process.env.MEM0_ORG_ID;
}

export function getZepConfigured(): boolean {
  return !!process.env.ZEP_API_KEY;
}
