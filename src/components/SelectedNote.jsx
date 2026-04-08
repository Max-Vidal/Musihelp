export default function SelectedNote({ note }) {
  return (
    <div style={{
      backgroundColor: '#fff3cd',
      border: '3px solid #ffc107',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '30px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <p style={{ color: '#666', marginBottom: '10px', fontSize: '14px' }}>Nota seleccionada:</p>
      <h2 style={{
        color: '#2196F3',
        fontSize: '48px',
        margin: '0',
        fontWeight: 'bold'
      }}>
        {note}
      </h2>
    </div>
  )
}
