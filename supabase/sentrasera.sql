-- Tables for the Sentrasera pilot portal. Run after sentrasera-auth.sql.
-- Row-level security is on with no policies and anon/authenticated are revoked: the portal reaches
-- these tables only through tRPC procedures using the service role, which enforce role and ownership.

create table public.sentrasera_profiles (
  user_id uuid primary key references public.sentrasera_auth_user (id) on delete cascade,
  role text not null check (role in ('admin', 'client')),
  email text not null unique,
  contact_name text not null,
  organization text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.sentrasera_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.sentrasera_questions (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.sentrasera_categories (id) on delete restrict,
  prompt text not null,
  kind text not null default 'text' check (kind in ('text', 'choice', 'rating')),
  choices text[] not null default '{}',
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (kind <> 'choice' or cardinality(choices) >= 2)
);
create index sentrasera_questions_category_idx on public.sentrasera_questions (category_id);

create table public.sentrasera_answers (
  question_id uuid not null references public.sentrasera_questions (id) on delete cascade,
  client_id uuid not null references public.sentrasera_profiles (user_id) on delete cascade,
  value text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (question_id, client_id)
);
create index sentrasera_answers_client_idx on public.sentrasera_answers (client_id);

create table public.sentrasera_feedback (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.sentrasera_profiles (user_id) on delete cascade,
  category_id uuid references public.sentrasera_categories (id) on delete set null,
  body text not null,
  response text,
  responded_at timestamptz,
  responded_by uuid references public.sentrasera_profiles (user_id) on delete set null,
  created_at timestamptz not null default now()
);
create index sentrasera_feedback_client_created_idx on public.sentrasera_feedback (client_id, created_at desc);
create index sentrasera_feedback_category_idx on public.sentrasera_feedback (category_id);
create index sentrasera_feedback_responded_by_idx on public.sentrasera_feedback (responded_by);

create table public.sentrasera_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  scheduled_for date not null,
  status text not null default 'planned' check (status in ('planned', 'shipped')),
  category_id uuid references public.sentrasera_categories (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index sentrasera_updates_scheduled_idx on public.sentrasera_updates (scheduled_for);
create index sentrasera_updates_category_idx on public.sentrasera_updates (category_id);

alter table public.sentrasera_profiles enable row level security;
alter table public.sentrasera_categories enable row level security;
alter table public.sentrasera_questions enable row level security;
alter table public.sentrasera_answers enable row level security;
alter table public.sentrasera_feedback enable row level security;
alter table public.sentrasera_updates enable row level security;

revoke all on public.sentrasera_profiles, public.sentrasera_categories, public.sentrasera_questions,
  public.sentrasera_answers, public.sentrasera_feedback, public.sentrasera_updates
  from anon, authenticated;

insert into public.sentrasera_categories (name, sort_order)
values ('Payments', 10), ('Guest Experience', 20);
