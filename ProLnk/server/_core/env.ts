export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  /** Public-facing base URL (e.g. https://prolnk.io). Falls back to the OAuth portal URL. */
  appBaseUrl: process.env.APP_BASE_URL || process.env.VITE_OAUTH_PORTAL_URL || "https://prolnk.io",
  /** From address used in all outbound emails */
  fromEmail: process.env.FROM_EMAIL || "ProLnk <noreply@prolnk.io>",
};
