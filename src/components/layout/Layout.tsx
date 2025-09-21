import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import { useTheme } from '../../contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1200);
  
  // Initialize sidebar states based on screen size
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(window.innerWidth >= 1200 && !window.location.pathname.includes('/orders'));
  
  const { theme } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      const large = window.innerWidth >= 1200;
      setIsDesktop(desktop);
      setIsLargeScreen(large);
      
      // Auto-close sidebars when switching to mobile
      if (!desktop) {
        setSidebarOpen(false);
        setRightSidebarOpen(false);
      }
      
      // Auto-close right sidebar when switching to tablet
      if (!large) {
        setRightSidebarOpen(false);
      } else if (!window.location.pathname.includes('/orders')) {
        setRightSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleLeftSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const closeRightSidebar = () => {
    setRightSidebarOpen(false);
  };

  // Close sidebars when clicking outside on mobile
  const handleBackdropClick = () => {
    if (!isDesktop) {
      setSidebarOpen(false);
      setRightSidebarOpen(false);
    }
  };

  return (
    <div 
      className={`layout-grid ${isDesktop ? 'desktop' : 'mobile'} ${isLargeScreen ? 'large-screen' : ''} ${sidebarOpen ? 'sidebar-open' : ''} ${rightSidebarOpen ? 'right-sidebar-open' : ''}`}
      style={{ 
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {/* Mobile backdrop overlay */}
      {!isDesktop && (sidebarOpen || rightSidebarOpen) && (
        <div 
          className="mobile-backdrop"
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 90,
          }}
        />
      )}

      <div className="grid-sidebar">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
      
      <div className="grid-header">
        <Header 
          isOpenLeftSidebar={sidebarOpen}
          isOpenRightSidebar={rightSidebarOpen}
          onToggleLeftSbar={sidebarOpen ? closeSidebar : toggleLeftSidebar}
          onToggleRightSbar={rightSidebarOpen ? closeRightSidebar : toggleRightSidebar}
          onToggleLeftSidebar={toggleLeftSidebar}
          onToggleRightSidebar={toggleRightSidebar}
        />
      </div>

      <div className="grid-main">
        <main
          className="main-content"
          style={{
            backgroundColor: theme.colors.surface,
          }}
        >
          {children}
        </main>
      </div>

      <div className="grid-right-sidebar">
        <RightSidebar 
          isOpen={rightSidebarOpen} 
          onClose={closeRightSidebar} 
        />
      </div>
    </div>
  );
};

export default Layout;