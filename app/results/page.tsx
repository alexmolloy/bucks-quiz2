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
  freeTextAnswers: Record<string, string>
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

  const sorted = [...submissions].sort((a, b) => b.totalScore - a.totalScore)

  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '32px 16px 80px' }}>

      {/* Header */}
      <div className="fade-up" style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-block', border: '1px solid var(--gold)',
          color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em',
          padding: '4px 14px', borderRadius: '999px', marginBottom: '14px',
        }}>
          THE LEADERBOARD
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)', lineHeight: 1, marginBottom: '8px' }}>
          WHO KNOWS<br /><span className="gold">RITCHIE BEST?</span>
        </h1>
        <p style={{ color: '#666', marginBottom: '16px', fontSize: '0.875rem' }}>
          {submissions.length} participant{submissions.length !== 1 ? 's' : ''} · max {MAX_SCORE} pts
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={load} style={{
            background: 'none', border: '1px solid var(--muted)', color: '#888',
            padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem',
            minHeight: 40, WebkitTapHighlightColor: 'transparent',
          }}>↻ Refresh</button>
          <button
            onClick={() => { setShowAnswers(v => !v); setExpandedPerson(null) }}
            style={{
              background: showAnswers ? 'rgba(245,200,66,0.1)' : 'none',
              border: `1px solid ${showAnswers ? 'var(--gold)' : 'var(--muted)'}`,
              color: showAnswers ? 'var(--gold)' : '#888',
              padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem',
              minHeight: 40, WebkitTapHighlightColor: 'transparent',
            }}
          >
            {showAnswers ? 'Hide Answers' : 'See the Answers'}
          </button>
          <a href="/freetext" style={{
            background: 'none', border: '1px solid var(--muted)', color: '#888',
            padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.8rem',
            minHeight: 40, display: 'inline-flex', alignItems: 'center',
            textDecoration: 'none', WebkitTapHighlightColor: 'transparent',
          }}>
            😂 Bonus Responses
          </a>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
      ) : sorted.length === 0 ? (
        <div className="card" style={{ padding: '40px 20px', textAlign: 'center', color: '#666' }}>
          No submissions yet. Share the link! 🍺
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sorted.map((s, i) => {
            const isExpanded = expandedPerson === s.name
            const pct = Math.round((s.totalScore / MAX_SCORE) * 100)
            const color = s.pokemonColor || 'var(--gold)'
            return (
              <div key={i} className="card fade-up" style={{
                overflow: 'hidden',
                borderColor: i === 0 ? 'var(--gold)' : 'var(--muted)',
                animationDelay: `${i * 0.04}s`,
              }}>
                <div
                  onClick={() => showAnswers && setExpandedPerson(isExpanded ? null : s.name)}
                  style={{
                    padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    cursor: showAnswers ? 'pointer' : 'default',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  <div className="font-display" style={{
                    fontSize: '1.6rem', color: i === 0 ? 'var(--gold)' : '#444',
                    minWidth: 28, textAlign: 'center', lineHeight: 1, flexShrink: 0,
                  }}>{i + 1}</div>

                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: `${color}22`, border: `1px solid ${color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue', fontSize: '1rem', color,
                  }}>
                    {s.name[0].toUpperCase()}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 500, fontSize: 'clamp(0.875rem, 3.5vw, 1rem)', whiteSpace: 'nowrap' }}>{s.name}</span>
                      <span style={{
                        fontSize: '0.65rem', letterSpacing: '0.08em', color,
                        border: `1px solid ${color}`, padding: '1px 7px', borderRadius: '999px', whiteSpace: 'nowrap',
                      }}>{s.pokemonName}</span>
                    </div>
                    <div style={{ height: 3, background: 'var(--muted)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 2, width: `${pct}%`, background: color, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div className="font-display" style={{ fontSize: '1.4rem', color, lineHeight: 1 }}>{s.totalScore}</div>
                    <div style={{ fontSize: '0.65rem', color: '#555' }}>/ {MAX_SCORE}</div>
                  </div>

                  {showAnswers && (
                    <div style={{ color: '#555', fontSize: '0.75rem', flexShrink: 0 }}>{isExpanded ? '▲' : '▼'}</div>
                  )}
                </div>

                {showAnswers && isExpanded && (
                  <div style={{ borderTop: '1px solid var(--muted)', padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {questions.map((q, qi) => {
                        const ans = s.answers?.[q.id]
                        return (
                          <div key={q.id} style={{ borderLeft: '2px solid var(--muted)', paddingLeft: '12px' }}>
                            <p style={{ color: '#555', fontSize: '0.72rem', marginBottom: '3px' }}>Q{qi + 1}: {q.text}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                              <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.3 }}>
                                {ans?.text ?? <em style={{ color: '#444' }}>No answer</em>}
                              </p>
                              {ans !== undefined && (
                                <span style={{
                                  flexShrink: 0, padding: '2px 8px', borderRadius: '999px', fontSize: '0.7rem',
                                  background: ans.points > 0 ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
                                  color: ans.points > 0 ? 'var(--gold)' : '#555',
                                  border: `1px solid ${ans.points > 0 ? 'var(--gold)' : 'var(--muted)'}`,
                                }}>+{ans.points}pt</span>
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

      <div style={{ textAlign: 'center', marginTop: '48px', color: '#333', fontSize: '0.72rem' }}>
        Ritchie's Bucks Party 🍺
      </div>
    </main>
  )
}
