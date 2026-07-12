import { TreePine } from 'lucide-react'

const galerieItems = [
  { id: 1, titre: 'Cérémonie dans la forêt d\'Ituri', categorie: 'Spiritualité', taille: 'tall' },
  { id: 2, titre: 'Artisanat Batwa', categorie: 'Artisanat', taille: 'normal' },
  { id: 3, titre: 'Chasse au filet collectif', categorie: 'Chasse', taille: 'normal' },
  { id: 4, titre: 'Enfants jouant dans la forêt', categorie: 'Vie quotidienne', taille: 'wide' },
  { id: 5, titre: 'Guérisseuse Aka', categorie: 'Médecine', taille: 'tall' },
  { id: 6, titre: 'Poteries Batwa', categorie: 'Artisanat', taille: 'normal' },
  { id: 7, titre: 'Danse cérémonielle', categorie: 'Culture', taille: 'normal' },
  { id: 8, titre: 'Forêt équatoriale', categorie: 'Nature', taille: 'wide' },
  { id: 9, titre: 'Construction d\'un campement', categorie: 'Architecture', taille: 'normal' },
]

const colors = [
  'from-[#1a3009] to-[#2D5016]',
  'from-[#3d1500] to-[#8B4513]',
  'from-[#1A0A00] to-[#4a2800]',
  'from-[#0d1f00] to-[#2D5016]',
  'from-[#5a3000] to-[#C4622D]',
]

export default function GaleriePage() {
  return (
    <>
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">Images</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">Galerie</h1>
          <p className="text-[#F5F0E8]/80 text-xl max-w-2xl mx-auto">
            Regards sur la vie, la culture et la beauté des peuples pygmées de la RDC.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grille masonry */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galerieItems.map((item, i) => (
              <div
                key={item.id}
                className={`break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative ${item.taille === 'tall' ? 'aspect-[3/4]' : item.taille === 'wide' ? 'aspect-[16/9]' : 'aspect-square'
                  } bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center mb-4`}
              >


                {/* Icône */}
                <div className="relative z-10 flex flex-col items-center gap-2 opacity-60 group-hover:opacity-80 transition-opacity">
                  <TreePine className="w-8 h-8 text-[#D4A853]" />
                </div>

                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-[#1A0A00]/0 group-hover:bg-[#1A0A00]/60 transition-all duration-300 flex items-end p-4">
                  <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="text-[#D4A853] text-xs font-medium uppercase tracking-wider mb-1">
                      {item.categorie}
                    </div>
                    <div className="text-[#F5F0E8] text-sm font-semibold">
                      {item.titre}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#4a3728]/60 text-sm">
              Pour soumettre des photos, contactez-nous à{' '}
              <a href="mailto:galerie@pygmees-rdc.org" className="text-[#8B4513] hover:underline">
                galerie@pygmees-rdc.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
