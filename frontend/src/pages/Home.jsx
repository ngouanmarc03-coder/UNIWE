import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";
import HeroCarousel from "../components/home/HeroCarousel.jsx";
import AxesBand from "../components/home/AxesBand.jsx";
import ActivityGallery from "../components/home/ActivityGallery.jsx";
import AboutSection from "../components/home/AboutSection.jsx";
import ServicesAxes from "../components/home/ServicesAxes.jsx";
import StepsTimeline from "../components/home/StepsTimeline.jsx";
import HowItWorksTeaser from "../components/home/HowItWorksTeaser.jsx";
import LocationsMap from "../components/home/LocationsMap.jsx";
import ReviewsSection from "../components/home/ReviewsSection.jsx";
import FaqSection from "../components/home/FaqSection.jsx";
import WhatsAppCommunityBanner from "../components/home/WhatsAppCommunityBanner.jsx";

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    settings: null,
    heroes: [],
    gallery: [],
    posts: [],
    locations: [],
    reviews: [],
    sponsors: [],
    faqs: [],
  });

  const load = useCallback(async () => {
    const [settings, heroes, gallery, posts, locations, reviews, sponsors, faqs] = await Promise.all([
      api.get("/settings").then((r) => r.data),
      api.get("/heroes").then((r) => r.data),
      api.get("/gallery").then((r) => r.data),
      api.get("/posts").then((r) => r.data),
      api.get("/locations").then((r) => r.data),
      api.get("/reviews").then((r) => r.data),
      api.get("/sponsors").then((r) => r.data),
      api.get("/faqs").then((r) => r.data),
    ]);
    setData({ settings, heroes, gallery, posts, locations, reviews, sponsors, faqs });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen">
      <Navbar logoUrl={data.settings?.logoUrl} siteName={data.settings?.siteName} />
      <HeroCarousel
        slides={data.heroes}
        onQuoteClick={() => navigate("/devis")}
      />
      <AxesBand className="md:hidden" />
      <ActivityGallery items={data.gallery} />
      <AboutSection />
      <ServicesAxes />
      <StepsTimeline />
      <HowItWorksTeaser posts={data.posts} />
      <LocationsMap locations={data.locations} />
      <FaqSection faqs={data.faqs} />
      <WhatsAppCommunityBanner link={data.settings?.whatsappCommunityLink} />
      <ReviewsSection reviews={data.reviews} onSubmitted={load} />
      <Footer settings={data.settings} sponsors={data.sponsors} />
    </div>
  );
}
