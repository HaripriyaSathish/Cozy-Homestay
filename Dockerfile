# Single-image build: React frontend + Django backend served from one process,
# so the whole site lives behind one Render URL with no CORS to configure.

# ---- Stage 1: build the React app ----
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: Django, serving the built frontend ----
FROM python:3.12-slim
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app/backend

RUN apt-get update \
    && apt-get install -y --no-install-recommends libpq5 \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

RUN chmod +x entrypoint.sh \
    && python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["./entrypoint.sh"]