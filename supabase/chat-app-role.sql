-- A restricted login for the portfolio chat server: it can only touch the two chat tables.
-- Even if its connection string leaked, it could not read other tables, drop anything, or reach
-- auth or storage.
--
-- Run once, after chat-unanswered.sql and chat-reports.sql:
--   Supabase Dashboard -> SQL Editor -> New query -> paste everything below the line -> Run.
-- Then do the password step at the bottom, in its own query.

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'chat_app') then
    create role chat_app login nosuperuser nocreatedb nocreaterole noinherit nobypassrls connection limit 20;
  end if;
end
$$;

alter role chat_app set statement_timeout = '8s';

grant usage on schema public to chat_app;

grant select, insert, update on public.chat_unanswered to chat_app;
grant select, insert, update on public.chat_reports to chat_app;
grant usage on sequence public.chat_unanswered_id_seq to chat_app;
grant usage on sequence public.chat_reports_id_seq to chat_app;

-- Row-level security stays on for everyone else; these policies let only chat_app through.
drop policy if exists chat_app_all on public.chat_unanswered;
create policy chat_app_all on public.chat_unanswered
  for all to chat_app using (true) with check (true);

drop policy if exists chat_app_all on public.chat_reports;
create policy chat_app_all on public.chat_reports
  for all to chat_app using (true) with check (true);

-- The app now does the upsert itself, so the helper function from the first version is not needed.
drop function if exists public.record_unanswered(text, text);

-- ---------------------------------------------------------------------------------------------
-- PASSWORD STEP (separate query, and do not commit a real password anywhere):
-- Choose a long random password, letters and digits only so it needs no URL-encoding, then run:
--
--   alter role chat_app with password 'PUT-A-LONG-RANDOM-PASSWORD-HERE';
--
-- Then build DATABASE_URL from Supabase's Connect panel -> "Transaction pooler" string, replacing
-- the user with  chat_app.<your-project-ref>  and the password with the one you just set:
--
--   postgresql://chat_app.<project-ref>:<password>@<pooler-host>:6543/postgres
-- ---------------------------------------------------------------------------------------------
