import React, { useState, useEffect } from 'react';
import usePageVisibility from '../hooks/usePageVisibility';

const PageVisibilityDemo: React.FC = () => {
  const isVisible = usePageVisibility();
  const [timeHidden, setTimeHidden] = useState(0);
  const [lastHiddenTime, setLastHiddenTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setLastHiddenTime(Date.now());
    } else if (lastHiddenTime) {
      const hiddenDuration = Math.round((Date.now() - lastHiddenTime) / 1000);
      setTimeHidden(hiddenDuration);
    }
  }, [isVisible, lastHiddenTime]);

  const containerStyle = {
    width: '100vw',
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  };

  const statusStyle = {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: isVisible ? '#22c55e' : '#ef4444',
  };

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#666' }}>
          Demo
        </h2>
        <span style={statusStyle}>
          {isVisible ? "Visible" : "Hidden"}
        </span>
      </div>

      <div style={{ marginTop: '1rem', color: '#666' }}>
        <p style={{ fontSize: '1.125rem' }}>
          {isVisible 
            ? "👋 Bienvenue ! Vous consultez activement cet onglet."
            : "🔸 Cet onglet est actuellement caché."
          }
        </p>
        
        {isVisible && timeHidden > 0 && (
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '1rem' }}>
            ⏱️ Vous avez été absent pendant {timeHidden} secondes
          </p>
        )}
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: '#666' }}>
          <p>Essayez les étapes suivantes pour tester :</p>
          <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Passer à un autre onglet du navigateur</li>
            <li>Réduire la fenêtre de votre navigateur</li>
            <li>Ouvrir une autre application</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageVisibilityDemo;