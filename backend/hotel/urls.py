from django.urls import path

from .views import BookingEnquiryCreateView, ContactEnquiryCreateView, SiteContentView

urlpatterns = [
    path("content/", SiteContentView.as_view(), name="site-content"),
    path("bookings/", BookingEnquiryCreateView.as_view(), name="booking-create"),
    path("contact/", ContactEnquiryCreateView.as_view(), name="contact-create"),
]
