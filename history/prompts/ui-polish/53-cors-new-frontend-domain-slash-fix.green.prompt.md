---
id: 53
title: CORS New Frontend Domain Slash Fix
stage: green
date: 2026-09-19
surface: agent
model: z-ai/glm-5.3-flash
feature: ui-polish
branch: main
user: ZAINAB KHAN
command: "network error araha deploy krne ke bd / commit the new changes"
labels: ["cors", "rename", "todo-markers", "vercel", "trailing-slash"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - backend/src/main.py (CORS allowlist: todo-markers origin, trailing slash stripped)
tests_yaml: |
  - python -m py_compile backend/src/main.py (pass)
prompt_text: |
  network error araha deploy krne ke bd
  commit the new changes
response_text: |
  Live checks showed both old URLs healthy, so the post-deploy "network error" was
  explained by the frontend project rename to todo-markers.vercel.app: the browser
  now sends a new Origin that the backend CORS allowlist rejected. User had added
  the origin but WITH a trailing slash, which never matches the exact CORS check
  (same bug as before). Stripped the slash, py_compile pass, committed ed44b87 and
  pushed; backend auto-redeploys.
outcome: success
---

# PHR 53 — CORS todo-markers Domain (Slash Fix)

## User prompt (verbatim)
network error araha deploy krne ke bd
commit the new changes

## Response summary
- Root cause of post-deploy network error: frontend renamed to todo-markers.vercel.app -> CORS rejected new Origin.
- User's added origin had trailing slash (never matches); fixed, committed ed44b87, pushed.
