import QUESTIONS from '../data/questions'
import styles from './ResultScreen.module.css'

function getGrade(pct) {
  if (pct >= 80) return { label: 'Excellent! 🏆', cls: styles.gradeA }
  if (pct >= 60) return { label: 'Good Job! 👍', cls: styles.gradeB }
  if (pct >= 40) return { label: 'Keep Practicing 📚', cls: styles.gradeC }
  return { label: 'Needs Improvement 💪', cls: styles.gradeD }
}

function getEmoji(pct) {
  if (pct >= 80) return '🎉'
  if (pct >= 60) return '😊'
  if (pct >= 40) return '😐'
  return '😔'
}

function ResultScreen({ answers, onRetry }) {
  const correct = answers.filter((a) => a.selected === QUESTIONS[a.qIndex].correct).length
  const wrong   = answers.filter((a) => a.selected !== null && a.selected !== QUESTIONS[a.qIndex].correct).length
  const skipped = answers.filter((a) => a.selected === null).length
  const pct     = Math.round((correct / QUESTIONS.length) * 100)
  const { label, cls } = getGrade(pct)

  return (
    <div className={styles.wrapper}>
      <div className={styles.resultWrap}>

        {/* Score Hero */}
        <div className={styles.scoreHero}>
          <span className={styles.scoreEmoji}>{getEmoji(pct)}</span>
          <div className={styles.scoreLabel}>Your Score</div>
          <div className={styles.scoreNumber}>{pct}%</div>
          <div className={styles.scoreSub}>{correct} out of {QUESTIONS.length} correct</div>
          <div className={`${styles.gradeBadge} ${cls}`}>{label}</div>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={`${styles.statVal} ${styles.cGreen}`}>{correct}</div>
            <div className={styles.statLbl}>Correct</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statVal} ${styles.cRed}`}>{wrong}</div>
            <div className={styles.statLbl}>Incorrect</div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statVal} ${styles.cBlue}`}>{skipped}</div>
            <div className={styles.statLbl}>Skipped</div>
          </div>
        </div>

        {/* Review */}
        <div className={styles.reviewTitle}>Answer Review</div>
        <div className={styles.reviewList}>
          {answers.map((a, i) => {
            const isCorrect = a.selected === QUESTIONS[a.qIndex].correct
            const isSkipped = a.selected === null
            return (
              <div className={styles.reviewItem} key={i}>
                <div className={`${styles.reviewDot} ${isCorrect ? styles.dotCorrect : styles.dotWrong}`} />
                <div>
                  <div className={styles.reviewQ}>{QUESTIONS[a.qIndex].question}</div>
                  <div className={styles.reviewA}>
                    {isSkipped ? (
                      <>
                        <span className={styles.skippedLabel}>Skipped — </span>
                        <span className={styles.rCorrect}>
                          Correct: {QUESTIONS[a.qIndex].options[QUESTIONS[a.qIndex].correct]}
                        </span>
                      </>
                    ) : (
                      <>
                        Your answer:{' '}
                        <span className={isCorrect ? styles.rCorrect : styles.rWrong}>
                          {QUESTIONS[a.qIndex].options[a.selected]}
                        </span>
                        {!isCorrect && (
                          <> — Correct:{' '}
                            <span className={styles.rCorrect}>
                              {QUESTIONS[a.qIndex].options[QUESTIONS[a.qIndex].correct]}
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button className={styles.btnRetry} onClick={onRetry}>
          🔄 Retake Quiz
        </button>
      </div>
    </div>
  )
}

export default ResultScreen
