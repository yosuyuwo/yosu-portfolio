-- Optional Bahasa Indonesia wording for portal questions and categories. Run after sentrasera.sql.
-- English stays canonical: choice answers always store the English choice, matched to its translation by position.

alter table public.sentrasera_categories
  add column name_bahasa text;

alter table public.sentrasera_questions
  add column prompt_bahasa text,
  add column choices_bahasa text[] not null default '{}',
  add constraint sentrasera_questions_choices_bahasa_match check (
    cardinality(choices_bahasa) = 0
    or cardinality(choices_bahasa) = cardinality(choices)
  );
