'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MAX_SCORE } from '@/lib/questions'

interface PokemonResult {
  name: string
  blurb: string
  imageUrl: string
  color: string
}

interface QuizResult {
  name: string
  totalScore: number
  pokemon: PokemonResult
}

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('quiz_result')
    if (!raw) { router.push('/'); return }
    setResult(JSON.parse(raw))
    setTimeout(() => setRevealed(true), 300)
  }, [router])

  if (!result) return null

  const { name, totalScore, pokemon } = result

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ maxWidth: 460, width: '100%', textAlign: 'center' }}>

        {/* Score badge */}
        <div className="fade-up" style={{ marginBottom: '16px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: `1px solid ${pokemon.color}`,
            padding: '5px 16px', borderRadius: '999px',
            fontSize: '0.75rem', letterSpacing: '0.12em',
            color: pokemon.color,
          }}>
            SCORE: {totalScore} / {MAX_SCORE}
          </div>
        </div>

        {/* Pokemon image */}
        <div style={{
          position: 'relative', marginBottom: '4px',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <div style={{
            position: 'absolute', inset: '20%',
            background: `radial-gradient(circle, ${pokemon.color}44 0%, transparent 70%)`,
            filter: 'blur(20px)',
          }} />
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{
              width: 'clamp(160px, 45vw, 200px)',
              height: 'clamp(160px, 45vw, 200px)',
              objectFit: 'contain',
              position: 'relative', zIndex: 1,
            }}
          />
        </div>

        {/* Pokemon name */}
        <div className="fade-up">
          <p style={{ color: '#666', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '2px' }}>
            {name.toUpperCase()}, YOU ARE
          </p>
          <h1 className="font-display" style={{
            fontSize: 'clamp(3rem, 14vw, 5.5rem)',
            lineHeight: 1,
            color: pokemon.color,
            marginBottom: '20px',
            textShadow: `0 0 40px ${pokemon.color}66`,
          }}>
            {pokemon.name.toUpperCase()}
          </h1>
        </div>

        {/* Blurb */}
        <div className="card fade-up" style={{ padding: '20px', marginBottom: '24px', textAlign: 'left' }}>
          <p style={{ lineHeight: 1.7, color: '#ccc', fontSize: 'clamp(0.875rem, 3.5vw, 1rem)', fontStyle: 'italic' }}>
            "{pokemon.blurb}"
          </p>
        </div>

        {/* CTA */}
        <a href="/results" className="btn-primary" style={{ textDecoration: 'none', display: 'block', minHeight: 52, lineHeight: '52px', padding: '0 24px' }}>
          See Everyone's Results →
        </a>

        <p style={{ color: '#444', fontSize: '0.72rem', marginTop: '20px' }}>
          Ritchie's Bucks Party 🍺
        </p>
      </div>
    </main>
  )
}
