'use client';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { handleFormSubmission } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2,
  CheckCircle,
  Send,
  Upload,
  User,
  Mail,
  Phone,
  Building,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Logo } from '../logo';

const formSchema = z.object({
  signType: z.string().min(1),
  ideaDescription: z.string().optional(),
  imageAttachment: z.any().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

type Message = {
  id: number;
  sender: 'bot' | 'user';
  content: React.ReactNode;
  field?: keyof FormData;
};

const signOptions = [
  { value: 'logo', label: 'Logo de neón' },
  { value: 'text', label: 'Frase o texto' },
  { value: 'art', label: 'Arte o figura' },
  { value: 'other', label: 'Otro' },
];

export function MultiStepContactForm() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const steps: Omit<Message, 'id' | 'sender'>[] = [
    {
      content: '¡Hola! Soy tu asistente de diseño. Para empezar, ¿qué tipo de letrero tienes en mente para tu negocio?',
      field: 'signType',
    },
    {
      content: 'Genial. Ahora, por favor describe tu idea. ¿Qué texto, figura o concepto te gustaría ver en neón?',
      field: 'ideaDescription',
    },
    {
      content: 'Si tienes una imagen de referencia (como tu logo o una inspiración), puedes adjuntarla aquí. (Opcional)',
      field: 'imageAttachment',
    },
    {
      content: 'Perfecto. Para preparar tu cotización, ¿cuál es tu nombre completo?',
      field: 'name',
    },
    {
      content: 'Gracias. ¿A qué dirección de correo electrónico podemos enviarla?',
      field: 'email',
    },
    {
      content: 'Y por último, si deseas que te contactemos por WhatsApp, déjanos tu número. (Opcional)',
      field: 'phone',
    },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const currentField = steps[currentStep].field;
      const fieldValue = currentField ? form.getValues(currentField) : undefined;
      
      if (fieldValue === undefined || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender: 'bot', ...steps[currentStep] },
          ]);
        }, 1200);
      }
    } else if (!isSubmitting && !isSubmitted) {
        // All steps are complete, trigger submission
        form.handleSubmit(onSubmit)();
    }
  }, [currentStep]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleUserInput = (field: keyof FormData, value: any) => {
    form.setValue(field, value);
    let displayContent: React.ReactNode;

    if (field === 'imageAttachment' && value?.[0]) {
      displayContent = `Archivo: ${value[0].name}`;
    } else if (field === 'signType') {
      displayContent = signOptions.find(opt => opt.value === value)?.label || '';
    } else {
      displayContent = value;
    }
    
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', content: displayContent },
    ]);
    
    // Validate before moving to the next step
    form.trigger(field).then(isValid => {
      if(isValid) {
        setCurrentStep(prev => prev + 1);
      }
    });
  };

  const handleSkip = () => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', content: 'Omitir este paso' },
    ]);
    setCurrentStep((prev) => prev + 1);
  };
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsTyping(true);
     setTimeout(async () => {
      try {
        await handleFormSubmission({
          ...data,
          usageType: 'business',
          imageAttachment: data.imageAttachment?.[0]?.name,
        });

        setIsTyping(false);
        setMessages(prev => [
            ...prev,
            { id: Date.now(), sender: 'bot', content: (
                <div className="flex flex-col items-center text-center gap-2">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                  <h3 className="font-bold">¡Solicitud Enviada!</h3>
                  <p className="text-xs">Gracias por tu interés. Nos pondremos en contacto contigo en las próximas 24 horas con tu cotización.</p>
                </div>
            )}
        ]);
        setIsSubmitted(true);

      } catch (error) {
        toast({
          title: 'Error',
          description: 'Hubo un problema al enviar tu solicitud. Inténtalo de nuevo.',
          variant: 'destructive',
        });
        setIsTyping(false);
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const renderInputForStep = () => {
    if (isSubmitted || isTyping || currentStep >= steps.length) return null;

    const { field } = steps[currentStep];
    const fieldError = form.formState.errors[field as keyof FormData]?.message;

    switch (field) {
      case 'signType':
        return (
          <div className="flex flex-wrap gap-2 p-2 justify-center">
            {signOptions.map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                className="bg-background/20"
                onClick={() => handleUserInput('signType', opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        );
      case 'ideaDescription':
        return <TextInputComponent field="ideaDescription" placeholder="Mi idea es..." onSend={handleUserInput} error={fieldError as string}/>;
      case 'imageAttachment':
        return <FileInputComponent field="imageAttachment" onSend={handleUserInput} onSkip={handleSkip} error={fieldError as string} />;
      case 'name':
        return <TextInputComponent field="name" placeholder="Tu nombre completo..." onSend={handleUserInput} error={fieldError as string} />;
      case 'email':
        return <TextInputComponent field="email" placeholder="tu@email.com" onSend={handleUserInput} type="email" error={fieldError as string} />;
      case 'phone':
        return <TextInputComponent field="phone" placeholder="Tu número de teléfono (opcional)..." onSend={handleUserInput} onSkip={handleSkip} type="tel" error={fieldError as string} />;
      default:
        return null;
    }
  };

  return (
    <Card className="neumorphic-flat bg-gray-900/50 backdrop-blur-sm border-gray-700/50 w-full max-w-lg mx-auto">
      <CardContent className="p-0">
        <div className="p-4 h-96 flex flex-col space-y-4 overflow-y-auto">
            <AnimatePresence>
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-end gap-2 ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                    >
                    {msg.sender === 'bot' && (
                        <Avatar className="w-8 h-8">
                            <div className="w-full h-full bg-primary flex items-center justify-center rounded-full">
                                <Logo className="w-6 h-6"/>
                            </div>
                        </Avatar>
                    )}
                    <div
                        className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 text-sm md:text-base ${
                        msg.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-gray-700 text-gray-200 rounded-bl-none'
                        }`}
                    >
                        {msg.content}
                    </div>
                    </motion.div>
                ))}
            </AnimatePresence>
          {isTyping && (
             <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-end gap-2 self-start"
              >
                <Avatar className="w-8 h-8">
                     <div className="w-full h-full bg-primary flex items-center justify-center rounded-full">
                        <Logo className="w-6 h-6"/>
                    </div>
                </Avatar>
                <div className="bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex items-center gap-1">
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                    </div>
                </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="border-t border-gray-700/50 p-2">
            {renderInputForStep()}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Input Components ---

type TextInputProps = {
  field: keyof FormData;
  placeholder: string;
  onSend: (field: keyof FormData, value: string) => void;
  onSkip?: () => void;
  type?: string;
  error?: string;
};

const TextInputComponent = ({ field, placeholder, onSend, onSkip, type = 'text', error }: TextInputProps) => {
    const [value, setValue] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim() || !onSkip) {
            onSend(field, value);
        } else if (onSkip) {
            onSkip();
        }
    };
    
    return (
        <form onSubmit={handleSend} className="flex items-center gap-2">
            <div className="relative flex-grow">
                <Input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-800 border-gray-700 rounded-full pl-4 pr-10 text-white"
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-500">
                    <Send className="h-4 w-4" />
                </Button>
            </div>
            {onSkip && <Button variant="ghost" type="button" onClick={onSkip} className="text-gray-400 hover:text-white">Omitir</Button>}
             {error && <p className="text-red-500 text-xs mt-1 px-4">{error}</p>}
        </form>
    );
}

type FileInputProps = {
  field: keyof FormData;
  onSend: (field: keyof FormData, value: FileList) => void;
  onSkip: () => void;
  error?: string;
};

const FileInputComponent = ({ field, onSend, onSkip, error }: FileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onSend(field, e.target.files);
        }
    };

    return (
        <div className="flex items-center gap-2 p-2">
            <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <Button
                type="button"
                variant="outline"
                className="flex-grow bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="mr-2 h-4 w-4" />
                Adjuntar Archivo
            </Button>
            <Button
                type="button"
                variant="ghost"
                onClick={onSkip}
                className="text-gray-400 hover:text-white"
            >
                Omitir
            </Button>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
