---
id: 54
title: Auth Object Error Email Case
stage: green
date: 2026-09-19
surface: agent
model: z-ai/glm-5.3-flash
feature: none
branch: main
user: ZAINAB KHAN
command: "object error when creating account and when signing in invalid email or passowrd error but my email and password are correct"
labels: ["auth", "409", "object-object", "case-insensitive", "cors-verified"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - frontend/src/hooks/useBetterAuth.ts (extractBackendError: dict/array/string details -> readable messages)
  - backend/src/api/routes/auth.py (func.lower email matching on signup+signin, normalized storage)
tests_yaml: |
  - live curl: CORS preflight 200 with todo-markers origin; signup 201 with token (backend healthy)
  - python -m py_compile (pass); npx tsc --noEmit (pass)
prompt_text: |
  object error when creating account and when signing in invalid email or passowrd error but my email and password are correct
response_text: |
  Live backend verified healthy (signup 201 + token via curl, CORS preflight 200 for
  todo-markers origin). Root causes: (1) "[object Object]" came from frontend doing
  new Error(detail) on FastAPI's dict detail for 409 EMAIL_EXISTS - the user's email
  was already registered; now extractBackendError maps EMAIL_EXISTS to a friendly
  message and handles string/array/object details. (2) Sign-in 401 with "correct"
  credentials explained by case-sensitive exact email match (signup may have used
  different casing); backend now uses func.lower + strip on both signup and signin,
  storing normalized emails. Committed bf1664b and pushed.
outcome: success
---

# PHR 54 — Auth [object Object] + Case-Insensitive Email

## User prompt (verbatim)
object error when creating account and when signing in invalid email or passowrd error but my email and password are correct

## Response summary
- Backend live-verified healthy; errors were frontend UX + email case sensitivity.
- [object Object] = 409 EMAIL_EXISTS dict passed to new Error(); now friendly message.
- Signin mismatch = case-sensitive email; now normalized (lower + trim) both sides.
- Committed bf1664b, pushed; both deployments auto-redeploy.
