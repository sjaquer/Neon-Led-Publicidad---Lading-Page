import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  BookOpen,
} from 'lucide-react';
import { Logo } from '@/components/logo';

// Custom icons for WhatsApp and TikTok as they are not in lucide-react
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12a4 4 0 1 0 4 4V8a8 8 0 1 1-8-8" />
  </svg>
);

export function Footer() {
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: WhatsAppIcon,
      href: '#',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/neonledpublicidad',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://www.facebook.com/neonledpublicidad',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      href: '#',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: '#',
    },
  ];

  return (
    <footer className="bg-card text-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo, About, Social */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Nosotros somos Neón Led Publicidad, una empresa formal que se
              dedica a la creación de espacios personalizados que transforman tu
              negocio con estilo y personalidad.
            </p>
            <div className="w-1/4 h-0.5 bg-secondary my-2"></div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visita nuestro ${link.name}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <link.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">
              CONTÁCTANOS
            </h3>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="font-semibold">DIRECCIONES:</p>
                <p className="text-muted-foreground">
                  JR. PARURO 1404. S130, LIMA, PERÚ
                </p>
                <p className="text-muted-foreground mt-2">
                  URB. ALAMEDA LA RIVERA MZ. F LT. 30 SANTA MARTA, ATE VITARTE,
                  PERÚ
                </p>
              </div>
              <div>
                <p className="font-semibold">CELULAR:</p>
                <p className="text-muted-foreground">+51 994 078 320</p>
              </div>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">
              HORARIO
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-semibold">DISPONIBILIDAD:</p>
              <p className="text-muted-foreground">LUNES A VIERNES</p>
              <p className="text-muted-foreground">8:00 A.M - 7:00 P.M</p>
            </div>
          </div>

          {/* Column 4: Claims */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">
              RECLAMACIONES
            </h3>
            <Link
              href="#"
              className="mt-4 flex flex-col items-start text-sm group"
            >
              <div className="flex items-center gap-4">
                <BookOpen className="h-10 w-10 text-foreground transition-colors group-hover:text-primary" />
                <span className="font-semibold group-hover:text-primary transition-colors">
                  LIBRO DE RECLAMACIONES
                </span>
              </div>
            </Link>
          </div>
        </div>

        <hr className="my-8 border-border" />
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Neon Led Publicidad. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
