import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nom, email, sujet, message } = body

    // Validation basique
    if (!nom || !email || !sujet || !message) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis.' },
        { status: 400 }
      )
    }

    if (nom.length > 100 || email.length > 150 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Les données soumises dépassent la taille maximale autorisée.' },
        { status: 400 }
      )
    }

    // Récupérer l'IP
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown'

    // Insérer en BDD
    await query(
      `INSERT INTO contacts (nom, email, sujet, message, ip_address) VALUES (?, ?, ?, ?, ?)`,
      [nom, email, sujet, message, ip]
    )

    return NextResponse.json(
      { success: true, message: 'Message envoyé avec succès.' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
