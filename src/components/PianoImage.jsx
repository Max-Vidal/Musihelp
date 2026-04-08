export default function PianoImage() {
  return (
    <div style={{
      marginTop: '150px',
      marginBottom: '150px',
      textAlign: 'center'
    }}>
      <img
        src='/src/assets/piano.jpg'
        alt='Piano'
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      />
    </div>
  )
}
