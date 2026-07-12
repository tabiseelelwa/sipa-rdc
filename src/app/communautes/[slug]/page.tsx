import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, MapPin, Languages, TreePine } from 'lucide-react'
import { query } from '@/lib/db'
import { Communaute, Patrimoine } from '@/lib/types'

async function getCommunaute(slug: string) {
  try {
    const results = await query<Communaute[]>(
      'SELECT * FROM communautes WHERE slug = ?',
      [slug]
    )
    return results[0] || null
  } catch {
    const fallback: Record<string, Communaute> = {
      'mbuti': { id: 4, nom: 'Mbuti', slug: 'mbuti', region: 'Forêt d\'Ituri', province: 'Ituri', population_estimee: 35000, langue: 'Kango / Swahili', description: 'Les Mbuti sont les habitants originels de la forêt d\'Ituri, l\'une des forêts tropicales les plus anciennes et les plus riches en biodiversité au monde. Ils se considèrent eux-mêmes comme "les enfants de la forêt".', territoire: 'La forêt d\'Ituri dans la province de l\'Ituri, à l\'est de la RDC, constitue leur territoire ancestral depuis au moins 40 000 ans.', specificites: 'Leur philosophie de vie, documentée par l\'anthropologue Colin Turnbull, révèle une vision du monde centrée sur la bonté fondamentale de la forêt. Ils pratiquent une forme unique de chasse à l\'arc et aux filets.', image_url: '' },
    }
    return fallback[slug] || null
  }
}

async function getPatrimoine(communauteId: number) {
  try {
    return await query<Patrimoine[]>(
      'SELECT * FROM patrimoine WHERE communaute_id = ?',
      [communauteId]
    )
  } catch {
    return []
  }
}

export default async function CommunautePage({ params }: { params: { slug: string } }) {
  const communaute = await getCommunaute(params.slug)
  if (!communaute) notFound()

  const patrimoine = await getPatrimoine(communaute.id)

  return (
    <>
      {/* HERO */}
      <section className="hero-bg pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="detail-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <polygon points="40,5 75,22 75,58 40,75 5,58 5,22" fill="none" stroke="#D4A853" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#detail-pattern)"/>
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Link href="/communautes" className="inline-flex items-center gap-2 text-[#D4A853] hover:text-[#F5F0E8] transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Toutes les communautés
          </Link>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">
                {communaute.province}
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">
                {communaute.nom}
              </h1>
              <p className="text-[#F5F0E8]/80 text-xl leading-relaxed">
                {communaute.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Population', value: communaute.population_estimee?.toLocaleString('fr-FR'), icon: Users },
                { label: 'Région', value: communaute.region, icon: MapPin },
                { label: 'Langue', value: communaute.langue, icon: Languages },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center">
                  <Icon className="w-6 h-6 text-[#D4A853] mx-auto mb-2" />
                  <div className="text-[#F5F0E8] font-bold text-sm">{value}</div>
                  <div className="text-[#F5F0E8]/60 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {communaute.territoire && (
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#2D5016] rounded-xl flex items-center justify-center">
                    <TreePine className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-[#1A0A00]">Territoire</h2>
                </div>
                <p className="text-[#4a3728]/80 leading-relaxed">{communaute.territoire}</p>
              </div>
            )}
            {communaute.specificites && (
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#8B4513] rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">✦</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-[#1A0A00]">Spécificités</h2>
                </div>
                <p className="text-[#4a3728]/80 leading-relaxed">{communaute.specificites}</p>
              </div>
            )}
          </div>

          {patrimoine.length > 0 && (
            <div>
              <h2 className="font-display text-3xl font-bold text-[#1A0A00] mb-8">
                Patrimoine culturel
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {patrimoine.map((p) => (
                  <div key={p.id} className="bg-white rounded-xl p-6 shadow-md">
                    <div className="text-[#8B4513] text-xs font-semibold uppercase tracking-wider mb-2">
                      {p.categorie}
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#1A0A00] mb-3">{p.titre}</h3>
                    <p className="text-[#4a3728]/75 text-sm leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
