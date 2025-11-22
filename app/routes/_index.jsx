import HeroSection from "../components/HeroSection";
import ProblemSection from "../components/ProblemSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import BenefitsSection from "../components/BenefitsSection";
import MVPFeaturesSection from "../components/MVPFeaturesSection";
import CTASection from "../components/CTASection";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Problem Statement */}
      <ProblemSection />
      
      {/* Features */}
      <FeaturesSection />
      
      {/* MVP Features */}
      <MVPFeaturesSection />
      
      {/* How It Works */}
      <HowItWorksSection />
      
      {/* Benefits */}
      <BenefitsSection />
      
      {/* Call to Action */}
      <CTASection />
      <div id="faq"></div>
    </div>
  );
}