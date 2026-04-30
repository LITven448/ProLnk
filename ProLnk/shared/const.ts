export const COOKIE_NAME = "app_session_id";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = 'Please login (10001)';
export const NOT_ADMIN_ERR_MSG = 'You do not have required permission (10002)';

// ─── Network Income Commission Rates ─────────────────────────────────────────
export const NETWORK_RATES = {
  // Own-job commission rate per level
  ownJob: {
    1: 0.020, // Charter Partner: 2.0%
    2: 0.015, // Founding Partner: 1.5%
    3: 0.010, // Growth Pro: 1.0%
    4: 0.005, // Standard Pro: 0.5%
  },
  // Network income rate earned on a downline pro's job
  // Key = upline's network level, value = rate earned
  networkIncome: {
    1: 0.020, // Charter Partner earns 2.0% on all 3 levels below
    2: 0.015, // Founding Partner earns 1.5% on L3 and L4
    3: 0.010, // Growth Pro earns 1.0% on L4 only
    4: 0.000, // Standard Pro earns nothing on downline
  },
  // Max depth a level earns network income
  networkDepth: {
    1: 3, // Earns on 3 levels below (L2, L3, L4)
    2: 2, // Earns on 2 levels below (L3, L4)
    3: 1, // Earns on 1 level below (L4)
    4: 0, // No downline income
  },
  photoOrigination: 0.25, // $0.25 per unique home documented
  subscriptionMonthly: 149.00,
  subscriptionRebateLevelRequired: 1, // Only Charter Partners get the rebate
  payoutMinimumThreshold: 50.00, // Minimum balance to trigger disbursement
  minimumJobsPerMonth: 2, // Activity requirement for L1/L2/L3 to earn network income
  charterPartnerMax: 25, // Maximum number of Charter Partners
} as const;
