# Cozy Homestay

A premium, animation-rich boutique homestay landing site.

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion + lucide-react
- **Backend**: Django + Django REST Framework + Neon PostgreSQL + Cloudinary
- **Admin**: Full Django Admin panel drives every piece of content (rooms, prices, amenities, testimonials, FAQs, contact details, maps, SEO, bookings)

## Project layout

```
backend/    Django project + "hotel" app (models, admin, REST API, email)
frontend/   React app (Vite)
```

## Backend setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env:
#  - leave DATABASE_URL commented out to use local SQLite, OR
#  - paste your Neon connection string to use Postgres
#  - add Cloudinary credentials if you want image uploads to go to Cloudinary
#    (without them, uploaded images are stored on local disk under media/)

python manage.py migrate
python manage.py seed_content      # optional: realistic demo content
python manage.py createsuperuser
python manage.py runserver         # http://127.0.0.1:8000
```

Admin panel: http://127.0.0.1:8000/admin/
API root: http://127.0.0.1:8000/api/content/

## Frontend setup

```bash
cd frontend
npm install
npm run dev                        # http://localhost:5173
```

In dev, Vite proxies `/api` requests to `http://127.0.0.1:8000`, so just run
the Django server alongside it — no extra config needed. For a production
build, copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your
deployed API URL, then:

```bash
npm run build      # outputs to frontend/dist
npm run preview    # serve the production build locally
```

## Environment variables

See `backend/.env.example` and `frontend/.env.example` for the full list
(Neon `DATABASE_URL`, Cloudinary keys, SMTP credentials, CORS origins,
`VITE_API_BASE_URL`). Nothing sensitive is hardcoded — everything the
frontend renders (rooms, prices, amenities, testimonials, FAQs, contact
info, Google Maps embed, WhatsApp number, SEO tags) is fetched from Django
via `GET /api/content/` and is editable from Django Admin.

## Booking & contact enquiries

- `POST /api/bookings/` — creates a `BookingEnquiry`, emails the hotel and
  the guest, returns a reference code.
- `POST /api/contact/` — creates a `ContactEnquiry`, emails the hotel and
  the guest.

Both are manageable (status: New/Contacted/Confirmed/Cancelled/Completed,
admin notes) from Django Admin.
