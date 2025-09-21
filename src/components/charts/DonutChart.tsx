import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface DonutData {
  name: string;
  value: number;
  color: string;
  price: string;
  qty: number;
  amount: string;
}

interface DonutChartProps {
  data: DonutData[];
  title?: string;
  height?: number;
  centerText?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ 
  data, 
  title = "Donut Chart", 
  height = 200,
  centerText = "Total"
}) => {
  const { theme } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  const radius = Math.min(height, height) / 1.5 - 40;
  const innerRadius = radius * 0.6;
  const centerX = height / 2;
  const centerY = height / 2;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const createPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
    const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y, 
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", innerEnd.x, innerEnd.y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  let currentAngle = 0;
  const segments = data.map((item) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + (item.value / total) * 360;
    currentAngle = endAngle;

    return {
      ...item,
      startAngle,
      endAngle,
      path: createPath(startAngle, endAngle, radius, innerRadius),
      percentage: ((item.value / total) * 100).toFixed(1)
    };
  });

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: '16px',
        height: 'fit-content',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {title && (
        <h3
          style={{
            color: theme.colors.text,
            margin: '0 0 16px 0',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          {title}
        </h3>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Donut Chart */}
        <div style={{ position: 'relative' }}>
          <motion.svg
            ref={svgRef}
            width={height}
            height={height}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {segments.map((segment, index) => (
              <motion.path
                key={index}
                d={segment.path}
                fill={segment.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              />
            ))}
          </motion.svg>

          {/* Center Text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: theme.colors.textSecondary,
                fontSize: '10px',
                fontWeight: '500',
                marginBottom: '2px',
              }}
            >
              {centerText}
            </div>
            <div
              style={{
                color: theme.colors.text,
                fontSize: '16px',
                fontWeight: '700',
              }}
            >
              {total.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1 }}>
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: index < segments.length - 1 ? '4px' : '0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: segment.color,
                  }}
                />
                <span
                  style={{
                    color: theme.colors.text,
                    fontSize: '11px',
                    fontWeight: '500',
                    marginLeft: '4px',
                    marginRight: '20px',
                  }}
                >
                  {segment.name}
                </span>
              </div>
              <span
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: '11px',
                  fontWeight: '600',

                }}
              >
                {segment.percentage}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;