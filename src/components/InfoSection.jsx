import ejemplo from '../assets/ejemplo.png'

export default function InfoSection() {
  return (
    <section style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: '30px',
      color: 'white'
    }}>
      <div style={{ flex: 1, padding: '20px', textAlign: 'center', color: 'black' }}>
        <h2 style={{ color: 'black' }}>QUE ES MUSIHELP?</h2>
        <p>Musihelp es un proyecto dedicado a ayudar a músicos amateur y novatos para afinar sus instrumentos y poder traducir partituras a acordes y notas entendibles para los músicos que no saben leer partituras tradicionales.</p>
      </div>
      <div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
        <img src={ejemplo} alt="Ejemplo" style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }} />
      </div>
      <div style={{ flex: 1, padding: '20px', textAlign: 'center', color: 'black' }}>
        <h2 style={{ color: 'black' }}>APP AFINADOR</h2>
        <p>Con Musihelp tú, artista, no te tienes que volver a preocupar por si tu instrumento no está afinado correctamente, con un simple botón tienes un ayudante que te garantiza una afinación perfecta para tu instrumento.</p>
      </div>
    </section>
  )
}
