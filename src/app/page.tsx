import Link from 'next/link'
import { ArrowRight, ChevronDown, Users, MapPin, Music, Shield, TreePine, Heart } from 'lucide-react'
import { query } from '@/lib/db'
import { Communaute, Actualite, Statistique } from '@/lib/types'

async function getData() {
  try {
    const communautes = await query<Communaute[]>(
      'SELECT * FROM communautes LIMIT 4'
    )
    const actualites = await query<Actualite[]>(
      'SELECT * FROM v_actualites_recentes LIMIT 3'
    )
    const stats = await query<Statistique[]>(
      'SELECT * FROM statistiques'
    )
    return { communautes, actualites, stats }
  } catch {
    // Fallback data si la BDD n'est pas encore connectée
    return {
      communautes: [
        { id: 1, nom: 'Aka (Bambuti)', slug: 'aka-bambuti', region: 'Forêt équatoriale', province: 'Équateur', population_estimee: 25000, langue: 'Mongo', description: 'Maîtres de la polyphonie vocale', territoire: '', specificites: 'Musique UNESCO', image_url: '' },
        { id: 2, nom: 'Baka', slug: 'baka', region: 'Forêt du nord-est', province: 'Haut-Uélé', population_estimee: 15000, langue: 'Baka', description: 'Chasseurs-cueilleurs de la forêt d\'Ituri', territoire: '', specificites: 'Chasse au filet', image_url: '' },
        { id: 3, nom: 'Twa (Batwa)', slug: 'twa-batwa', region: 'Grands Lacs', province: 'Nord-Kivu', population_estimee: 80000, langue: 'Kinyarwanda', description: 'Gardiens des forêts montagneuses', territoire: '', specificites: 'Poterie exceptionnelle', image_url: '' },
        { id: 4, nom: 'Mbuti', slug: 'mbuti', region: 'Forêt d\'Ituri', province: 'Ituri', population_estimee: 35000, langue: 'Kango', description: 'Enfants ancestraux de la forêt d\'Ituri', territoire: '', specificites: 'Philosophie de la forêt', image_url: '' },
      ] as Communaute[],
      actualites: [
        { id: 1, titre: 'Les Mbuti reçoivent la reconnaissance de leurs droits fonciers', slug: 'mbuti-droits-fonciers', extrait: 'Une décision historique reconnaît les droits ancestraux sur 45 000 hectares de forêt.', categorie: 'droits', auteur: 'Rédaction', publie: true, date_publication: '2024-03-15', contenu: '' },
        { id: 2, titre: 'Festival International de Musique Pygmée à Kinshasa', slug: 'festival-musique', extrait: 'La capitale congolaise accueille 12 groupes musicaux venus de toute la RDC.', categorie: 'culture', auteur: 'Amani Katembo', publie: true, date_publication: '2024-06-01', contenu: '' },
        { id: 3, titre: 'Nouvelle clinique de médecine traditionnelle en forêt équatoriale', slug: 'clinique-medecine', extrait: 'Un partenariat OMS-guérisseurs Aka crée un centre alliant médecines moderne et ancestrale.', categorie: 'sante', auteur: 'Dr. Mukendi', publie: true, date_publication: '2024-04-20', contenu: '' },
      ] as Actualite[],
      stats: [
        { id: 1, cle: 'population_totale', valeur: '600 000', label: 'Pygmées en RDC', icone: 'users' },
        { id: 2, cle: 'communautes', valeur: '5+', label: 'Groupes principaux', icone: 'map-pin' },
        { id: 3, cle: 'langues', valeur: '12', label: 'Langues et dialectes', icone: 'music' },
        { id: 4, cle: 'hectares_foret', valeur: '2M+', label: 'Hectares de forêt ancestrale', icone: 'trees' },
      ] as Statistique[],
    }
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

export default async function HomePage() {
  const { communautes, actualites, stats } = await getData()

  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="hero-bg min-h-screen relative overflow-hidden flex items-center">
        {/* Motif SVG géométrique pygmée */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* <pattern id="pygmee-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <polygon points="40,5 75,22 75,58 40,75 5,58 5,22" fill="none" stroke="#D4A853" strokeWidth="1"/>
                <polygon points="40,20 60,30 60,50 40,60 20,50 20,30" fill="none" stroke="#C4622D" strokeWidth="0.5"/>
                <circle cx="40" cy="40" r="3" fill="#D4A853" opacity="0.5"/>
              </pattern> */}
            </defs>
            <rect width="100%" height="100%" fill="url(#pygmee-pattern)" />
          </svg>
        </div>

        {/* Superposition forêt */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1A0A00]/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#D4A853]/20 border border-[#D4A853]/40 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
              <span className="text-[#D4A853] text-sm font-medium tracking-wide">
                Peuple ancestral de la forêt équatoriale
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] hero-text-shadow mb-6 leading-tight">
              Voix de la<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A853] to-[#C4622D]">
                Forêt
              </span>
            </h1>

            <p className="text-[#F5F0E8]/80 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed">
              Les Pygmées de la RDC — gardiens millénaires de la forêt équatoriale,
              dépositaires d&apos;un patrimoine culturel et écologique irremplaçable.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/communautes" className="btn-primary text-base px-8 py-4">
                Découvrir nos communautés
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/culture" className="btn-outline text-base px-8 py-4">
                Notre patrimoine
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
          <ChevronDown className="w-8 h-8 text-[#D4A853]" />
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="bg-[#1A0A00] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.id} className={`text-center animate-fade-in-up delay-${i * 100}`}>
                <div className="text-4xl md:text-5xl font-bold font-display text-[#D4A853] mb-2">
                  {stat.valeur}
                </div>
                <div className="text-[#F5F0E8]/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INTRO ==================== */}
      <section className="py-24 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#8B4513] font-semibold uppercase tracking-widest text-sm mb-4">
                Qui sommes-nous
              </div>
              <h2 className="section-title mb-6">
                Les premiers habitants<br />de la forêt équatoriale
              </h2>
              <p className="text-[#4a3728] text-lg leading-relaxed mb-6">
                Les Pygmées de la République Démocratique du Congo sont parmi les plus anciens
                habitants du continent africain. Leur présence dans la forêt équatoriale remonte
                à plus de 40 000 ans, faisant d&apos;eux les véritables gardiens de l&apos;un des
                écosystèmes les plus riches et les plus menacés de la planète.
              </p>
              <p className="text-[#4a3728] text-lg leading-relaxed mb-8">
                Répartis en plusieurs groupes — Mbuti, Aka, Batwa, Baka et Cwa — ils partagent
                une relation spirituelle et écologique profonde avec la forêt, un mode de vie
                fondé sur la solidarité, et un patrimoine culturel d&apos;une richesse exceptionnelle.
              </p>
              <Link href="/a-propos" className="btn-primary">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Ornement SVG */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#3e6670] to-[#3e6670] p-8 flex items-center justify-center">
                <svg viewBox="0 0 300 300" className="w-full h-full max-w-xs">
                  {/* Cercles concentriques */}
                  <circle cx="150" cy="150" r="130" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.4" />
                  <circle cx="150" cy="150" r="100" fill="none" stroke="#C4622D" strokeWidth="1.5" opacity="0.5" />
                  <circle cx="150" cy="150" r="70" fill="none" stroke="#D4A853" strokeWidth="1" opacity="0.6" />

                  {/* Motif central */}
                  {/* <polygon points="150,30 270,110 270,190 150,270 30,190 30,110"
                    fill="none" stroke="#D4A853" strokeWidth="2" opacity="0.8" /> */}

                  {/* Arbres stylisés */}
                  <g fill="#2D5016" opacity="0.8">
                    <polygon points="150,60 170,100 130,100" />
                    <polygon points="150,80 175,120 125,120" />
                    <rect x="145" y="120" width="10" height="20" fill="#8B4513" />
                  </g>

                  {/* Étoiles */}
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180
                    const x = 150 + 115 * Math.cos(rad)
                    const y = 150 + 115 * Math.sin(rad)
                    return <circle key={i} cx={x} cy={y} r="4" fill="#D4A853" opacity="0.7" />
                  })}

                  <text x="150" y="200" textAnchor="middle" fill="#F5F0E8" fontSize="11" fontFamily="Georgia, serif" opacity="0.9">
                    Gardiens de la Forêt
                  </text>
                </svg>
              </div>

              {/* Badges flottants */}
              <div className="absolute -top-4 -right-4 bg-[#D4A853] text-[#1A0A00] rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-2xl font-bold font-display">40K</div>
                <div className="text-xs font-medium">ans d&apos;histoire</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#0483a7] text-[#F5F0E8] rounded-2xl px-4 py-3 shadow-xl">
                <div className="text-2xl font-bold font-display">600K</div>
                <div className="text-xs font-medium">personnes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== COMMUNAUTÉS ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[#8B4513] font-semibold uppercase tracking-widest text-sm mb-4">
              Diversité
            </div>
            <h2 className="section-title text-center">Nos Communautés</h2>
            <p className="section-subtitle text-center mt-4">
              Cinq groupes distincts, une même âme forestière — chacun porteur d&apos;une
              identité culturelle et linguistique unique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communautes.slice(0, 4).map((c, i) => (
              <Link
                key={c.id}
                href={`/communautes/${c.slug}`}
                className={`card-hover article-card group animate-fade-in-up delay-${i * 100}`}
              >
                {/* Image placeholder avec motif */}
                <div className="h-48 bg-gradient-to-br from-[#0483a7] to-[#1A0A00] relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TreePine className="w-16 h-16 text-[#D4A853] opacity-60" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="text-[#D4A853] text-xs font-medium">{c.province}</div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#1A0A00] mb-2 group-hover:text-[#8B4513] transition-colors">
                    {c.nom}
                  </h3>
                  <p className="text-[#4a3728]/70 text-sm mb-4 line-clamp-2">
                    {c.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#8B4513] text-sm font-medium">
                    <Users className="w-4 h-4" />
                    <span>{c.population_estimee?.toLocaleString('fr-FR')} personnes</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#2D5016] text-sm mt-1">
                    <MapPin className="w-4 h-4" />
                    <span>{c.region}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/communautes" className="btn-primary">
              Voir toutes les communautés <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PATRIMOINE CULTUREL ==================== */}
      <section className="py-24 bg-[#F5F0E8] pattern-foret">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-[#8B4513] font-semibold uppercase tracking-widest text-sm mb-4">
              Héritage
            </div>
            <h2 className="section-title text-center">Patrimoine Vivant</h2>
            <p className="section-subtitle text-center mt-4">
              Chants, danses, médecine, spiritualité — un trésor de l&apos;humanité
              transmis de génération en génération.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Music,
                color: 'from-[#8B4513] to-[#C4622D]',
                titre: 'Musique & Chants',
                desc: 'La polyphonie vocale des Aka, inscrite au patrimoine immatériel de l\'UNESCO, est une forme d\'art unique au monde. Chaque voix tisse librement sa mélodie dans une improvisation collective.',
                href: '/culture#musique',
              },
              {
                icon: Shield,
                color: 'from-[#2D5016] to-[#4a8a2a]',
                titre: 'Droits & Territoire',
                desc: 'Depuis des millénaires, les Pygmées sont les gardiens de la forêt. Aujourd\'hui, leur lutte pour la reconnaissance de leurs droits fonciers est au cœur de nos combats.',
                href: '/culture#droits',
              },
              {
                icon: Heart,
                color: 'from-[#D4A853] to-[#8B4513]',
                titre: 'Médecine Traditionnelle',
                desc: 'Les guérisseurs pygmées maîtrisent une pharmacopée extraordinaire avec plus de 300 plantes médicinales. Ce savoir ancestral est aujourd\'hui étudié par la science moderne.',
                href: '/culture#medecine',
              },
            ].map((item, i) => (
              <div key={i} className={`bg-white rounded-2xl overflow-hidden shadow-lg card-hover animate-fade-in-up delay-${i * 200}`}>
                <div className={`h-3 bg-gradient-to-r ${item.color}`} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1A0A00] mb-4">
                    {item.titre}
                  </h3>
                  <p className="text-[#4a3728]/80 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                  <Link href={item.href} className="text-[#8B4513] font-medium hover:text-[#C4622D] transition-colors flex items-center gap-1">
                    Découvrir <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ACTUALITÉS ==================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-[#8B4513] font-semibold uppercase tracking-widest text-sm mb-4">
                Actualités
              </div>
              <h2 className="section-title">Dernières Nouvelles</h2>
            </div>
            <Link href="/actualites" className="text-[#8B4513] font-medium hover:text-[#C4622D] transition-colors flex items-center gap-2 shrink-0">
              Toutes les actualités <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {actualites.map((article, i) => (
              <Link
                key={article.id}
                href={`/actualites/${article.slug}`}
                className={`article-card group animate-fade-in-up delay-${i * 100}`}
              >
                {/* Image placeholder */}
                <div className="h-52 bg-gradient-to-br from-[#1a3009] to-[#2D5016] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <pattern id={`news${i}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                          <polygon points="15,2 28,9 28,21 15,28 2,21 2,9" fill="none" stroke="#D4A853" strokeWidth="0.8" />
                        </pattern>
                      </defs>
                      <rect width="200" height="200" fill={`url(#news${i})`} />
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
                    {new Date(article.date_publication).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                    {article.auteur && ` • ${article.auteur}`}
                  </div>
                  <h3 className="font-display font-bold text-[#1A0A00] text-lg mb-3 line-clamp-2 group-hover:text-[#8B4513] transition-colors">
                    {article.titre}
                  </h3>
                  <p className="text-[#4a3728]/70 text-sm leading-relaxed line-clamp-3">
                    {article.extrait}
                  </p>
                  <div className="mt-4 flex items-center text-[#8B4513] text-sm font-medium">
                    Lire la suite <ArrowRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-24 bg-gradient-to-br from-[#1A0A00] via-[#2D5016] to-[#1A0A00] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <polygon points="30,3 57,18 57,42 30,57 3,42 3,18" fill="none" stroke="#D4A853" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6">
            Rejoignez Notre Combat
          </h2>
          <p className="text-[#F5F0E8]/80 text-xl mb-10 max-w-2xl mx-auto">
            La forêt a besoin de voix pour la défendre. Soutenez les communautés pygmées
            dans leur lutte pour leurs droits, leur culture et leur territoire.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg px-10 py-4">
              Nous soutenir <Heart className="w-5 h-5" />
            </Link>
            <Link href="/a-propos" className="btn-outline text-lg px-10 py-4">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
