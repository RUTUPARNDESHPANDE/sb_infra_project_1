'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    // Handle scroll on route change (both page transitions and hash links)
    useEffect(() => {
        if (lenisRef.current) {
            // Check if there is a hash in the URL
            const hash = window.location.hash;
            if (hash) {
                // Wait briefly for DOM to be ready if navigating to a new page
                setTimeout(() => {
                    const el = document.querySelector(hash) as HTMLElement;
                    if (el && lenisRef.current) {
                        lenisRef.current.scrollTo(el, { immediate: true });
                    }
                }, 100);
            } else {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
        }
    }, [pathname]);

    return <>{children}</>;
}
