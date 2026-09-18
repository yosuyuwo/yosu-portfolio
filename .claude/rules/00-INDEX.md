# Rules Documentation Index

This folder contains consolidated rules for project development guidance. Organized by category for easy reference.

## Common Rules (applies to all projects)
- `01-common-agents.md` - Agent orchestration and usage
- `02-common-code-review.md` - Code review standards and checklist
- `03-common-coding-style.md` - General coding style principles (KISS, DRY, YAGNI)
- `04-common-development-workflow.md` - Feature implementation workflow
- `05-common-git-workflow.md` - Git commit and PR workflow
- `06-common-hooks.md` - Claude Code hooks system
- `07-common-patterns.md` - Repository and API patterns
- `08-common-performance.md` - Model selection and context management
- `09-common-security.md` - Security guidelines and checklist
- `10-common-testing.md` - Testing requirements (80% coverage minimum)

## TypeScript/JavaScript Rules
- `11-ts-coding-style.md` - TypeScript types, interfaces, immutability
- `12-ts-hooks.md` - PostToolUse and Stop hooks for TS/JS
- `13-ts-patterns.md` - API response, custom hooks, repository patterns
- `14-ts-security.md` - Secret management and validation

## React Rules
- `15-react-coding-style.md` - Components, JSX, hooks, imports
- `16-react-hooks.md` - React hooks rules, useEffect, dependency arrays
- `17-react-patterns.md` - Container/presentational, server/client boundaries, Suspense
- `18-react-security.md` - XSS, unsafe URLs, Server Actions, CSP
- `19-react-testing.md` - RTL, MSW, accessibility assertions

## Web/Frontend Rules
- `20-web-animations.md` - CSS transitions, GSAP, keyframes, animation tokens
- `21-web-coding-style.md` - File organization, CSS properties, semantic HTML
- `22-web-design-quality.md` - Anti-template policy, design standards
- `23-web-hooks.md` - PostToolUse hooks (format, lint, type check)
- `24-web-patterns.md` - Component composition, state management, data fetching
- `25-web-performance.md` - Core Web Vitals, bundle budgets, image optimization
- `26-web-security.md` - CSP, XSS prevention, third-party scripts
- `27-web-testing.md` - Visual regression, accessibility, Playwright

## How to Use This Guide

1. **Start with Common Rules** - Read 01-10 for foundational principles applicable to all code
2. **Language-Specific** - Then read 11-14 (TypeScript) if writing TypeScript/JavaScript
3. **Framework-Specific** - Read 15-19 (React) if writing React components
4. **Domain-Specific** - Read 20-27 (Web) if working on frontend/web projects

### Quick Reference by Task

| Task | Read |
|------|------|
| Code review | 02, 09 + language/framework rules |
| New component | 15-19 (React) or 20-27 (Web) |
| New feature | 04, 05 + framework rules |
| Security work | 09, 14, 18, 26 |
| Performance work | 08, 25 |
| Testing | 10, 19, 27 |
| Animation | 20, 25 |

## Notes

- Rules are organized hierarchically: common → language → framework → domain
- Each file may reference related files for deeper context
- Use these as guidelines for new projects, adapting as needed to project-specific requirements
- Keep this index updated when adding new rule files
