import { FileText, Pencil, Factory, Rocket } from 'lucide-react';
import { AnimatedTitle } from '../ui/animated-title';

const processSteps = [
  {
    step: 1,
    icon: FileText,
    title: 'Cotiza tu idea',
    description:
      'Envíanos tu idea, logo o inspiración. Te daremos un presupuesto en menos de 24 horas.',
  },
  {
    step: 2,
    icon: Pencil,
    title: 'Aprueba el diseño',
    description:
      'Nuestro equipo de diseño creará una propuesta visual para que la revises y apruebes.',
  },
  {
    step: 3,
    icon: Factory,
    title: 'Fabricación',
    description:
      'Una vez aprobado, tu letrero de neón personalizado entra en producción con materiales de alta calidad.',
  },
  {
    step: 4,
    icon: Rocket,
    title: 'Envío y ¡listo!',
    description:
      'Enviamos tu letrero de forma segura y rápida para que ilumines tu espacio lo antes posible.',
  },
];

export function PurchaseProcess() {
  return (
    <section id="purchase-process" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Nuestro Proceso Simplificado
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Desde la cotización hasta la entrega, te acompañamos en cada paso
            para hacer tu visión realidad.
          </p>
        </div>
        <div className="relative mt-20">
          <div
            className="absolute left-0 top-8 hidden h-0.5 w-full bg-border md:block"
            aria-hidden="true"
          />
          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {processSteps.map((item) => (
              <div key={item.step} className="relative flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold border-4 border-background z-10">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-headline text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
