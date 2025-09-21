import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import type { TimeSeriesData } from '../../types';

interface BarChartProps {
  data: TimeSeriesData[];
  title: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, height = 300 }) => {
  const { theme } = useTheme();

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
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
            },

            // Y-axis configuration
            yAxis: {
                title: {
                    text: '',
                    style: {
                        color: theme.colors.textSecondary,
                    },
                },
                gridLineColor: theme.colors.border,
                labels: {
                    style: {
                        color: theme.colors.textSecondary,
                    },
                    formatter: function(this: Highcharts.AxisLabelsFormatterContextObject) {
                        return (`${((Number(this.value) / 1000000).toFixed(1) + 'M')}`);
                    },
                },
            },

            // Tooltip configuration for better user experience
            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat: '<span style="font-size:12px; font-weight:bold;">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y:,.0f}</b><br/>',
                style: {
                    fontSize: '14px',
                    color: theme.colors.text,
                },
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
            },

            // Plot options for the column series
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0,
                    borderRadius: 4,
                    pointPadding: 0.1,
                    groupPadding: 0.1,
                },
            },

            // Series data using the actual data prop
            series: [
                {
                    name: 'Actual',
                    type: 'column',
                    data: data.map(item => Number(item.value)),
                    color: '#a8c5da',
                    zIndex: 2,
                },
                {
                    name: 'Projection',
                    type: 'column',
                    data: data.map(item => Math.round(Number(item.value) * 1.1 + Math.random() * Number(item.value) * 0.2)),
                    color: '#cfdeea',
                    zIndex: 1,
                    opacity: 0.7,
                },
            ],
    legend: {
      enabled: true,
      itemStyle: {
        color: theme.colors.text,
        fontSize: '12px',
      },
    },
    credits: {
      enabled: false,
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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

export default BarChart;