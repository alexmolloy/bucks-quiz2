'use client'
import { useState, useEffect } from 'react'
import { questions, MAX_SCORE } from '@/lib/questions'

interface AnswerEntry {
  text: string
  points: number
  index: number
}

interface Submission {
  name: string
  answers: Record<string, AnswerEntry>
  totalScore: number
  pokemonName: string
  pokemonColor: string
  submittedAt: string
}

export default function ResultsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [showAnswers, setShowAnswers] = useState(false)
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    fetch('/api/results')
      .then(r => r.json())
      .then(d => { setSubmissions(d.submissions || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  // Sort by score descending
  const sorted = [...submissions].sort((a, b) => b.totalScore - a.totalScore)

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* Header */}
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-block', border: '1px solid var(--gold)',
          color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.15em',
          padding: '4px 14px', borderRadius: '999px', marginBottom: '16px',
        }}>
          THE LEADERBOARD
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1, marginBottom: '8px' }}>
          WHO KNOWS<br /><span className="gold">RITCHIE BEST?</span>
        </h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          {submissions.length} participant{submissions.length !== 1 ? 's' : ''} · max {MAX_SCORE} pts
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={load} style={{
            background: 'none', border: '1px solid var(--muted)', color: '#888',
            padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem',
          }}>
            ↻ Refresh
          </button>
          <button
            onClick={() => setShowAnswers(v => !v)}
            style={{
              background: showAnswers ? 'rgba(245,200,66,0.1)' : 'none',
              border: `1px solid ${showAnswers ? 'var(--gold)' : 'var(--muted)'}`,
              color: showAnswers ? 'var(--gold)' : '#888',
              padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: '0.85rem',
            }}
          >
            {showAnswers ? 'Hide Answers' : 'See the Answers'}
          </button>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      ) : sorted.length === 0 ? (
        <div className="card" style={{ padding: '48px', textAlign: 'center', color: '#666' }}>
          No submissions yet. Share the link! 🍺
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sorted.map((s, i) => {
            const isExpanded = expandedPerson === s.name
            const pct = Math.round((s.totalScore / MAX_SCORE) * 100)
            return (
              <div key={i} className="card fade-up" style={{
                padding: '0',
                borderColor: i === 0 ? 'var(--gold)' : 'var(--muted)',
                overflow: 'hidden',
                animationDelay: `${i * 0.04}s`,
              }}>
                {/* Main row */}
                <div
                  onClick={() => showAnswers && setExpandedPerson(isExpanded ? null : s.name)}
                  style={{
                    padding: '18px 22px',
                    display: 'flex', alignItems: 'center', gap: '16px',
                    cursor: showAnswers ? 'pointer' : 'default',
                  }}
                >
                  {/* Rank */}
                  <div className="font-display" style={{
                    fontSize: '1.8rem', color: i === 0 ? 'var(--gold)' : '#444',
                    minWidth: 36, textAlign: 'center', lineHeight: 1,
                  }}>
                    {i + 1}
                  </div>

                  {/* Avatar */}
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: s.pokemonColor ? `${s.pokemonColor}33` : 'var(--muted)',
                    border: `1px solid ${s.pokemonColor || 'var(--muted)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue', fontSize: '1.1rem',
                    color: s.pokemonColor || '#888',
                    flexShrink: 0,
                  }}>
                    {s.name[0].toUpperCase()}
                  </div>

                  {/* Name + pokemon + bar */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 500, fontSize: '1rem' }}>{s.name}</span>
                      <span style={{
                        fontSize: '0.7rem', letterSpacing: '0.1em',
                        color: s.pokemonColor || '#888',
                        border: `1px solid ${s.pokemonColor || 'var(--muted)'}`,
                        padding: '1px 8px', borderRadius: '999px',
                      }}>
                        {s.pokemonName}
                      </span>
                    </div>
                    {/* Score bar */}
                    <div style={{ height: 4, background: 'var(--muted)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 2,
                        width: `${pct}%`,
                        background: s.pokemonColor || 'var(--gold)',
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="font-display" style={{ fontSize: '1.5rem', color: s.pokemonColor || 'var(--text)', lineHeight: 1 }}>
                      {s.totalScore}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#555' }}>/ {MAX_SCORE}</div>
                  </div>

                  {showAnswers && (
                    <div style={{ color: '#555', fontSize: '0.8rem', marginLeft: '4px' }}>
                      {isExpanded ? '▲' : '▼'}
                    </div>
                  )}
                </div>

                {/* Expanded answers */}
                {showAnswers && isExpanded && (
                  <div style={{ borderTop: '1px solid var(--muted)', padding: '20px 22px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {questions.map((q, qi) => {
                        const ans = s.answers?.[q.id]
                        return (
                          <div key={q.id} style={{ borderLeft: '2px solid var(--muted)', paddingLeft: '14px' }}>
                            <p style={{ color: '#555', fontSize: '0.75rem', marginBottom: '4px' }}>
                              Q{qi + 1}: {q.text}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                              <p style={{ color: 'var(--text)', fontSize: '0.95rem' }}>
                                {ans?.text ?? <em style={{ color: '#444' }}>No answer</em>}
                              </p>
                              {ans !== undefined && (
                                <span style={{
                                  flexShrink: 0,
                                  padding: '2px 10px', borderRadius: '999px',
                                  fontSize: '0.75rem',
                                  background: ans.points > 0 ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.05)',
                                  color: ans.points > 0 ? 'var(--gold)' : '#555',
                                  border: `1px solid ${ans.points > 0 ? 'var(--gold)' : 'var(--muted)'}`,
                                }}>
                                  +{ans.points} pt{ans.points !== 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '60px', color: '#333', fontSize: '0.75rem' }}>
        Ritchie's Bucks Party 🍺
      </div>
    </main>
  )
}
