import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  ShoppingCart,
  Users,
  BarChart3,
  FileText,
  Settings,
  Globe,
  Folder,
  BookOpen,
  PieChartIcon,
  User2,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Default', icon: PieChartIcon, path: '/' },
  { name: 'Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Reports', icon: FileText, path: '/reports' },
];

const pages = [
  { name: 'Products', icon: Folder, path: '/products' },
  { name: 'Categories', icon: BookOpen, path: '/categories' },
  { name: 'Inventory', icon: Globe, path: '/inventory' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const location = useLocation();

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? 'open' : ''}`}
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontSize: '12px !important',
        }}
      >
        <div className="sidebar-content">
            {/* Account section at bottom */}
          <div className="sidebar-section" style={{ marginBottom: 'auto', paddingBottom: '5px' }}>
            <div className="user-account" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: theme.colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                <User2 size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: theme.colors.text, fontWeight: '700', fontSize: '15px' }}>
                  ByeWind
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar Navigation section */}
          <div style={{height: '100%', paddingBottom: '5px', paddingTop: '10px' }}>
          {/* Favourites section */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <h3 className="sidebar-section-title" style={{ color: theme.colors.textSecondary }}>
                Favorites
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="section-toggle"
                style={{ color: theme.colors.textSecondary }}
              >
                <h3 className="sidebar-section-title" style={{ color: theme.colors.textSecondary }}>
                Recently
               </h3>
              </motion.button>
            </div>
            <div className="sidebar-nav">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <ul style={{listStyleType: 'disc', fontSize: '10px', paddingLeft: '10px', marginBottom:'10px'}}>
                    <li style={{marginLeft:'10px'}}>
                        <NavLink
                            to="/"
                            onClick={() => window.innerWidth < 768 && onClose()}
                            style={{
                                color: theme.mode === 'dark' ? '#ffffff' : theme.colors.text,
                                fontWeight: '600',
                            }}
                            >
                            <span>Overview</span>
                        </NavLink>
                    </li>
                    <li style={{marginLeft:'10px'}}>
                        <NavLink
                            to="/"
                            onClick={() => window.innerWidth < 768 && onClose()}
                            style={{
                                color: theme.mode === 'dark' ? '#ffffff' : theme.colors.text,
                                fontWeight: '600',
                            }}
                            >
                            <span>Projects</span>
                        </NavLink>
                    </li>
                </ul>
                
              </motion.div>
            </div>
          </div>
          {/* Dashboards section */
          <div className="sidebar-section">
            <h3 className="sidebar-section-title" style={{ color: theme.colors.textSecondary }}>
              Dashboards
            </h3>
            <div className="sidebar-nav">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => window.innerWidth < 768 && onClose()}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      style={{
                        backgroundColor: isActive ? (theme.mode === 'dark' ? 'rgb(30, 41, 59)' : theme.colors.primary) : 'transparent',
                        color: isActive ? (theme.mode === 'dark' ? '#1a1d29' : '#ffffff') : theme.colors.text,
                      }}
                    >
                        <Icon size={16}/>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                      </motion.div>
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="active-indicator"
                        />
                      )}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </div>

            }{/* Recently section */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title" style={{ color: theme.colors.textSecondary }}>
              Recently
            </h3>
            <div className="sidebar-nav">
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <NavLink
                  to="/ecommerce"
                  onClick={() => window.innerWidth < 768 && onClose()}
                  className="sidebar-nav-item"
                  style={{ color: theme.colors.text }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <ShoppingCart size={16} />
                  </motion.div>
                  <span>eCommerce</span>
                </NavLink>
              </motion.div>
            </div>
          </div>

          {/* Pages section */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title" style={{ color: theme.colors.textSecondary }}>
              Pages
            </h3>
            <div className="sidebar-nav">
              {pages.map((page, index) => {
                const Icon = page.icon;
                const isActive = location.pathname === page.path;
                
                return (
                  <motion.div
                    key={page.name}
                    custom={index + 5}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <NavLink
                      to={page.path}
                      onClick={() => window.innerWidth < 768 && onClose()}
                      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                      style={{
                        backgroundColor: isActive ? (theme.mode === 'dark' ? 'rgb(30, 41, 59)' : theme.colors.primary) : 'transparent',
                        color: isActive ? (theme.mode === 'dark' ? '#1a1d29' : '#ffffff') : theme.colors.text,
                      }}
                    >
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Icon size={16} />
                      </motion.div>
                      <span>{page.name}</span>
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;