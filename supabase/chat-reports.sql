-- Problems visitors report to the portfolio chat (broken pages, bugs, slow loading).
-- Run once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- Row-level security is on and only the restricted chat_app role (chat-app-role.sql) gets a
-- policy, so visitors can never read this table.

create table if not exists public.chat_reports (
  id bigint generated always as identity primary key,
  kind text not null default 'bug' check (kind in ('bug', 'feedback', 'other')),
  message text not null,
  -- the earlier visitor message this one adds details to, when it is a follow-up
  context text,
  -- an email, only when the visitor chose to share one
  contact text,
  page text,
  user_agent text,
  status text not null default 'open' check (status in ('open', 'fixed', 'ignored')),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists chat_reports_status_created_idx
  on public.chat_reports (status, created_at desc);

alter table public.chat_reports enable row level security;
