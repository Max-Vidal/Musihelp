import { useEffect } from 'react'
import './App.css'
import { useScoreLoader } from './hooks/useScoreLoader'
import Header from './components/Header'
import Footer from './components/Footer'
import InfoSection from './components/InfoSection'
import PianoImage from './components/PianoImage'
import UploadButton from './components/UploadButton'
import SelectedNote from './components/SelectedNote'
import NotePlayer from './components/NotePlayer'
import LoadingState from './components/LoadingState'
import ErrorState from './components/ErrorState'
import ScoreContainer from './components/ScoreContainer'
import Instructions from './components/Instructions'

function App() {
  const {
    scoreRef,
    osmdRef,
    loading,
    error,
    selectedNote,
    scoreNotes,
    showScore,
    loadScore,
    handleLoadScore,
    handleResize
  } = useScoreLoader()

  useEffect(() => {
    let resizeTimeout = null

    const onResize = () => {
      if (!osmdRef.current) return
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        handleResize()
      }, 200)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimeout)
    }
  }, [handleResize])

  useEffect(() => {
    if (showScore) {
      loadScore()
    }
  }, [showScore, loadScore])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#77AEFF',
      padding: '30px 20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <Header />

      {!showScore && <UploadButton onLoadScore={handleLoadScore} />}

      {showScore && selectedNote && <SelectedNote note={selectedNote} />}
      {showScore && selectedNote && <NotePlayer note={selectedNote} scoreNotes={scoreNotes} />}
      {showScore && loading && <LoadingState />}

      {showScore && error && <ErrorState error={error} />}

      {showScore && <ScoreContainer ref={scoreRef} />}

      {showScore && <Instructions />}

      <PianoImage />

      <InfoSection />

      <Footer />
    </div>
  )
}

export default App
