'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { questions, BUCK_NAME, getPokemonForScore } from '@/lib/questions'

export default function QuizPage() {
  const router = useRouter()
  const [participantName, setParticipantName] = useState('')
  const [answers, setAnswers] = useState<Record<string, number>>({}) // questionId -> answer index
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentQ, setCurrentQ] = useState(0)

  useEffect(() => {
    const name = sessionStorage.getItem('participant_name')
    if (!name) { router.push('/'); return }
    setParticipantName(name)
  }, [router])

  const totalScore = Object.entries(answers).reduce((sum, [qid, idx]) => {
    const q = questions.find(q => q.id === qid)
    return sum + (q?.answers[idx]?.points ?? 0)
  }, 0)

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length
  const currentQuestion = questions[currentQ]
  const isLastQuestion = currentQ === questions.length - 1

  const handleSelect = (answerIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: answerIdx }))
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) setCurrentQ(q => q + 1)
  }

  const handleBack = () => {
    if (currentQ > 0) setCurrentQ(q => q - 1)
  }

  const handleSubmit = async () => {
    if (!allAnswered || submitting) return
    setSubmitting(true)
    setError('')

    // Build answer payload with text + points
    const answerPayload: Record<string, { text: string; points: number; index: number }> = {}
    questions.forEach(q => {
      const idx = answers[q.id]
      if (idx !== undefined) {
        answerPayload[q.id] = {
          text: q.answers[idx].text,
          points: q.answers[idx].points,
          index: idx,
        }
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

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        background: 'rgba(15,14,14,0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 10,
      }}>
        <span className="font-display" style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>
          {participantName.toUpperCase()}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => setCurrentQ(i)}
              style={{
                width: 28, height: 28,
                borderRadius: '50%',
                border: '1px solid',
                borderColor: i === currentQ ? 'var(--gold)' : answers[q.id] !== undefined ? 'var(--gold)' : 'var(--muted)',
                background: answers[q.id] !== undefined ? (i === currentQ ? 'var(--gold)' : 'rgba(245,200,66,0.2)') : 'transparent',
                color: i === currentQ ? 'var(--dark)' : answers[q.id] !== undefined ? 'var(--gold)' : '#666',
                fontSize: '0.7rem',
                fontFamily: 'Bebas Neue, sans-serif',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px' }}>
        <div style={{ maxWidth: 560, width: '100%' }}>

          <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="font-display" style={{ fontSize: '3.5rem', color: 'rgba(245,200,66,0.2)', lineHeight: 1 }}>
              {String(currentQ + 1).padStart(2, '0')}
            </span>
            <span style={{ color: '#555', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              OF {questions.length}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 400, marginBottom: '32px', lineHeight: 1.4 }}>
            {currentQuestion.text}
          </h2>

          {/* Answer options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {currentQuestion.answers.map((ans, i) => {
              const selected = answers[currentQuestion.id] === i
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: selected ? 'var(--gold)' : 'var(--muted)',
                    background: selected ? 'rgba(245,200,66,0.1)' : 'var(--card)',
                    color: selected ? 'var(--gold)' : 'var(--text)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'DM Sans, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.15s',
                    transform: selected ? 'translateX(4px)' : 'none',
                  }}
                >
                  <span style={{
                    width: 28, height: 28,
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: selected ? 'var(--gold)' : 'var(--muted)',
                    background: selected ? 'var(--gold)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '0.75rem',
                    fontFamily: 'Bebas Neue, sans-serif',
                    color: selected ? 'var(--dark)' : '#666',
                  }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {ans.text}
                </button>
              )
            })}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {currentQ > 0 && (
              <button onClick={handleBack} style={{
                background: 'none', border: '1px solid var(--muted)', color: '#888',
                padding: '12px 20px', borderRadius: 8, cursor: 'pointer',
                fontFamily: 'Bebas Neue', fontSize: '1rem', letterSpacing: '0.05em',
              }}>
                ← Back
              </button>
            )}

            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion.id] === undefined}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered || submitting}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                {submitting ? 'Submitting...' : allAnswered ? 'Submit 🍺' : `Answer all questions first (${questions.length - answeredCount} left)`}
              </button>
            )}
          </div>

          {error && <p style={{ color: 'var(--accent)', marginTop: '16px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</p>}
        </div>
      </div>
    </main>
  )
}
