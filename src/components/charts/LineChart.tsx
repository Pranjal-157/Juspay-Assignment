import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import type { TimeSeriesData } from '../../types';

interface LineChartProps {
  data: TimeSeriesData[];
  title: string;
  height?: number;
  showPrevious?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  height = 300, 
  showPrevious = false 
}) => {
  const { theme } = useTheme();

  // Generate previous week data for comparison
  const previousData = data.map(item => ({
    ...item,
    value: Number(item.value) * (0.8 + Math.random() * 0.4) // Simulate previous data
  }));

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
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
      categories: data.map(item => item.date),
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
        text: 'Revenue ($)',
        style: {
          color: theme.colors.textSecondary,
        },
      },
      labels: {
        style: {
          color: theme.colors.textSecondary,
        },
        formatter: function() {
          return `$${(this.value as number / 1000).toFixed(0)}K`;
        },
      },
      gridLineColor: theme.colors.border,
    },
    legend: {
      enabled: showPrevious,
      itemStyle: {
        color: theme.colors.text,
      },
    },
    plotOptions: {
      line: {
        lineWidth: 3,
        marker: {
          radius: 6,
          fillColor: theme.colors.background,
          lineWidth: 3,
        },
        animation: {
          duration: 1500,
        },
      },
    },
    series: [
      {
        type: 'line',
        name: 'Current Week',
        data: data.map(item => Number(item.value)),
        color: theme.colors.primary,
        marker: {
          lineColor: theme.colors.primary,
        },
      },
      ...(showPrevious ? [{
        type: 'line' as const,
        name: 'Previous Week',
        data: previousData.map(item => Number(item.value)),
        color: theme.colors.textSecondary,
        dashStyle: 'Dash' as const,
        marker: {
          lineColor: theme.colors.textSecondary,
        },
      }] : []),
    ],
    credits: {
      enabled: false,
    },
    tooltip: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      style: {
        color: theme.colors.text,
      },
      shared: true,
      formatter: function() {
        let tooltipHtml = `<b>${this.x}</b><br/>`;
        this.points?.forEach(point => {
          tooltipHtml += `${point.series.name}: <b>$${point.y?.toLocaleString()}</b><br/>`;
        });
        return tooltipHtml;
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="chart-container"
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </motion.div>
  );
};

export default LineChart;