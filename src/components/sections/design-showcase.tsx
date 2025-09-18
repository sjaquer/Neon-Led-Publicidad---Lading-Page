'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const businessImages = PlaceHolderImages.filter((img) =>
  img.id.startsWith('showcase-business')
);
const personalImages = PlaceHolderImages.filter((img) =>
  img.id.startsWith('showcase-personal')
);

export function DesignShowcase() {
  const renderGallery = (images: typeof businessImages) => (
    <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
      {images.map((image, index) => (
        <Card
          key={image.id}
          className="mb-4 break-inside-avoid overflow-hidden group"
        >
          <CardContent className="p-0 relative">
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              width={600}
              height={index % 2 === 0 ? 800 : 600}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <button
              aria-label="Me gusta este diseño"
              className="absolute top-2 right-2 p-2 bg-black/30 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:text-accent-foreground"
            >
              <Heart className="w-5 h-5" />
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Galería de Diseños Personalizados
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Inspírate con nuestros proyectos. Desde negocios que buscan
            destacar hasta hogares con un toque único.
          </p>
        </div>
        <Tabs defaultValue="business" className="mt-12">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="business">Para Negocios</TabsTrigger>
            <TabsTrigger value="personal">Para el Hogar</TabsTrigger>
          </TabsList>
          <TabsContent value="business" className="mt-8">
            {renderGallery(businessImages)}
          </TabsContent>
          <TabsContent value="personal" className="mt-8">
            {renderGallery(personalImages)}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
