'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ nom: '', email: '', sujet: '', message: '' })
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Une erreur est survenue')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Impossible d\'envoyer le message. Veuillez réessayer.')
      setStatus('error')
    }
  }

  return (
    <>
      <section className="hero-bg pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-[#D4A853] font-semibold uppercase tracking-widest text-sm mb-4">Contactez-nous</div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#F5F0E8] mb-6">Contact</h1>
          <p className="text-[#F5F0E8]/80 text-xl max-w-2xl mx-auto">
            Pour une question, un partenariat, un soutien — écrivez-nous.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Infos de contact */}
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1A0A00] mb-8">Nos coordonnées</h2>

              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: 'Adresse', value: 'N° 17 Av. ATHENEE, Quartier Ndendere, Commune d’Ibanda, Ville de Bukavu, Province du Sud-Kivu, RDC', color: 'bg-[#8B4513]' },
                  { icon: Mail, label: 'Email', value: 'sipardc@gmail.com', color: 'bg-[#2D5016]' },
                  { icon: Phone, label: 'Téléphone', value: '+243 997 757 992', color: 'bg-[#D4A853]' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[#4a3728]/60 text-xs uppercase tracking-wider mb-1">{label}</div>
                      <div className="text-[#1A0A00] font-medium whitespace-pre-line">{value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment nous soutenir */}
              <div className="bg-gradient-to-br from-[#1A0A00] to-[#2D5016] rounded-2xl p-6 text-[#F5F0E8]">
                <h3 className="font-display font-bold text-lg mb-3">Comment nous soutenir ?</h3>
                <ul className="space-y-2 text-sm text-[#F5F0E8]/80">
                  <li>• Don financier pour nos programmes</li>
                  <li>• Partage de nos publications</li>
                  <li>• Bénévolat et expertise</li>
                  <li>• Partenariat institutionnel</li>
                  <li>• Sensibilisation dans votre réseau</li>
                </ul>
              </div>
            </div>

            {/* Formulaire */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
                <h2 className="font-display text-2xl font-bold text-[#1A0A00] mb-8">
                  Envoyez-nous un message
                </h2>

                {status === 'success' && (
                  <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-green-800 text-sm">
                      Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <p className="text-red-800 text-sm">{errorMsg}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4a3728] mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.nom}
                        onChange={e => setForm({ ...form, nom: e.target.value })}
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#F5F0E8]/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] transition-all text-[#1A0A00]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4a3728] mb-2">
                        Adresse email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="votre@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#F5F0E8]/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] transition-all text-[#1A0A00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4a3728] mb-2">
                      Sujet *
                    </label>
                    <select
                      required
                      value={form.sujet}
                      onChange={e => setForm({ ...form, sujet: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#F5F0E8]/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] transition-all text-[#1A0A00]"
                    >
                      <option value="">Choisissez un sujet</option>
                      <option value="partenariat">Proposition de partenariat</option>
                      <option value="don">Don et soutien financier</option>
                      <option value="media">Demande média / journaliste</option>
                      <option value="recherche">Recherche académique</option>
                      <option value="benevolat">Bénévolat</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4a3728] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Décrivez votre demande en détail..."
                      className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-[#F5F0E8]/50 focus:outline-none focus:ring-2 focus:ring-[#8B4513]/30 focus:border-[#8B4513] transition-all text-[#1A0A00] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
