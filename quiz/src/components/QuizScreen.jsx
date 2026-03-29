import { useState, useEffect, useCallback, useRef } from 'react'
import QUESTIONS, { TOTAL_TIME, LETTERS } from '../data/questions'
import useTimer from '../hooks/useTimer'
import styles from './QuizScreen.module.css'

function QuizScreen({ onFinish }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showError, setShowError] = useState(false)
  const [timerKey, setTimerKey] = useState(0)

  const q = QUESTIONS[current]
  const progress = (current / QUESTIONS.length) * 100

  const advanceRef = useRef(null)

  const handleExpire = useCallback(() => {
    if (advanceRef.current) advanceRef.current(null)
  }, [])

  const { timeLeft } = useTimer(TOTAL_TIME, handleExpire, timerKey)

  useEffect(() => {
    setSelected(null)
    setShowError(false)
    setTimerKey((k) => k + 1)
  }, [current])

  const advance = useCallback(
    (sel) => {
      const updated = [...answers, { qIndex: current, selected: sel }]
      if (current + 1 < QUESTIONS.length) {
        setAnswers(updated)
        setCurrent((c) => c + 1)
      } else {
        onFinish(updated)
      }
    },
    [current, answers, onFinish]
  )

  advanceRef.current = advance

  const handleNext = () => {
    if (selected === null) {
      setShowError(true)
      setTimeout(() => setShowError(false), 2500)
      return
    }
    advance(selected)
  }

  const timerClass =
    timeLeft <= 5
      ? styles.danger
      : timeLeft <= 10
      ? styles.warning
      : ''

  return (
    <div className={styles.wrapper}>
      <div className={styles.quizWrap}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.qCounter}>
            Question <span>{current + 1}</span> / {QUESTIONS.length}
          </div>
          <div className={styles.timerWrap}>
            <span>⏱</span>
            <span className={`${styles.timerVal} ${timerClass}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Question Card */}
        <div className={styles.qCard}>
          <div className={styles.qBadge}>Question {current + 1}</div>
          <p className={styles.qText}>{q.question}</p>
        </div>

        {/* Options */}
        <div className={styles.optionsGrid}>
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`${styles.optionBtn} ${selected === i ? styles.selected : ''}`}
              onClick={() => { setSelected(i); setShowError(false) }}
            >
              <span className={`${styles.optLetter} ${selected === i ? styles.optLetterSelected : ''}`}>
                {LETTERS[i]}
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {showError && (
            <div className={styles.validationMsg}>
              ⚠️ Please select an answer before proceeding.
            </div>
          )}
          <button className={styles.btnNext} onClick={handleNext}>
            {current + 1 === QUESTIONS.length ? 'Submit Quiz ✓' : 'Next Question ➜'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default QuizScreen
