import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface AreaChartProps {
  data: number[][];
  categories: string[];
  title: string;
  height?: number;
  series?: string[];
}

const AreaChart: React.FC<AreaChartProps> = ({ 
  data, 
  categories, 
  title, 
  height = 300,
  series = ['Series 1', 'Series 2']
}) => {
  const { theme } = useTheme();

  const colors = [theme.colors.primary, theme.colors.success, theme.colors.warning, theme.colors.error];

  const options: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      height,
      backgroundColor: 'transparent',
      spacing: [10, 10, 10, 10],
    },
    title: {
      text: title,
      style: {
        color: theme.colors.text,
        fontSize: '14px',
        fontWeight: '600',
      },
    },
    xAxis: {
      categories,
      labels: {
        style: {
          color: theme.colors.textSecondary,
        },
      },
      lineColor: theme.colors.border,
      tickColor: theme.colors.border,
    },
    yAxis: {
      title: {
        text: 'Values',
        style: {
          color: theme.colors.textSecondary,
        },
      },
      labels: {
        style: {
          color: theme.colors.textSecondary,
        },
      },
      gridLineColor: theme.colors.border,
    },
    tooltip: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      style: {
        color: theme.colors.text,
      },
      shared: true,
      valueSuffix: '',
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
        marker: {
          radius: 4,
        },
        lineWidth: 3,
        animation: {
          duration: 1200,
        },
      },
    },
    series: data.map((seriesData, index) => ({
      type: 'areaspline',
      name: series[index] || `Series ${index + 1}`,
      data: seriesData,
      color: colors[index % colors.length],
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
        stops: [
          [0, `${colors[index % colors.length]}40`],
          [1, `${colors[index % colors.length]}10`],
        ],
      },
    })),
    legend: {
      enabled: true,
      itemStyle: {
        color: theme.colors.text,
      },
    },
    credits: {
      enabled: false,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="chart-container"
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: '12px',
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </motion.div>
  );
};

export default AreaChart;