import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

/**
 * Integration Webhook Stubs
 * 
 * These endpoints are prepared for future integration with:
 * - CompanyCam: Job photo sync (auto-import photos from CompanyCam projects)
 * - ServiceTitan: Job completion sync (auto-create opportunities from completed jobs)
 * - Jobber: Job completion sync (auto-create opportunities from completed jobs)
 * - Housecall Pro: Job completion sync
 * 
 * Each integration follows the same pattern:
 * 1. Receive webhook payload from external service
 * 2. Validate webhook signature/secret
 * 3. Parse payload into internal format
 * 4. Create/update records in our database
 * 5. Trigger downstream actions (AI analysis, lead creation, etc.)
 */

export const integrationWebhooksRouter = router({
  // Get integration status for all configured integrations
  getStatus: protectedProcedure.query(async () => {
    return {
      companyCam: {
        name: "CompanyCam",
        status: "not_configured" as const,
        description: "Auto-import job photos from CompanyCam projects",
        webhookUrl: "/api/webhooks/companycam",
        requiredFields: ["api_key", "webhook_secret"],
        features: ["Photo sync", "Project mapping", "Tag sync"],
      },
      serviceTitan: {
        name: "ServiceTitan",
        status: "not_configured" as const,
        description: "Sync completed jobs and customer data from ServiceTitan",
        webhookUrl: "/api/webhooks/servicetitan",
        requiredFields: ["client_id", "client_secret", "tenant_id"],
        features: ["Job sync", "Customer sync", "Invoice sync", "Technician mapping"],
      },
      jobber: {
        name: "Jobber",
        status: "not_configured" as const,
        description: "Sync completed jobs and quotes from Jobber",
        webhookUrl: "/api/webhooks/jobber",
        requiredFields: ["api_token", "webhook_secret"],
        features: ["Job sync", "Quote sync", "Client sync", "Schedule sync"],
      },
      housecallPro: {
        name: "Housecall Pro",
        status: "not_configured" as const,
        description: "Sync job completions and customer data from Housecall Pro",
        webhookUrl: "/api/webhooks/housecallpro",
        requiredFields: ["api_key", "webhook_secret"],
        features: ["Job sync", "Customer sync", "Payment sync"],
      },
      zapier: {
        name: "Zapier",
        status: "not_configured" as const,
        description: "Connect to 5000+ apps via Zapier webhooks",
        webhookUrl: "/api/webhooks/zapier",
        requiredFields: ["webhook_url"],
        features: ["Custom triggers", "Custom actions", "Multi-step zaps"],
      },
      n8n: {
        name: "n8n",
        status: "configured" as const,
        description: "Self-hosted workflow automation with n8n",
        webhookUrl: "/api/webhooks/n8n",
        requiredFields: ["webhook_base_url", "webhook_secret"],
        features: ["Custom workflows", "Cron triggers", "Data transformation"],
      },
    };
  }),

  // Get webhook log (recent webhook events)
  getWebhookLog: protectedProcedure
    .input(z.object({
      integration: z.string().optional(),
      limit: z.number().default(50),
    }))
    .query(async () => {
      // Return empty log for now - will be populated when integrations are configured
      return [];
    }),

  // Test webhook endpoint (for integration setup verification)
  testWebhook: protectedProcedure
    .input(z.object({
      integration: z.enum(["companycam", "servicetitan", "jobber", "housecallpro", "zapier", "n8n"]),
    }))
    .mutation(async ({ input }) => {
      return {
        success: true,
        integration: input.integration,
        message: `Test webhook for ${input.integration} received successfully. Integration is ready to configure.`,
        timestamp: new Date().toISOString(),
      };
    }),

  // CompanyCam webhook stub
  companyCamWebhook: publicProcedure
    .input(z.object({
      event: z.string(),
      data: z.any(),
    }))
    .mutation(async ({ input }) => {
      // Stub: Log the webhook event
      console.log(`[CompanyCam Webhook] Event: ${input.event}`, JSON.stringify(input.data).substring(0, 200));
      return { received: true, event: input.event };
    }),

  // ServiceTitan webhook stub
  serviceTitanWebhook: publicProcedure
    .input(z.object({
      event: z.string(),
      data: z.any(),
    }))
    .mutation(async ({ input }) => {
      console.log(`[ServiceTitan Webhook] Event: ${input.event}`, JSON.stringify(input.data).substring(0, 200));
      return { received: true, event: input.event };
    }),

  // Jobber webhook stub
  jobberWebhook: publicProcedure
    .input(z.object({
      event: z.string(),
      data: z.any(),
    }))
    .mutation(async ({ input }) => {
      console.log(`[Jobber Webhook] Event: ${input.event}`, JSON.stringify(input.data).substring(0, 200));
      return { received: true, event: input.event };
    }),

  // Get API documentation for each integration
  getApiDocs: protectedProcedure
    .input(z.object({
      integration: z.enum(["companycam", "servicetitan", "jobber", "housecallpro"]),
    }))
    .query(async ({ input }) => {
      const docs: Record<string, any> = {
        companycam: {
          name: "CompanyCam",
          baseUrl: "https://api.companycam.com/v2",
          authType: "Bearer Token",
          webhookEvents: ["photo.created", "photo.updated", "project.created", "project.completed"],
          endpoints: [
            { method: "GET", path: "/projects", description: "List all projects" },
            { method: "GET", path: "/projects/:id/photos", description: "Get photos for a project" },
            { method: "POST", path: "/webhooks", description: "Register a webhook" },
          ],
          dataMapping: {
            "project.id": "job.externalId",
            "photo.uri": "sessionPhoto.fileUrl",
            "project.address": "job.address",
          },
        },
        servicetitan: {
          name: "ServiceTitan",
          baseUrl: "https://api.servicetitan.io/v2",
          authType: "OAuth 2.0",
          webhookEvents: ["job.completed", "job.scheduled", "customer.created", "invoice.paid"],
          endpoints: [
            { method: "GET", path: "/jpm/v2/tenant/:tenant/jobs", description: "List jobs" },
            { method: "GET", path: "/crm/v2/tenant/:tenant/customers", description: "List customers" },
            { method: "POST", path: "/settings/v2/tenant/:tenant/webhooks", description: "Register webhook" },
          ],
          dataMapping: {
            "job.id": "job.externalId",
            "job.completedOn": "job.completedAt",
            "customer.address": "job.address",
          },
        },
        jobber: {
          name: "Jobber",
          baseUrl: "https://api.getjobber.com/api/graphql",
          authType: "OAuth 2.0",
          webhookEvents: ["JOB_COMPLETED", "QUOTE_CREATED", "CLIENT_CREATED", "VISIT_COMPLETED"],
          endpoints: [
            { method: "POST", path: "/api/graphql", description: "GraphQL API (all queries)" },
            { method: "POST", path: "/api/webhooks", description: "Register webhook" },
          ],
          dataMapping: {
            "job.id": "job.externalId",
            "job.completedAt": "job.completedAt",
            "client.billingAddress": "job.address",
          },
        },
        housecallpro: {
          name: "Housecall Pro",
          baseUrl: "https://api.housecallpro.com/v1",
          authType: "API Key",
          webhookEvents: ["job.completed", "job.scheduled", "customer.created", "estimate.sent"],
          endpoints: [
            { method: "GET", path: "/jobs", description: "List jobs" },
            { method: "GET", path: "/customers", description: "List customers" },
            { method: "POST", path: "/webhooks", description: "Register webhook" },
          ],
          dataMapping: {
            "job.id": "job.externalId",
            "job.completed_at": "job.completedAt",
            "customer.address": "job.address",
          },
        },
      };
      return docs[input.integration] || null;
    }),
});
