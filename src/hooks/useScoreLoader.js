import { useState, useRef, useCallback } from 'react'
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'

export function useScoreLoader() {
  const scoreRef = useRef(null)
  const osmdRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [showScore, setShowScore] = useState(false)
  const [scoreNotes, setScoreNotes] = useState([])
  const notesMapRef = useRef(new Map())
  const notesListRef = useRef([])

  const attachNoteHandlers = useCallback((notesList) => {
    const svg = scoreRef.current?.querySelector('svg')
    if (!svg) {
      console.warn('⚠️ SVG no encontrado')
      return
    }

    let svgNoteElements = []
    const selectors = [
      '[class*="notehead"]',
      'circle[r]',
      '[class*="note"]',
      'ellipse[class*="notehead"]'
    ]

    for (const selector of selectors) {
      svgNoteElements = Array.from(svg.querySelectorAll(selector))
      if (svgNoteElements.length > 0) {
        console.log(`✅ Se encontraron ${svgNoteElements.length} elementos de nota usando selector: ${selector}`)
        break
      }
    }

    if (svgNoteElements.length === 0) {
      console.warn('⚠️ No se encontraron elementos de notas en el SVG')
      return
    }

    notesMapRef.current.clear()

    svgNoteElements.forEach((element, svgIndex) => {
      const noteIdx = Math.min(svgIndex, notesList.length - 1)
      const noteData = notesList[noteIdx]

      if (noteData) {
        element.style.cursor = 'pointer'
        element.style.transition = 'filter 0.2s, opacity 0.2s'
        notesMapRef.current.set(element, noteData.name)

        element.addEventListener('mouseenter', () => {
          element.style.filter = 'brightness(1.3) drop-shadow(0 0 6px rgba(33, 150, 243, 0.8))'
          element.style.opacity = '0.8'
        })

        element.addEventListener('mouseleave', () => {
          element.style.filter = 'brightness(1)'
          element.style.opacity = '1'
        })

        element.addEventListener('click', (e) => {
          e.stopPropagation()
          setSelectedNote(noteData.name)
          console.log(`🎵 Nota seleccionada: ${noteData.name}`)

          // Quitar subrayado previo de todas las notas
          notesMapRef.current.forEach((_, el) => {
            el.removeAttribute('data-selected')
            const prevLine = el.parentNode?.querySelector('.note-underline')
            if (prevLine) prevLine.remove()
          })

          // Marcar la nota seleccionada con subrayado azul sutil
          element.setAttribute('data-selected', 'true')
          const bbox = element.getBBox()
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('class', 'note-underline')
          line.setAttribute('x1', bbox.x)
          line.setAttribute('y1', bbox.y + bbox.height + 3)
          line.setAttribute('x2', bbox.x + bbox.width)
          line.setAttribute('y2', bbox.y + bbox.height + 3)
          line.setAttribute('stroke', '#42a5f5')
          line.setAttribute('stroke-width', '2')
          line.setAttribute('stroke-opacity', '0.7')
          line.setAttribute('stroke-linecap', 'round')
          element.parentNode.appendChild(line)
        })
      }
    })
  }, [])

  const loadScore = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!scoreRef.current) return

      scoreRef.current.innerHTML = ''

      const response = await fetch('/HimnoAlegria.musicxml')
      if (!response.ok) throw new Error('No se pudo cargar el archivo MusicXML')

      const xmlText = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'application/xml')

      if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
        throw new Error('El archivo XML tiene errores de sintaxis')
      }

      const noteElements = xmlDoc.querySelectorAll('note')
      const notesList = []

      noteElements.forEach((note, idx) => {
        const pitchEl = note.querySelector('pitch')
        const rest = note.querySelector('rest')

        if (pitchEl && !rest) {
          const step = pitchEl.querySelector('step')?.textContent || ''
          const octave = pitchEl.querySelector('octave')?.textContent || ''
          const noteName = `${step}${octave}`
          notesList.push({ index: idx, name: noteName })
        }
      })

      notesListRef.current = notesList
      setScoreNotes(notesList)
      console.log(`✅ Se encontraron ${notesList.length} notas en el archivo XML`)

      const osmd = new OpenSheetMusicDisplay(scoreRef.current, {
        autoResize: true,
        drawingParameters: 'default'
      })

      osmdRef.current = osmd
      await osmd.load('/HimnoAlegria.musicxml')
      osmd.render()

      setTimeout(() => {
        attachNoteHandlers(notesList)
        setLoading(false)
      }, 200)

    } catch (err) {
      console.error('❌ Error al cargar la partitura:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [attachNoteHandlers])

  const handleLoadScore = useCallback(() => {
    setShowScore(true)
  }, [])

  const handleResize = useCallback(() => {
    if (!osmdRef.current) return
    osmdRef.current.render()
    attachNoteHandlers(notesListRef.current)
  }, [attachNoteHandlers])

  return {
    scoreRef,
    osmdRef,
    loading,
    error,
    selectedNote,
    showScore,
    scoreNotes,
    loadScore,
    handleLoadScore,
    handleResize
  }
}
