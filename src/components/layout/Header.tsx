import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronRight,
  Star,
  ShoppingCart,
  PanelRightOpen,
  PanelLeftOpen,
  PanelRightClose,
  PanelLeftClose
} from 'lucide-react';

interface HeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

interface LeftSidebarToggleProps {
  isOpenLeftSidebar: boolean;
  onToggleLeftSbar: () => void;
}

interface RightSidebarToggleProps {
  isOpenRightSidebar: boolean;
  onToggleRightSbar: () => void
}

const Header: React.FC<HeaderProps & LeftSidebarToggleProps & RightSidebarToggleProps> = ({ onToggleLeftSidebar, onToggleRightSidebar, isOpenLeftSidebar, isOpenRightSidebar }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const location = useLocation();

  // Get breadcrumb based on current path
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    const breadcrumbs = [
      { label: 'Dashboard', path: '/', icon: Star }
    ];

    if (segments.length > 0) {
      if (segments[0] === 'orders') {
        breadcrumbs.push({ label: 'Orders', path: '/orders', icon: ShoppingCart });
      }
      // Add more breadcrumb logic as needed
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: theme.colors.background,
        borderBottom: `1px solid ${theme.colors.border}`,
        color: theme.colors.text,
      }}
      className="header"
    >
      <div className="header-content">
        {/* Breadcrumbs */}
        <div className="header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Left Sidebar Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleLeftSidebar}
              className="icon-button"
              style={{ color: theme.colors.text }}
            >
              {isOpenLeftSidebar ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </motion.button>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {index > 0 && (
                    <ChevronRight 
                      size={14} 
                      style={{ color: theme.colors.textSecondary }} 
                    />
                  )}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    color: index === breadcrumbs.length - 1 ? theme.colors.text : theme.colors.textSecondary,
                    fontSize: '14px',
                    fontWeight: index === breadcrumbs.length - 1 ? '600' : '400'
                  }}>
                    <crumb.icon size={20} />
                    <span>{crumb.label}</span>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Search bar */}
        <div className="header-center">
          <div 
            className="search-container"
            style={{ 
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <Search size={20} style={{ color: theme.colors.textSecondary }} />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              style={{
                backgroundColor: 'transparent',
                color: theme.colors.text,
              }}
            />
            <kbd className="search-kbd" style={{ color: theme.colors.textSecondary }}>
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right actions */}
        <div className="header-right">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="icon-button"
            style={{ color: theme.colors.text }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleRightSidebar}
            className="icon-button"
            style={{ color: theme.colors.text, position: 'relative' }}
          >
            <Bell size={20} />
            <div className="notification-badge" />
          </motion.button>

          {/* Right Sidebar Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleRightSidebar}
            className='icon-button'
            style={{ color: theme.colors.text }}
          >
            {isOpenRightSidebar ? <PanelRightClose size={20} /> : <PanelRightOpen size={20} />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;