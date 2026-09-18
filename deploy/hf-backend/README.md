---
title: Chat Agent API
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# Todo Chatbot Backend (FastAPI)

FastAPI backend deployed as a Hugging Face Docker Space.

- Health check: `GET /health`
- Docs: `/docs`
- Tasks API: `/v1/tasks` (JWT bearer auth)
- Auth: `/auth/*`

All credentials are provided via Space **Secrets** (Settings → Variables and secrets):
`DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `BETTER_AUTH_SECRET`. No secrets are
baked into the image.
