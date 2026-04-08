import { useEffect, useRef, useCallback } from 'react'
import * as Tone from 'tone'

export default function NotePlayer({ note, scoreNotes = [] }) {
  const synthRef = useRef(null)

  useEffect(() => {
    synthRef.current = new Tone.Synth({
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.02,
        decay: 0.2,
        sustain: 0.3,
        release: 1
      }
    }).toDestination()

    return () => {
      synthRef.current?.dispose()
      synthRef.current = null
    }
  }, [])

  const playNote = useCallback(async () => {
    if (!note || !synthRef.current) return

    await Tone.start()
    synthRef.current.triggerAttackRelease(note, '8n')
  }, [note])

  const partRef = useRef(null)

  const stopFullScore = useCallback(() => {
    if (partRef.current) {
      partRef.current.stop()
      partRef.current.dispose()
      partRef.current = null
    }
    Tone.Transport.stop()
    Tone.Transport.cancel()
  }, [])

  const playFullScore = useCallback(async () => {
    if (!scoreNotes.length || !synthRef.current) return

    await Tone.start()
    stopFullScore()

    const events = scoreNotes.map((item, index) => [index * 0.5, item.name])
    const part = new Tone.Part((time, noteName) => {
      synthRef.current.triggerAttackRelease(noteName, '4n', time)
    }, events)

    partRef.current = part
    part.start(0)
    Tone.Transport.start()
  }, [scoreNotes, stopFullScore])

  useEffect(() => {
    if (note) {
      void playNote()
    }
  }, [note, playNote])

  useEffect(() => {
    return () => {
      partRef.current?.stop()
      partRef.current?.dispose()
      partRef.current = null
      synthRef.current?.dispose()
    }
  }, [])

  if (!note) return null

  return (
    <div id='sonidoNota' style={{
      position: 'relative',
      backgroundColor: '#e8f4ff',
      border: '2px solid #90caf9',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px',
      textAlign: 'center',
      minHeight: '170px'
    }}>
      <p style={{ margin: 0, color: '#0d47a1', fontSize: '14px' }}>Reproduciendo nota:</p>
      <strong style={{ display: 'block', fontSize: '28px', color: '#1e88e5' }}>{note}</strong>
      <button
        type="button"
        onClick={playNote}
        style={{
          marginTop: '12px',
          padding: '10px 18px',
          borderRadius: '999px',
          border: 'none',
          backgroundColor: '#1976d2',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        Reproducir nuevamente
      </button>
      <button
        type="button"
        onClick={playFullScore}
        disabled={!scoreNotes.length}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          padding: '10px 16px',
          borderRadius: '999px',
          border: 'none',
          backgroundColor: '#0d47a1',
          color: '#fff',
          cursor: scoreNotes.length ? 'pointer' : 'not-allowed',
          opacity: scoreNotes.length ? 1 : 0.55
        }}
      >
        Reproducir partitura entera
      </button>
    </div>
  )
}
