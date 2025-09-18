import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

const socialImages = PlaceHolderImages.filter((img) =>
  img.id.startsWith('social-')
);

export function SocialFeed() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Sigue nuestra inspiración
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Descubre nuestros últimos proyectos y diseños en Instagram.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {socialImages.map((image) => (
            <Link key={image.id} href="#" target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-lg">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  width={500}
                  height={500}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Instagram className="h-10 w-10 text-white" />
                </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="secondary">
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
