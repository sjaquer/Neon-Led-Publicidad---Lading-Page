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
    <div className="flex flex-col">
      <HeroSection />
      <WhyChooseUs />
      <DesignShowcase />
      <PurchaseProcess />
      <AiSuggestions />
      <Testimonials />
      <SocialFeed />
      <Faq />
      <ContactFormSection />
    </div>
  );
}
