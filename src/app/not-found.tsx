import Link from 'next/link'
import { TreePine, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen hero-bg flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
            <TreePine className="w-16 h-16 text-[#D4A853]" />
          </div>
        </div>
        <div className="text-[#D4A853] text-8xl font-bold font-display mb-4">404</div>
        <h1 className="text-[#F5F0E8] text-3xl font-display font-bold mb-4">
          Page introuvable
        </h1>
        <p className="text-[#F5F0E8]/70 text-lg mb-8 max-w-md mx-auto">
          Cette page s&apos;est perdue dans la forêt. Revenons sur le sentier principal.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
