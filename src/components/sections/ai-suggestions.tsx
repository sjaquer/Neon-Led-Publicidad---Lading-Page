'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AiDesignSuggestionsInput,
  AiDesignSuggestionsOutput,
  aiDesignSuggestions,
} from '@/ai/flows/ai-design-suggestions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Layout, Palette, Sparkles, Send } from 'lucide-react';
import { AnimatedTitle } from '../ui/animated-title';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Por favor, danos más detalles para generar mejores ideas.'),
});

// We need a way to pass the image to the contact form
declare global {
  interface Window {
    __DESIGN_IMAGE_TO_QUOTE__: string | null;
  }
}

export function AiSuggestions() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiDesignSuggestionsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<AiDesignSuggestionsInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const onSubmit: SubmitHandler<AiDesignSuggestionsInput> = async (data) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await aiDesignSuggestions(data);
      setResult(response);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Error al generar sugerencias',
        description: 'Hubo un problema con la IA. Por favor, intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteDesign = () => {
    if (result?.imageUrl) {
      // Store the image data in a global variable
      window.__DESIGN_IMAGE_TO_QUOTE__ = result.imageUrl;
      
      // Scroll to the contact form
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  const suggestionCards = result
    ? [
        {
          icon: Sparkles,
          title: 'Elementos de Diseño',
          content: result.designElements,
        },
        {
          icon: Layout,
          title: 'Sugerencias de Layout',
          content: result.layoutSuggestions,
        },
        {
          icon: Palette,
          title: 'Esquemas de Color',
          content: result.colorSchemeSuggestions,
        },
      ]
    : [];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Tu Visión, Nuestra Inspiración
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            ¿No estás seguro por dónde empezar? Describe tu idea y deja que la
            magia suceda. Nuestro agente de IA visualizará tu concepto.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="neumorphic-flat bg-transparent">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Agente de Diseño IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe tu negocio, producto o idea</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ej: Tengo una cafetería moderna para jóvenes profesionales donde vendemos café de especialidad. Quiero un letrero para la pared principal que sea acogedor, vibrante e 'instagrameable'."
                            {...field}
                            className="bg-transparent neumorphic-pressed min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    {loading ? 'Generando...' : 'Visualizar mi Idea'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {loading && (
            <div className="mt-8 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-2 text-muted-foreground">
                Nuestra IA está creando magia...
              </p>
            </div>
          )}

          {result && (
            <div className="mt-12 space-y-8">
              <h3 className="text-center font-headline text-3xl font-bold">
                ¡Aquí tienes tu concepto!
              </h3>
              <div className="grid gap-8 md:grid-cols-2 md:items-start">
                {/* Image Column */}
                <div className="flex flex-col gap-4">
                   <Card className="neumorphic-flat bg-transparent">
                     <CardContent className="p-4">
                        <div className="aspect-square relative w-full overflow-hidden rounded-lg">
                          <Image 
                              src={result.imageUrl} 
                              alt="Diseño de neón generado por IA" 
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </CardContent>
                   </Card>
                   <Button size="lg" onClick={handleQuoteDesign}>
                     <Send className="mr-2 h-4 w-4"/>
                     Cotizar este diseño
                   </Button>
                </div>

                {/* Suggestions Column */}
                <div className="space-y-6">
                  {suggestionCards.map((card, index) => (
                    <Card key={index} className="flex flex-col neumorphic-flat bg-transparent">
                      <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                        <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
                           <card.icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-lg">
                          {card.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{card.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
