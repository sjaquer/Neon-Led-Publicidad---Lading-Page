import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqItems = [
  {
    question: '¿Cuánto tiempo tarda el envío?',
    answer:
      'El tiempo de fabricación es de 5 a 7 días hábiles. Una vez fabricado, el envío estándar a nivel nacional toma de 2 a 5 días adicionales. Ofrecemos opciones de envío express si lo necesitas antes.',
  },
  {
    question: '¿Qué tipo de garantía ofrecen?',
    answer:
      'Todos nuestros letreros de neón LED tienen una garantía de 2 años que cubre cualquier defecto de fabricación. La fuente de poder tiene una garantía de 1 año. Estamos comprometidos con la calidad de nuestros productos.',
  },
  {
    question: '¿Necesito tener un diseño profesional?',
    answer:
      '¡Para nada! Puedes enviarnos un boceto, una imagen de referencia o simplemente describir tu idea. Nuestro equipo de diseñadores profesionales creará una propuesta para ti sin costo adicional.',
  },
  {
    question: '¿Son difíciles de instalar los letreros?',
    answer:
      'Nuestros letreros están diseñados para una instalación sencilla. Vienen pre-perforados y con todo el kit de montaje necesario. Son tan fáciles de colgar como un cuadro.',
  },
  {
    question: '¿De qué materiales están hechos?',
    answer:
      'Utilizamos tubos de neón LED flexibles de alta calidad montados sobre una base de acrílico transparente. Esta tecnología es más duradera, segura y eficiente energéticamente que el neón de vidrio tradicional.',
  },
];

export function Faq() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-extrabold tracking-tight sm:text-4xl">
            Preguntas Frecuentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            ¿Tienes dudas? Aquí resolvemos las preguntas más comunes de nuestros
            clientes.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-headline text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
