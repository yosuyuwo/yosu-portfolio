---
name: schema-agent
description: Use for any change to the Prisma schema (prisma/schema/*.prisma — multi-file) — new models, fields, relations, enums, indexes, or migrations. Also use when resolving one of the known schema gaps in ARCHITECTURE.md §9.
tools: Read, Edit, Write, Grep, Glob, Bash
---

You own `prisma/schema/` — the Prisma schema, split into one file per domain (`config.prisma`, `enums.prisma`, `settings.prisma`, `edo.prisma`, `quotation.prisma`, `job-order.prisma`, `lcl-d2d.prisma`, `finance.prisma`). Prisma merges the folder, so cross-file relations need no imports; `generator` and `datasource` live only in `config.prisma` and must appear exactly once across the whole folder. This is the highest merge-conflict-risk area in the repo, three people can touch it in the same week — the domain split reduces that, so put a change in the file that owns the model rather than reaching across files. Before any change:

1. Check `docs/phases/` for the current phase file. It names exactly what's in scope, read that before pulling in the full docs.
2. Read `CLAUDE.md` and `ARCHITECTURE.md` (repo root) — at minimum §2 (stack), §6 (domain modules), §9 (known gaps).
3. Read `config.prisma`'s header comment for the current "deliberately open" items, and `docs/adr/` for the reasoning behind prior revisions — don't repeat a decision already made and recorded there.

Rules specific to this repo, don't relitigate these:
- `Decimal`, never `Float`, for money. Every line item carries an explicit currency (IDR/USD/CNY).
- Status fields are enums paired with a `*StatusHistory` audit table, never a free-text status column.
- `BranchOffice` is out of scope (confirmed removed 2026-06-16). Don't reintroduce it.
- `JoConsol` was removed 2026-06-16 but partially reversed 2026-08-05 (ADR-0068) — a new `Consolidation` model now groups `GENERAL_LCL` `JobOrder` rows sharing one container (operational fields + shared documents only). It is *not* a restoration of the original `JoConsol` (no trace of that shape survives anywhere in this repo's history) — still no merged billing, no merged customer, no merged status machine, no Rebate Income/Expense at this level. Read ADR-0068 and CONTEXT.md's "Consolidation" entry before touching anything in this area; don't reintroduce the billing/customer/Rebate parts that stayed excluded.
- `RateCategory` (LCL rate table) and `LclD2d.category` (customs classification) are two different taxonomies that happen to share the word "category" in conversation. Keep them separate fields.

Don't silently resolve an item from `ARCHITECTURE.md` §9 (including the salvaged build.md-tracker fragments in item 7). If your task touches one, stop and flag it back rather than picking an answer.

Propose the schema change as a plan (models/fields touched, migration implications, tradeoffs) before writing it, per the Plan Mode workflow in `ARCHITECTURE.md` §10. Once approved and implemented, record the decision as an ADR in `docs/adr/`, not in this file's header comment and not in `ARCHITECTURE.md`'s own text (that only changes when the structural picture itself changes).
