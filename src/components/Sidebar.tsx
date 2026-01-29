import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: '60px',
        height: 'calc(100vh - 60px)',
        width: isCollapsed ? '60px' : '200px',
        backgroundColor: '#333',
        color: 'white',
        zIndex: 1000,
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px',
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        ☰
      </button>
      <Link
        to="/template"
        style={{
          display: 'block',
          padding: '10px',
          textDecoration: 'none',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {isCollapsed ? 'T' : 'Template Setup'}
      </Link>
      <Link
        to="/section"
        style={{
          display: 'block',
          padding: '10px',
          textDecoration: 'none',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {isCollapsed ? 'S' : 'Section Setup'}
      </Link>
      <Link
        to="/questions"
        style={{
          display: 'block',
          padding: '10px',
          textDecoration: 'none',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {isCollapsed ? 'Q' : 'Questions'}
      </Link>
      <Link
        to="/organization"
        style={{
          display: 'block',
          padding: '10px',
          textDecoration: 'none',
          color: 'white',
          width: '100%',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {isCollapsed ? 'O' : 'Organization'}
      </Link>
    </div>
  );
};

export default Sidebar;
