# Dockerfile for Hugging Face Spaces deployment
# HF Spaces expects the app to listen on port 7860 and runs best with uid 1000.
# Secrets are NOT baked in - set them as Space Secrets in the HF UI.

FROM python:3.11-slim

WORKDIR /app

# HF Spaces runs containers as uid 1000
RUN useradd -m -u 1000 user

# Install dependencies first (layer caching)
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY --chown=user:user src/ ./src/

USER user

EXPOSE 7860

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "7860"]
