/**
 * PATCH NOTE: managingTierAgents.ts has a sendEmail re-declaration bug.
 * The file both imports from email.ts AND defines a local sendEmail function.
 *
 * Fix: Remove the local sendEmail definition and use a different internal name.
 * Apply: node patches-bugs/fix-managing-agents.mjs
 */
export {};
