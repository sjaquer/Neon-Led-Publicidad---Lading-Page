import { HeroSection } from '@/components/sections/hero-section';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { DesignShowcase } from '@/components/sections/design-showcase';
import { PurchaseProcess } from '@/components/sections/purchase-process';
import { AiSuggestions } from '@/components/sections/ai-suggestions';
import { Testimonials } from '@/components/sections/testimonials';
import { SocialFeed } from '@/components/sections/social-feed';
import { Faq } from '@/components/sections/faq';
import { ContactFormSection } from '@/components/sections/contact-form-section';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <div className="bg-background">
        <WhyChooseUs />
      </div>
      <div className="bg-card">
        <DesignShowcase />
      </div>
      <div className="bg-background">
        <PurchaseProcess />
      </div>
      <div className="bg-card">
        <AiSuggestions />
      </div>
      <div className="bg-background">
        <Testimonials />
      </div>
      <div className="bg-card">
        <SocialFeed />
      </div>
      <div className="bg-background">
        <Faq />
      </div>
      <div className="bg-card">
        <ContactFormSection />
      </div>
    </div>
  );
}
