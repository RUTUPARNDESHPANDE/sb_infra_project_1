'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './ui/RevealText';
import MagneticButton from './ui/MagneticButton';
import HeroCarousel from './HeroCarousel';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax for Background (slower)
      gsap.to(bgRef.current, {
        yPercent: 30, // Moves down slightly
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Parallax for Content (faster/opacity fade)
      gsap.to(contentRef.current, {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion]);

  if (!mounted) {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="text-gold text-xl animate-pulse">Loading...</div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Carousel Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        <HeroCarousel />
      </div>

      {/* Background Dimming for enhanced readability and blending */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* Structured Gradient Overlay - Similar to the user request for opacity matching */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/90 z-10 pointer-events-none" />

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-4 text-center mt-12"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Company Logo/Name */}
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white/95 tracking-tighter leading-none mb-4 drop-shadow-2xl">
              <RevealText delay={0.2} tag="span" className="inline-block">SB INFRA</RevealText>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold tracking-tighter leading-none -mt-2 sm:-mt-4 drop-shadow-xl">
              <RevealText delay={0.5} tag="span" className="inline-block text-gold/90">PROJECTS</RevealText>
            </h1>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden">
            <RevealText delay={0.7} tag="p" className="text-2xl sm:text-3xl md:text-4xl text-white font-bold tracking-wide mb-6 drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] [text-shadow:0_2px_10px_rgba(0,0,0,1)]">
              Build with confidence
            </RevealText>
            <RevealText delay={0.8} tag="p" className="text-sm sm:text-base md:text-xl text-white font-medium tracking-wide drop-shadow-md">
              Premium residential & commercial construction delivered with transparent execution and engineered precision.
            </RevealText>
            <RevealText delay={1.0} tag="p" className="mt-4 text-xs sm:text-sm md:text-base text-gold font-bold tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
              Trusted • Quality-Driven • On-Time Delivery
            </RevealText>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <MagneticButton
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              wrapperClassName="w-full sm:w-auto"
              className="px-8 py-4 bg-gold text-black font-bold rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] w-full sm:w-auto border-none"
            >
              Get Started
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              wrapperClassName="w-full sm:w-auto"
              className="px-8 py-4 border border-white/20 bg-transparent backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 w-full sm:w-auto"
            >
              View Projects
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-white/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
