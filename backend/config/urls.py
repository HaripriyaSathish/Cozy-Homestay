from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import include, path, re_path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("hotel.urls")),
]

# Serve uploaded media directly through Django whenever Cloudinary isn't
# configured (local disk fallback) - in DEBUG for convenience, and in
# production too so uploads aren't silently unreachable if Cloudinary
# credentials haven't been set yet.
if not getattr(settings, "CLOUDINARY_STORAGE", None):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


def frontend_index(request, *args, **kwargs):
    index_file = settings.FRONTEND_DIST / "index.html"
    if not index_file.exists():
        return HttpResponseNotFound(
            "Frontend build not found. Run `npm run build` in frontend/ first."
        )
    return HttpResponse(index_file.read_text(encoding="utf-8"))


# Catch-all: anything that isn't matched above (admin/api/media) serves the
# built React app, so the single-page site loads on any path, including a
# hard refresh. Files under WHITENOISE_ROOT (JS/CSS bundles, favicon, etc.)
# are intercepted by WhiteNoise's middleware before reaching this router.
urlpatterns += [re_path(r"^.*$", frontend_index)]