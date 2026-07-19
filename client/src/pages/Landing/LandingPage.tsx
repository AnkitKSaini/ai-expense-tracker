import LandingNavbar from "./components/Navbar/LandingNavbar";
import Hero from "./components/Hero/Hero";
import Statistics from "./components/Statistics";
import DashboardShowcase from "./components/dashboard";
import Features from "./components/Features/Features";
import PricingSection from "./components/pricing/PricingSection";
import Testimonials from "./components/Testimonials/Testimonials";
import FAQ from "./components/FAQS/FAQ";
import CTA from "./components/CTA/CTA";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Footer from "./components/Footer/Footer";
import { SecuritySection } from "./components/security";


function LandingPage() {
  return (
    <div>
      <LandingNavbar />

      <Hero />

      <Statistics />

      <DashboardShowcase />

      <SecuritySection />

      <Features />

       <PricingSection />

      <WhyChoose />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </div>
  );
}

export default LandingPage;
