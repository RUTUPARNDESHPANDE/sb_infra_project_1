'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const carouselImages = [
  {
    src: '/images/collage_1.png',
    alt: 'Construction collage with structural building and architectural mapping',
  },
  {
    src: '/images/collage_2.png',
    alt: 'Premium commercial and luxury residential construction collage',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop',
    alt: 'Luxury Hall',
  },
  {
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop',
    alt: 'Luxury Kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1617806118233-18e1c667e411?q=80&w=2000&auto=format&fit=crop',
    alt: 'Luxury Dining Area',
  },
  {
    src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000&auto=format&fit=crop',
    alt: 'Luxury Balcony View',
  },
  {
    src: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=2000&auto=format&fit=crop',
    alt: 'Luxury Home Office',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className="object-cover object-center sm:object-center"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            quality={90}
          />
        </div>
      ))}
    </div>
  );
}
