from rest_framework import serializers

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


class WebsiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteSettings
        fields = ["site_name", "tagline", "logo", "favicon", "currency_symbol"]


class SEOSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SEOSettings
        fields = ["meta_title", "meta_description", "meta_keywords", "og_image"]


class HeroContentSerializer(serializers.ModelSerializer):
    keywords = serializers.ListField(source="keywords_list", child=serializers.CharField(), read_only=True)

    class Meta:
        model = HeroContent
        fields = ["eyebrow", "heading", "subheading", "keywords", "hero_image", "hero_video", "badge_text"]


class PropertyHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyHighlight
        fields = ["id", "icon", "title", "description"]


class PropertyInfoSerializer(serializers.ModelSerializer):
    highlights = serializers.SerializerMethodField()
    why_love = serializers.SerializerMethodField()

    class Meta:
        model = PropertyInfo
        fields = [
            "heading", "story", "guests_served", "guest_rating",
            "years_of_hospitality", "support_availability", "highlights", "why_love",
        ]

    def get_highlights(self, obj):
        qs = PropertyHighlight.objects.filter(section="experience", is_active=True)
        return PropertyHighlightSerializer(qs, many=True).data

    def get_why_love(self, obj):
        qs = PropertyHighlight.objects.filter(section="why_love", is_active=True)
        return PropertyHighlightSerializer(qs, many=True).data


class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ["id", "icon", "name", "description"]


class RoomSerializer(serializers.ModelSerializer):
    amenities = AmenitySerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = [
            "id", "name", "slug", "tagline", "description", "bed_type", "size_sqft",
            "max_guests", "price_per_night", "image", "amenities", "is_available", "is_featured",
        ]


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["id", "image", "caption", "category"]


class FeaturedVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedVideo
        fields = ["title", "video_file", "video_url", "poster_image"]


class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = ["id", "name", "description", "icon", "category", "distance", "image"]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "guest_name", "location", "room_stayed", "rating", "quote", "image"]


class StayJourneyStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = StayJourneyStep
        fields = ["step_number", "title", "description", "icon"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer"]


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ["phone", "whatsapp_number", "whatsapp_default_message", "email", "address", "landmark"]


class BusinessHoursSerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(source="get_day_display", read_only=True)

    class Meta:
        model = BusinessHours
        fields = ["day", "day_display", "open_time", "close_time", "is_closed"]


class GoogleMapsSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoogleMapsSettings
        fields = ["embed_url", "latitude", "longitude", "zoom", "directions_url"]


class SocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaLink
        fields = ["platform", "url"]


class BookingEnquirySerializer(serializers.ModelSerializer):
    reference_code = serializers.CharField(read_only=True)

    class Meta:
        model = BookingEnquiry
        fields = [
            "id", "name", "email", "phone", "check_in", "check_out", "adults", "children",
            "rooms_requested", "room_preference", "special_request", "reference_code", "created_at",
        ]
        read_only_fields = ["id", "reference_code", "created_at"]

    def validate(self, attrs):
        if attrs["check_out"] <= attrs["check_in"]:
            raise serializers.ValidationError("Check-out date must be after check-in date.")
        return attrs


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ["id", "name", "email", "phone", "message", "created_at"]
        read_only_fields = ["id", "created_at"]
