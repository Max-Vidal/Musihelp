export default function UploadButton({ onLoadScore }) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '30px',
      marginTop: '100px'
    }}>
      <button
        onClick={onLoadScore}
        style={{
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          padding: '20px 50px',
          fontSize: '20px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px)'
          e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)'
        }}
      >
        📤 Sube tu partitura
      </button>
    </div>
  )
}
