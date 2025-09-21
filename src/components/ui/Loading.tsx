import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 24, 
  text 
}) => {
  const { theme } = useTheme();

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        color: theme.colors.textSecondary 
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ 
          fontSize: `${size}px`,
          color: theme.colors.primary,
        }}
      >
        ⚡
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ 
            margin: 0, 
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  className,
  style
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      animate={{
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: theme.colors.border,
        ...style,
      }}
    />
  );
};

interface CardSkeletonProps {
  showIcon?: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ showIcon = true }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '12px',
        padding: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        {showIcon && <Skeleton width="48px" height="48px" borderRadius="12px" />}
        <div style={{ flex: 1 }}>
          <Skeleton width="60%" height="16px" style={{ marginBottom: '8px' }} />
          <Skeleton width="40%" height="32px" />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Skeleton width="80px" height="24px" borderRadius="20px" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: theme.colors.surface,
          borderBottom: `1px solid ${theme.colors.border}`,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 100px 120px 100px 60px',
          gap: '16px',
        }}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} height="16px" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colors.border}`,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 100px 120px 100px 60px',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: 7 }).map((_, colIndex) => (
            <Skeleton 
              key={colIndex} 
              height="16px"
              width={colIndex === 4 ? "80px" : "100%"}
              borderRadius={colIndex === 4 ? "20px" : "4px"}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const ChartSkeleton: React.FC<{ height?: number }> = ({ height = 300 }) => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '12px',
        padding: '20px',
        height: height + 40,
      }}
    >
      <Skeleton width="200px" height="20px" style={{ marginBottom: '20px' }} />
      <Skeleton width="100%" height={height} />
    </div>
  );
};