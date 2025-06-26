
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/configuracoes', label: 'Configurações' }
  ];

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              relative py-2 px-1 text-sm font-medium transition-colors duration-200
              ${isActive 
                ? 'text-gray-900' 
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {item.label}
            {isActive && (
              <span 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
