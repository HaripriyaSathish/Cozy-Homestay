from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import include, path, re_path
from django.views.static import serve as serve_static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("hotel.urls")),
]

if not getattr(settings, "CLOUDINARY_STORAGE", None):
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve_static, {"document_root": settings.MEDIA_ROOT}),
    ]


def frontend_index(request, *args, **kwargs):
    index_file = settings.FRONTEND_DIST / "index.html"
    if not index_file.exists():
        return HttpResponseNotFound(
            "Frontend build not found. Run `npm run build` in frontend/ first."
        )
    return HttpResponse(index_file.read_text(encoding="utf-8"))


urlpatterns += [re_path(r"^.*$", frontend_index)]