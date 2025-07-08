import React from 'react';

const Podcast = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #10131c 60%, #212b41 100%)', paddingTop: '6.5rem', paddingBottom: '4rem' }}>
    <div style={{
      background: 'rgba(30, 41, 59, 0.95)',
      border: '2px solid #4A90E2',
      borderRadius: '1.5rem',
      padding: '3rem 2.5rem',
      boxShadow: '0 4px 32px #4A90E233',
      textAlign: 'center',
      maxWidth: 400,
    }}>
      <h2 style={{ color: '#ffe082', fontWeight: 800, fontSize: '2.2rem', marginBottom: '1.2rem', letterSpacing: '1px' }}>Podcast</h2>
      <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>Coming Soon!</p>
      <p style={{ color: '#b0c4d8', fontSize: '1rem' }}>Stay tuned for our upcoming podcast series featuring automation, tech, and student stories.</p>
    </div>
  </div>
);

export default Podcast; 