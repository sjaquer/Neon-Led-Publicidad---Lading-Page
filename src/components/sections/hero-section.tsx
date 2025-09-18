import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full flex items-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          <h1 className="font-headline text-5xl font-extrabold uppercase tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-7xl">
            <span className="block drop-shadow-[0_0_8px_hsl(var(--primary))]">
              Transforma tu negocio
            </span>
            <span className="block text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
              con letreros de neón impactantes
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-gray-200 md:text-xl">
            Creamos soluciones visuales personalizadas que elevan tu marca y
            atraen más clientes.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="group">
              <Link href="#contact-form">
                Cotiza tu proyecto
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
