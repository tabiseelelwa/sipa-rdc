import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { Communaute } from '@/lib/types'

export async function GET() {
  try {
    const communautes = await query<Communaute[]>(
      'SELECT * FROM communautes ORDER BY population_estimee DESC'
    )
    return NextResponse.json({ success: true, data: communautes })
  } catch (error) {
    console.error('Erreur API communautés:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des données.' },
      { status: 500 }
    )
  }
}
