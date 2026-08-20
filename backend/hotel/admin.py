from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Amenity,
    Attraction,
    BookingEnquiry,
    BusinessHours,
    ContactEnquiry,
    ContactInfo,
    FAQ,
    FeaturedVideo,
    GoogleMapsSettings,
    HeroContent,
    PropertyHighlight,
    PropertyImage,
    PropertyInfo,
    Room,
    SEOSettings,
    SocialMediaLink,
    StayJourneyStep,
    Testimonial,
    WebsiteSettings,
)


def image_preview(obj, field="image", width=60):
    file = getattr(obj, field, None)
    if not file:
        return "—"
    return format_html('<img src="{}" style="width:{}px;height:{}px;object-fit:cover;border-radius:6px;" />', file.url, width, width)


class SingletonAdmin(admin.ModelAdmin):
    """Prevents adding more than one row and blocks deletion for singleton content."""

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(WebsiteSettings)
class WebsiteSettingsAdmin(SingletonAdmin):
    list_display = ("site_name", "tagline", "logo_preview")

    def logo_preview(self, obj):
        return image_preview(obj, "logo")
    logo_preview.short_description = "Logo"


@admin.register(SEOSettings)
class SEOSettingsAdmin(SingletonAdmin):
    list_display = ("meta_title", "meta_description")


@admin.register(HeroContent)
class HeroContentAdmin(SingletonAdmin):
    list_display = ("heading", "rotating_keywords", "hero_preview")

    def hero_preview(self, obj):
        return image_preview(obj, "hero_image", 90)
    hero_preview.short_description = "Hero Image"


@admin.register(PropertyInfo)
class PropertyInfoAdmin(SingletonAdmin):
    list_display = ("heading", "guests_served", "guest_rating", "years_of_hospitality")


@admin.register(PropertyHighlight)
class PropertyHighlightAdmin(admin.ModelAdmin):
    list_display = ("title", "section", "icon", "order", "is_active")
    list_filter = ("section", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("title", "description")
    ordering = ("section", "order")


@admin.register(Amenity)
class AmenityAdmin(admin.ModelAdmin):
    list_display = ("name", "icon", "order", "is_active")
    list_editable = ("order", "is_active")
    search_fields = ("name",)
    list_filter = ("is_active",)


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ("name", "price_per_night", "max_guests", "size_sqft", "room_preview", "is_available", "is_featured", "order")
    list_editable = ("order", "is_available", "is_featured")
    list_filter = ("is_available", "is_featured", "bed_type")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}
    filter_horizontal = ("amenities",)
    ordering = ("order",)

    def room_preview(self, obj):
        return image_preview(obj, "image")
    room_preview.short_description = "Image"


@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ("caption", "category", "img_preview", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("category", "is_active")

    def img_preview(self, obj):
        return image_preview(obj, "image")
    img_preview.short_description = "Preview"


@admin.register(FeaturedVideo)
class FeaturedVideoAdmin(SingletonAdmin):
    list_display = ("title", "video_url")


@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "distance", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name", "description")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("guest_name", "location", "room_stayed", "rating", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("rating", "is_active")
    search_fields = ("guest_name", "quote")


@admin.register(StayJourneyStep)
class StayJourneyStepAdmin(admin.ModelAdmin):
    list_display = ("step_number", "title", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("question", "answer")


@admin.register(ContactInfo)
class ContactInfoAdmin(SingletonAdmin):
    list_display = ("phone", "whatsapp_number", "email", "address")


@admin.register(BusinessHours)
class BusinessHoursAdmin(admin.ModelAdmin):
    list_display = ("day", "open_time", "close_time", "is_closed")
    list_editable = ("open_time", "close_time", "is_closed")


@admin.register(GoogleMapsSettings)
class GoogleMapsSettingsAdmin(SingletonAdmin):
    list_display = ("latitude", "longitude", "zoom")


@admin.register(SocialMediaLink)
class SocialMediaLinkAdmin(admin.ModelAdmin):
    list_display = ("platform", "url", "order", "is_active")
    list_editable = ("order", "is_active")


@admin.register(BookingEnquiry)
class BookingEnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "check_in", "check_out", "rooms_requested", "status", "created_at")
    list_editable = ("status",)
    list_filter = ("status", "check_in")
    search_fields = ("name", "email", "phone")
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Guest Details", {"fields": ("name", "email", "phone")}),
        ("Stay Details", {"fields": ("check_in", "check_out", "adults", "children", "rooms_requested", "room_preference")}),
        ("Notes", {"fields": ("special_request", "admin_notes")}),
        ("Status", {"fields": ("status", "created_at", "updated_at")}),
    )


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "status", "created_at")
    list_editable = ("status",)
    list_filter = ("status",)
    search_fields = ("name", "email", "message")
    date_hierarchy = "created_at"


admin.site.site_header = "Cozy Homestay Admin"
admin.site.site_title = "Cozy Homestay Admin"
admin.site.index_title = "Manage your property content, bookings & enquiries"
