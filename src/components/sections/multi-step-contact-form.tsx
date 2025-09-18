'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { handleFormSubmission } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, ArrowLeft, Building } from 'lucide-react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  signType: z.string().min(1, 'Por favor, selecciona un tipo de letrero.'),
  ideaDescription: z.string().optional(),
  imageAttachment: z.any().optional(),
  name: z.string().min(2, 'El nombre es requerido.'),
  email: z.string().email('El correo electrónico no es válido.'),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, fields: ['signType', 'ideaDescription', 'imageAttachment'] },
  { id: 2, fields: ['name', 'email', 'phone'] },
];

export function MultiStepContactForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      signType: '',
      ideaDescription: '',
      name: '',
      email: '',
      phone: '',
    },
  });

  const nextStep = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as any, { shouldFocus: true });
    if (!output) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // NOTE: File upload is not implemented in this server action.
      // A real implementation would require a file storage service.
      await handleFormSubmission({
        ...data,
        usageType: 'business', // Hardcoded to business
        imageAttachment: data.imageAttachment?.[0]?.name,
      });
      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: 'Error',
        description:
          'Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progress = ((currentStep + 1) / (steps.length + 1)) * 100;

  if (isSubmitted) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h3 className="mt-4 font-headline text-2xl font-bold">¡Solicitud Enviada!</h3>
        <p className="mt-2 text-muted-foreground">
          Gracias por tu interés. Nos pondremos en contacto contigo en las
          próximas 24 horas con tu cotización.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Progress value={isSubmitted ? 100 : progress} className="mb-6 h-2" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <FormLabel className="font-headline text-lg flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      1. Cuéntanos sobre el proyecto para tu negocio
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="signType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de letrero</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="logo">Logo de neón</SelectItem>
                              <SelectItem value="text">Frase o texto</SelectItem>
                              <SelectItem value="art">Arte o figura</SelectItem>
                              <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ideaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Describe tu idea o adjunta una imagen
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ej: Quiero el logo de mi empresa en neón para la recepción."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="imageAttachment"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel>Adjuntar imagen de referencia</FormLabel>
                          <FormControl>
                            <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                     <FormLabel className="font-headline text-lg">
                      2. Información de Contacto
                    </FormLabel>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Tu nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo electrónico</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="tu@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono (Opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu número de teléfono"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {currentStep > 0 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
              ) : (
                <div /> // Placeholder to keep the 'Next' button on the right
              )}
              <div>
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Obtener Cotización'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
