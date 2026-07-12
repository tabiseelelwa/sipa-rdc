import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { Actualite } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorie = searchParams.get('categorie')
    const limit = parseInt(searchParams.get('limit') || '10')

    let sql = 'SELECT * FROM actualites WHERE publie = true'
    const params: unknown[] = []

    if (categorie && categorie !== 'tous') {
      sql += ' AND categorie = ?'
      params.push(categorie)
    }

    sql += ' ORDER BY date_publication DESC LIMIT ?'
    params.push(limit)

    const actualites = await query<Actualite[]>(sql, params)
    return NextResponse.json({ success: true, data: actualites })
  } catch (error) {
    console.error('Erreur API actualités:', error)
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des données.' },
      { status: 500 }
    )
  }
}
