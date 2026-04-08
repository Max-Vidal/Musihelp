export default function ErrorState({ error }) {
  return (
    <div style={{
      backgroundColor: '#ffebee',
      border: '2px solid #f44336',
      padding: '20px',
      borderRadius: '12px',
      marginBottom: '30px',
      color: '#c62828'
    }}>
      <p style={{ margin: '0' }}>❌ Error: {error}</p>
    </div>
  )
}
