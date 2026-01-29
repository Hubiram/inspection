import React from 'react';

const Header: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#333',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 999,
      }}
    >
      <h1 style={{ margin: 0, fontSize: '1.5em' }}>Inspection</h1>
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        style={{ borderRadius: '50%', width: '40px', height: '40px' }}
      />
    </div>
  );
};

export default Header;
