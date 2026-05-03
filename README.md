# Teachers Online Network - EasySwap Prototype

This is a dependency-free frontend prototype for the Teachers Online Network platform described in `tonrevamp.txt`.

## Run

Open `index.html` in a browser.

## Implemented Prototype Areas

- Production-style auth entry with signup/login tabs, password policy checks, Kenyan phone validation, password visibility toggles, terms consent, and a verification handoff step.
- Account signup validation with email, phone, and password confirmation.
- Teacher profile completion with primary/secondary level rules.
- Secondary subject combination dropdown and primary `NULL` subject behavior.
- Chat and call availability toggles.
- EasySwap request form with current profile data auto-filled.
- Exact mutual matching logic using county, level, and subject combination.
- Matches page with DM/call actions and filtering.
- Messages page with archive, report, block, and view-more actions.
- Notifications page with navigation targets and sidebar count.
- News page with education categories.
- Blog/Vlog page with topic filtering and engagement placeholders.
- Marketplace with protected seller Sales IDs.
- My Shop product verification workflow and price ranges.
- My Blog/Vlog creator studio and wallet summary.

## Notes

The current implementation is a static prototype with mock data in `app.js`. The next production step is to convert this into the recommended monorepo stack: Next.js frontend, NestJS API, PostgreSQL, Prisma, authentication, realtime messaging, Meilisearch, storage, M-Pesa payments, and admin moderation.

## Database Architecture

The PostgreSQL/Prisma database implementation now lives in `packages/database`.

See `packages/database/README.md` for setup commands, schema coverage, and seed details.

Quick local database start:

```powershell
cd packages/database
.\node_modules\.bin\prisma.cmd migrate dev
npm.cmd run db:seed
```

## Auth Prototype Flow

Open `http://127.0.0.1:8080/index.html`.

For signup, use:

- Email: any valid email
- Phone: a Kenyan number such as `+254712345678`
- Password: at least 8 characters with uppercase, lowercase, number, and special character
- OTP: any 6 digits

For login, use any valid email and any password with at least 8 characters. Real credential checking will be connected when the backend auth API is implemented.

Seeded prototype login:

- Handle: `klickviews2026!`
- Email: `klickviews2026@ton.co.ke`
- Phone: `+254716226416`
- Password: `Klickviews2026!`

The local database seed also creates this verified user and a completed teacher profile.
