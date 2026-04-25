'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions, freeTextQuestions, getPokemonForScore } from '@/lib/questions'

type Phase = 'mc' | 'freetext'

export default function QuizPage() {
  const router = useRouter()
  const [participantName, setParticipantName] = useState('')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [freeTextAnswers, setFreeTextAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentQ, setCurrentQ] = useState(0)
  const [phase, setPhase] = useState<Phase>('mc')
  const [currentFT, setCurrentFT] = useState(0)

  useEffect(() => {
    const name = sessionStorage.getItem('participant_name')
    if (!name) { router.push('/'); return }
    setParticipantName(name)
  }, [router])

  const totalScore = Object.entries(answers).reduce((sum, [qid, idx]) => {
    const q = questions.find(q => q.id === qid)
    return sum + (q?.answers[idx]?.points ?? 0)
  }, 0)

  const mcAnsweredCount = Object.keys(answers).length
  const allMCAnswered = mcAnsweredCount === questions.length
  const currentQuestion = questions[currentQ]
  const isLastMC = currentQ === questions.length - 1
  const currentFTQ = freeTextQuestions[currentFT]
  const isLastFT = currentFT === freeTextQuestions.length - 1
  const allFTAnswered = freeTextQuestions.every(q => (freeTextAnswers[q.id] || '').trim().length > 0)

  const handleMCSelect = (answerIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerIdx }))
  }

  const handleSubmit = async () => {
    if (!allMCAnswered || !allFTAnswered || submitting) return
    setSubmitting(true)
    setError('')

    const answerPayload: Record<string, { text: string; points: number; index: number }> = {}
    questions.forEach(q => {
      const idx = answers[q.id]
      if (idx !== undefined) {
        answerPayload[q.id] = { text: q.answers[idx].text, points: q.answers[idx].points, index: idx }
      }
    })

    const pokemon = getPokemonForScore(totalScore)

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: participantName,
          answers: answerPayload,
          freeTextAnswers,
          totalScore,
          pokemonName: pokemon.name,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      sessionStorage.removeItem('participant_name')
      sessionStorage.setItem('quiz_result', JSON.stringify({ name: participantName, totalScore, pokemon }))
      router.push('/result')
    } catch {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (!participantName) return null

  const progressPct = phase === 'mc'
    ? (mcAnsweredCount / (questions.length + freeTextQuestions.length)) * 100
    : ((questions.length + currentFT) / (questions.length + freeTextQuestions.length)) * 100

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--muted)',
        position: 'sticky', top: 0,
        background: 'rgba(15,14,14,0.97)',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span className="font-display" style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>
            {participantName.toUpperCase()}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>
            {phase === 'mc' ? `${mcAnsweredCount} / ${questions.length + freeTextQuestions.length}` : `${questions.length + currentFT} / ${questions.length + freeTextQuestions.length}`}
          </span>
        </div>
        <div style={{ height: 3, background: 'var(--muted)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--gold)', borderRadius: 2, width: `${progressPct}%`, transition: 'width 0.3s ease' }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '28px 16px 100px' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>

          {phase === 'mc' ? (
            <>
              {/* MC question number */}
              <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span className="font-display" style={{ fontSize: '3rem', color: 'rgba(245,200,66,0.2)', lineHeight: 1 }}>
                  {String(currentQ + 1).padStart(2, '0')}
                </span>
                <span style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em' }}>OF {questions.length}</span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontWeight: 400, marginBottom: '24px', lineHeight: 1.45 }}>
                {currentQuestion.text}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {currentQuestion.answers.map((ans, i) => {
                  const selected = answers[currentQuestion.id] === i
                  return (
                    <button key={i} onClick={() => handleMCSelect(i)} style={{
                      padding: '16px 18px', borderRadius: '12px',
                      border: `1px solid ${selected ? 'var(--gold)' : 'var(--muted)'}`,
                      background: selected ? 'rgba(245,200,66,0.1)' : 'var(--card)',
                      color: selected ? 'var(--gold)' : 'var(--text)',
                      textAlign: 'left', cursor: 'pointer',
                      fontSize: 'clamp(0.9rem, 3.5vw, 1rem)',
                      fontFamily: 'DM Sans, sans-serif',
                      display: 'flex', alignItems: 'center', gap: '14px',
                      transition: 'all 0.15s',
                      WebkitTapHighlightColor: 'transparent',
                      minHeight: 56,
                    }}>
                      <span style={{
                        width: 32, height: 32, flexShrink: 0, borderRadius: '50%',
                        border: `1px solid ${selected ? 'var(--gold)' : 'var(--muted)'}`,
                        background: selected ? 'var(--gold)' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.8rem', fontFamily: 'Bebas Neue, sans-serif',
                        color: selected ? 'var(--dark)' : '#666',
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ flex: 1, lineHeight: 1.3 }}>{ans.text}</span>
                      {selected && <span style={{ fontSize: '1rem', flexShrink: 0 }}>✓</span>}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {currentQ > 0 && (
                  <button onClick={() => setCurrentQ(q => q - 1)} style={{
                    background: 'none', border: '1px solid var(--muted)', color: '#888',
                    padding: '14px 20px', borderRadius: 10, cursor: 'pointer',
                    fontFamily: 'Bebas Neue', fontSize: '1rem', letterSpacing: '0.05em',
                    minHeight: 52, WebkitTapHighlightColor: 'transparent',
                  }}>← Back</button>
                )}
                {!isLastMC ? (
                  <button
                    onClick={() => setCurrentQ(q => q + 1)}
                    disabled={answers[currentQuestion.id] === undefined}
                    className="btn-primary" style={{ flex: 1, minHeight: 52 }}
                  >Next →</button>
                ) : (
                  <button
                    onClick={() => { if (allMCAnswered) setPhase('freetext') }}
                    disabled={!allMCAnswered}
                    className="btn-primary" style={{ flex: 1, minHeight: 52 }}
                  >
                    {allMCAnswered ? 'Almost done →' : `${questions.length - mcAnsweredCount} left`}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Free text section header */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'inline-block', border: '1px solid var(--gold)',
                  color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em',
                  padding: '3px 12px', borderRadius: '999px', marginBottom: '12px',
                }}>
                  BONUS ROUND
                </div>
                <div style={{ marginBottom: '6px', display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span className="font-display" style={{ fontSize: '3rem', color: 'rgba(245,200,66,0.2)', lineHeight: 1 }}>
                    {String(currentFT + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: '#555', fontSize: '0.75rem', letterSpacing: '0.1em' }}>OF {freeTextQuestions.length}</span>
                </div>
                <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '8px' }}>
                  No points — just for laughs on the night 😂
                </p>
              </div>

              <h2 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontWeight: 400, marginBottom: '24px', lineHeight: 1.45 }}>
                {currentFTQ.text}
              </h2>

              <textarea
                value={freeTextAnswers[currentFTQ.id] || ''}
                onChange={e => setFreeTextAnswers(prev => ({ ...prev, [currentFTQ.id]: e.target.value }))}
                placeholder="Type your answer..."
                rows={3}
                style={{ marginBottom: '24px', fontSize: 'clamp(0.9rem, 3.5vw, 1rem)' }}
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => {
                  if (currentFT > 0) setCurrentFT(ft => ft - 1)
                  else setPhase('mc')
                }} style={{
                  background: 'none', border: '1px solid var(--muted)', color: '#888',
                  padding: '14px 20px', borderRadius: 10, cursor: 'pointer',
                  fontFamily: 'Bebas Neue', fontSize: '1rem', letterSpacing: '0.05em',
                  minHeight: 52, WebkitTapHighlightColor: 'transparent',
                }}>← Back</button>

                {!isLastFT ? (
                  <button
                    onClick={() => setCurrentFT(ft => ft + 1)}
                    disabled={!(freeTextAnswers[currentFTQ.id] || '').trim()}
                    className="btn-primary" style={{ flex: 1, minHeight: 52 }}
                  >Next →</button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allFTAnswered || submitting}
                    className="btn-primary" style={{ flex: 1, minHeight: 52 }}
                  >
                    {submitting ? 'Submitting...' : 'Submit 🍺'}
                  </button>
                )}
              </div>

              {error && <p style={{ color: 'var(--accent)', marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
