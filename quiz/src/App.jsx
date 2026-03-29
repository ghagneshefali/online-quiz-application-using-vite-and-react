import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

const SCREENS = {
  WELCOME: 'welcome',
  QUIZ: 'quiz',
  RESULT: 'result',
}

function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME)
  const [finalAnswers, setFinalAnswers] = useState([])
  const [quizKey, setQuizKey] = useState(0)

  const handleStart = () => setScreen(SCREENS.QUIZ)

  const handleFinish = (answers) => {
    setFinalAnswers(answers)
    setScreen(SCREENS.RESULT)
  }

  const handleRetry = () => {
    setFinalAnswers([])
    setQuizKey((k) => k + 1)
    setScreen(SCREENS.WELCOME)
  }

  return (
    <>
      {screen === SCREENS.WELCOME && <WelcomeScreen onStart={handleStart} />}
      {screen === SCREENS.QUIZ && <QuizScreen key={quizKey} onFinish={handleFinish} />}
      {screen === SCREENS.RESULT && <ResultScreen answers={finalAnswers} onRetry={handleRetry} />}
    </>
  )
}

export default App
