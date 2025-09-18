import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="Página de inicio de NeonLed Studios">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild>
            <Link href="#contact-form">Cotiza Ahora</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
