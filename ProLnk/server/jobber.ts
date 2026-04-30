/**
 * Jobber Integration — Full GraphQL OAuth
 *
 * Upgrades from webhook-only to full OAuth, enabling:
 *   - Historical job backfill (last 90 days on connect)
 *   - Client and property data access
 *   - Photo attachments from completed jobs
 *   - Revenue data for commission matching
 *   - Jobber App Marketplace listing eligibility
 *
 * Register at: developer.getjobber.com
 * API: GraphQL at https://api.getjobber.com/api/graphql
 * OAuth: Standard authorization code flow
 */

const JOBBER_GRAPHQL = "https://api.getjobber.com/api/graphql";
const CLIENT_ID = process.env.JOBBER_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.JOBBER_CLIENT_SECRET ?? "";
const REDIRECT_URI = `${process.env.APP_BASE_URL ?? "https://prolnk.io"}/api/integrations/jobber/callback`;

// ─── OAuth ────────────────────────────────────────────────────────────────────

export function getJobberAuthUrl(partnerId: number): string {
  const state = Buffer.from(JSON.stringify({ partnerId, ts: Date.now() })).toString("base64url");
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    state,
  });
  return `https://api.getjobber.com/api/oauth/authorize?${params}`;
}

export async function exchangeJobberCode(code: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}> {
  const res = await fetch("https://api.getjobber.com/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString(),
  });
  if (!res.ok) throw new Error(`Jobber token exchange failed: ${res.status}`);
  const data = await res.json() as any;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + (data.expires_in ?? 3600) * 1000),
  };
}

export async function refreshJobberToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}> {
  const res = await fetch("https://api.getjobber.com/api/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }).toString(),
  });
  if (!res.ok) throw new Error(`Jobber token refresh failed: ${res.status}`);
  const data = await res.json() as any;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? refreshToken,
    expiresAt: new Date(Date.now() + (data.expires_in ?? 3600) * 1000),
  };
}

// ─── GraphQL Client ───────────────────────────────────────────────────────────

async function jobberQuery<T>(accessToken: string, query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(JOBBER_GRAPHQL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-JOBBER-GRAPHQL-VERSION": "2024-01-12",
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Jobber GraphQL error: ${res.status}`);
  const data = await res.json() as { data?: T; errors?: any[] };
  if (data.errors?.length) throw new Error(`Jobber GraphQL errors: ${JSON.stringify(data.errors)}`);
  return data.data as T;
}

// ─── Get Recent Completed Jobs ────────────────────────────────────────────────

const COMPLETED_JOBS_QUERY = `
  query CompletedJobs($after: String) {
    jobs(filter: { jobStatus: COMPLETED }, first: 50, after: $after) {
      nodes {
        id
        title
        jobStatus
        total
        completedAt
        client {
          id
          name
          emails { address }
          phones { number }
        }
        property {
          id
          address {
            street
            city
            province
            postalCode
          }
        }
        jobAttachments(first: 20) {
          nodes {
            id
            fileName
            contentType
            fileUrl
            createdAt
          }
        }
        lineItems {
          nodes {
            name
            quantity
            unitPrice
            description
          }
        }
        sourceLeadSource
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export interface JobberJob {
  id: string;
  title: string;
  jobStatus: string;
  total: string;
  completedAt: string;
  client: {
    name: string;
    emails: Array<{ address: string }>;
    phones: Array<{ number: string }>;
  };
  property: {
    address: {
      street: string;
      city: string;
      province: string;
      postalCode: string;
    };
  };
  jobAttachments: {
    nodes: Array<{
      id: string;
      fileName: string;
      contentType: string;
      fileUrl: string;
      createdAt: string;
    }>;
  };
  lineItems: {
    nodes: Array<{
      name: string;
      quantity: number;
      unitPrice: string;
      description: string;
    }>;
  };
  sourceLeadSource: string;
}

export async function getJobberCompletedJobs(
  accessToken: string,
  maxPages = 5
): Promise<JobberJob[]> {
  const allJobs: JobberJob[] = [];
  let cursor: string | null = null;
  let page = 0;

  while (page < maxPages) {
    type JobsPage = { jobs: { nodes: JobberJob[]; pageInfo: { hasNextPage: boolean; endCursor: string } } };
    const data: JobsPage = await jobberQuery<JobsPage>(
      accessToken,
      COMPLETED_JOBS_QUERY,
      cursor ? { after: cursor } : {}
    );

    allJobs.push(...(data.jobs.nodes ?? []));

    if (!data.jobs.pageInfo.hasNextPage) break;
    cursor = data.jobs.pageInfo.endCursor;
    page++;

    await new Promise(r => setTimeout(r, 200));
  }

  return allJobs;
}

// ─── Historical Backfill ──────────────────────────────────────────────────────

export async function backfillJobberPhotos(
  partnerId: number,
  accessToken: string
): Promise<{ jobs: number; photosEnqueued: number }> {
  const { enqueuePhoto } = await import("./intake-router");
  const jobs = await getJobberCompletedJobs(accessToken, 3);

  let photosEnqueued = 0;

  for (const job of jobs) {
    const address = [
      job.property?.address?.street,
      job.property?.address?.city,
      job.property?.address?.province,
      job.property?.address?.postalCode,
    ].filter(Boolean).join(", ");

    // Check if this job has a ProLnk lead source tag
    const isProLnkJob = job.sourceLeadSource?.includes("ProLnk") || false;

    for (const attachment of (job.jobAttachments?.nodes ?? [])) {
      if (!attachment.contentType.startsWith("image/")) continue;

      try {
        await enqueuePhoto({
          partnerId,
          source: "jobber",
          photoUrl: attachment.fileUrl,
          externalJobId: job.id,
          externalJobName: job.title,
          serviceAddress: address,
          serviceCity: job.property?.address?.city,
          serviceZip: job.property?.address?.postalCode,
          capturedAt: attachment.createdAt ? new Date(attachment.createdAt) : undefined,
        });
        photosEnqueued++;
      } catch (err) {
        console.error(`[Jobber] Failed to enqueue photo from job ${job.id}:`, err);
      }
    }
  }

  console.log(`[Jobber] Backfill complete for partner ${partnerId}: ${jobs.length} jobs, ${photosEnqueued} photos enqueued`);
  return { jobs: jobs.length, photosEnqueued };
}
