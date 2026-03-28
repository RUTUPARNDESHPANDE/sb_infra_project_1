'use client';

import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import BuildingProcess from '@/components/BuildingProcess';
import PageLoadAnimator from '@/components/PageLoadAnimator';
import MagneticButton from '@/components/ui/MagneticButton';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen">
      {/* Page load animation sequence - animates sections top to bottom with natural easing */}
      <PageLoadAnimator delay={0.2} staggerDelay={0.15}>
        {/* Hero Section with 3D Scene */}
        <PageLoadAnimator.Item>
          <HeroSection />
        </PageLoadAnimator.Item>

        {/* Services Section */}
        <PageLoadAnimator.Item>
          <ServicesSection />
        </PageLoadAnimator.Item>

        {/* Building Process Section */}
        <PageLoadAnimator.Item>
          <BuildingProcess />
        </PageLoadAnimator.Item>

        {/* View Portfolio & About CTA */}
        <PageLoadAnimator.Item>
          <section className="py-20 bg-black flex flex-col sm:flex-row justify-center items-center gap-6 px-4">
            <MagneticButton
              onClick={() => router.push('/about')}
              className="px-8 py-4 bg-gold text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] shadow-lg text-lg sm:text-xl w-full sm:w-auto border-none"
            >
              Know More About Us
            </MagneticButton>

            <MagneticButton
              onClick={() => router.push('/about#builder-portfolio')}
              className="px-8 py-4 bg-transparent border-2 border-gold text-gold font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-black shadow-lg text-lg sm:text-xl w-full sm:w-auto"
            >
              View Portfolio
            </MagneticButton>
          </section>
        </PageLoadAnimator.Item>
      </PageLoadAnimator>
    </div>
  );
}
