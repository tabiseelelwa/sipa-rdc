import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { query } from '@/lib/db'
import { Actualite } from '@/lib/types'

async function getActualites() {
  try {
    return await query<Actualite[]>(
      'SELECT * FROM actualites WHERE publie = true ORDER BY date_publication DESC'
    )
  } catch {
    return [
      { id: 1, titre: 'Les Mbuti reçoivent la reconnaissance de leurs droits fonciers dans la forêt d\'Ituri', slug: 'mbuti-droits-fonciers-ituri', extrait: 'Une décision historique du gouvernement provincial reconnaît officiellement les droits ancestraux des Mbuti sur 45 000 hectares de forêt.', contenu: '', categorie: 'droits' as const, auteur: 'Équipe de rédaction', publie: true, date_publication: '2024-03-15' },
      { id: 2, titre: 'Festival International de Musique Pygmée à Kinshasa', slug: 'festival-musique-pygmee-kinshasa-2024', extrait: 'La capitale congolaise accueille pour la première fois un festival dédié aux musiques des peuples pygmées.', contenu: '', categorie: 'culture' as const, auteur: 'Amani Katembo', publie: true, date_publication: '2024-06-01' },
      { id: 3, titre: 'Nouvelle clinique de médecine traditionnelle au cœur de la forêt équatoriale', slug: 'clinique-medecine-traditionnelle-foret', extrait: 'Un partenariat entre l\'OMS et les guérisseurs Aka aboutit à la création d\'un centre de santé unique.', contenu: '', categorie: 'sante' as const, auteur: 'Dr. Esperance Mukendi', publie: true, date_publication: '2024-04-20' },
      { id: 4, titre: 'Les enfants Batwa à l\'école : un programme d\'inclusion récompensé par l\'UNICEF', slug: 'programme-education-batwa-unicef', extrait: 'Le programme "Forêt et Savoir" qui scolarise 2 000 enfants Batwa reçoit le prix UNICEF.', contenu: '', categorie: 'education' as const, auteur: 'Samuel Furaha', publie: true, date_publication: '2024-05-10' },
    ] as Actualite[]
  }
}

const categoryColors: Record<string, string> = {
  culture: 'badge-culture',
  droits: 'badge-droits',
  environnement: 'badge-environnement',
  sante: 'badge-sante',
  education: 'badge-education',
  international: 'badge-international',
}

const categoryLabels: Record<string, string> = {
  culture: 'Culture',
  droits: 'Droits',
  environnement: 'Environnement',
  sante: 'Santé',
  education: 'Éducation',
  international: 'International',
}

export default async function ActualitesPage() {
  const actualites = await getActualites()

  return (
    <>
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">Nouvelles</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">Actualités</h1>
          <p className="text-[#F5F0E8]/80 text-xl max-w-2xl mx-auto">
            Suivez les combats, les victoires et la vie des communautés pygmées de la RDC.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-12">
            {['Tous', 'Culture', 'Droits', 'Environnement', 'Santé', 'Éducation'].map(f => (
              <button key={f} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${f === 'Tous' ? 'bg-[#8B4513] text-white shadow-md' : 'bg-white text-[#4a3728] hover:bg-[#8B4513] hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {actualites.map((article) => (
              <Link key={article.id} href={`/actualites/${article.slug}`} className="article-card group">
                <div className="h-52 bg-gradient-to-br from-[#1a3009] to-[#2D5016] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id={`n${article.id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                          <polygon points="15,2 28,9 28,21 15,28 2,21 2,9" fill="none" stroke="#D4A853" strokeWidth="0.8"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#n${article.id})`}/>
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.categorie] || 'badge-culture'}`}>
                      {categoryLabels[article.categorie] || article.categorie}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[#4a3728]/50 text-xs mb-3">
                    {new Date(article.date_publication).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                    {article.auteur && ` • ${article.auteur}`}
                  </div>
                  <h2 className="font-display font-bold text-[#1A0A00] text-lg mb-3 line-clamp-2 group-hover:text-[#8B4513] transition-colors">
                    {article.titre}
                  </h2>
                  <p className="text-[#4a3728]/70 text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.extrait}
                  </p>
                  <div className="flex items-center text-[#8B4513] text-sm font-medium">
                    Lire la suite <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
