import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import type { LocationData } from '../../types';
import background from "../../assets/world.svg";

interface WorldMapProps {
  data: LocationData[];
  title: string;
  height?: number;
}

const WorldMap: React.FC<WorldMapProps> = ({ data, title, height = 400 }) => {
  const { theme } = useTheme();

  // Geographic coordinates for major cities
  const cityCoordinates: { [key: string]: [number, number] } = {
    'New York': [-74.006, 40.7128],
    'San Francisco': [-122.4194, 37.7749],
    'Sydney': [151.2093, -33.8688],
    'Singapore': [103.8198, 1.3521]
  };

  // Convert location data to map points with geographic coordinates
  const mapData = data.map((item, index) => {
    const coords = cityCoordinates[item.location] || [0, 0];
    return {
      name: item.location,
      value: item.value,
      lat: coords[1], // latitude
      lon: coords[0], // longitude
      marker: {
        radius: Math.max(2, Math.min(8, 3 + (item.value / 10000) * 1.5)),
        fillColor: [
          theme.colors.primary,
          theme.colors.success,
          theme.colors.warning,
          theme.colors.secondary,
        ][index % 4],
        lineWidth: 2,
        lineColor: theme.colors.background
      }
    };
  });

  const options: Highcharts.Options = {
    chart: {
      type: 'scatter',
      height,
      backgroundColor: 'transparent',
      spacing: [5, 5, 5, 5],
      margin: [15, 15, 15, 15],
    },
    title: {
      text: title,
      y: 5,
      style: {
        color: theme.colors.text,
        fontSize: '14px',
        fontWeight: '600',
      },
    },
    xAxis: {
      min: -180,
      max: 180,
      labels: {
        enabled: false
      },
      gridLineWidth: 0,
      lineWidth: 0,
      tickLength: 0,
      startOnTick: false,
      endOnTick: false,
      tickInterval: 60
    },
    yAxis: {
      min: -90,
      max: 90,
      labels: {
        enabled: false
      },
      gridLineWidth: 0,
      lineWidth: 0,
      tickLength: 0,
      startOnTick: false,
      endOnTick: false,
      tickInterval: 30
    },
    plotOptions: {
      scatter: {
        tooltip: {
          headerFormat: '',
          pointFormat: '<b>{point.name}</b><br/>Revenue: <b>${point.value:,.0f}</b>'
        },
        states: {
          hover: {
            halo: {
              size: 15,
              opacity: 0.5
            }
          }
        }
      }
    },
    series: [{
      type: 'scatter',
      name: 'Revenue by Location',
      data: mapData.map(point => ({
        name: point.name,
        value: point.value,
        x: point.lon,
        y: point.lat,
        marker: point.marker
      })),
      dataLabels: {
        enabled: false,
      }
    }],
    tooltip: {
      useHTML: true,
      headerFormat: '',
      pointFormat: '<b>{point.name}</b><br/>Revenue: <b>${point.value:,.0f}</b>',
      style: {
        fontSize: '12px',
        color: theme.colors.text,
      },
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
    },
    legend: {
      enabled: false,
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
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
    <div
      className="world-map-container"
      style={{
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        backgroundImage: `url(${background})`,
        backgroundSize: '100% 70%',
        backgroundRepeat: 'no-repeat',
        backgroundOrigin: 'content-box',
        padding: '20px',
        backgroundPosition: '50% 60%'
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        height={height/3}
      />
    </div>
    </motion.div>
  );
};

export default WorldMap;