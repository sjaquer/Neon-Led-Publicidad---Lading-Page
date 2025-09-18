'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Loader2, Wand2, Layout, Palette, Tags } from 'lucide-react';
import { AnimatedTitle } from '../ui/animated-title';

const formSchema = z.object({
  prompt: z
    .string()
    .min(10, 'Por favor, danos más detalles para generar mejores ideas.'),
});

export function AiSuggestions() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiDesignSuggestionsOutput | null>(null);

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
      // Here you could use a toast to show an error message
    } finally {
      setLoading(false);
    }
  };

  const suggestionCards = result
    ? [
        {
          icon: Wand2,
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
        {
          icon: Tags,
          title: 'Palabras Clave SEO',
          content: result.seoKeywords,
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
            magia suceda. Te daremos conceptos de diseño personalizados.
          </p>
        </div>
        <div className="mt-12 max-w-2xl mx-auto">
          <Card className="neumorphic-flat bg-transparent">
            <CardHeader>
              <CardTitle className="font-headline text-xl">
                Generador de Ideas
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
                    {loading ? 'Generando...' : 'Generar Sugerencias'}
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
            <div className="mt-12 space-y-6">
              <h3 className="text-center font-headline text-2xl font-bold">
                ¡Aquí tienes tus sugerencias!
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {suggestionCards.map((card, index) => (
                  <Card key={index} className="flex flex-col neumorphic-flat bg-transparent">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                      <card.icon className="w-8 h-8 text-primary" />
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
          )}
        </div>
      </div>
    </section>
  );
}
