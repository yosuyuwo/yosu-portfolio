-- Better Auth tables for the Sentrasera portal, plus a restricted role that can only touch them.
-- Run before sentrasera.sql. Column names are the camelCase ones Better Auth expects.

create table public.sentrasera_auth_user (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  "emailVerified" boolean not null default false,
  image text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  role text,
  banned boolean default false,
  "banReason" text,
  "banExpires" timestamptz
);

create table public.sentrasera_auth_session (
  id uuid primary key default gen_random_uuid(),
  "expiresAt" timestamptz not null,
  token text not null unique,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" uuid not null references public.sentrasera_auth_user (id) on delete cascade,
  "impersonatedBy" text
);
create index sentrasera_auth_session_user_idx on public.sentrasera_auth_session ("userId");

create table public.sentrasera_auth_account (
  id uuid primary key default gen_random_uuid(),
  "accountId" text not null,
  "providerId" text not null,
  "userId" uuid not null references public.sentrasera_auth_user (id) on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  password text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index sentrasera_auth_account_user_idx on public.sentrasera_auth_account ("userId");

create table public.sentrasera_auth_verification (
  id uuid primary key default gen_random_uuid(),
  identifier text not null,
  value text not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index sentrasera_auth_verification_identifier_idx on public.sentrasera_auth_verification (identifier);

create table public.sentrasera_auth_rate_limit (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  count integer not null,
  "lastRequest" bigint not null
);

alter table public.sentrasera_auth_user enable row level security;
alter table public.sentrasera_auth_session enable row level security;
alter table public.sentrasera_auth_account enable row level security;
alter table public.sentrasera_auth_verification enable row level security;
alter table public.sentrasera_auth_rate_limit enable row level security;

revoke all on public.sentrasera_auth_user, public.sentrasera_auth_session, public.sentrasera_auth_account,
  public.sentrasera_auth_verification, public.sentrasera_auth_rate_limit
  from anon, authenticated;

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'sentrasera_auth') then
    create role sentrasera_auth nologin nosuperuser nocreatedb nocreaterole noinherit nobypassrls connection limit 20;
  end if;
end
$$;

alter role sentrasera_auth set statement_timeout = '8s';

grant usage on schema public to sentrasera_auth;
grant select, insert, update, delete on public.sentrasera_auth_user, public.sentrasera_auth_session,
  public.sentrasera_auth_account, public.sentrasera_auth_verification, public.sentrasera_auth_rate_limit
  to sentrasera_auth;

create policy sentrasera_auth_all on public.sentrasera_auth_user for all to sentrasera_auth using (true) with check (true);
create policy sentrasera_auth_all on public.sentrasera_auth_session for all to sentrasera_auth using (true) with check (true);
create policy sentrasera_auth_all on public.sentrasera_auth_account for all to sentrasera_auth using (true) with check (true);
create policy sentrasera_auth_all on public.sentrasera_auth_verification for all to sentrasera_auth using (true) with check (true);
create policy sentrasera_auth_all on public.sentrasera_auth_rate_limit for all to sentrasera_auth using (true) with check (true);

-- ---------------------------------------------------------------------------------------------
-- PASSWORD STEP (separate query, never commit a real password). Letters and digits only:
--
--   alter role sentrasera_auth with login password 'PUT-A-LONG-RANDOM-PASSWORD-HERE';
--
-- Then set SENTRASERA_AUTH_DATABASE_URL from Supabase's Connect panel -> "Transaction pooler":
--
--   postgresql://sentrasera_auth.<project-ref>:<password>@<pooler-host>:6543/postgres
-- ---------------------------------------------------------------------------------------------
