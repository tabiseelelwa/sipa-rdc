import { Music, Shield, Heart, TreePine, Utensils, Star } from 'lucide-react'
import { query } from '@/lib/db'
import { Patrimoine } from '@/lib/types'

async function getPatrimoine() {
  try {
    return await query<Patrimoine[]>('SELECT * FROM patrimoine ORDER BY categorie')
  } catch {
    return [
      { id: 1, titre: 'Polyphonie vocale Aka', categorie: 'musique' as const, description: 'La musique polyphonique des Aka, inscrite au patrimoine immatériel de l\'UNESCO, est une forme d\'expression collective où chaque voix s\'entrelace librement avec les autres dans une improvisation structurée.', communaute_id: 1 },
      { id: 2, titre: 'Chasse au filet collectif', categorie: 'chasse' as const, description: 'Technique ancestrale où toute la communauté participe à la chasse en utilisant des filets de liane. Cette pratique est autant une stratégie de subsistance qu\'un acte social et cérémoniel.', communaute_id: 2 },
      { id: 3, titre: 'Poterie des Batwa', categorie: 'artisanat' as const, description: 'Les Batwa sont réputés pour leur poterie exceptionnelle. Chaque pièce, faite à la main sans tour de potier, raconte une histoire et porte des motifs symboliques transmis de mère en fille.', communaute_id: 3 },
      { id: 4, titre: 'Médecine forestière Mbuti', categorie: 'medecine' as const, description: 'Les Mbuti possèdent une pharmacopée d\'une richesse extraordinaire, avec plus de 300 plantes médicinales identifiées et utilisées pour traiter des maladies allant des infections aux troubles psychologiques.', communaute_id: 4 },
      { id: 5, titre: 'Molimo : la cérémonie de la forêt', categorie: 'spiritualite' as const, description: 'Le Molimo est la cérémonie spirituelle centrale des Mbuti. Quand la forêt "dort" ou qu\'un malheur frappe la communauté, on réveille la forêt par des chants et des rituels nocturnes.', communaute_id: 4 },
    ] as Patrimoine[]
  }
}

const categorieConfig: Record<string, { icon: React.ElementType; label: string; color: string; bg: string }> = {
  musique: { icon: Music, label: 'Musique & Chants', color: 'text-amber-700', bg: 'bg-amber-50' },
  art: { icon: Star, label: 'Arts visuels', color: 'text-rose-700', bg: 'bg-rose-50' },
  medecine: { icon: Heart, label: 'Médecine traditionnelle', color: 'text-red-700', bg: 'bg-red-50' },
  chasse: { icon: TreePine, label: 'Techniques de chasse', color: 'text-green-800', bg: 'bg-green-50' },
  cuisine: { icon: Utensils, label: 'Gastronomie', color: 'text-orange-700', bg: 'bg-orange-50' },
  spiritualite: { icon: Star, label: 'Spiritualité', color: 'text-purple-700', bg: 'bg-purple-50' },
  artisanat: { icon: Shield, label: 'Artisanat', color: 'text-yellow-700', bg: 'bg-yellow-50' },
}

export default async function CulturePage() {
  const patrimoine = await getPatrimoine()

  return (
    <>
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">Héritage</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">
            Culture & Patrimoine
          </h1>
          <p className="text-[#F5F0E8]/80 text-xl max-w-2xl mx-auto">
            Un trésor de l&apos;humanité transmis de génération en génération au fil des millénaires 
            dans la forêt équatoriale du Congo.
          </p>
        </div>
      </section>

      {/* Section UNESCO */}
      <section className="py-16 bg-[#1A0A00]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-3 bg-[#D4A853]/20 border border-[#D4A853]/30 rounded-2xl px-6 py-4 mb-8">
            <Star className="w-6 h-6 text-[#D4A853]" />
            <span className="text-[#D4A853] font-semibold">Patrimoine Immatériel UNESCO</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F5F0E8] mb-6">
            La Polyphonie vocale des Pygmées<br />reconnue par l&apos;UNESCO
          </h2>
          <p className="text-[#F5F0E8]/70 text-lg leading-relaxed max-w-3xl mx-auto">
            En 2003, la polyphonie vocale des peuples pygmées d&apos;Afrique centrale a été inscrite 
            au patrimoine culturel immatériel de l&apos;humanité par l&apos;UNESCO. Cette forme musicale unique, 
            où chaque voix improvise librement en s&apos;entrelacant avec les autres, représente l&apos;une 
            des expressions les plus sophistiquées de la créativité musicale humaine.
          </p>
        </div>
      </section>

      {/* Patrimoine items */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Expressions Culturelles</h2>
            <p className="section-subtitle mt-4">
              Musique, médecine, artisanat, spiritualité — autant de dimensions d&apos;une civilisation 
              forestière millénaire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patrimoine.map((p) => {
              const config = categorieConfig[p.categorie] || { icon: Star, label: p.categorie, color: 'text-gray-700', bg: 'bg-gray-50' }
              const IconComp = config.icon
              return (
                <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover">
                  <div className={`h-2 bg-gradient-to-r from-[#8B4513] to-[#C4622D]`} />
                  <div className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${config.bg} ${config.color}`}>
                      <IconComp className="w-4 h-4" />
                      {config.label}
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#1A0A00] mb-4">
                      {p.titre}
                    </h3>
                    <p className="text-[#4a3728]/80 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-20 bg-[#2D5016]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] text-6xl font-display mb-6">&ldquo;</div>
          <blockquote className="text-[#F5F0E8] text-2xl md:text-3xl font-display italic leading-relaxed mb-8">
            La forêt n&apos;est pas un endroit où nous vivons. La forêt est ce que nous sommes.
          </blockquote>
          <cite className="text-[#F5F0E8]/60 text-sm uppercase tracking-widest">
            — Sagesse Mbuti, transmise de génération en génération
          </cite>
        </div>
      </section>
    </>
  )
}
