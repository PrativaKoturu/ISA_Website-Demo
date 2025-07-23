import React, { useEffect } from 'react';
import ScholarshipWinners from '../assets/images/isa_scholarship_winner.jpg';

const newsItems = [
  {
    id: 1,
    title: 'ISA International Scholarship Winners',
    image: ScholarshipWinners,
    content: (
      <>
        <b>Congratulations to Om Mandhane, Bipin Yadav, and Drushti Nagarkar!</b>
        <br />
        Each awarded <b>$2000</b> by the International Society of Automation for their excellence and dedication.<br/>
        <span style={{color: '#4be38a', fontWeight: 500}}>ISA VESIT is proud of your achievement!</span>
      </>
    ),
    date: '2024-06-01'
  },
  // Add more news items here
];

const NoticeBoard = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="notice-board-page" style={{minHeight: '100vh', background: 'linear-gradient(135deg, #060A13 0%, #1A2332 50%, #0F1B2E 100%)', padding: '2.5rem 0'}}>
      <div style={{maxWidth: 800, margin: '0 auto', padding: '0 1rem'}}>
        <h1 style={{textAlign: 'center', color: '#fff', marginBottom: '2rem', letterSpacing: '1px', fontWeight: 700, textShadow: '0 2px 16px #0f1b2e'}}>Digital Notice Board</h1>
        <div className="notice-board-list" style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          {newsItems.map(item => (
            <div key={item.id} className="notice-board-card notice-board-card-hover" style={{
              background: 'rgba(20, 30, 50, 0.92)',
              borderRadius: '18px',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.32), 0 0 0 2px #1a2332',
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              border: '1.5px solid #232f4b',
              backdropFilter: 'blur(6px)',
              transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s, border-color 0.25s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.035)';
              e.currentTarget.style.boxShadow = '0 12px 48px 0 #3e7bfa55, 0 0 0 2.5px #3e7bfa';
              e.currentTarget.style.borderColor = '#3e7bfa';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0,0,0,0.32), 0 0 0 2px #1a2332';
              e.currentTarget.style.borderColor = '#232f4b';
            }}
            >
              <img src={item.image} alt={item.title} style={{width: '100%', maxWidth: '340px', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.18)'}} />
              <h2 style={{color: '#fff', margin: '0 0 0.5rem 0', textAlign: 'center', fontWeight: 600, textShadow: '0 2px 8px #1a2332'}}> {item.title} </h2>
              <div style={{fontSize: '1.08rem', color: '#e6eaf3', textAlign: 'center', marginBottom: '0.5rem'}}>{item.content}</div>
              <div style={{fontSize: '0.95rem', color: '#4be38a', textAlign: 'center', fontWeight: 500}}>{new Date(item.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard; 