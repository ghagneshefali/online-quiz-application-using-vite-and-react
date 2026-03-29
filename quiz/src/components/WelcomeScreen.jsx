import styles from './WelcomeScreen.module.css'

function WelcomeScreen({ onStart }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.welcome}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🧠</div>
          <span className={styles.logoText}>QuizMaster</span>
        </div>

        <h1 className={styles.heading}>Test Your General Knowledge</h1>
        <p className={styles.subtext}>
          Challenge yourself with 10 fun general knowledge questions.
          Each question has a 30-second timer — think fast!
        </p>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.num}>10</div>
            <div className={styles.label}>Questions</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.num}>30s</div>
            <div className={styles.label}>Per Question</div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.num}>MCQ</div>
            <div className={styles.label}>Format</div>
          </div>
        </div>

        <button className={styles.btnStart} onClick={onStart}>
          Start Quiz ➜
        </button>
      </div>
    </div>
  )
}

export default WelcomeScreen
