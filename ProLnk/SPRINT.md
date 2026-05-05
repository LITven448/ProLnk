# Sprint Work Order Template

**Copy this template for each sprint/work session.**

---

## Sprint Information

**Sprint Name**: [Name or number]
**Start Date**: [YYYY-MM-DD]
**End Date**: [YYYY-MM-DD]
**Sprint Goal**: [One sentence describing primary objective]

## Assigned Agents

List AI agents assigned to this sprint:
- [ ] Agent Name: [Task description]
- [ ] Agent Name: [Task description]
- [ ] Agent Name: [Task description]

## Work Items

### Story 1: [User story or feature]

**Priority**: High | Medium | Low
**Estimated Time**: [hours]
**Owner**: [Agent name]

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Tasks**:
- [ ] Subtask 1 - [Owner] - [Est. time]
- [ ] Subtask 2 - [Owner] - [Est. time]
- [ ] Subtask 3 - [Owner] - [Est. time]

**Files to Modify**:
- [File path]
- [File path]

**Testing Plan**:
- [Test approach 1]
- [Test approach 2]

**Notes**:
- [Any context or gotchas]

---

### Story 2: [User story or feature]

**Priority**: High | Medium | Low
**Estimated Time**: [hours]
**Owner**: [Agent name]

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**Tasks**:
- [ ] Subtask 1
- [ ] Subtask 2

---

## Blockers & Risks

**Blockers**:
- [ ] Blocker 1: [Description] - [Owner] - [Resolution]
- [ ] Blocker 2: [Description] - [Owner] - [Resolution]

**Risks**:
- [ ] Risk 1: [If happens] [Impact] [Mitigation]
- [ ] Risk 2: [If happens] [Impact] [Mitigation]

## Deployment

**Branch**: main (all changes to production branch)
**Deployment Window**: [Date/time]
**Rollback Plan**: [If deploy fails, do X]
**Success Criteria**:
- [ ] All tests pass
- [ ] No errors in Railway logs
- [ ] Both domains load without errors
- [ ] Forms submit successfully
- [ ] Confirmation emails arrive

## Current Active Sprints

### Sprint: May 6 Launch Countdown

**Goal**: Ship waitlist MVP on May 6, 2026 (9 days remaining)

**Status**: 🟢 On Track

**Items**:
- [ ] Verify ProLnk.io domain live (✅ Done)
- [ ] Configure trustypro.prolnk.io subdomain (⏳ In Progress)
- [ ] Test Pro signup flow end-to-end
- [ ] Test Homeowner signup flow end-to-end
- [ ] Verify confirmation emails (Resend)
- [ ] Fix partner form validation error (service radius field)
- [ ] Admin dashboard review
- [ ] Railway logging and monitoring setup
- [ ] Cloudflare WAF rules
- [ ] Create launch checklist and runbook

**Blockers**: None

**Assigned Agents**:
- Deployment & Infrastructure Agent: Domain config, monitoring
- Testing Agent: E2E test flow, form validation
- Error Handler Agent: Logging, error capture

**Next Review**: Daily (May 5-6)

---

### Sprint: Week 2 - Authentication & Pro Activation

**Goal**: Enable pro login and account activation

**Status**: 🟡 Planning

**Estimated Duration**: 1 week (May 13-19)

**Items**:
- [ ] Design JWT auth system
- [ ] Build signup/login forms
- [ ] Implement password hashing
- [ ] Create session management
- [ ] Build pro profile dashboard
- [ ] Implement email verification
- [ ] Add permissions system (pro, homeowner, admin)
- [ ] Create account recovery flow
- [ ] Write auth tests

**Assigned Agents**:
- Engineering Agent: Auth system design
- Code Review Agent: Pull request review
- Testing Agent: Auth flow tests
- Security Agent: OWASP validation

---

### Sprint: Week 3 - Lead Matching Algorithm

**Goal**: Build basic matching logic to connect pros with leads

**Status**: 🔴 Not Started

**Estimated Duration**: 1 week (May 20-26)

**Items**:
- [ ] Define matching rules (service type, location, tier)
- [ ] Build match scoring algorithm
- [ ] Create notification flow
- [ ] Build pro acceptance/rejection UI
- [ ] Implement homeowner acceptance UI
- [ ] Add match history view
- [ ] Create matching analytics
- [ ] Performance optimization

**Assigned Agents**:
- Recommendation Engine Agent: Matching algorithm
- Data Warehouse Agent: Analytics
- Engineering Agent: System design

---

## Common Sprint Patterns

### Getting Unstuck

If a sprint item is blocked:
1. Note it in Blockers section above
2. Assign owner to resolve
3. Estimate resolution time
4. Escalate if > 2 hour effort
5. Don't wait - move to next item

### Testing Before Deploy

Before pushing to main:
1. [ ] Run `npm run check` (TypeScript check)
2. [ ] Run `npm run build` (Vite build)
3. [ ] Manual test in browser (golden path + edge cases)
4. [ ] Check Railway logs for errors
5. [ ] Verify no database migration failures
6. [ ] Test from both prolnk.io and trustypro.prolnk.io

### Database Changes

If modifying schema:
1. Update drizzle/schema.ts
2. Run Drizzle CLI to generate migration
3. Test migration locally
4. Commit both schema.ts AND migration file
5. Verify migration runs on Railway deploy

### Form Validation

All forms must have:
1. [ ] Client-side validation (Zod schema)
2. [ ] Server-side validation (tRPC input validation)
3. [ ] Error messages to user
4. [ ] Tests for valid + invalid inputs
5. [ ] Logging for debugging

### Email Integration

All emails must:
1. [ ] Have template in server/emails/
2. [ ] Use Resend API (not async queue yet)
3. [ ] Have fallback text version
4. [ ] Include unsubscribe link (if marketing)
5. [ ] Have test in test suite

## Sign-Off Checklist

Before marking sprint complete:
- [ ] All work items delivered
- [ ] Tests passing
- [ ] Code reviewed
- [ ] Deployed to production
- [ ] Monitored for 24 hours post-deploy
- [ ] No regressions in other features
- [ ] HANDOFF.md updated with status
- [ ] Next sprint planned
