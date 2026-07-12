import Link from 'next/link'
import { BiMapPin } from 'react-icons/bi'
import { FaFacebook, FaLeaf, FaMailchimp,FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#1A0A00] text-[#F5F0E8]">
      {/* Motif décoratif pygmée */}
      <div className="h-2 bg-gradient-to-r from-[#8B4513] via-[#D4A853] to-[#2D5016]" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* À propos */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B4513] to-[#C4622D] flex items-center justify-center">
                <FaLeaf className="w-6 h-6 text-[#F5F0E8]" />
              </div>
              <div>
                <div className="text-xl font-bold font-display">Pygmées de la RDC</div>
                <div className="text-[#D4A853] text-xs tracking-widest uppercase">Voix de la Forêt</div>
              </div>
            </div>
            <p className="text-[#F5F0E8]/70 leading-relaxed mb-6 max-w-sm">
              Plateforme dédiée à la promotion, la protection et la valorisation de la culture
              et des droits des Peuples Autochtones, des personnes vulnérables et des communautés locales de la RDC en vue de leur développement durable,
              leur résilience économique et sociale, le renforcement des capacités, la paix et l’assistance humanitaire adaptée.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8B4513] transition-colors">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8B4513] transition-colors">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#8B4513] transition-colors">
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-[#D4A853] font-semibold mb-6 uppercase tracking-wider text-sm">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                ['/', 'Accueil'],
                ['/communautes', 'Nos Communautés'],
                ['/culture', 'Culture & Patrimoine'],
                ['/actualites', 'Actualités'],
                ['/galerie', 'Galerie'],
                ['/a-propos', 'À Propos'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#F5F0E8]/70 hover:text-[#D4A853] transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#D4A853] font-semibold mb-6 uppercase tracking-wider text-sm">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BiMapPin className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                <span className="text-[#F5F0E8]/70 text-sm">
                  N° 17 Av. ATHENEE, Quartier Ndendere, Commune d’Ibanda, Ville de Bukavu, Province du Sud-Kivu en République Démocratique du Congo
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaMailchimp className="w-4 h-4 text-[#D4A853] shrink-0" />
                <a href="mailto:contact@pygmees-rdc.org" className="text-[#F5F0E8]/70 hover:text-[#D4A853] text-sm transition-colors">
                  sipardc@gmail.com, amulimwanuka@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-[#D4A853] shrink-0" />
                <span className="text-[#F5F0E8]/70 text-sm">(+243) 997 757 992 - 997 896 718 - 973 000 673
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de fond */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F5F0E8]/50 text-sm">
            © {new Date().getFullYear()} Pygmées de la RDC. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="text-[#F5F0E8]/50 hover:text-[#D4A853] text-sm transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-[#F5F0E8]/50 hover:text-[#D4A853] text-sm transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
