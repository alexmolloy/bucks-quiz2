'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BUCK_NAME, MAX_SCORE } from '@/lib/questions'

export default function Home() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleStart = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    setLoading(true)
    sessionStorage.setItem('participant_name', trimmed)
    router.push('/quiz')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: 480, width: '100%', textAlign: 'center' }} className="fade-up">

        <div style={{
          display: 'inline-block', border: '1px solid var(--gold)',
          color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em',
          padding: '4px 14px', borderRadius: '999px', marginBottom: '24px',
        }}>
          BUCKS PARTY QUIZ
        </div>

        <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 12vw, 5.5rem)', lineHeight: 1, marginBottom: '8px' }}>
          HOW WELL DO<br />
          <span className="gold">YOU KNOW</span><br />
          {BUCK_NAME.toUpperCase()}?
        </h1>

        <p style={{ color: '#888', marginBottom: '12px', fontSize: '1rem', lineHeight: 1.6 }}>
          {MAX_SCORE} points up for grabs. Answer correctly and earn a powerful Pokémon.<br />
          Answer badly and, well... Magikarp is still a Pokémon.
        </p>

        {/* Pokeball decoration */}
        <div style={{ margin: '24px auto', width: 60, height: 60, position: 'relative' }}>
          <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <circle cx="30" cy="30" r="28" fill="none" stroke="var(--muted)" strokeWidth="2"/>
            <path d="M2 30 Q2 2 30 2 Q58 2 58 30" fill="rgba(245,200,66,0.1)" stroke="var(--gold)" strokeWidth="1.5" />
            <line x1="2" y1="30" x2="58" y2="30" stroke="var(--muted)" strokeWidth="2"/>
            <circle cx="30" cy="30" r="7" fill="var(--card)" stroke="var(--muted)" strokeWidth="2"/>
            <circle cx="30" cy="30" r="3" fill="var(--gold)" />
          </svg>
        </div>

        <div className="card" style={{ padding: '32px', textAlign: 'left' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.12em', color: '#888', marginBottom: '8px' }}>
            YOUR NAME
          </label>
          <input
            type="text"
            placeholder="Enter your name..."
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleStart()}
            maxLength={40}
            autoFocus
          />
          <button
            className="btn-primary"
            style={{ marginTop: '20px', width: '100%' }}
            onClick={handleStart}
            disabled={!name.trim() || loading}
          >
            {loading ? 'Loading...' : 'Start the Quiz →'}
          </button>
        </div>

        <p style={{ color: '#444', fontSize: '0.75rem', marginTop: '20px' }}>
          Results are visible to everyone on the night 🍺
        </p>
      </div>
    </main>
  )
}
