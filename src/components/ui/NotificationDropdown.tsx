import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Bell, X, Bug, User, Check, AlertTriangle } from 'lucide-react';
import type { NotificationItem } from '../../types';

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Bug Report',
    message: 'You have a bug that needs attention',
    type: 'error',
    timestamp: 'Just now',
    read: false,
  },
  {
    id: '2',
    title: 'New Registration',
    message: 'New user registered',
    type: 'success',
    timestamp: '30 minutes ago',
    read: false,
  },
  {
    id: '3',
    title: 'Bug Report',
    message: 'You have a bug that needs attention',
    type: 'error',
    timestamp: '12 hours ago',
    read: true,
  },
  {
    id: '4',
    title: 'New Subscription',
    message: 'Andi Lane subscribed to you',
    type: 'info',
    timestamp: 'Today, 11:59 AM',
    read: false,
  },
];

const NotificationDropdown: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <Bug size={16} />;
      case 'success':
        return <Check size={16} />;
      case 'warning':
        return <AlertTriangle size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'error':
        return theme.colors.error;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="icon-button"
        style={{ 
          color: theme.colors.text,
          position: 'relative',
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '18px',
              height: '18px',
              backgroundColor: theme.colors.error,
              color: 'white',
              borderRadius: '50%',
              fontSize: '10px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'transparent',
                zIndex: 999,
              }}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '380px',
                maxHeight: '500px',
                backgroundColor: theme.colors.background,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '12px',
                boxShadow: theme.mode === 'dark' 
                  ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
                  : '0 10px 25px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: `1px solid ${theme.colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h3 style={{ 
                  color: theme.colors.text, 
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: 0,
                }}>
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={markAllAsRead}
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    Mark all read
                  </motion.button>
                )}
              </div>

              {/* Notifications List */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div
                    style={{
                      padding: '40px 20px',
                      textAlign: 'center',
                      color: theme.colors.textSecondary,
                    }}
                  >
                    <Bell size={24} style={{ marginBottom: '8px', opacity: 0.5 }} />
                    <p>No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notification.id)}
                      style={{
                        padding: '16px 20px',
                        borderBottom: `1px solid ${theme.colors.border}`,
                        cursor: 'pointer',
                        backgroundColor: notification.read ? 'transparent' : `${theme.colors.primary}05`,
                        position: 'relative',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                      }}
                    >
                      {/* Icon */}
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: `${getColor(notification.type)}20`,
                          color: getColor(notification.type),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {getIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '4px',
                          }}
                        >
                          <h4
                            style={{
                              color: theme.colors.text,
                              fontSize: '14px',
                              fontWeight: '600',
                              margin: 0,
                            }}
                          >
                            {notification.title}
                          </h4>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: theme.colors.textSecondary,
                              cursor: 'pointer',
                              padding: '4px',
                              borderRadius: '4px',
                            }}
                          >
                            <X size={14} />
                          </motion.button>
                        </div>
                        <p
                          style={{
                            color: theme.colors.textSecondary,
                            fontSize: '13px',
                            margin: '0 0 4px 0',
                            lineHeight: '1.4',
                          }}
                        >
                          {notification.message}
                        </p>
                        <span
                          style={{
                            color: theme.colors.textSecondary,
                            fontSize: '11px',
                          }}
                        >
                          {notification.timestamp}
                        </span>
                      </div>

                      {/* Unread indicator */}
                      {!notification.read && (
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: theme.colors.primary,
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                          }}
                        />
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;