import {
  Sparkles,
  Palette,
  ShieldCheck,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
  return (
    <section id="why-choose-us" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Estamos comprometidos con la calidad, la innovación y la satisfacción
            de nuestros clientes.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center transition-all duration-300 hover:bg-card/80 hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary drop-shadow-[0_0_4px_hsl(var(--primary))]" />
                </div>
                <CardTitle className="font-headline text-xl">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
