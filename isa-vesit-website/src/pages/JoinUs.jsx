import React from 'react';

const contacts = [
  { name: 'Viraj Pradhan', post: 'Secretary', phone: '+91 99697 74307' },
  { name: 'Yadnyee Joshi', post: 'Jr. PRO', phone: '+91 97570 77002' },
  { name: 'Ronit Chugwani', post: 'Jr. PRO', phone: '+91 86697 70700' },
];

const JoinUs = () => (
  <div style={{ minHeight: '80vh', marginTop: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #0a1118 80%, #1a2332 100%)', color: '#fff', padding: '2rem 1rem' }}>
    <h1 style={{ color: '#4A90E2', fontWeight: 900, fontSize: '2.5rem', marginBottom: '1.2rem', textAlign: 'center', letterSpacing: '2px', textShadow: '0 2px 16px #4A90E2' }}>
      Recruiting soon...
    </h1>
    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', textAlign: 'center', color: '#b0c4d8', fontWeight: 500 }}>
      To know more, contact:
    </p>
    <div style={{ width: '100%', maxWidth: 400 }}>
      {contacts.map((c, i) => (
        <div key={c.name} style={{ marginBottom: '1.2rem', background: 'rgba(23,29,47,0.85)', borderRadius: 12, padding: '1rem 1.2rem', boxShadow: '0 2px 12px #4A90E2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{c.name}</span>
          <span style={{ color: '#7ecfff', fontSize: '1rem', marginBottom: '0.3rem' }}>({c.post})</span>
          <a href={`tel:${c.phone.replace(/\s+/g, '')}`} style={{ color: '#4A90E2', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none' }}>{c.phone}</a>
        </div>
      ))}
    </div>
  </div>
);

export default JoinUs; 