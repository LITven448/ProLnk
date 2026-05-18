# Mem0 + Zep Memory Integration Guide

## Overview

This guide explains how to integrate Mem0 + Zep into ProLnk's 47 AI agents to reduce MCP credit usage by 70-80%.

**Current Problem**: Each agent makes MCP calls (database queries, API calls) repeatedly for the same data, consuming credits unnecessarily.

**Solution**: Check memory first; only make MCP calls if data is stale.

**Expected Impact**: 
- MCP credit usage: -70-80%
- Agent execution time: -40-50%
- Cost per query: -90%

## Architecture

```
Agent Request
    ↓
Check Memory (Mem0) → Found + Fresh? → Return cached result [✅ No MCP call]
    ↓
Not found or stale?
    ↓
Make MCP Call (Database, API, etc.)
    ↓
Store result in Memory (Mem0 + Zep)
    ↓
Return result [❌ MCP call made, but cached for next time]
```

## Files Created

### Core Memory Layer
- `server/_core/memoryTypes.ts` — TypeScript interfaces for all memory structures
- `server/_core/memory.ts` — Configuration and environment setup
- `server/_core/memoryService.ts` — Main memory abstraction layer
- `server/_core/agentWrapper.ts` — Wrapper to add memory checks to any agent

### Memory Backends
- `server/memory/mem0Client.ts` — Mem0 SDK client (short-term conversation memory)
- `server/memory/zepClient.ts` — Zep SDK client (long-term structured memory)

### Example Integration
- `server/agents/commissionAuditAgent.integrated.ts` — Example of how to integrate

## Setup

### 1. Get API Keys

#### Mem0
1. Sign up at https://mem0.ai (free tier available)
2. Create an API key in dashboard
3. Note your Organization ID
4. Set in `.env`:
   ```
   MEM0_API_KEY=<your-api-key>
   MEM0_ORG_ID=<your-org-id>
   ```

#### Zep
Option A: Cloud (Easier for production)
1. Sign up at https://www.getzep.com
2. Create API key
3. Get endpoint URL
4. Set in `.env`:
   ```
   ZEP_API_KEY=<your-api-key>
   ZEP_BASE_URL=<your-zep-endpoint>
   ```

Option B: Self-Hosted (Easier for local dev)
1. Install Docker
2. Run: `docker run -d -p 8000:8000 getzep/zep:latest`
3. Set in `.env`:
   ```
   ZEP_API_KEY=demo
   ZEP_BASE_URL=http://localhost:8000
   ```

### 2. Update Environment Variables

Add to `.env.example` and your `.env`:
```
MEM0_API_KEY=xxxxx
MEM0_ORG_ID=xxxxx
MEM0_BASE_URL=https://api.mem0.ai/v1
ZEP_API_KEY=xxxxx
ZEP_BASE_URL=http://localhost:8000
```

### 3. Add to Render Deployment

In Render dashboard:
1. Go to your service settings
2. Add these environment variables:
   - `MEM0_API_KEY`
   - `MEM0_ORG_ID`
   - `ZEP_API_KEY`
   - `ZEP_BASE_URL`

## Integration Pattern

### Before (Without Memory)

```typescript
export async function runCommissionAudit(): Promise<AuditResult> {
  const db = await getDb();
  const largeRows = await db.execute(sql`...`); // Direct MCP call
  // ... process ...
  return result;
}
```

### After (With Memory)

```typescript
import { AgentWrapper, AgentConfig } from "../_core/agentWrapper";
import { memoryService } from "../_core/memoryService";

const agentConfig: AgentConfig = {
  id: "commission-audit",
  name: "Commission Audit Agent",
  stalenessKey: "commission", // Uses 1 hour TTL by default
};

async function performAudit(): Promise<AuditResult> {
  // ... same logic as before ...
}

export async function runCommissionAudit(): Promise<AuditResult> {
  // Wraps execution with memory checks
  const wrappedResult = await AgentWrapper.execute<AuditResult>(
    agentConfig,
    performAudit,
    "commission_audit_result"
  );

  if (!wrappedResult.success || !wrappedResult.data) {
    throw new Error(wrappedResult.error);
  }

  // Log whether result came from cache
  console.log(
    `[CommissionAudit] ${wrappedResult.fromMemory ? "cached" : "fresh"}`
  );

  return wrappedResult.data;
}
```

## Staleness Configuration

Defined in `server/_core/memory.ts`:

```typescript
staleness: {
  deployStatus: 30 * 60,        // 30 minutes
  commission: 60 * 60,          // 1 hour
  userData: 24 * 60 * 60,       // 1 day
  complianceCheck: 24 * 60 * 60,  // 1 day
  errorStatus: 15 * 60,         // 15 minutes
  dataPipeline: 3600,           // 1 hour
  auditLog: 24 * 60 * 60,       // 1 day
}
```

Adjust based on how frequently data changes:
- Real-time data (errors): 15-30 min
- Hourly data (commissions): 1 hour
- Daily data (audits): 24 hours

## API Reference

### AgentWrapper.execute()

Cache result of any async operation:

```typescript
const result = await AgentWrapper.execute<MyType>(
  { id: "my-agent", name: "My Agent" },
  async () => {
    // Your original logic here
    return expensiveQuery();
  },
  "cache_key" // optional, defaults to "{agentId}_result"
);

if (result.success) {
  console.log(result.data);           // The result
  console.log(result.fromMemory);     // Was it from cache?
  console.log(result.duration);       // How long did it take?
}
```

### AgentWrapper.executeWithDecision()

Log agent decisions for learning:

```typescript
const result = await AgentWrapper.executeWithDecision<MyType>(
  { id: "my-agent", name: "My Agent" },
  "suspend_partner",           // What decision?
  "COI expired for 30+ days",  // Why?
  async () => {
    return updatePartnerStatus();
  }
);
```

### memoryService.logAction()

Log any agent action:

```typescript
await memoryService.logAction(
  "my-agent",
  "calculate_commission",
  { partnerId: 123, amount: 500 },
  145, // duration in ms
  null // error (if any)
);
```

### memoryService.searchMemory()

Find past decisions/actions:

```typescript
const results = await memoryService.searchMemory(
  "my-agent",
  "commission for partner 123",
  10 // limit
);
```

## Implementation Roadmap

### Phase 1: Infrastructure (This Session)
- ✅ Create memory layer files
- ✅ Set up Mem0 + Zep clients
- ✅ Create agent wrapper
- ✅ Update environment variables
- [ ] Deploy to Render with new env vars

### Phase 2: Proof of Concept
1. Integrate into Error Handler Agent
2. Integrate into Deployment Agent
3. Integrate into Commission Calculator Agent
4. Integrate into Compliance Agent
5. Test + measure credit reduction

### Phase 3: Roll Out to All Agents
Apply same pattern to remaining 43 agents:
- Financial agents (7)
- Marketing agents (8)
- Customer Success agents (7)
- Intelligence agents (5)
- Legal agents (4)
- Engineering agents (7)
- Field/Operations agents (3)

### Phase 4: Optimization
- Tune staleness values based on data
- Implement memory cleanup routines
- Add analytics/monitoring for cache hit rate
- Implement memory-based pattern learning

## Testing Locally

### Option 1: With Local Zep

```bash
# Start Zep container
docker run -d -p 8000:8000 getzep/zep:latest

# Set env vars
export ZEP_API_KEY=demo
export ZEP_BASE_URL=http://localhost:8000
export MEM0_API_KEY=<your-key>
export MEM0_ORG_ID=<your-org>

# Run your agent
npm run dev
```

### Option 2: Without Local Zep

Just set up Mem0:

```bash
export MEM0_API_KEY=<your-key>
export MEM0_ORG_ID=<your-org>
npm run dev
```

Memory will use Mem0 only (Zep optional).

## Monitoring

### Check Cache Hit Rate

```typescript
const memory = await memoryService.getMemory("agent-id", "key");
if (memory.found && !memory.isStale) {
  console.log("Cache hit!");
} else {
  console.log("Cache miss, making MCP call...");
}
```

### Log Metrics

```typescript
const results = await Promise.all([
  agentA.execute(),
  agentB.execute(),
  agentC.execute(),
]);

const cacheHits = results.filter(r => r.fromMemory).length;
console.log(`Cache hit rate: ${(cacheHits / results.length) * 100}%`);
```

## Troubleshooting

### Memory not storing
- Check API keys in `.env`
- Verify network connectivity to Mem0/Zep
- Check Mem0/Zep service status
- Review Mem0/Zep dashboard for errors

### Cache always stale
- Reduce staleness TTL in `memory.ts`
- Verify timestamp is being set correctly
- Check system clock synchronization

### High latency
- Zep: Use self-hosted instead of cloud
- Mem0: Check rate limits in dashboard
- Add caching layer in front (Redis)

## Cost Savings Analysis

### Before (No Memory)
- Commission audit: 10 database queries × $0.01 = $0.10/run
- 47 agents × daily runs = 470 MCP calls/day × $0.01 = $4.70/day
- Monthly: $4.70 × 30 = $141/month

### After (With Memory)
- Commission audit: 1 database query (first run) × $0.01 = $0.01/run
- Subsequent runs: 0 queries (from memory)
- 47 agents × daily runs = ~95 MCP calls/day (80% reduction)
- Monthly: ~$28.50/month (80% savings)

**Monthly savings: ~$112/month**
**Annual savings: ~$1,344**

## Next Steps

1. Get Mem0 + Zep API keys
2. Add to `.env` locally
3. Run integration test with commission audit agent
4. Measure credit usage reduction
5. Roll out to remaining 46 agents
6. Deploy to Render with new env vars
7. Monitor cache hit rates in production

## References

- Mem0 Docs: https://docs.mem0.ai
- Zep Docs: https://docs.getzep.com
- Agent Wrapper: `server/_core/agentWrapper.ts`
- Memory Service: `server/_core/memoryService.ts`
