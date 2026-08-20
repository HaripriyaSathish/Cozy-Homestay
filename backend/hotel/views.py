from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from . import emails
from .models import (
    Amenity,
    Attraction,
    BusinessHours,
    ContactInfo,
    FAQ,
    FeaturedVideo,
    GoogleMapsSettings,
    HeroContent,
    PropertyImage,
    PropertyInfo,
    Room,
    SEOSettings,
    SocialMediaLink,
    StayJourneyStep,
    Testimonial,
    WebsiteSettings,
)
from .serializers import (
    AmenitySerializer,
    AttractionSerializer,
    BookingEnquirySerializer,
    BusinessHoursSerializer,
    ContactEnquirySerializer,
    ContactInfoSerializer,
    FAQSerializer,
    FeaturedVideoSerializer,
    GoogleMapsSettingsSerializer,
    HeroContentSerializer,
    PropertyImageSerializer,
    PropertyInfoSerializer,
    RoomSerializer,
    SEOSettingsSerializer,
    SocialMediaLinkSerializer,
    StayJourneyStepSerializer,
    TestimonialSerializer,
    WebsiteSettingsSerializer,
)


class SiteContentView(APIView):
    """
    Single aggregate read endpoint the React frontend fetches on load.
    Keeps the site fully data-driven from Django Admin without requiring
    a dozen separate round trips for a one-page site.
    """

    def get(self, request):
        ctx = {"request": request}
        data = {
            "settings": WebsiteSettingsSerializer(WebsiteSettings.objects.first(), context=ctx).data if WebsiteSettings.objects.exists() else {},
            "seo": SEOSettingsSerializer(SEOSettings.objects.first(), context=ctx).data if SEOSettings.objects.exists() else {},
            "hero": HeroContentSerializer(HeroContent.objects.first(), context=ctx).data if HeroContent.objects.exists() else {},
            "property": PropertyInfoSerializer(PropertyInfo.objects.first(), context=ctx).data if PropertyInfo.objects.exists() else {},
            "rooms": RoomSerializer(Room.objects.filter(is_available=True).prefetch_related("amenities"), many=True, context=ctx).data,
            "amenities": AmenitySerializer(Amenity.objects.filter(is_active=True), many=True, context=ctx).data,
            "images": PropertyImageSerializer(PropertyImage.objects.filter(is_active=True), many=True, context=ctx).data,
            "video": FeaturedVideoSerializer(FeaturedVideo.objects.first(), context=ctx).data if FeaturedVideo.objects.exists() else {},
            "attractions": AttractionSerializer(Attraction.objects.filter(is_active=True), many=True, context=ctx).data,
            "testimonials": TestimonialSerializer(Testimonial.objects.filter(is_active=True), many=True, context=ctx).data,
            "journey": StayJourneyStepSerializer(StayJourneyStep.objects.all(), many=True, context=ctx).data,
            "faqs": FAQSerializer(FAQ.objects.filter(is_active=True), many=True, context=ctx).data,
            "contact": ContactInfoSerializer(ContactInfo.objects.first(), context=ctx).data if ContactInfo.objects.exists() else {},
            "business_hours": BusinessHoursSerializer(BusinessHours.objects.all(), many=True, context=ctx).data,
            "maps": GoogleMapsSettingsSerializer(GoogleMapsSettings.objects.first(), context=ctx).data if GoogleMapsSettings.objects.exists() else {},
            "social": SocialMediaLinkSerializer(SocialMediaLink.objects.filter(is_active=True), many=True, context=ctx).data,
        }
        return Response(data)


class BookingEnquiryCreateView(APIView):
    def post(self, request):
        serializer = BookingEnquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        emails.send_booking_emails(booking)
        return Response(
            {
                "message": "Your booking enquiry has been received.",
                "reference_code": booking.reference_code,
                "data": BookingEnquirySerializer(booking).data,
            },
            status=status.HTTP_201_CREATED,
        )


class ContactEnquiryCreateView(APIView):
    def post(self, request):
        serializer = ContactEnquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        emails.send_contact_emails(enquiry)
        return Response(
            {"message": "Your message has been received.", "data": ContactEnquirySerializer(enquiry).data},
            status=status.HTTP_201_CREATED,
        )
