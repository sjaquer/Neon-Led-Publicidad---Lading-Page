import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: '#',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: '#',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#',
    },
  ];

  return (
    <footer className="bg-card">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <Logo />
          <div className="mt-4 flex gap-4 md:mt-0">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visita nuestro ${link.name}`}
                className="text-foreground transition-colors hover:text-primary"
              >
                <link.icon className="h-6 w-6 drop-shadow-[0_0_3px_hsl(var(--primary))]" />
              </Link>
            ))}
          </div>
        </div>
        <hr className="my-6 border-border" />
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} NeonLed Studios. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
