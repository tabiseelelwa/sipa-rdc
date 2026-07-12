import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Pygmées de la RDC — Voix de la Forêt',
  description: 'Site officiel dédié à la culture, aux droits et au patrimoine des peuples pygmées de la République Démocratique du Congo.',
  keywords: ['pygmées', 'RDC', 'Congo', 'Mbuti', 'Aka', 'Batwa', 'Baka', 'forêt équatoriale', 'droits autochtones'],
  openGraph: {
    title: 'Pygmées de la RDC — Voix de la Forêt',
    description: 'Découvrez la culture, le patrimoine et les combats des peuples pygmées de la RDC',
    type: 'website',
    locale: 'fr_CD',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
