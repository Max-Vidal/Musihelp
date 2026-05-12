<template>
  <section class="about-section">
    <!-- Left: description -->
    <div class="about-text">
      <h2 class="about-title">QUE ES MUSIHELP?</h2>
      <p class="about-body">
        Musihelp es un proyecto dedicado a ayudar a músicos amateur y novatos
        para afinar sus instrumentos y poder traducir partituras a acordes y
        notas entendibles para los músicos que no saben leer partituras
        tradicionales.
      </p>
    </div>

    <!-- Center: phone mockup -->
    <div class="phone-wrapper">
      <div class="phone-shell">
        <div class="phone-notch"></div>
        <div class="phone-screen">
          <div class="app-topbar">
            <span class="topbar-icon">☰</span>
            <span class="topbar-title">AFINADOR</span>
            <span class="topbar-icon">⊕</span>
          </div>

          <div class="note-selector">
            <button class="note-btn" :class="{ active: selectedNote === 'A' }" @click="selectedNote = 'A'">A</button>
            <span class="note-arrow">&lt;&gt;</span>
            <button class="note-btn" :class="{ active: selectedNote === 'B' }" @click="selectedNote = 'B'">B</button>
          </div>

          <div class="tuner-dial">
            <div class="dial-ring">
              <div class="dial-needle" :style="needleStyle"></div>
            </div>
            <div class="dial-center">
              <span class="dial-note">{{ currentDisplay }}</span>
            </div>
          </div>

          <div class="app-buttons">
            <button class="btn-outline">Guitarra</button>
            <button class="btn-outline">Batería</button>
          </div>
          <button class="btn-convert">♪ Convertidor</button>
        </div>
      </div>
    </div>

    <!-- Right: app description -->
    <div class="tuner-text">
      <h3 class="tuner-title">APP AFINADOR</h3>
      <p class="tuner-body">
        Con Musihelp tú, artista, no te tienes que volver a preocupar por si tu
        instrumento no está afinado correctamente, con un simple botón tienes un
        ayudante que te garantiza una afinación perfecta para tu instrumento.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      selectedNote: 'A',
      needleAngle: -15,
      animating: false
    }
  },
  computed: {
    currentDisplay() {
      return this.selectedNote + '#'
    },
    needleStyle() {
      return {
        transform: `rotate(${this.needleAngle}deg)`
      }
    }
  },
  mounted() {
    this.startNeedleAnimation()
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  methods: {
    startNeedleAnimation() {
      let dir = 1
      this.interval = setInterval(() => {
        this.needleAngle += dir * 1.5
        if (this.needleAngle > 20 || this.needleAngle < -20) dir *= -1
      }, 60)
    }
  }
}
</script>

<style scoped>
.about-section {
  background-color: var(--blue-bg);
  padding: 32px 16px 40px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: start;
}

/* ── Text columns ── */
.about-text,
.tuner-text {
  padding-top: 8px;
}

.about-title,
.tuner-title {
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: 0.06em;
  color: var(--black);
  margin-bottom: 8px;
}

.about-body,
.tuner-body {
  font-size: 11.5px;
  line-height: 1.6;
  color: var(--gray-text);
}

/* ── Phone shell ── */
.phone-wrapper {
  display: flex;
  justify-content: center;
}

.phone-shell {
  background: var(--black);
  border-radius: 28px;
  width: 120px;
  padding: 10px 6px 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.28);
  position: relative;
}

.phone-notch {
  width: 36px;
  height: 6px;
  background: #333;
  border-radius: 4px;
  margin: 0 auto 8px;
}

.phone-screen {
  background: var(--white);
  border-radius: 20px;
  padding: 8px 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Top bar */
.app-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 9px;
  font-weight: 600;
  color: var(--black);
  padding: 0 2px;
}

.topbar-icon {
  font-size: 10px;
  color: var(--blue-primary);
}

/* Note selector */
.note-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.note-btn {
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--black);
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background 0.15s;
}

.note-btn.active {
  color: var(--blue-primary);
}

.note-btn:hover {
  background: var(--blue-light);
}

.note-arrow {
  font-size: 11px;
  color: #888;
}

/* Dial */
.tuner-dial {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
}

.dial-ring {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid var(--blue-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dial-needle {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 2px;
  height: 22px;
  background: var(--blue-primary);
  transform-origin: bottom center;
  border-radius: 2px;
  margin-left: -1px;
  transition: transform 0.06s linear;
}

.dial-center {
  position: relative;
  z-index: 1;
  background: var(--blue-primary);
  color: var(--white);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 13px;
  letter-spacing: 0.04em;
}

/* Buttons */
.app-buttons {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.btn-outline {
  background: none;
  border: 1.5px solid var(--blue-primary);
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 8px;
  color: var(--blue-dark);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-outline:hover {
  background: var(--blue-light);
}

.btn-convert {
  background: var(--blue-primary);
  color: var(--white);
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 8px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  letter-spacing: 0.03em;
  transition: background 0.2s;
}

.btn-convert:hover {
  background: var(--blue-dark);
}
</style>
