import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import {
  MessageSquare,
  User,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'Order #12345 from John Doe',
    time: '2 minutes ago',
    icon: ShoppingCart,
    color: '#22C55E',
    unread: true,
  },
  {
    id: 2,
    type: 'message',
    title: 'Customer Message',
    message: 'Question about product availability',
    time: '15 minutes ago',
    icon: MessageSquare,
    color: '#3B82F6',
    unread: true,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'iPhone 14 Pro has only 3 units left',
    time: '1 hour ago',
    icon: AlertCircle,
    color: '#F59E0B',
    unread: false,
  },
  {
    id: 4,
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of $1,200 confirmed',
    time: '2 hours ago',
    icon: CheckCircle,
    color: '#10B981',
    unread: false,
  },
  {
    id: 5,
    type: 'user',
    title: 'New User Registration',
    message: 'Sarah Wilson joined your store',
    time: '3 hours ago',
    icon: User,
    color: '#8B5CF6',
    unread: false,
  },
];

const RightSidebar: React.FC<RightSidebarProps> = ({ isOpen, onClose: _ }) => {
  const { theme } = useTheme();

  const sidebarVariants = {
    closed: { x: '100%' },
    open: { x: 0 },
  };

  return (
    <>
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="right-sidebar"
        style={{
          backgroundColor: theme.colors.background,
          borderLeft: `1px solid ${theme.colors.border}`,
          color: theme.colors.text,
        }}
      >
        <div className="sidebar-content" style={{ padding: '0' }}>
          {/* Notifications List */}
          <div style={{ padding: '20px 0' }}>
            <div
              style={{
                padding: '0 16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: theme.colors.textSecondary,
                }}
              >
                Notifications
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {notifications.slice(0, 4).map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: notification.id * 0.05 }}
                  style={{
                    padding: '0 8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    borderLeft: notification.unread
                      ? `2px solid ${notification.color}`
                      : `2px solid transparent`,
                  }}
                  whileHover={{
                    backgroundColor: theme.colors.surface,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: `${notification.color}15`,
                      color: notification.color,
                      padding: '4px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <notification.icon size={12} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '2px',
                    }}>
                      <h5 style={{
                        margin: 0,
                        fontSize: '11px',
                        fontWeight: '500',
                        color: theme.colors.text,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {notification.title}
                      </h5>
                      {notification.unread && (
                        <div style={{
                          width: '4px',
                          height: '4px',
                          backgroundColor: notification.color,
                          borderRadius: '50%',
                          flexShrink: 0
                        }} />
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '10px',
                        color: theme.colors.textSecondary,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1
                      }}>
                        {notification.message}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        color: theme.colors.textSecondary,
                        flexShrink: 0
                      }}>
                        {notification.time.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activities Section */}
          <div
            style={{
              padding: '8px 0',
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          >
            <div style={{ padding: '0 16px 8px' }}>
              <h4
                style={{
                  margin: 0,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: theme.colors.textSecondary,
                }}
              >
                Activities
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {[
                { text: 'You have a bug that needs attention', icon: '🐛', time: 'Just now', user: 'You' },
                { text: 'Released a new version', icon: '🚀', time: '59 minutes ago', user: 'Team' },
                { text: 'Submitted a bug', icon: '🐛', time: '12 hours ago', user: 'User' },
                { text: 'Modified A data in Page X', icon: '📝', time: 'Today, 11:59 AM', user: 'Admin' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '5px 16px 0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.surface;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.surface,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    flexShrink: 0
                  }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      color: theme.colors.text, 
                      fontSize: '11px',
                      fontWeight: '400',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '2px'
                    }}>
                      {activity.text}
                    </div>
                    <div style={{ 
                      color: theme.colors.textSecondary, 
                      fontSize: '9px',
                    }}>
                      {activity.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contacts Section */}
          <div
            style={{
              padding: '8px 0',
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          >
            <div style={{ padding: '0 16px 8px' }}>
              <h4
                style={{
                  margin: 0,
                  fontSize: '12px',
                  fontWeight: '600',
                  color: theme.colors.textSecondary,
                }}
              >
                Contacts
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {[
                { name: 'John Doe', status: 'Online' },
                { name: 'Jane Smith', status: 'Away' },
                { name: 'Mike Johnson', status: 'Offline' },
                { name: 'Sarah Wilson', status: 'Online' },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 16px 0',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.surface;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                    <img
                      src={`https://picsum.photos/seed/${contact.name.replace(/\s+/g, '')}/24/24`}
                      alt={`${contact.name} avatar`}
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ 
                      color: theme.colors.text, 
                      fontSize: '11px',
                      fontWeight: '500',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {contact.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: contact.status === 'Online' ? theme.colors.success : 
                                       contact.status === 'Away' ? theme.colors.warning : theme.colors.textSecondary,
                      }}
                    />
                    <span
                      style={{
                        color: contact.status === 'Online' ? theme.colors.success : 
                               contact.status === 'Away' ? theme.colors.warning : theme.colors.textSecondary,
                        fontSize: '9px',
                        fontWeight: '500'
                      }}
                    >
                      {contact.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: `1px solid ${theme.colors.border}`,
              marginTop: 'auto',
            }}
          >
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RightSidebar;