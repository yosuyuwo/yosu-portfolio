-- Questions the portfolio chat could not answer, plus the answers you add later.
-- Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- Row-level security is on and only the restricted chat_app role (chat-app-role.sql) gets a
-- policy, so visitors can never read the table or set `answer` or `status`.

create table if not exists public.chat_unanswered (
  id bigint generated always as identity primary key,
  question text not null,
  normalized text not null unique,
  times_asked integer not null default 1,
  first_asked_at timestamptz not null default now(),
  last_asked_at timestamptz not null default now(),
  status text not null default 'open' check (status in ('open', 'answered', 'ignored')),
  answer text
);

alter table public.chat_unanswered enable row level security;
