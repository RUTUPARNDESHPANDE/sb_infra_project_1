'use client';

import { useRef } from 'react';
import AnimatedCounter from '@/components/AnimatedCounter';
import ParticleBackground from '@/components/ParticleBackground';
import { getContainerPaddingClasses, getSectionSpacingClasses } from '@/lib/breakpoints';
import RevealText from '@/components/ui/RevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from '@/components/ui/MagneticWrapper';
import MagneticButton from '@/components/ui/MagneticButton';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const stats = [
    { value: 500, suffix: '+', label: 'Projects Completed', delay: 0 },
    { value: 15, suffix: '+', label: 'Years of Experience', delay: 200 },
    { value: 100, suffix: '%', label: 'Client Satisfaction', delay: 400 },
    { value: 50, suffix: '+', label: 'Expert Team Members', delay: 600 },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description:
        'To deliver precision-built spaces with transparent processes and uncompromised engineering quality, while constantly innovating to push the boundaries of what is possible in modern construction. Every project is a testament to our dedication to excellence and sustainability.',
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description:
        'To redefine construction with disciplined execution, ethical practices, and long-term structural reliability. We aim to be the most trusted name in luxury construction, inspiring communities through iconic and resilient infrastructure that enriches lives.',
    },
    {
      icon: '⭐',
      title: 'Specialties',
      description:
        'Luxury Homes, Commercial Complexes, Industrial Facilities, Renovation & Remodeling, Turnkey Civil Works, Sustainable Green Building, and Smart Home Integrations. We blend cutting-edge technology with timeless craftsmanship to deliver unmatched quality in every niche.',
    },
  ];

  return (
    <main
      ref={sectionRef}
      className={`min-h-screen bg-[#FAFAFA] text-[#1A1A1A] relative overflow-hidden pt-24 ${getSectionSpacingClasses()}`}
    >
      {/* Particle Background */}
      <ParticleBackground count={40} color="#D4AF37" maxSize={2} speed={0.3} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_24%,#D4AF37_25%,#D4AF37_26%,transparent_27%,transparent_74%,#D4AF37_75%,#D4AF37_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className={`container mx-auto relative z-10 ${getContainerPaddingClasses()}`}>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-8">
            <RevealText tag="span" className="text-gold text-sm md:text-base tracking-[0.4em] font-bold uppercase">
              WHO WE ARE
            </RevealText>
          </div>
          <RevealText tag="h1" delay={0.2} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight max-w-5xl mx-auto px-4 tracking-tight">
            We are the <span className="font-serif italic text-gold">architects of permanence</span>. In a world of fleeting trends, we build spaces that stand the test of time.
          </RevealText>
          <div className="mt-12 max-w-4xl mx-auto">
            <RevealText tag="p" delay={0.4} className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
              SB Infra Projects bridges the gap between raw engineering reliability and exquisite luxury design.
            </RevealText>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          {values.map((item, index) => (
            <MagneticWrapper key={index} className="h-full">
              <div className="bg-white p-8 md:p-10 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:border-gold/50 transition-colors duration-500 group h-full">
                <div className="text-4xl mb-6 text-gold">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </MagneticWrapper>
          ))}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 sm:p-8 bg-gradient-to-br from-black to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-white font-bold group-hover:text-gold transition-colors duration-300">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
              </div>
              <div className="text-gray-300 mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Builder Profile Section */}
        <div id="builder-portfolio" className="mb-20 md:mb-28 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12 border border-black/5 relative overflow-hidden">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <RevealText tag="h2" className="text-3xl md:text-4xl font-light text-black tracking-tight">
                Meet the <span className="font-serif italic text-gold">Builder</span>
              </RevealText>
              <RevealText tag="p" delay={0.2} className="text-lg text-gray-600 leading-relaxed font-light">
                With over two decades of uncompromising dedication to structural excellence, our lead builder has redefined the skyline of luxury real estate. From early days as a hands-on civil engineer to orchestrating massive commercial complexes, their vision remains singular: building spaces that don't just stand, but inspire.
              </RevealText>
              <ul className="space-y-4 text-gray-700 mt-6 font-light">
                <li className="flex items-center gap-4"><span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm">✓</span> Lead Architect of 50+ Premium Villas</li>
                <li className="flex items-center gap-4"><span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm">✓</span> Pioneer in Sustainable Luxury Structures</li>
                <li className="flex items-center gap-4"><span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm">✓</span> Recognized for 100% On-Time Delivery</li>
              </ul>
            </div>
            <div className="w-full md:w-5/12 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                  alt="Lead Builder"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-20 px-4">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-6 md:mb-8 max-w-2xl mx-auto">
            Ready to start your construction project with a trusted partner?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <MagneticButton
              onClick={() => router.push('/contact')}
              className="px-8 sm:px-10 py-4 sm:py-5 bg-gold text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/50 text-base sm:text-lg border-none w-full sm:w-auto"
            >
              Let's Build Together
            </MagneticButton>
            {/* <MagneticButton
              onClick={() => {
                const el = document.getElementById('builder-portfolio');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-gold text-gold font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-black shadow-lg text-base sm:text-lg w-full sm:w-auto"
            >
              View Portfolio
            </MagneticButton> */}
          </div>
        </div>
      </div>
    </main>
  );
}
