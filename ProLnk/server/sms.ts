import { sendSms } from "./notifications";

export async function sendLeadAlertSMS(partnerPhone: string, params: {
  trade: string;
  address: string;
  estimatedValue: number;
  dashboardUrl: string;
}): Promise<boolean> {
  return sendSms(
    partnerPhone,
    `ProLnk Lead: ${params.trade} job at ${params.address}. Est: $${params.estimatedValue.toLocaleString()}. View: ${params.dashboardUrl}`,
  );
}

export async function sendWaitlistConfirmSMS(phone: string, firstName: string, position: number): Promise<boolean> {
  return sendSms(
    phone,
    `Hi ${firstName}! You're #${position} on the ProLnk founding network waitlist. Your referral link is live. Check your email for details.`,
  );
}

export async function sendOfferAlertSMS(phone: string, params: {
  trade: string;
  zip: string;
  estimatedValue?: number | null;
}): Promise<boolean> {
  const value = params.estimatedValue != null ? `~$${Number(params.estimatedValue).toLocaleString()}` : "value TBD";
  return sendSms(
    phone,
    `ProLnk: new job offer (${params.trade} in ${params.zip}, ${value}). Respond within 24h: prolnk.xyz/partner/offers`,
  );
}

export async function sendProMatchedSMS(phone: string, params: {
  businessName: string;
  trade: string;
}): Promise<boolean> {
  return sendSms(
    phone,
    `ProLnk: ${params.businessName} (${params.trade}) has been matched to your request and will reach out soon. View: prolnk.xyz`,
  );
}

export async function sendStormAlertSMS(partnerPhone: string, city: string, eventType: string): Promise<boolean> {
  return sendSms(
    partnerPhone,
    `ProLnk Storm Alert: ${eventType} in ${city}. Storm damage leads may be available. Check your dashboard.`,
  );
}
