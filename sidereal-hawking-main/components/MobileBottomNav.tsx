/**
 * Mobile Bottom Navigation Component
 * 
 * Provides thumb-friendly navigation at the bottom of the screen on mobile devices.
 * Ensures all touch targets meet the 44px minimum requirement.
 * 
 * Requirements: 8.5, 27.2, 27.5
 */

'use client';

import { useState, useEffect } from 'react';
import { NavigationSection } from '@/types';
import { smoothScrollTo } from '@/lib/utils';
import { useIsMobile } from '@/lib/breakpoints';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/lib/animations';
import { useRouter, usePathname } from 'next/navigation';

interface MobileBottomNavProps {
  sections: NavigationSection[];
}

export default function MobileBottomNav({ sections }: MobileBottomNavProps) {
  const [currentSection, setCurrentSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show bottom nav after scrolling past hero section
      setIsVisible(window.scrollY > 300);

      // Detect current section
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleNavClick = (sectionId: string, href?: string) => {
    if (sectionId === 'whatsapp') {
      const phoneNumber = '1234567890';
      const message = 'Hello! I am interested in your construction projects.';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    
    if (href) {
      if (href.startsWith('/#') && pathname === '/') {
        smoothScrollTo(sectionId);
      } else if (href.startsWith('/#') && pathname !== '/') {
        router.push(href);
      } else if (href === '/' && pathname === '/') {
        smoothScrollTo('hero');
      } else {
        router.push(href);
      }
    } else {
      smoothScrollTo(sectionId);
    }
  };

  // Only show on mobile devices
  if (!isMobile) {
    return null;
  }

  // Navigation items optimized for mobile
  const mobileNavItems = [
    { id: 'hero', label: 'Home', icon: '🏠', href: '/' },
    { id: 'services', label: 'Services', icon: '⚙️', href: '/#services' },
    { id: 'process', label: 'Process', icon: '📋', href: '/#process' },
    { id: 'about', label: 'About', icon: '🏢', href: '/about' },
    { id: 'contact', label: 'Contact', icon: '📞', href: '/contact' },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current text-[#25D366]">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      )
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: prefersReducedMotion ? 0 : 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: prefersReducedMotion ? 0 : 100, opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-gold/20 shadow-lg shadow-gold/10"
          style={{
            // Ensure it's above iOS Safari's bottom bar
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex items-center justify-around px-2 py-2">
            {mobileNavItems.map((item) => {
              const isActive = currentSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 rounded-lg ${
                    isActive ? 'text-gold' : 'text-gray-400'
                  }`}
                  style={{
                    // Ensure minimum 44x44px touch target
                    minWidth: '44px',
                    minHeight: '44px',
                    padding: '8px 12px',
                    // Prevent tap highlight
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    userSelect: 'none',
                  }}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Icon */}
                  <span
                    className={`text-xl transition-transform duration-200 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  >
                    {item.icon}
                  </span>
                  
                  {/* Label */}
                  <span
                    className={`text-xs font-medium transition-all duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-70'
                    }`}
                  >
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold rounded-full"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
