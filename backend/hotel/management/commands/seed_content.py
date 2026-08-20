from django.core.management.base import BaseCommand

from hotel.models import (
    Amenity,
    Attraction,
    BusinessHours,
    ContactInfo,
    FAQ,
    FeaturedVideo,
    GoogleMapsSettings,
    HeroContent,
    PropertyHighlight,
    PropertyInfo,
    Room,
    SEOSettings,
    SocialMediaLink,
    StayJourneyStep,
    Testimonial,
    WebsiteSettings,
)


class Command(BaseCommand):
    help = "Seed the database with realistic demo content for Cozy Homestay."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Cozy Homestay content...")

        WebsiteSettings.objects.update_or_create(
            pk=1, defaults=dict(site_name="Cozy Homestay", tagline="Stay Beyond the Ordinary.")
        )

        SEOSettings.objects.update_or_create(
            pk=1,
            defaults=dict(
                meta_title="Cozy Homestay | Stay Beyond the Ordinary",
                meta_description="A premium boutique homestay offering peaceful, personal and comfortable stays "
                "minutes from the coast.",
                meta_keywords="homestay, boutique hotel, luxury stay, resort, premium accommodation",
            ),
        )

        HeroContent.objects.update_or_create(
            pk=1,
            defaults=dict(
                eyebrow="A Boutique Escape",
                heading="Stay Beyond the Ordinary.",
                subheading="Discover a stay where comfort feels personal, every corner tells a story, "
                "and every moment is designed to slow you down.",
                rotating_keywords="Comfort,Calm,Connection",
                badge_text="Handpicked Boutique Stay",
            ),
        )

        PropertyInfo.objects.update_or_create(
            pk=1,
            defaults=dict(
                heading="Not Just a Room. Your Personal Escape.",
                story="Tucked away from the noise of everyday life, our homestay was built on a simple idea: "
                "hospitality should feel personal. Every room is thoughtfully designed for peaceful rest, "
                "every corner carries the warmth of local character, and every guest is treated like family. "
                "We sit minutes from the places you actually want to explore, so you spend less time "
                "travelling and more time living the experience.",
                guests_served=5000,
                guest_rating="4.9",
                years_of_hospitality=10,
                support_availability="24/7",
            ),
        )

        PropertyHighlight.objects.all().delete()
        experience_cards = [
            ("BedDouble", "Rest Well", "Comfortable rooms designed for peaceful sleep."),
            ("SunMedium", "Wake Up Refreshed", "Enjoy a calm environment and a relaxing start to your day."),
            ("Wifi", "Stay Connected", "Fast Wi-Fi and essential modern conveniences."),
            ("Heart", "Feel at Home", "Warm hospitality and personalized support throughout your stay."),
            ("Compass", "Explore Nearby", "Convenient access to local attractions and experiences."),
            ("Luggage", "Travel Without Stress", "Easy booking, direct contact and helpful assistance."),
        ]
        for i, (icon, title, desc) in enumerate(experience_cards):
            PropertyHighlight.objects.create(section="experience", icon=icon, title=title, description=desc, order=i)

        why_love_cards = [
            ("HandHeart", "Warm Hospitality", "Our team focuses on making every guest feel comfortable and welcome."),
            ("Leaf", "Peaceful Environment", "A relaxing place designed to help you slow down."),
            ("BedDouble", "Comfortable Accommodation", "Clean, well-maintained spaces with essential comforts."),
            ("MapPin", "Convenient Location", "Stay close to the experiences and destinations you want to explore."),
            ("Users", "Personal Experience", "A smaller property means more attention to every guest."),
            ("MessageCircle", "Easy Communication", "Contact us directly by WhatsApp, phone or email."),
        ]
        for i, (icon, title, desc) in enumerate(why_love_cards):
            PropertyHighlight.objects.create(section="why_love", icon=icon, title=title, description=desc, order=i)

        Amenity.objects.all().delete()
        amenities = [
            ("Wifi", "Free Wi-Fi", "High-speed internet across the property."),
            ("Snowflake", "Air Conditioning", "Climate control in every room."),
            ("Car", "Parking", "Free on-site private parking."),
            ("Coffee", "Breakfast", "Complimentary breakfast each morning."),
            ("Droplets", "Hot Water", "24-hour hot water supply."),
            ("Tv", "Television", "Smart TV with streaming access."),
            ("ConciergeBell", "Room Service", "On-call room service during the day."),
            ("Trees", "Garden", "A quiet garden to unwind in."),
            ("Zap", "Power Backup", "Uninterrupted power supply."),
            ("Sun", "Balcony", "Private balcony with a view."),
        ]
        amenity_objs = []
        for i, (icon, name, desc) in enumerate(amenities):
            a = Amenity.objects.create(icon=icon, name=name, description=desc, order=i)
            amenity_objs.append(a)

        Room.objects.all().delete()
        rooms = [
            dict(
                name="Deluxe Comfort Room",
                slug="deluxe-comfort-room",
                tagline="Comfort, space and a peaceful atmosphere.",
                description="Perfect for travellers who value comfort, space and a peaceful atmosphere. "
                "A calm retreat with everything you need for restful nights.",
                bed_type="King/Queen Bed",
                size_sqft=280,
                max_guests=2,
                price_per_night="3499.00",
                is_featured=True,
                order=0,
                amenity_idx=[0, 1, 4, 5],
            ),
            dict(
                name="Garden View Suite",
                slug="garden-view-suite",
                tagline="Wake up to green, quiet mornings.",
                description="A spacious suite overlooking the garden, ideal for guests who want extra room "
                "to relax and a little more privacy during their stay.",
                bed_type="King Bed + Sofa",
                size_sqft=340,
                max_guests=3,
                price_per_night="4599.00",
                is_featured=True,
                order=1,
                amenity_idx=[0, 1, 3, 7, 9],
            ),
            dict(
                name="Family Homestay Room",
                slug="family-homestay-room",
                tagline="Built for family time and shared memories.",
                description="A generous, warmly furnished room designed for families travelling together, "
                "with easy access to shared spaces and a homely feel.",
                bed_type="Two Queen Beds",
                size_sqft=400,
                max_guests=4,
                price_per_night="5299.00",
                is_featured=False,
                order=2,
                amenity_idx=[0, 1, 2, 3, 6],
            ),
        ]
        for r in rooms:
            idx = r.pop("amenity_idx")
            room = Room.objects.create(**r)
            room.amenities.set([amenity_objs[i] for i in idx])

        Attraction.objects.all().delete()
        attractions = [
            ("Landmark", "Discover Local Culture", "Explore nearby traditions, markets and experiences.", "Culture", "1.5 km"),
            ("Waves", "Explore Nature", "Visit beaches, hills, waterfalls or natural attractions.", "Nature", "2.5 km"),
            ("UtensilsCrossed", "Taste Local Flavours", "Discover local food and dining experiences.", "Food", "800 m"),
            ("Sparkles", "Make Every Day Different", "Explore something new during your stay.", "Experience", "Varies"),
        ]
        for i, (icon, name, desc, cat, dist) in enumerate(attractions):
            Attraction.objects.create(icon=icon, name=name, description=desc, category=cat, distance=dist, order=i)

        Testimonial.objects.all().delete()
        testimonials = [
            ("Ananya Rao", "Bengaluru, India", "Deluxe Comfort Room", 5,
             "The kind of stay that resets you. Quiet, warm and thoughtfully looked after in every detail."),
            ("James Whitfield", "London, UK", "Garden View Suite", 5,
             "Every corner felt personal. The team went out of their way to make our trip effortless."),
            ("Meera Nair", "Kochi, India", "Family Homestay Room", 5,
             "Our kids loved it as much as we did. Comfortable, spacious, and genuinely welcoming."),
            ("Daniel Cho", "Seoul, South Korea", "Deluxe Comfort Room", 4,
             "Peaceful location, excellent hospitality, and a stay we'll remember for a long time."),
        ]
        for i, (name, loc, room, rating, quote) in enumerate(testimonials):
            Testimonial.objects.create(guest_name=name, location=loc, room_stayed=room, rating=rating, quote=quote, order=i)

        StayJourneyStep.objects.all().delete()
        journey = [
            (1, "Choose Your Dates", "Select your preferred check-in and check-out dates.", "CalendarDays"),
            (2, "Tell Us Your Preferences", "Choose your room and share your travel requirements.", "ClipboardList"),
            (3, "Confirm Your Stay", "Our team confirms availability and assists with your booking.", "CheckCircle2"),
            (4, "Arrive & Relax", "Check in, settle down and enjoy your experience.", "PartyPopper"),
        ]
        for step, title, desc, icon in journey:
            StayJourneyStep.objects.create(step_number=step, title=title, description=desc, icon=icon, order=step)

        FAQ.objects.all().delete()
        faqs = [
            ("What are the check-in and check-out times?", "Check-in is from 1:00 PM and check-out is by 11:00 AM. Early check-in and late check-out can be arranged on request, subject to availability."),
            ("How do I confirm availability?", "Submit an enquiry through our booking form, WhatsApp or a phone call, and our team will confirm availability within a few hours."),
            ("Is breakfast included?", "Yes, complimentary breakfast is included with every stay."),
            ("Is parking available?", "Yes, free private on-site parking is available for all guests."),
            ("Can I contact you through WhatsApp?", "Absolutely — tap the WhatsApp button anywhere on the site for a quick response."),
            ("Are extra beds available?", "Extra beds can be arranged for most rooms on request, subject to availability and a small additional charge."),
            ("Is Wi-Fi available?", "Yes, complimentary high-speed Wi-Fi is available throughout the property."),
            ("Can I cancel my booking?", "Yes, cancellations are accepted up to 48 hours before check-in. Please contact our team directly to process a cancellation."),
        ]
        for i, (q, a) in enumerate(faqs):
            FAQ.objects.create(question=q, answer=a, order=i)

        ContactInfo.objects.update_or_create(
            pk=1,
            defaults=dict(
                phone="+91 98765 43210",
                whatsapp_number="919876543210",
                whatsapp_default_message="Hi, I would like to check room availability and pricing. Please share more details.",
                email="hello@cozyhomestay.com",
                address="123 Palm Grove Road, Coastal Town, Goa, India",
                landmark="5 minutes from the beach promenade",
            ),
        )

        BusinessHours.objects.all().delete()
        for day in ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]:
            BusinessHours.objects.create(day=day, open_time="08:00", close_time="22:00")

        GoogleMapsSettings.objects.update_or_create(
            pk=1,
            defaults=dict(
                embed_url="https://www.google.com/maps?q=Goa,India&output=embed",
                latitude="15.2993",
                longitude="74.1240",
                zoom=14,
                directions_url="https://maps.google.com/?q=Goa,India",
            ),
        )

        SocialMediaLink.objects.all().delete()
        for i, (platform, url) in enumerate(
            [("instagram", "https://instagram.com/cozyhomestay"), ("facebook", "https://facebook.com/cozyhomestay")]
        ):
            SocialMediaLink.objects.create(platform=platform, url=url, order=i)

        FeaturedVideo.objects.update_or_create(
            pk=1, defaults=dict(title="A Glimpse of Your Next Escape.")
        )

        self.stdout.write(self.style.SUCCESS("Seed data created successfully."))
