import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: LucideIcon;
  index?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  index = 0,
}) => {
  const { theme } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ 
        scale: 1.02,
        boxShadow: theme.mode === 'dark' 
          ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
          : '0 10px 25px rgba(0, 0, 0, 0.1)',
      }}
      className="metric-card"
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        color: theme.colors.text,
      }}
    >
      
      <div className="metric-info" style={{padding: '0px'}}>
        <p className="metric-title" style={{ color: theme.colors.textSecondary }}>
          {title}
        </p>
        <h3 className="metric-value" style={{ height: 'auto !important', color: theme.colors.text, display: 'flex', justifyContent: 'space-between' }}>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              style={{ fontSize: '1.5rem' }}
            >
              {value}
            </motion.span>
            <div className="metric-change">
                <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`change-indicator ${changeType}`}
                style={{
                    backgroundColor: changeType === 'increase' ? '#10B98115' : '#EF444415',
                    color: changeType === 'increase' ? '#10B981' : '#EF4444',
                }}
                >
                {changeType === 'increase' ? '↗' : '↘'} {Math.abs(change)}%
                </motion.span>
            </div>
        </h3>
      </div>
      
      
    </motion.div>
  );
};

export default MetricCard;