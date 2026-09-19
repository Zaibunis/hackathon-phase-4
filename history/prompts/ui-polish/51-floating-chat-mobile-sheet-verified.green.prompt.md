---
id: 51
title: Floating Chat Mobile Sheet Verified
stage: green
date: 2026-09-19
surface: agent
model: z-ai/glm-5.3-flash
feature: ui-polish
branch: main
user: ZAINAB KHAN
command: "chat abhi bhi reponsive ni he" / "mujhe navbar pr nhi chye ai chat jo floating chat he usko responsive krna he bs only that emaining only"
labels: ["chat", "hooks-bug", "puppeteer", "mobile-verified", "floating-chat"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - frontend/src/components/FloatingChat.tsx (CRITICAL hook-order crash fix; mobile backdrop tap-to-close; swipe-down handle)
  - frontend/src/context/AuthContext.tsx (loading starts true - fixes /chat premature redirect race)
  - frontend/src/app/(dashboard)/layout.tsx (AI Chat link removed from navbar per user request)
  - frontend/mobile-test.cjs (puppeteer test, deleted after use)
tests_yaml: |
  - puppeteer mobile test (390x844 iPhone): floating sheet input on-screen (bottom 826/844), no overflowX, 0 page errors
  - npx tsc --noEmit (pass)
  - npm run build (pass, 6/6 routes)
prompt_text: |
  chat abhi bhi reponsive ni he
  mujhe navbar pr nhi chye ai chat jo floating chat he usko responsive krna he bs only that emaining only
response_text: |
  Ran a real puppeteer mobile test (390x844, live auth token) instead of guessing. Found a
  CRITICAL bug: FloatingChat had an early return between hooks (pathname check) violating
  React hook rules -> "Rendered fewer hooks than expected" -> entire /chat page crashed
  client-side (this was the real reason chat "wasn't responsive"). Fixed by moving early
  returns after all hooks. Also fixed AuthContext starting loading=true to stop a
  premature-redirect race on /chat. Floating chat bottom sheet verified: input fully
  on-screen (826 < 844), zero horizontal overflow, zero page errors. Added mobile
  backdrop (tap outside closes) and swipe-down handle. Navbar AI Chat link removed per
  user request; /chat remains directly accessible and no longer crashes. Test artifacts
  cleaned; tsc + build pass. Commit permission still pending.
outcome: success
---

# PHR 51 — Floating Chat Verified Responsive (Hook Crash Fixed)

## User prompt (verbatim)
chat abhi bhi reponsive ni he
mujhe navbar pr nhi chye ai chat jo floating chat he usko responsive krna he bs only that emaining only

## Response summary
- CRITICAL: FloatingChat early-return-between-hooks crashed /chat entirely; fixed (returns moved after hooks).
- AuthContext loading=true initial state fixed premature redirect race.
- Puppeteer 390x844 test with live token: sheet input bottom 826/844, no overflow, 0 errors.
- Mobile backdrop + swipe-down close added to the bottom sheet.
- Navbar AI Chat link removed; /chat still reachable and stable.
- tsc + build clean; commit permission still pending.
