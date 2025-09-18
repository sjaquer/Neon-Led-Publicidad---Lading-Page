import { MultiStepContactForm } from './multi-step-contact-form';

export function ContactFormSection() {
  return (
    <section id="contact-form" className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            ¿Listo para iluminar tu idea?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Completa nuestro formulario y obtén una cotización instantánea para tu
            diseño de neón personalizado.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <MultiStepContactForm />
        </div>
      </div>
    </section>
  );
}
