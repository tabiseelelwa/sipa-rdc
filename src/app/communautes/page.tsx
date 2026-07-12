import Link from 'next/link'
import { Users, MapPin, Languages, ArrowRight, TreePine } from 'lucide-react'
import { query } from '@/lib/db'
import { Communaute } from '@/lib/types'

async function getCommunautes() {
  try {
    return await query<Communaute[]>('SELECT * FROM communautes ORDER BY population_estimee DESC')
  } catch {
    return [
      { id: 1, nom: 'Aka (Bambuti)', slug: 'aka-bambuti', region: 'Forêt équatoriale', province: 'Équateur / Tshuapa', population_estimee: 25000, langue: 'Mongo / Lingala', description: 'Les Aka sont l\'un des peuples pygmées les plus connus. Maîtres de la forêt, leur musique polyphonique est reconnue par l\'UNESCO.', territoire: 'Grande forêt équatoriale le long du fleuve Congo.', specificites: 'Polyphonie vocale UNESCO, médecine à base de plantes, organisation matrilinéaire.', image_url: '' },
      { id: 3, nom: 'Twa (Batwa)', slug: 'twa-batwa', region: 'Grands Lacs', province: 'Nord-Kivu / Sud-Kivu', population_estimee: 80000, langue: 'Kinyarwanda / Swahili', description: 'Gardiens ancestraux des forêts montagneuses des Grands Lacs. Potiers et artisans exceptionnels.', territoire: 'Hautes terres du Kivu, abords des parcs nationaux.', specificites: 'Poterie sans tour, danse et chants patrimoniaux, peuple le plus sédentarisé.', image_url: '' },
      { id: 4, nom: 'Mbuti', slug: 'mbuti', region: 'Forêt d\'Ituri', province: 'Ituri', population_estimee: 35000, langue: 'Kango / Swahili', description: 'Habitants originels de la forêt d\'Ituri. Ils se considèrent les "enfants de la forêt".', territoire: 'Forêt d\'Ituri, présence ancestrale depuis au moins 40 000 ans.', specificites: 'Philosophie de la forêt, cérémonie Molimo, chasse à l\'arc et aux filets.', image_url: '' },
      { id: 2, nom: 'Baka', slug: 'baka', region: 'Forêt du nord-est', province: 'Haut-Uélé / Ituri', population_estimee: 15000, langue: 'Baka / Swahili', description: 'Célèbres pour leur connaissance de la forêt. Ils entretiennent une relation spirituelle profonde avec elle.', territoire: 'Forêt dense du Haut-Uélé et de l\'Ituri.', specificites: 'Chasse au filet collectif, apiculture forestière, rites initiatiques.', image_url: '' },
      { id: 5, nom: 'Cwa', slug: 'cwa', region: 'Savane boisée', province: 'Kasaï / Lomami', population_estimee: 12000, langue: 'Tshiluba / Lingala', description: 'Branche pygmée adaptée aux zones de transition entre forêt et savane.', territoire: 'Zone forêt-savane du Kasaï et de la Lomami.', specificites: 'Traque sur terrain ouvert, herboristes des plantes de lisière.', image_url: '' },
    ] as Communaute[]
  }
}

export default async function CommunautesPage() {
  const communautes = await getCommunautes()

  return (
    <>
      {/* HERO */}
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">
            Diversité culturelle
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">
            Nos Communautés
          </h1>
          <p className="text-[#F5F0E8]/80 text-xl max-w-2xl mx-auto">
            Cinq groupes distincts, une même âme forestière — chacun porteur d&apos;une 
            identité culturelle et d&apos;une sagesse millénaire.
          </p>
        </div>
      </section>

      {/* LISTE */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {communautes.map((c, i) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 grid lg:grid-cols-5"
              >
                {/* Image / Motif */}
                <div className="lg:col-span-2 min-h-[250px] bg-gradient-to-br from-[#1a3009] to-[#2D5016] relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`comm${i}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                          <polygon points="25,3 47,15 47,35 25,47 3,35 3,15" fill="none" stroke="#D4A853" strokeWidth="1.2"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#comm${i})`}/>
                    </svg>
                  </div>
                  <div className="relative z-10 text-center p-8">
                    <TreePine className="w-20 h-20 text-[#D4A853] mx-auto mb-4 opacity-70" />
                    <div className="text-[#D4A853] text-sm font-medium uppercase tracking-wider">
                      {c.province}
                    </div>
                  </div>
                </div>

                {/* Contenu */}
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <h2 className="font-display text-3xl font-bold text-[#1A0A00] mb-4">
                    {c.nom}
                  </h2>
                  <p className="text-[#4a3728]/80 text-base leading-relaxed mb-6">
                    {c.description}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-[#8B4513] shrink-0" />
                      <div>
                        <div className="text-[#4a3728]/60 text-xs">Population</div>
                        <div className="font-semibold text-[#1A0A00]">
                          {c.population_estimee?.toLocaleString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-[#2D5016] shrink-0" />
                      <div>
                        <div className="text-[#4a3728]/60 text-xs">Région</div>
                        <div className="font-semibold text-[#1A0A00]">{c.region}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Languages className="w-4 h-4 text-[#D4A853] shrink-0" />
                      <div>
                        <div className="text-[#4a3728]/60 text-xs">Langue</div>
                        <div className="font-semibold text-[#1A0A00]">{c.langue}</div>
                      </div>
                    </div>
                  </div>

                  {c.specificites && (
                    <div className="bg-[#F5F0E8] rounded-xl p-4 mb-6">
                      <div className="text-[#8B4513] text-xs font-semibold uppercase tracking-wider mb-1">
                        Spécificités culturelles
                      </div>
                      <p className="text-[#4a3728] text-sm">{c.specificites}</p>
                    </div>
                  )}

                  {/* <Link
                    href={`/communautes/${c.slug}`}
                    className="btn-primary text-sm"
                  >
                    Découvrir {c.nom} <ArrowRight className="w-4 h-4" />
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
