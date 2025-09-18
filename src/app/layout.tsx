import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'NeonLed Studios',
  description:
    'Transformamos negocios y entornos con estilo y personalidad, con un enfoque en la publicidad visual moderna.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neon Led Publicidad',
    url: 'https://neonled-studios.com',
    logo: 'https://neonled-studios.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+51-987-654-321',
      contactType: 'customer service',
    },
    sameAs: [
      'https://www.facebook.com/neonledpublicidad',
      'https://www.instagram.com/neonledpublicidad',
    ],
  };

  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
