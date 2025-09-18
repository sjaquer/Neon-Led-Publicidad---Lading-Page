import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full">
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
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block drop-shadow-[0_0_8px_hsl(var(--primary))]">
            Convierte tu idea
          </span>
          <span className="block text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
            en un increíble letrero de neón
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-gray-200 sm:max-w-xl md:text-xl">
          Materializamos tus ideas con diseños personalizados que transforman tus
          espacios con estilo y personalidad.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" variant="secondary">
            <Link href="#contact-form">Cotiza tu diseño</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
