'use client';

import { useState } from 'react';
import {
  Sparkles,
  Palette,
  ShieldCheck,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnimatedTitle } from '../ui/animated-title';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Sparkles,
    title: 'Tecnología de Punta',
    description:
      'Utilizamos la última tecnología LED para asegurar un brillo superior y una mayor eficiencia energética.',
  },
  {
    icon: Palette,
    title: 'Diseño Personalizado',
    description:
      'Cada letrero es una obra de arte. Trabajamos contigo para crear un diseño único que refleje tu visión.',
  },
  {
    icon: Truck,
    title: 'Envío Seguro',
    description:
      'Empaquetamos y enviamos tus pedidos con el máximo cuidado para que lleguen en perfectas condiciones.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía de Calidad',
    description:
      'Nuestros productos pasan por rigurosos controles de calidad para garantizar su durabilidad y rendimiento.',
  },
  {
    icon: MessageCircle,
    title: 'Servicio al Cliente',
    description:
      'Nuestro equipo está siempre disponible para ayudarte en cada paso del proceso, desde la idea hasta la instalación.',
  },
];

export function WhyChooseUs() {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <section id="why-choose-us" className="py-16 sm:py-24 aurora-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl content-wrapper">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl text-glow"
          >
            ¿Por qué elegirnos?
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Estamos comprometidos con la calidad, la innovación y la satisfacción
            de nuestros clientes.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Feature List */}
          <div className="flex flex-col gap-4">
            {features.map((feature) => (
              <button
                key={feature.title}
                onClick={() => setSelectedFeature(feature)}
                className={cn(
                  'p-4 rounded-lg text-left transition-all duration-300 neumorphic-flat',
                  selectedFeature.title === feature.title
                    ? 'neumorphic-pressed bg-primary/10'
                    : 'hover:bg-primary/5 hover:-translate-y-1'
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-colors',
                      selectedFeature.title === feature.title && 'bg-primary/20'
                    )}
                  >
                    <feature.icon className="h-5 w-5 text-primary text-glow" />
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-glow">
                    {feature.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>

          {/* Right Column: Feature Display */}
          <div className="relative h-80 neumorphic-flat rounded-lg p-8 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
                  <selectedFeature.icon className="h-10 w-10 text-primary text-glow" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-glow mb-4">
                  {selectedFeature.title}
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {selectedFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
