from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class SingletonModel(models.Model):
    """Base class for content that should only ever have one row (enforced in admin)."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass


class WebsiteSettings(SingletonModel):
    site_name = models.CharField(max_length=120, default="Cozy Homestay")
    tagline = models.CharField(max_length=200, blank=True, default="Stay Beyond the Ordinary.")
    logo = models.ImageField(upload_to="settings/", blank=True, null=True)
    favicon = models.ImageField(upload_to="settings/", blank=True, null=True)
    currency_symbol = models.CharField(max_length=5, default="₹")
    maintenance_mode = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Website Setting"
        verbose_name_plural = "Website Settings"

    def __str__(self):
        return self.site_name


class SEOSettings(SingletonModel):
    meta_title = models.CharField(max_length=200, default="Cozy Homestay | Stay Beyond the Ordinary")
    meta_description = models.TextField(
        blank=True,
        default="A premium boutique homestay offering peaceful, personal and comfortable stays.",
    )
    meta_keywords = models.CharField(max_length=300, blank=True, default="homestay, boutique hotel, luxury stay")
    og_image = models.ImageField(upload_to="seo/", blank=True, null=True)

    class Meta:
        verbose_name = "SEO Setting"
        verbose_name_plural = "SEO Settings"

    def __str__(self):
        return "SEO Settings"


class HeroContent(SingletonModel):
    eyebrow = models.CharField(max_length=100, blank=True, default="A Boutique Escape")
    heading = models.CharField(max_length=200, default="Stay Beyond the Ordinary.")
    subheading = models.TextField(
        default="Discover a stay where comfort feels personal, every corner tells a story, "
        "and every moment is designed to slow you down."
    )
    rotating_keywords = models.CharField(
        max_length=300,
        default="Comfort,Calm,Connection",
        help_text="Comma separated words animated in the hero (e.g. Comfort,Calm,Connection)",
    )
    hero_image = models.ImageField(upload_to="hero/", blank=True, null=True)
    hero_video = models.FileField(upload_to="hero/", blank=True, null=True, help_text="Optional short background video")
    badge_text = models.CharField(max_length=100, blank=True, default="Handpicked Boutique Stay")

    class Meta:
        verbose_name = "Hero Content"
        verbose_name_plural = "Hero Content"

    def __str__(self):
        return self.heading

    @property
    def keywords_list(self):
        return [w.strip() for w in self.rotating_keywords.split(",") if w.strip()]


class PropertyInfo(SingletonModel):
    heading = models.CharField(max_length=200, default="Not Just a Room. Your Personal Escape.")
    story = models.TextField(
        default="Tucked away from the noise of everyday life, our homestay was built on a simple idea: "
        "hospitality should feel personal. Every room is thoughtfully designed for peaceful rest, "
        "every corner carries the warmth of local character, and every guest is treated like family. "
        "We sit minutes from the places you actually want to explore, so you spend less time "
        "travelling and more time living the experience."
    )
    guests_served = models.PositiveIntegerField(default=5000)
    guest_rating = models.DecimalField(max_digits=2, decimal_places=1, default=4.9)
    years_of_hospitality = models.PositiveIntegerField(default=10)
    support_availability = models.CharField(max_length=50, default="24/7")

    class Meta:
        verbose_name = "Property Info"
        verbose_name_plural = "Property Info"

    def __str__(self):
        return "Property Info"


class PropertyHighlight(models.Model):
    """Powers both the 'Property Experience' icon cards and the 'Why Guests Love Staying' cards."""

    SECTION_CHOICES = [
        ("experience", "Property Experience"),
        ("why_love", "Why Guests Love Staying"),
    ]
    section = models.CharField(max_length=20, choices=SECTION_CHOICES, default="experience")
    icon = models.CharField(max_length=50, default="Sparkles", help_text="lucide-react icon name, e.g. BedDouble")
    title = models.CharField(max_length=100)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["section", "order"]
        verbose_name = "Property Highlight"

    def __str__(self):
        return f"[{self.get_section_display()}] {self.title}"


class Amenity(models.Model):
    icon = models.CharField(max_length=50, default="Wifi", help_text="lucide-react icon name")
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Amenities"

    def __str__(self):
        return self.name


class Room(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=140, unique=True)
    tagline = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    bed_type = models.CharField(max_length=100, default="King/Queen Bed")
    size_sqft = models.PositiveIntegerField(default=250, help_text="Room size in sq. ft.")
    max_guests = models.PositiveIntegerField(default=2)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="rooms/", blank=True, null=True)
    amenities = models.ManyToManyField(Amenity, blank=True, related_name="rooms")
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class PropertyImage(models.Model):
    CATEGORY_CHOICES = [
        ("property", "Featured Property"),
        ("experience", "Featured Experience"),
    ]
    image = models.ImageField(upload_to="property/")
    caption = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="property")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.caption or f"Image {self.pk}"


class FeaturedVideo(SingletonModel):
    title = models.CharField(max_length=150, default="A Glimpse of Your Next Escape.")
    video_file = models.FileField(upload_to="video/", blank=True, null=True)
    video_url = models.URLField(blank=True, help_text="Use this OR upload a file above")
    poster_image = models.ImageField(upload_to="video/", blank=True, null=True)

    class Meta:
        verbose_name = "Featured Video"
        verbose_name_plural = "Featured Video"

    def __str__(self):
        return self.title


class Attraction(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Compass")
    category = models.CharField(max_length=100, blank=True, default="Explore")
    distance = models.CharField(max_length=50, blank=True, help_text="e.g. 2.5 km")
    image = models.ImageField(upload_to="attractions/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    guest_name = models.CharField(max_length=120)
    location = models.CharField(max_length=120, blank=True)
    room_stayed = models.CharField(max_length=120, blank=True)
    rating = models.PositiveSmallIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    quote = models.TextField()
    image = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.guest_name} ({self.rating}★)"


class StayJourneyStep(models.Model):
    step_number = models.PositiveIntegerField()
    title = models.CharField(max_length=150)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="CalendarCheck")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "step_number"]

    def __str__(self):
        return f"{self.step_number:02d} — {self.title}"


class FAQ(models.Model):
    question = models.CharField(max_length=250)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question


class ContactInfo(SingletonModel):
    phone = models.CharField(max_length=30, default="+91 98765 43210")
    whatsapp_number = models.CharField(
        max_length=30, default="919876543210", help_text="Digits only with country code, no + or spaces"
    )
    whatsapp_default_message = models.CharField(
        max_length=300,
        default="Hi, I would like to check room availability and pricing. Please share more details.",
    )
    email = models.EmailField(default="hello@cozyhomestay.com")
    address = models.CharField(max_length=300, default="123 Palm Grove Road, Coastal Town, India")
    landmark = models.CharField(max_length=200, blank=True, default="5 mins from the beach promenade")

    class Meta:
        verbose_name = "Contact Info"
        verbose_name_plural = "Contact Info"

    def __str__(self):
        return "Contact Info"


class BusinessHours(models.Model):
    DAY_CHOICES = [
        ("mon", "Monday"), ("tue", "Tuesday"), ("wed", "Wednesday"), ("thu", "Thursday"),
        ("fri", "Friday"), ("sat", "Saturday"), ("sun", "Sunday"),
    ]
    day = models.CharField(max_length=3, choices=DAY_CHOICES, unique=True)
    open_time = models.TimeField(default="08:00")
    close_time = models.TimeField(default="22:00")
    is_closed = models.BooleanField(default=False)

    class Meta:
        ordering = ["id"]
        verbose_name_plural = "Business Hours"

    def __str__(self):
        return self.get_day_display()


class GoogleMapsSettings(SingletonModel):
    embed_url = models.URLField(
        blank=True,
        help_text="Google Maps embed src URL (Maps > Share > Embed a map)",
    )
    latitude = models.DecimalField(max_digits=9, decimal_places=6, default=15.2993)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, default=74.1240)
    zoom = models.PositiveIntegerField(default=14)
    directions_url = models.URLField(blank=True)

    class Meta:
        verbose_name = "Google Maps Setting"
        verbose_name_plural = "Google Maps Settings"

    def __str__(self):
        return "Google Maps Settings"


class SocialMediaLink(models.Model):
    PLATFORM_CHOICES = [
        ("instagram", "Instagram"), ("facebook", "Facebook"), ("youtube", "YouTube"),
        ("twitter", "Twitter / X"), ("linkedin", "LinkedIn"),
    ]
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.URLField()
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.get_platform_display()


class BookingEnquiry(models.Model):
    STATUS_CHOICES = [
        ("new", "New"), ("contacted", "Contacted"), ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"), ("completed", "Completed"),
    ]
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    check_in = models.DateField()
    check_out = models.DateField()
    adults = models.PositiveIntegerField(default=1)
    children = models.PositiveIntegerField(default=0)
    rooms_requested = models.PositiveIntegerField(default=1)
    room_preference = models.ForeignKey(Room, on_delete=models.SET_NULL, blank=True, null=True, related_name="booking_enquiries")
    special_request = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Booking Enquiries"

    def __str__(self):
        return f"{self.name} — {self.check_in} to {self.check_out}"

    @property
    def reference_code(self):
        return f"CH-{self.created_at:%Y%m}-{self.pk:04d}" if self.pk and self.created_at else ""


class ContactEnquiry(models.Model):
    STATUS_CHOICES = [
        ("new", "New"), ("contacted", "Contacted"), ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"), ("completed", "Completed"),
    ]
    name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Contact Enquiries"

    def __str__(self):
        return f"{self.name} ({self.created_at:%Y-%m-%d})"
