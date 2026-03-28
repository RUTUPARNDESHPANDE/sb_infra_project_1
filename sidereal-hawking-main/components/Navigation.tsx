// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { NavigationSection } from '@/types';
// import { smoothScrollTo } from '@/lib/utils';
// import { useReducedMotion, easings } from '@/lib/animations';

// interface NavigationProps {
//   sections: NavigationSection[];
// }

// export default function Navigation({ sections }: NavigationProps) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [currentSection, setCurrentSection] = useState('');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const prefersReducedMotion = useReducedMotion();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);

//       // Detect current section
//       const scrollPosition = window.scrollY + 100;
//       for (const section of sections) {
//         const element = document.getElementById(section.id);
//         if (element) {
//           const { offsetTop, offsetHeight } = element;
//           if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
//             setCurrentSection(section.id);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [sections]);

//   const handleNavClick = (sectionId: string) => {
//     smoothScrollTo(sectionId);
//     setIsMobileMenuOpen(false);
//   };

//   // Animation variants for page load
//   const navVariants = {
//     initial: {
//       opacity: 0,
//       y: prefersReducedMotion ? 0 : -20,
//     },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: prefersReducedMotion ? 0.01 : 0.6,
//         ease: easings.easeOut as any,
//       },
//     },
//   };

//   const logoVariants = {
//     initial: {
//       opacity: 0,
//       x: prefersReducedMotion ? 0 : -20,
//     },
//     animate: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: prefersReducedMotion ? 0.01 : 0.6,
//         delay: prefersReducedMotion ? 0 : 0.1,
//         ease: easings.easeOut as any,
//       },
//     },
//   };

//   const menuItemsVariants = {
//     initial: {},
//     animate: {
//       transition: {
//         staggerChildren: prefersReducedMotion ? 0 : 0.08,
//         delayChildren: prefersReducedMotion ? 0 : 0.2,
//       },
//     },
//   };

//   const menuItemVariants = {
//     initial: {
//       opacity: 0,
//       y: prefersReducedMotion ? 0 : -10,
//     },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: prefersReducedMotion ? 0.01 : 0.4,
//         ease: easings.easeOut as any,
//       },
//     },
//   };

//   return (
//     <motion.nav
//       initial="initial"
//       animate="animate"
//       variants={navVariants}
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
//       }`}
//     >
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <motion.div variants={logoVariants} className="flex-shrink-0">
//             <button
//               onClick={() => handleNavClick('hero')}
//               className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
//               aria-label="SB Infra Projects Home"
//             >
//               <Image
//                 src="/logo.jpeg"
//                 alt="SB Infra Projects Logo"
//                 width={50}
//                 height={50}
//                 className="w-10 h-10 md:w-12 md:h-12 object-contain"
//                 priority
//               />
//               <h1 className="text-xl md:text-2xl font-bold text-gold">
//                 SB INFRA
//               </h1>
//             </button>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <motion.div
//             variants={menuItemsVariants}
//             className="hidden md:flex items-center space-x-8"
//           >
//             {sections.map((section) => (
//               <motion.button
//                 key={section.id}
//                 variants={menuItemVariants}
//                 onClick={() => handleNavClick(section.id)}
//                 className={`text-sm lg:text-base font-medium transition-colors duration-200 hover:text-gold ${
//                   currentSection === section.id ? 'text-gold' : 'text-white'
//                 }`}
//               >
//                 {section.label}
//               </motion.button>
//             ))}
//           </motion.div>

//           {/* Mobile Menu Button */}
//           <motion.button
//             variants={menuItemVariants}
//             className="md:hidden text-white hover:text-gold transition-colors"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {isMobileMenuOpen ? (
//                 <path d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </motion.button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden transition-all duration-300 overflow-hidden ${
//           isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
//         }`}
//       >
//         <div className="bg-black/95 backdrop-blur-md px-4 py-4 space-y-3">
//           {sections.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => handleNavClick(section.id)}
//               className={`block w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
//                 currentSection === section.id
//                   ? 'bg-gold/20 text-gold'
//                   : 'text-white hover:bg-gold/10 hover:text-gold'
//               }`}
//             >
//               {section.label}
//             </button>
//           ))}
//         </div>
//       </div>
//     </motion.nav>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { NavigationSection } from '@/types';
import { smoothScrollTo } from '@/lib/utils';
import { useReducedMotion, easings } from '@/lib/animations';
import { useRouter, usePathname } from 'next/navigation';

interface NavigationProps {
  sections: NavigationSection[];
}

export default function Navigation({ sections }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Override currentSection based on the URL so menu highlights the active Next.js page correctly
    if (pathname === '/about') {
      setCurrentSection('about');
    } else if (pathname === '/contact') {
      setCurrentSection('contact');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only calculate scroll-based active sections when on the home page
      if (pathname === '/') {
        const scrollPosition = window.scrollY + 100;
        let found = false;
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setCurrentSection(section.id);
              found = true;
              break;
            }
          }
        }
        if (!found && window.scrollY < 300) {
          setCurrentSection('hero');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on mount to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, pathname]);

  const handleNavClick = (section: NavigationSection) => {
    setIsMobileMenuOpen(false);

    // If it's the current page and it's a hash link, scroll to it
    if (section.href.startsWith('/#') && pathname === '/') {
      smoothScrollTo(section.id);
    } else if (section.href.startsWith('/#') && pathname !== '/') {
      router.push(section.href);
    } else if (section.href === '/' && pathname === '/') {
      smoothScrollTo('hero');
    } else {
      router.push(section.href);
    }
  };

  const navVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: easings.easeOut as any,
      },
    },
  };

  const menuItemVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : -10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.4,
        ease: easings.easeOut as any,
      },
    },
  };

  return (
    <>
      {/* ✅ WAVE ANIMATION CSS */}
      <style jsx global>{`
        .menu {
          display: flex;
          align-items: center;
          list-style: none;
        }

        .nav-li {
          width: 125px;
          height: 50px;
          text-align: center;
          transition: background-position-x 0.9s linear;
        }

        .nav-li a {
          font-size: 16px;
          color: white;
          text-decoration: none;
          transition: all 0.45s;
          line-height: 50px;
          display: block;
          cursor: pointer;
        }

        /* 🔥 WAVE EFFECT */
        .nav-li:hover {
          background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMzkwIiBoZWlnaHQ9IjUwIj48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNkOTRmNWMiIHN0cm9rZS13aWR0aD0iMS41IiBkPSJNMCw0Ny41ODVjMCwwLDk3LjUsMCwxMzAsMGMxMy43NSwwLDI4Ljc0LTM4Ljc3OCw0Ni4xNjgtMTkuNDE2QzE5Mi42NjksNDYuNSwyNDMuNjAzLDQ3LjU4NSwyNjAsNDcuNTg1YzMxLjgyMSwwLDEzMCwwLDEzMCwwIi8+PC9zdmc+");
          animation: line 1s;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .nav-li:hover a {
          color: #d94f5c;
        }

        .nav-li:not(:last-child) {
          margin-right: 30px;
        }

        @keyframes line {
          0% {
            background-position-x: 390px;
          }
        }
      `}</style>

      <motion.nav
        initial="initial"
        animate="animate"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-black/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => handleNavClick({ id: 'hero', label: 'Home', href: '/' })}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/logo-sb.png"
                  alt="SB Infra Projects Logo"
                  width={60}
                  height={60}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  priority
                />
                <h1 className="text-xl md:text-2xl font-bold text-yellow-400 tracking-wide">
                  INFRA PROJECTS
                </h1>
              </button>
            </div>

            {/* ✅ DESKTOP NAV WITH WAVE */}
            <div className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  onClick={() => handleNavClick(section)}
                  className="relative cursor-pointer group"
                >
                  {/* TEXT */}
                  <span
                    className={`text-sm lg:text-base font-medium transition-colors duration-300 ${currentSection === section.id
                        ? 'text-yellow-400'
                        : 'text-white group-hover:text-yellow-400'
                      }`}
                  >
                    {section.label}
                  </span>

                  {/* 🔥 WAVE */}
                  <svg
                    viewBox="0 0 390 50"
                    className="absolute left-0 -bottom-4 w-full h-[20px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <path
                      d="M0,47.585c0,0,97.5,0,130,0
             c13.75,0,28.74-38.778,46.168-19.416
             C192.669,46.5,243.603,47.585,260,47.585
             c31.821,0,130,0,130,0"
                      fill="none"
                      stroke="#d94f5c"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              ))}
            </div>
            {/* Mobile Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
            }`}
        >
          <div className="bg-black/95 px-4 py-4 space-y-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section)}
                className="block w-full text-left px-4 py-2 text-white hover:text-yellow-400"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}