import { FileText, Pencil, Factory, Rocket } from 'lucide-react';
import { Card } from '@/components/ui/card';

const processSteps = [
  {
    step: 1,
    icon: FileText,
    title: 'Cotiza tu idea',
    description: 'Envíanos tu idea, logo o inspiración. Te daremos un presupuesto en menos de 24 horas.',
  },
  {
    step: 2,
    icon: Pencil,
    title: 'Aprueba el diseño',
    description: 'Nuestro equipo de diseño creará una propuesta visual para que la revises y apruebes.',
  },
  {
    step: 3,
    icon: Factory,
    title: 'Fabricación',
    description: 'Una vez aprobado, tu letrero de neón personalizado entra en producción con materiales de alta calidad.',
  },
  {
    step: 4,
    icon: Rocket,
    title: 'Envío y ¡listo!',
    description: 'Enviamos tu letrero de forma segura y rápida para que ilumines tu espacio lo antes posible.',
  },
];

export function PurchaseProcess() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Nuestro Proceso Simplificado
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Desde la cotización hasta la entrega, te acompañamos en cada paso para
            hacer tu visión realidad.
          </p>
        </div>
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-0.5 -translate-x-1/2 bg-border md:block"></div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((item) => (
              <Card
                key={item.step}
                className="relative overflow-hidden border-2 border-primary/20 bg-card p-6 shadow-lg transition-all hover:border-primary/50 hover:shadow-primary/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                    {item.step}
                  </div>
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
