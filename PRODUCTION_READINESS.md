# TON Product Maturity Plan

This project is moving from prototype toward a validated, scale-ready MVP. The product should not be called production ready until the gates below are met and verified.

## Product Stages

### Validated MVP

- Core teacher auth, profile completion, swap request creation, exact reciprocal matching, DM opening, partner signup, and campaign submission work end to end against the database.
- Every public page has deterministic loading, empty, success, and error states.
- Demo/localStorage-only flows are labeled internally or replaced with backend persistence.
- Basic analytics events exist for signup, profile completion, swap request, match contact, partner registration, and campaign submission.
- Manual smoke test checklist passes on desktop and mobile.

### Growth-stage Product

- Marketplace, creator studio, blogs, videos, notifications, and admin publishing are backend-backed.
- Role-based access control is enforced for teacher, partner, admin, moderator, seller, and creator surfaces.
- Search and filtering work server-side for high-volume lists.
- Payment verification uses provider callbacks or admin verification queues, not optimistic local success.
- Product metrics are reviewed weekly: activation, retention, conversion, match-contact rate, campaign submission rate, and moderation workload.

### Scale-ready Product

- API has validation middleware, rate limits, structured logs, request IDs, pagination, caching, and background jobs.
- Database has migration discipline, read-path indexes, seed separation, backup/restore testing, and query performance budgets.
- File uploads use object storage with malware scanning, content limits, signed URLs, and lifecycle retention rules.
- CI runs lint, syntax checks, unit tests, API integration tests, Prisma validation, and browser smoke tests.
- Deploys have environment-specific config, health checks, rollback procedure, and uptime/error monitoring.

### Mature MVP

- Product workflows are coherent enough for paying users: onboarding, support, moderation, content review, payments, refunds, account recovery, and abuse handling.
- Security baseline includes hardened CORS, secure cookies or token storage strategy, password reset without code leakage, audit logs, and admin action trails.
- UX is reliable under real data volume and poor network conditions.
- Operational ownership is clear: dashboards, incident playbooks, data export, privacy retention, and support tooling.

## Current High-priority Gaps

- `news`, `blogs`, `videos`, and `creator-studio` still need real backend lifecycles.
- Messaging now persists sent messages and creates notifications, but attachments, realtime delivery, and moderation controls still need backend support.
- Notifications are backend-backed for messages and matches, but product, wallet, creator, and admin publishing events still need full lifecycle coverage.
- Marketplace products now persist through seller submission, admin review, and approved product listing, but actual file storage, malware scanning, paid checkout, and digital delivery still need production services.
- Partner campaign media uploads are preview-only; files are not uploaded, scanned, or stored.
- Admin news publishing is local-only and admin user management needs automated tests.
- Password reset no longer returns codes from the public request endpoint, but the full user-facing reset completion flow still needs secure delivery and code verification.
- Registration currently marks email and phone as verified without an OTP/email verification pipeline.
- Payments are marked successful inside campaign submission and must move to provider-confirmed flows.

## Execution Order

1. Stabilize runtime and routing for every page.
2. Replace localStorage-only workflows with API endpoints and database tables already present in Prisma.
3. Add security hardening for auth, reset, CORS, rate limits, validation, and admin actions.
4. Add production observability and CI gates.
5. Optimize performance: pagination, indexes, caching, asset compression, and frontend bundle strategy.
6. Add growth features only after core flows are measured and reliable.

## Minimum Release Gates

- `node --check multipage.js`, `node --check app.js`, and `node --check packages/api/src/server.js` pass.
- `prisma validate` passes for the database schema.
- Smoke tests cover login, signup, profile save, swap request, match action, messages page, partner signup, partner campaign, admin users, and admin reports.
- No page depends on duplicate global scripts.
- No public endpoint leaks verification, reset, payment, or admin-only data.
