import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';
import { AnimatedTitle } from '../ui/animated-title';

const socialImages = PlaceHolderImages.filter((img) =>
  img.id.startsWith('social-')
);

export function SocialFeed() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Sigue nuestra inspiración
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Descubre nuestros últimos proyectos y diseños en Instagram.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {socialImages.map((image) => (
            <Link
              key={image.id}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Instagram className="h-10 w-10 text-white" />
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-5 w-5" />
              Síguenos en Instagram
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
