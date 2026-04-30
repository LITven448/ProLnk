/**
 * Buildium Open API Integration
 * Handles: work order ingestion, vendor assignment, completion push-back
 *
 * Docs: https://developer.buildium.com/
 * Auth: Client Credentials (OAuth 2.0) — BUILDIUM_CLIENT_ID + BUILDIUM_CLIENT_SECRET
 */

const BUILDIUM_BASE = "https://api.buildium.com/v1";
const CLIENT_ID = process.env.BUILDIUM_CLIENT_ID;
const CLIENT_SECRET = process.env.BUILDIUM_CLIENT_SECRET;

let _token: string | null = null;
let _tokenExpiry = 0;

async function getToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;
  if (_token && Date.now() < _tokenExpiry) return _token;

  const resp = await fetch("https://auth.buildium.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: "work_orders:read work_orders:write vendors:read",
    }),
  });
  if (!resp.ok) {
    console.error("[Buildium] Token error:", await resp.text());
    return null;
  }
  const data = await resp.json();
  _token = data.access_token;
  _tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return _token;
}

async function buildiumGet(path: string) {
  const token = await getToken();
  if (!token) return null;
  const resp = await fetch(`${BUILDIUM_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  if (!resp.ok) return null;
  return resp.json();
}

async function buildiumPatch(path: string, body: object) {
  const token = await getToken();
  if (!token) return null;
  const resp = await fetch(`${BUILDIUM_BASE}${path}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    console.error("[Buildium] PATCH error:", await resp.text());
    return null;
  }
  return resp.json();
}

/** Fetch open work orders from Buildium */
export async function fetchOpenWorkOrders() {
  const data = await buildiumGet("/workorders?statuses=New,InProgress&limit=100");
  if (!data) return [];
  return (data.results ?? []).map((wo: any) => ({
    buildiumId: String(wo.Id),
    title: wo.Title ?? "Work Order",
    description: wo.Description ?? "",
    category: wo.Category ?? "General",
    priority: wo.Priority ?? "Normal",
    propertyAddress: wo.Property?.Address?.AddressLine1 ?? "",
    propertyCity: wo.Property?.Address?.City ?? "",
    propertyState: wo.Property?.Address?.State ?? "",
    propertyZip: wo.Property?.Address?.PostalCode ?? "",
    requestedByName: wo.RequestedByUser?.Name ?? "",
    requestedByEmail: wo.RequestedByUser?.Email ?? "",
    status: wo.Status ?? "New",
    createdAt: wo.CreatedDateTime ?? new Date().toISOString(),
  }));
}

/** Assign a vendor (partner) to a Buildium work order */
export async function assignVendorToWorkOrder(workOrderId: string, vendorId: string) {
  return buildiumPatch(`/workorders/${workOrderId}`, {
    AssignedVendorId: vendorId,
    Status: "InProgress",
  });
}

/** Push job completion back to Buildium */
export async function markWorkOrderComplete(workOrderId: string, completionNotes: string) {
  return buildiumPatch(`/workorders/${workOrderId}`, {
    Status: "Completed",
    CompletionNotes: completionNotes,
    CompletedDateTime: new Date().toISOString(),
  });
}

/** Fetch vendors registered in Buildium */
export async function fetchBuildiumVendors() {
  const data = await buildiumGet("/vendors?limit=200");
  if (!data) return [];
  return (data.results ?? []).map((v: any) => ({
    buildiumVendorId: String(v.Id),
    name: v.Name ?? "",
    email: v.Email ?? "",
    phone: v.Phone ?? "",
    category: v.Category ?? "",
  }));
}

/** Check if Buildium credentials are configured */
export function isBuildiumConfigured(): boolean {
  return !!(CLIENT_ID && CLIENT_SECRET);
}
