import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { getPokemonForScore } from '@/lib/questions'

const redis = Redis.fromEnv()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, answers, totalScore } = body

    if (!name || !answers) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const pokemon = getPokemonForScore(totalScore)

    const submission = {
      name: name.trim(),
      answers,
      totalScore,
      pokemonName: pokemon.name,
      pokemonColor: pokemon.color,
      submittedAt: new Date().toISOString(),
    }

    const key = `submission:${Date.now()}:${name.trim().toLowerCase().replace(/\s+/g, '_')}`
    await redis.set(key, submission)
    await redis.lpush('submissions_list', key)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
