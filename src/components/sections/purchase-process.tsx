import { FileText, Pencil, Factory, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <section id="purchase-process" className="py-16 sm:py-24">
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
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block" />
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 relative">
            {processSteps.map((item) => (
             <div key={item.step} className="relative flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold border-4 border-background z-10">
                    <item.icon className="h-8 w-8" />
                </div>
                <div className="text-center mt-4">
                  <h3 className="font-headline text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
