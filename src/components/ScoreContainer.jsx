import { forwardRef } from 'react'

const ScoreContainer = forwardRef(function ScoreContainer(props, ref) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
    }}>
      <div
        ref={ref}
        style={{
          width: '100%',
          minHeight: '600px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }}
      ></div>
    </div>
  )
})

export default ScoreContainer
