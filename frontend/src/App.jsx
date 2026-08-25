import { useEffect, useState } from "react";
import { Amenities } from "./components/Amenities";
import { Booking } from "./components/Booking";
import { CinematicVideo } from "./components/CinematicVideo";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { FloatingButtons } from "./components/FloatingButtons";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { LoadingScreen } from "./components/LoadingScreen";
import { Location } from "./components/Location";
import { Navbar } from "./components/Navbar";
import { NearbyExperiences } from "./components/NearbyExperiences";
import { PropertyExperience } from "./components/PropertyExperience";
import { Rooms } from "./components/Rooms";
import { StayJourney } from "./components/StayJourney";
import { Testimonials } from "./components/Testimonials";
import { Welcome } from "./components/Welcome";
import { WhyLove } from "./components/WhyLove";
import { useContent } from "./hooks/useContent";

export default function App() {
  const { content, loading } = useContent();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setShowLoader(false), 600);
      return () => clearTimeout(t);
    }
  }, [loading]);

  useEffect(() => {
    if (content.seo?.meta_title) document.title = content.seo.meta_title;
  }, [content.seo]);

  return (
    <>
      <LoadingScreen visible={showLoader} siteName={content.settings.site_name} />
      <Navbar siteName={content.settings.site_name} logo={content.settings.logo} />
      <main>
        <Hero hero={content.hero} contact={content.contact} />
        <Welcome property={content.property} />
        <PropertyExperience highlights={content.property.highlights} />
        <Rooms rooms={content.rooms} currency={content.settings.currency_symbol} contact={content.contact} />
        <WhyLove items={content.property.why_love} />
        <StayJourney steps={content.journey} />
        <CinematicVideo video={content.video} />
        <Amenities amenities={content.amenities} />
        <Booking rooms={content.rooms} />
        <Location contact={content.contact} maps={content.maps} businessHours={content.business_hours} />
        <NearbyExperiences attractions={content.attractions} />
        <Testimonials testimonials={content.testimonials} />
        <FAQ faqs={content.faqs} />
        <Contact contact={content.contact} businessHours={content.business_hours} />
      </main>
      <Footer settings={content.settings} contact={content.contact} social={content.social} />
      <FloatingButtons contact={content.contact} />
    </>
  );
}
