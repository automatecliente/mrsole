import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialSection from '@/components/home/TestimonialSection';
import DifferentialsSection from '@/components/home/DifferentialsSection';
import OccasionSection from '@/components/home/OccasionSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <HowItWorks />
      <DifferentialsSection />
      <OccasionSection />
      <TestimonialSection />
      <FinalCTA />
    </>
  );
}
