'use client';

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Testimonial } from '@/lib/types';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatedTitle } from '../ui/animated-title';

const testimonials: Testimonial[] = [
  {
    quote:
      'El letrero de neón que crearon para nuestra cafetería es simplemente espectacular. Ha transformado por completo el ambiente y nuestros clientes no paran de tomarle fotos. ¡La mejor inversión!',
    name: 'Ana García',
    role: 'Dueña, "El Rincón del Café"',
    clientImage: 'testimonial-client-1',
    companyLogo: 'testimonial-logo-1',
    type: 'business',
  },
  {
    quote:
      'Profesionalismo y creatividad de principio a fin. El equipo de NeonLed Studios capturó la esencia de nuestra marca en un diseño luminoso que ahora es el centro de atención de nuestra oficina.',
    name: 'Carlos Mendoza',
    role: 'CEO, "Innovatech Solutions"',
    clientImage: 'testimonial-client-2',
    companyLogo: 'testimonial-logo-2',
    type: 'business',
  },
  {
    quote:
      'Quería un detalle único para mi sala y el resultado superó mis expectativas. El proceso fue súper fácil y el letrero con mi frase favorita es ahora mi pieza de decoración preferida.',
    name: 'Laura Fernandez',
    role: 'Diseñadora de Interiores',
    clientImage: 'testimonial-client-3',
    type: 'personal',
  },
];

const businessTestimonials = testimonials.filter(t => t.type === 'business');

export function Testimonials() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Lo que dicen nuestros clientes
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Historias de éxito de negocios que han iluminado sus espacios con
            nosotros.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-4xl mx-auto mt-12"
        >
          <CarouselContent>
            {businessTestimonials.map((testimonial, index) => {
              const clientImage = PlaceHolderImages.find(
                (img) => img.id === testimonial.clientImage
              );
              const companyLogo = testimonial.companyLogo
                ? PlaceHolderImages.find(
                    (img) => img.id === testimonial.companyLogo
                  )
                : undefined;

              return (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1">
                    <Card className="h-full">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-foreground flex-grow">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                          <Avatar>
                            {clientImage && (
                              <AvatarImage
                                src={clientImage.imageUrl}
                                alt={`Foto de ${testimonial.name}`}
                                data-ai-hint={clientImage.imageHint}
                              />
                            )}
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                        {companyLogo && (
                          <div className="mt-4 border-t border-border pt-4 w-full flex justify-center">
                            <Image
                              src={companyLogo.imageUrl}
                              alt={`Logo de la empresa de ${testimonial.name}`}
                              data-ai-hint={companyLogo.imageHint}
                              width={100}
                              height={40}
                              className="object-contain"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
