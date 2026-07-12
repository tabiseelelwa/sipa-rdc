import { query } from '@/lib/db'
import { MembreEquipe, Partenaire } from '@/lib/types'
import { Target, Eye, Heart } from 'lucide-react'

async function getData() {
  try {
    const equipe = await query<MembreEquipe[]>(
      'SELECT * FROM equipe WHERE actif = true ORDER BY ordre'
    )
    const partenaires = await query<Partenaire[]>(
      'SELECT * FROM partenaires WHERE actif = true'
    )
    return { equipe, partenaires }
  } catch {
    return {
      equipe: [
        { id: 1, nom: 'Honoré Molimo', role: 'Directeur fondateur', bio: 'Né dans la forêt d\'Ituri, Honoré est un défenseur infatigable des droits des Pygmées. Après des études de droit à Kinshasa, il a consacré sa vie à la documentation et à la promotion de la culture Mbuti.', communaute_origine: 'Mbuti (Ituri)' },
        { id: 2, nom: 'Amina Baka-Mwasi', role: 'Coordinatrice culturelle', bio: 'Ethnomusicologue et activiste, Amina a documenté plus de 500 chants pygmées. Elle dirige les programmes de préservation du patrimoine musical.', communaute_origine: 'Aka (Équateur)' },
        { id: 3, nom: 'Jean-Pierre Furaha', role: 'Responsable juridique', bio: 'Avocat spécialisé en droits des peuples autochtones, Jean-Pierre mène les combats judiciaires pour la reconnaissance des droits fonciers.', communaute_origine: 'Batwa (Sud-Kivu)' },
        { id: 4, nom: 'Sophie Masika', role: 'Coordinatrice santé', bio: 'Infirmière et herboriste, Sophie fait le lien entre médecine traditionnelle et moderne. Elle documente les plantes médicinales et forme des agents de santé.', communaute_origine: 'Mbuti (Ituri)' },
      ] as MembreEquipe[],
      partenaires: [
        { id: 1, nom: 'PIDP-Kivu', type: 'ong', pays: 'RDC', description: 'Programme Intégré pour le Développement du Peuple Pygmée au Kivu', site_web: '#' },
        { id: 2, nom: 'Forest Peoples Programme', type: 'international', pays: 'Royaume-Uni', description: 'Organisation internationale de défense des droits des peuples forestiers', site_web: '#' },
        { id: 3, nom: 'UNESCO', type: 'international', pays: 'France', description: 'Organisation des Nations Unies pour l\'éducation, la science et la culture', site_web: '#' },
        { id: 4, nom: 'ICCN', type: 'gouvernement', pays: 'RDC', description: 'Institut Congolais pour la Conservation de la Nature', site_web: '#' },
      ] as Partenaire[],
    }
  }
}

export default async function AProposPage() {
  const { equipe, partenaires } = await getData()

  return (
    <>
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">Notre organisation</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">À Propos</h1>
          <p className="text-[#F5F0E8]/80 text-xl max-w-2xl mx-auto">
            Une organisation fondée pour "les Droits, la Paix, le Développement et Assistance communautaires"
          </p>
        </div>
      </section>

      {/* Mission / Vision / Valeurs */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Notre Raison d&apos;Être</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Target, titre: 'Notre Mission', color: 'from-[#8B4513] to-[#C4622D]', texte: 'La mission de SIPA est de promouvoir le développement intégral et durable des Peuples Autochtones et des groupes vulnérables à travers la défense de leurs droits, le renforcement de leurs capacités, l’assistance humanitaire adaptée, la gestion durable des ressources naturelles et la construction d’une paix ancrés dans leurs cultures et savoirs traditionnels.' },
              { icon: Eye, titre: 'Notre Vision', color: 'from-[#2D5016] to-[#4a8a2a]', texte: 'SIPA rêve un monde juste et inclusif où les personnes vivent dans la dignité, la paix et l’autonomie, en harmonie avec leur identité culturelle et les générations futures.' },
              { icon: Heart, titre: 'Nos Valeurs', color: 'from-[#D4A853] to-[#8B4513]', texte: 'SIPA prône ses valeurs à travers le Respect de l’humanité, la neutralité, l’impartialité, l’intégrité, et la ténacité.' },
            ].map(({ icon: Icon, titre, color, texte }) => (
              <div key={titre} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover">
                <div className={`h-2 bg-gradient-to-r ${color}`} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1A0A00] mb-4">{titre}</h3>
                  <p className="text-[#4a3728]/80 leading-relaxed">{texte}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Histoire */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-20">
            <h2 className="font-display text-3xl font-bold text-[#1A0A00] mb-6">Notre Histoire</h2>
            <div className="prose prose-lg max-w-none text-[#4a3728]">
              <p className="text-lg leading-relaxed mb-4">
                La Solidarité pour les Initiatives des Peuples Autochtones en sigle « SIPA », créée le 15 Août 2008 à Bukavu, Province du Sud-Kivu en République
                Démocratique du Congo, est une organisation sans but lucratif des droits congolais ; membre de la société civile accompagne les Peuples Autochtones, les personnes vulnérables
                et les communautés locales de la République Démocratique du Congo, en vue de leur développement durable, leur résilience économique et social, le renforcement capacités, la paix et
                l’assistance humanitaire adaptée.
              </p>
            </div>
          </div>

          {/* Équipe */}
          <div className="mb-20">
            <h2 className="font-display text-3xl font-bold text-[#1A0A00] mb-10 text-center">Notre Équipe</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipe.map((membre) => (
                <div key={membre.id} className="bg-white rounded-2xl p-6 shadow-md card-hover text-center">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2D5016] to-[#8B4513] mx-auto mb-4 flex items-center justify-center text-2xl text-[#F5F0E8] font-bold font-display">
                    {membre.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <h3 className="font-display font-bold text-[#1A0A00] text-lg mb-1">{membre.nom}</h3>
                  <div className="text-[#8B4513] text-sm font-medium mb-3">{membre.role}</div>
                  {membre.communaute_origine && (
                    <div className="text-[#2D5016] text-xs bg-green-50 px-3 py-1 rounded-full mb-3 inline-block">
                      {membre.communaute_origine}
                    </div>
                  )}
                  <p className="text-[#4a3728]/70 text-sm leading-relaxed">{membre.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Partenaires */}
          <div>
            <h2 className="font-display text-3xl font-bold text-[#1A0A00] mb-10 text-center">Nos Partenaires</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partenaires.map((p) => (
                <a
                  key={p.id}
                  href={p.site_web || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-6 shadow-md card-hover flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-[#F5F0E8] flex items-center justify-center mb-4 text-xl font-bold text-[#8B4513]">
                    {p.nom.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-[#1A0A00] mb-1">{p.nom}</h3>
                  <div className="text-xs text-[#4a3728]/60 mb-2">{p.pays}</div>
                  <p className="text-[#4a3728]/70 text-xs leading-relaxed">{p.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
