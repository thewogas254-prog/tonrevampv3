# TON Database Package

This package implements the PostgreSQL/Prisma database architecture for Teachers Online Network and EasySwap.

## Files

- `prisma/schema.prisma` contains the normalized relational schema.
- `prisma/seed.ts` inserts reference data for counties, subjects, subject combinations, categories, and a demo Tom/Mary swap match.
- `.env.example` shows the required `DATABASE_URL` format.

## Setup

```bash
cd packages/database
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
```

On Windows PowerShell, if `npx` or npm script shims are blocked by execution policy, run Prisma through the command shim:

```powershell
cd packages/database
.\node_modules\.bin\prisma.cmd migrate dev
.\node_modules\.bin\prisma.cmd generate
npm.cmd run db:seed
```

## Local PostgreSQL

This project is configured to use PostgreSQL 16 on localhost:

```txt
host: localhost
port: 5432
database: ton_dev
user: ton_user
password: ton_password
```

The local database was created with:

```powershell
$env:PGPASSWORD='postgres'
psql -h localhost -U postgres -d postgres -c "CREATE USER ton_user WITH PASSWORD 'ton_password';"
psql -h localhost -U postgres -d postgres -c "CREATE DATABASE ton_dev OWNER ton_user;"
psql -h localhost -U postgres -d postgres -c "ALTER USER ton_user CREATEDB;"
```

`CREATEDB` is needed by `prisma migrate dev` because Prisma creates a temporary shadow database while developing migrations.

Docker Compose is also available from the root `docker-compose.yml` if Docker Desktop is running:

```powershell
docker compose up -d postgres
```

## Implemented Areas

- Authentication identities, sessions, and email change logs.
- Counties, subcounties, subjects, and normalized subject combinations.
- Teacher profiles and monthly profile change limits.
- Swap requests, generated matches, and match interactions.
- Conversations, participants, and messages.
- Notifications.
- Blog categories, blog posts, and nested comments.
- Media content and nested media comments.
- Seller accounts, product categories, products, and purchases.
- Wallets, immutable wallet transactions, and withdrawals.
- Reports, moderation actions, and activity logs.
- High-priority indexes for swap lookup, messages, notifications, and moderation.
- Soft-delete fields on users, blog posts, comments, media, messages, and products.

## Notes

The schema uses Prisma enums instead of free-form status strings where the product requirements define controlled values. Tables and columns are mapped to snake_case with `@@map` and `@map` so the physical PostgreSQL database follows the specification naming convention while the Prisma Client remains idiomatic TypeScript.
