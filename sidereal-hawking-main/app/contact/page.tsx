'use client';

import { useEffect, useRef, useState } from 'react';
import ContactForm from '@/components/ContactForm';
import GeometricPattern from '@/components/GeometricPattern';
import ParticleBackground from '@/components/ParticleBackground';
import RevealText from '@/components/ui/RevealText';
import { getContainerPaddingClasses, getSectionSpacingClasses } from '@/lib/breakpoints';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // We can just set visible on mount for a page, 
    // but using IntersectionObserver keeps the original animation style.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'sbinfraprojects40@gmail.com',
      link: 'mailto:sbinfraprojects40@gmail.com',
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+91 7483195709',
      link: 'tel:+917483195709',
    },
    {
      icon: '📍',
      title: 'Address',
      value: 'Shree Homes, #6 Laxminarayana Layout, Marathahalli, Bengaluru, Karnataka 560037',
      link: null,
    },
  ];

  return (
    <main
      ref={sectionRef}
      className={`min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden pt-24 ${getSectionSpacingClasses()}`}
    >
      {/* Particle Background - Same as About Page top design */}
      <ParticleBackground count={30} color="#D4AF37" maxSize={2} speed={0.3} />

      {/* Geometric Pattern */}
      <GeometricPattern variant="diamond" opacity={0.08} color="#D4AF37" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#D4AF37_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      </div>

      <div className={`container mx-auto relative z-10 ${getContainerPaddingClasses()}`}>
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <RevealText tag="span" className="text-gold text-xs sm:text-sm md:text-base tracking-[0.4em] font-bold uppercase mb-6 inline-block">
            CONNECT WITH US
          </RevealText>
          <RevealText tag="h1" delay={0.1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-8 tracking-tight">
            Get In <span className="font-serif italic text-gold">Touch</span>
          </RevealText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-10 opacity-70"></div>
          <RevealText tag="p" delay={0.3} className="text-lg sm:text-xl font-light text-gray-400 max-w-2xl mx-auto px-4 leading-relaxed">
            Ready to start your premium construction project? Contact our structural experts today for a bespoke consultation.
          </RevealText>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
          >
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Build Something Amazing</h2>
              <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
                We create durable, well-engineered structures with predictable timelines and transparent costing.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-gray-900 p-6 sm:p-8 rounded-xl border border-gray-800 hover:border-gold transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-400 mb-2">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-base sm:text-lg text-white hover:text-gold transition-colors duration-300 break-words"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-base sm:text-lg text-white break-words">{info.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-gold">Business Hours</h3>
              <div className="space-y-3 text-gray-300 text-base sm:text-lg">
                <div className="flex justify-between gap-4">
                  <span>Mon–Fri:</span>
                  <span className="font-semibold text-right">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Saturday:</span>
                  <span className="font-semibold text-right">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Sunday:</span>
                  <span className="font-semibold text-right">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
          >
            <div className="bg-gray-900 p-8 sm:p-10 rounded-2xl border border-gray-800 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Additional CTA */}
        <div
          className={`text-center mt-16 md:mt-24 px-4 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-4">
            Prefer to talk? Give us a call at{' '}
            <a href="tel:+91 7483195709" className="text-gold hover:underline font-semibold">
              +91 7483195709
            </a>
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            We typically respond to inquiries within 24 hours
          </p>
        </div>
      </div>
    </main>
  );
}
