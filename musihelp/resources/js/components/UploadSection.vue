<template>
  <section class="upload-section">
    <div
      class="upload-box"
      :class="{ 'drag-over': isDragging }"
      @click="triggerFileInput"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <div class="upload-icon">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="36" cy="32" r="22" stroke="#111" stroke-width="2.5" fill="none"/>
          <path d="M36 44 V20" stroke="#111" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M28 27 L36 19 L44 27" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24 52 Q24 56 36 56 Q48 56 48 52" stroke="#111" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        </svg>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept=".pdf"
        class="hidden-input"
        @change="handleFileChange"
      />
    </div>

    <div class="upload-meta">
      <p class="upload-label">SUBE TU PARTITURA</p>
      <p v-if="fileName" class="file-name">{{ fileName }}</p>
      <p v-if="loading" class="upload-status">Subiendo y convirtiendo... espera un momento.</p>
      <p v-if="error" class="upload-error">{{ error }}</p>
    </div>

    <div v-if="musicXml" class="score-wrapper">
      <div ref="scoreContainer" class="score-container"></div>
      <div class="note-panel">
        <p class="note-panel-label">Haz click en una nota en la partitura o en la lista para ver su nombre.</p>
        <p v-if="selectedNoteName" class="selected-note">Nota seleccionada: <strong>{{ selectedNoteName }}</strong></p>
        <div class="note-list">
          <button
            v-for="(note, index) in notes"
            :key="index"
            type="button"
            class="note-chip"
            @click="selectNote(index)"
          >
            {{ note }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'

export default {
  name: 'UploadSection',
  data() {
    return {
      isDragging: false,
      fileName: null,
      musicXml: null,
      notes: [],
      selectedNoteName: null,
      loading: false,
      error: null,
      osmd: null
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    async handleFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.fileName = file.name
        await this.uploadFile(file)
      }
    },
    async handleDrop(e) {
      this.isDragging = false
      const file = e.dataTransfer.files[0]
      if (file) {
        this.fileName = file.name
        await this.uploadFile(file)
      }
    },
    async uploadFile(file) {
      this.loading = true
      this.error = null
      this.musicXml = null
      this.notes = []
      this.selectedNoteName = null

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('http://localhost:8080/api/convert', {
          method: 'POST',
          body: formData
        })

        const text = await response.text()
        if (!response.ok) {
          throw new Error(text || `HTTP ${response.status}`)
        }

        if (!text || text.trim().length === 0) {
          throw new Error('La API devolvió contenido vacío.')
        }

        this.musicXml = text
        this.notes = this.parseMusicXml(text)
        await this.renderScore(text)
      } catch (err) {
        this.error = err.message || 'Error al convertir el PDF.'
      } finally {
        this.loading = false
      }
    },
    parseMusicXml(xml) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, 'application/xml')
      const pitchNotes = Array.from(doc.querySelectorAll('note'))
        .filter(note => !note.querySelector('rest'))
        .map(note => {
          const step = note.querySelector('pitch > step')?.textContent || ''
          const alter = note.querySelector('pitch > alter')?.textContent
          const octave = note.querySelector('pitch > octave')?.textContent || ''
          let name = `${step}${octave}`.trim()
          if (alter === '1') name = `${step}#${octave}`
          if (alter === '-1') name = `${step}b${octave}`
          return name || 'Nota desconocida'
        })
      return pitchNotes
    },
    async renderScore(xml) {
      try {
        if (!this.osmd) {
          this.osmd = new OpenSheetMusicDisplay(this.$refs.scoreContainer, {
            autoResize: true,
            drawTitle: true,
            followCursor: false,
            drawPartNames: true,
            pageBackgroundColor: 'transparent'
          })
        }

        await this.osmd.load(xml)
        await this.osmd.render()
        this.attachNoteClickers()
      } catch (err) {
        this.error = 'No se pudo renderizar la partitura: ' + err.message
      }
    },
    attachNoteClickers() {
      const svg = this.$refs.scoreContainer.querySelector('svg')
      if (!svg) return

      const noteElements = svg.querySelectorAll('g[class*="vf-note"], g[class*="vf-stavenote"], g[class*="vf-chord"]')
      noteElements.forEach((element, index) => {
        element.style.cursor = 'pointer'
        element.dataset.noteIndex = index
        element.onclick = () => this.selectNote(index)
      })
    },
    selectNote(index) {
      if (index < 0 || index >= this.notes.length) {
        this.selectedNoteName = 'Nota desconocida'
        return
      }
      this.selectedNoteName = this.notes[index]
      const noteButtons = this.$el.querySelectorAll('.note-chip')
      noteButtons.forEach((button, idx) => {
        button.classList.toggle('active-note', idx === index)
      })
    }
  }
}
</script>

<style scoped>
.upload-section {
  background-color: var(--blue-bg);
  padding: 32px 24px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.upload-box {
  background: var(--white);
  border-radius: 18px;
  width: 220px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

.upload-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(74, 144, 217, 0.25);
}

.upload-box.drag-over {
  border: 2.5px dashed var(--blue-primary);
  background: var(--blue-light);
  transform: scale(1.02);
}

.hidden-input {
  display: none;
}

.upload-meta {
  width: 100%;
  text-align: center;
}

.upload-label {
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.1em;
  color: var(--black);
}

.file-name {
  font-size: 13px;
  color: var(--blue-dark);
  font-weight: 500;
  text-align: center;
  word-break: break-all;
  max-width: 260px;
}

.upload-status,
.upload-error {
  font-size: 14px;
  margin-top: 8px;
}

.upload-error {
  color: #b91c1c;
}

.score-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding-top: 24px;
}

.score-container {
  width: 100%;
  min-height: 360px;
  background: #fff;
  border-radius: 18px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  overflow-x: auto;
}

.note-panel {
  width: 100%;
  text-align: center;
}

.note-panel-label {
  font-size: 14px;
  color: var(--black);
  margin-bottom: 8px;
}

.selected-note {
  font-size: 16px;
  margin-bottom: 12px;
}

.note-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.note-chip {
  border: none;
  background: var(--white);
  color: var(--blue-dark);
  padding: 10px 14px;
  border-radius: 999px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.note-chip:hover,
.note-chip.active-note {
  transform: translateY(-2px);
  background-color: var(--blue-primary);
  color: var(--white);
}

@media (max-width: 900px) {
  .upload-section {
    width: 100%;
    padding: 24px;
  }
}
</style>
