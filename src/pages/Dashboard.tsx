import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import MetricCard from '../components/ui/MetricCard';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import WorldMap from '../components/charts/WorldMap';
import DonutChart from '../components/charts/DonutChart';
import { apiService } from '../services/api';
import {
    Users,
    ShoppingCart,
    DollarSign,
    TrendingUp,
} from 'lucide-react';
import type { DashboardMetric, TimeSeriesData, LocationData } from '../types';

const Dashboard: React.FC = () => {
    const { theme } = useTheme();
    const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
    const [monthlyData, setMonthlyData] = useState<TimeSeriesData[]>([]);
    const [locationData, setLocationData] = useState<LocationData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                const { metrics, monthlyData, locationData } = apiService.generateMockData();
                setMetrics(metrics);
                setMonthlyData(monthlyData);
                setLocationData(locationData);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    const iconMap = {
        users: Users,
        'shopping-cart': ShoppingCart,
        'dollar-sign': DollarSign,
        'trending-up': TrendingUp,
    };

    if (loading) {
        return (
            <div className="loading-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
                color: theme.colors.textSecondary
            }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ fontSize: '24px' }}
                >
                    ⚡
                </motion.div>
            </div>
        );
    }

    return (
        <div className="dashboard" style={{
            backgroundColor: theme.colors.surface,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
        }}>

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="dashboard-header"
                style={{ marginBottom: '20px' }}
            >
                <div>
                    <h1 style={{
                        color: theme.colors.text,
                        fontSize: '24px',
                        fontWeight: '600',
                        margin: '0 0 4px 0',
                        letterSpacing: '-0.01em'
                    }}>
                        eCommerce
                    </h1>
                </div>
            </motion.div>
            {/* Dashboard Metrics */}
            <div style={{ marginBottom: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(280px, 1fr))', gap: '16px' }}>
                {/* Metrics Cards */}
                <div style={{ height: '100%' }} className="metrics-grid">
                    {metrics.map((metric, index) => (
                        <MetricCard
                            key={metric.id}
                            title={metric.title}
                            value={metric.value}
                            change={metric.change}
                            changeType={metric.changeType}
                            icon={iconMap[metric.icon as keyof typeof iconMap] || Users}
                            index={index}
                        />
                    ))}
                </div>
                {/* Right side - Bar Chart */}
                <BarChart
                    data={monthlyData}
                    title="Projections vs Actuals"
                    height={230}
                />
            </div>



            {/* Revenue and World Map Row */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '70% 1fr',
                gap: '16px',
                marginBottom: '20px'
            }}>
                {/* Revenue Line Chart */}
                <LineChart
                    data={monthlyData}
                    title="Revenue"
                    height={280}
                    showPrevious={true}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'auto' }}>
                    {/* World Map - positioned on the right */}
                    <div style={{ width: '100%' }}>
                        <WorldMap
                        data={locationData}
                        title="Revenue by Location"
                        height={100}
                    />
                    </div>
                    
                    {/* Table */}
                    <table style={{ width: '100%', height: '218px', border: 'none', flex: '0 0 40%' }}>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px', color: theme.colors.text }}>Location</th>
                                <th style={{ textAlign: 'right', padding: '8px', color: theme.colors.text }}>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locationData.map((item, index) => (
                                <tr key={index} style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                                    <td style={{ textAlign: 'left', padding: '8px', color: theme.colors.text }}>{item.location}</td>
                                    <td style={{ textAlign: 'right', padding: '8px', color: theme.colors.text }}>${item.value.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top sellings*/}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '70% 1fr',
                gap: '16px',
                marginBottom: '20px'
            }}>
                {/* Top Selling Products Table */}
                <div style={{
                    backgroundColor: theme.colors.background,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                }}>
                    <h3 style={{
                        color: theme.colors.text,
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '16px',
                        marginTop: '10px'
                    }}>
                        Top Selling Products
                    </h3>

                    <div style={{
                       width: '100%', padding: '12px', overflowX: 'auto'
                    }}>
                        {/* Table Header */}

                        <table width={'100%'}>
                            <thead>
                                <tr>
                                    <th style={{textAlign: 'left'}}>Name</th>
                                    <th style={{textAlign: 'left'}}>Price</th>
                                    <th style={{textAlign: 'left'}}>Quantity</th>
                                    <th style={{textAlign: 'left'}}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Table Rows */}
                                {[
                                   { name: 'ASOS Ridley High Waist', price: '$79.49', qty: 82, amount: '$6518.18', value: 450, color: '#3B82F6' },
                                    { name: 'Marco Lightweight Shirt',price: '$128.50', qty: 37, amount: '$4754.50', value: 385, color: '#10B981' },
                                    { name: 'Half Sleeve Shirt',price: '$39.99', qty: 64, amount: '$2559.36', value: 321, color: '#F59E0B' },
                                    { name: 'Lightweight Jacket',price: '$20.00', qty: 184, amount: '$3680.00', value: 283, color: '#8B5CF6' },
                                    { name: 'Marco Shoes',price: '$79.49', qty: 64, amount: '$1965.81', value: 283, color: '#8B5CF6' },
                                ].map((item, index) => (
                                    <tr  key={index} style={{ borderTop: `1px solid ${theme.colors.border}`}}>
                                        <td style={{ textAlign: 'left' , paddingTop: '10px', color: theme.colors.text }}>{item.name}</td>
                                        <td style={{ textAlign: 'left' , paddingTop: '10px', color: theme.colors.text }}>{item.price}</td>
                                        <td style={{ textAlign: 'left' , paddingTop: '10px', color: theme.colors.text }}>{item.qty}</td>
                                        <td style={{ textAlign: 'left', paddingTop: '10px', color: theme.colors.text }}>{item.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Charts Section - Bar Chart and Donut Chart */}
                <div>
                    {/* Right side - Top Sales Donut Chart */}
                    <DonutChart
                        data={[
                            { name: 'Direct', price: '$79.49', qty: 82, amount: '$6518.18', value: 450, color: '#3B82F6' },
                            { name: 'Affiliate',price: '$128.50', qty: 37, amount: '$4754.50', value: 385, color: '#10B981' },
                            { name: 'Sponsored',price: '$39.99', qty: 64, amount: '$2559.36', value: 321, color: '#F59E0B' },
                            { name: 'E-mail',price: '$20.00', qty: 184, amount: '$3680.00', value: 283, color: '#8B5CF6' },
                        ]}
                        title="Total Sales"
                        height={150}
                        centerText="Sales"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;