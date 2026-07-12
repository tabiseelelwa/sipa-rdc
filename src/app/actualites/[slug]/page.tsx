import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { query } from '@/lib/db'
import { Actualite } from '@/lib/types'

async function getArticle(slug: string) {
  try {
    const results = await query<Actualite[]>(
      'SELECT * FROM actualites WHERE slug = ? AND publie = true',
      [slug]
    )
    return results[0] || null
  } catch {
    return null
  }
}

const categoryLabels: Record<string, string> = {
  culture: 'Culture', droits: 'Droits', environnement: 'Environnement',
  sante: 'Santé', education: 'Éducation', international: 'International',
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  return (
    <>
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/actualites" className="inline-flex items-center gap-2 text-[#D4A853] hover:text-[#F5F0E8] transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Toutes les actualités
          </Link>
          <div className="mb-4">
            <span className="bg-[#8B4513]/20 text-[#D4A853] px-3 py-1 rounded-full text-sm font-semibold border border-[#8B4513]/30">
              {categoryLabels[article.categorie] || article.categorie}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F5F0E8] mb-6 leading-tight">
            {article.titre}
          </h1>
          <div className="flex flex-wrap gap-6 text-[#F5F0E8]/60 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.date_publication).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            {article.auteur && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.auteur}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            {article.extrait && (
              <p className="text-[#4a3728] text-xl leading-relaxed font-medium border-l-4 border-[#8B4513] pl-6 mb-8">
                {article.extrait}
              </p>
            )}
            {article.contenu ? (
              <div
                className="prose prose-lg max-w-none text-[#4a3728]"
                dangerouslySetInnerHTML={{ __html: article.contenu }}
              />
            ) : (
              <p className="text-[#4a3728]/60 italic">Contenu de l&apos;article à compléter.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
