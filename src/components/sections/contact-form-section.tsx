import { MultiStepContactForm } from './multi-step-contact-form';
import { AnimatedTitle } from '../ui/animated-title';

export function ContactFormSection() {
  return (
    <section id="contact-form" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center">
          <AnimatedTitle
            as="h2"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Cotiza tu Diseño Personalizado
          </AnimatedTitle>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Llena nuestro formulario y nuestro equipo se pondrá en contacto
            contigo para darle vida a tu idea.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <MultiStepContactForm />
        </div>
      </div>
    </section>
  );
}
