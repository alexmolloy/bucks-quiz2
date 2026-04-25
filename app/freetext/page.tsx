'use client'
import { useState, useEffect } from 'react'
import { freeTextQuestions } from '@/lib/questions'

interface Submission {
  name: string
  freeTextAnswers: Record<string, string>
  pokemonColor: string
}

export default function FreeTextPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [activeQ, setActiveQ] = useState(0)

  const load = () => {
    setLoading(true)
    fetch('/api/results')
      .then(r => r.json())
      .then(d => { setSubmissions(d.submissions || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const currentQ = freeTextQuestions[activeQ]

  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 80px' }}>

      {/* Header */}
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: '36px' }}>
        <a href="/results" style={{
          display: 'inline-block', color: '#666', fontSize: '0.8rem',
          textDecoration: 'none', marginBottom: '20px',
          WebkitTapHighlightColor: 'transparent',
        }}>← Back to Leaderboard</a>

        <div style={{
          display: 'inline-block', border: '1px solid var(--gold)',
          color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em',
          padding: '4px 14px', borderRadius: '999px', marginBottom: '14px',
        }}>
          BONUS ROUND
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)', lineHeight: 1, marginBottom: '8px' }}>
          THE <span className="gold">UNSCORED</span><br />RESPONSES
        </h1>
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '20px' }}>
          {submissions.length} response{submissions.length !== 1 ? 's' : ''} · no points · maximum chaos
        </p>

        {/* Question tabs */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {freeTextQuestions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setActiveQ(i)}
              style={{
                padding: '8px 16px', borderRadius: 8,
                border: `1px solid ${activeQ === i ? 'var(--gold)' : 'var(--muted)'}`,
                background: activeQ === i ? 'rgba(245,200,66,0.1)' : 'transparent',
                color: activeQ === i ? 'var(--gold)' : '#888',
                fontSize: '0.8rem', cursor: 'pointer',
                minHeight: 40, WebkitTapHighlightColor: 'transparent',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Question {i + 1}
            </button>
          ))}
          <button onClick={load} style={{
            background: 'none', border: '1px solid var(--muted)', color: '#555',
            padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem',
            minHeight: 40, WebkitTapHighlightColor: 'transparent',
          }}>↻</button>
        </div>
      </div>

      {/* Active question */}
      <div className="card fade-up" style={{ padding: '20px', marginBottom: '20px' }}>
        <p style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '6px' }}>
          QUESTION {activeQ + 1}
        </p>
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: 400 }}>{currentQ.text}</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      ) : submissions.length === 0 ? (
        <div className="card" style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
          No responses yet 🦗
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {submissions.map((s, i) => {
            const answer = s.freeTextAnswers?.[currentQ.id]
            if (!answer) return null
            const color = s.pokemonColor || '#888'
            return (
              <div key={i} className="card fade-up" style={{
                padding: '16px',
                animationDelay: `${i * 0.04}s`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: `${color}22`, border: `1px solid ${color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue', fontSize: '0.95rem', color,
                  }}>
                    {s.name[0].toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 500, fontSize: '0.9rem', color: '#ccc' }}>{s.name}</span>
                </div>
                <p style={{
                  color: 'var(--text)', fontSize: 'clamp(0.95rem, 3.5vw, 1.05rem)',
                  lineHeight: 1.5, paddingLeft: '44px',
                  fontStyle: 'italic',
                }}>
                  "{answer}"
                </p>
              </div>
            )
          }).filter(Boolean)}
        </div>
      )}

      {/* Prev / Next nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
        <button
          onClick={() => setActiveQ(q => Math.max(0, q - 1))}
          disabled={activeQ === 0}
          style={{
            background: 'none', border: '1px solid var(--muted)',
            color: activeQ === 0 ? '#333' : '#888',
            padding: '10px 20px', borderRadius: 8,
            cursor: activeQ === 0 ? 'default' : 'pointer',
            fontFamily: 'Bebas Neue', fontSize: '1rem', letterSpacing: '0.05em',
            minHeight: 44, WebkitTapHighlightColor: 'transparent',
          }}
        >← Prev</button>
        <button
          onClick={() => setActiveQ(q => Math.min(freeTextQuestions.length - 1, q + 1))}
          disabled={activeQ === freeTextQuestions.length - 1}
          style={{
            background: 'none', border: '1px solid var(--muted)',
            color: activeQ === freeTextQuestions.length - 1 ? '#333' : '#888',
            padding: '10px 20px', borderRadius: 8,
            cursor: activeQ === freeTextQuestions.length - 1 ? 'default' : 'pointer',
            fontFamily: 'Bebas Neue', fontSize: '1rem', letterSpacing: '0.05em',
            minHeight: 44, WebkitTapHighlightColor: 'transparent',
          }}
        >Next →</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: '48px', color: '#333', fontSize: '0.72rem' }}>
        Ritchie's Bucks Party 🍺
      </div>
    </main>
  )
}
