import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import type { ChartData } from '../../types';

interface PieChartProps {
  data: ChartData[];
  title: string;
  height?: number;
  showLegend?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ 
  data, 
  title, 
  height = 100, 
  showLegend = true 
}) => {
  const { theme } = useTheme();

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
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
    tooltip: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
      style: {
        color: theme.colors.text,
      },
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/>Value: <b>{point.y}</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: theme.colors.text,
          },
        },
        showInLegend: showLegend,
        animation: {
          duration: 1000,
        },
        point: {
          events: {
            mouseOver: function() {
              // Animation on hover
            },
          },
        },
      },
    },
    legend: {
      enabled: showLegend,
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'middle',
      itemStyle: {
        color: theme.colors.text,
      },
    },
    series: [
      {
        type: 'pie',
        name: 'Share',
        data: data.map(item => ({
          name: item.name,
          y: item.value,
          color: item.color || theme.colors.primary,
        })),
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
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

export default PieChart;