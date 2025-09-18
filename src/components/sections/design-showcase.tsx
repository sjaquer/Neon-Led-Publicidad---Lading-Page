'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { AnimatedTitle } from '../ui/animated-title';

const businessImages = PlaceHolderImages.filter((img) =>
  img.id.startsWith('showcase-business')
);

export function DesignShowcase() {
  const renderGallery = (images: typeof businessImages) => (
    <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="mb-4 break-inside-avoid overflow-hidden rounded-lg group"
        >
          <div className="relative">
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              width={600}
              height={index % 2 === 0 ? 800 : 600}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            <button
              aria-label="Me gusta este diseño"
              className="absolute top-2 right-2 p-2 bg-black/30 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground focus:opacity-100"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="design-showcase" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Galería de Proyectos Comerciales
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Inspírate con nuestros proyectos para negocios que buscan destacar y
            crear ambientes únicos.
          </p>
        </div>
        <div className="mt-12">{renderGallery(businessImages)}</div>
      </div>
    </section>
  );
}
