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
    // Trigger reveal animation
    setTimeout(() => setRevealed(true), 300)
  }, [router])

  if (!result) return null

  const { name, totalScore, pokemon } = result

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>

        {/* Score badge */}
        <div className="fade-up" style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            border: `1px solid ${pokemon.color}`,
            padding: '6px 18px', borderRadius: '999px',
            fontSize: '0.8rem', letterSpacing: '0.12em',
            color: pokemon.color,
          }}>
            SCORE: {totalScore} / {MAX_SCORE}
          </div>
        </div>

        {/* Pokemon image */}
        <div style={{
          position: 'relative', marginBottom: '8px',
          opacity: revealed ? 1 : 0,
          transform: revealed ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(30px)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          {/* Glow behind image */}
          <div style={{
            position: 'absolute', inset: '20%',
            background: `radial-gradient(circle, ${pokemon.color}44 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(20px)',
          }} />
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            style={{ width: 220, height: 220, objectFit: 'contain', position: 'relative', zIndex: 1, imageRendering: 'auto' }}
          />
        </div>

        {/* Pokemon name */}
        <div className="fade-up">
          <p style={{ color: '#666', fontSize: '0.75rem', letterSpacing: '0.2em', marginBottom: '4px' }}>
            {name.toUpperCase()}, YOU ARE
          </p>
          <h1 className="font-display" style={{
            fontSize: 'clamp(3.5rem, 12vw, 6rem)',
            lineHeight: 1,
            color: pokemon.color,
            marginBottom: '24px',
            textShadow: `0 0 40px ${pokemon.color}66`,
          }}>
            {pokemon.name.toUpperCase()}
          </h1>
        </div>

        {/* Blurb */}
        <div className="card fade-up" style={{ padding: '24px 28px', marginBottom: '32px', textAlign: 'left' }}>
          <p style={{ lineHeight: 1.7, color: '#ccc', fontSize: '1rem', fontStyle: 'italic' }}>
            "{pokemon.blurb}"
          </p>
        </div>

        {/* CTA */}
        <div className="fade-up" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/results" className="btn-primary" style={{ textDecoration: 'none' }}>
            See Everyone's Results →
          </a>
        </div>

        <p style={{ color: '#444', fontSize: '0.75rem', marginTop: '24px' }}>
          Ritchie's Bucks Party 🍺
        </p>
      </div>
    </main>
  )
}
