import axios from 'axios';
import type { Order, User, TimeSeriesData, LocationData } from '../types';

const api = axios.create({
  timeout: 10000,
});

// Mock data generators for realistic dashboard data
export const generateMockData = () => {
  // Mock metrics data
  const metrics = [
    {
      id: 'customers',
      title: 'Customers',
      value: '3,781',
      change: 11.01,
      changeType: 'increase' as const,
      icon: 'users',
    },
    {
      id: 'orders',
      title: 'Orders',
      value: '1,219',
      change: -0.03,
      changeType: 'decrease' as const,
      icon: 'shopping-cart',
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$695',
      change: 15.03,
      changeType: 'increase' as const,
      icon: 'dollar-sign',
    },
    {
      id: 'growth',
      title: 'Growth',
      value: '30.1%',
      change: 6.08,
      changeType: 'increase' as const,
      icon: 'trending-up',
    },
  ];

  // Mock time series data for charts
  const monthlyData: TimeSeriesData[] = [
    { date: 'Jan', value: 15000000 },
    { date: 'Feb', value: 18000000 },
    { date: 'Mar', value: 22000000 },
    { date: 'Apr', value: 25000000 },
    { date: 'May', value: 19000000 },
    { date: 'Jun', value: 28000000 },
  ];

  const revenueData = {
    current: 58211,
    previous: 68768,
    growth: -15.3,
    period: 'This Week',
  };

  const locationData: LocationData[] = [
    { location: 'New York', value: 72000, percentage: 45 },
    { location: 'San Francisco', value: 39000, percentage: 25 },
    { location: 'Sydney', value: 28000, percentage: 18 },
    { location: 'Singapore', value: 19000, percentage: 12 },
  ];

  return { metrics, monthlyData, revenueData, locationData };
};

// JSONPlaceholder API for users and posts (simulating orders)
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('https://jsonplaceholder.typicode.com/users');
    return response.data.map((user: any) => ({
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: Math.random() > 0.5 ? 'Customer' : 'Premium',
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get('https://jsonplaceholder.typicode.com/posts');
    const users = await fetchUsers();
    
    return response.data.slice(0, 50).map((_post: any, index: number) => {
      const user = users[index % users.length];
      const statuses: ('pending' | 'in progress' | 'approved' | 'completed' | 'rejected')[] = ['pending', 'in progress', 'approved', 'completed', 'rejected'];
      const projects = ['Website Redesign', 'Mobile App', 'E-commerce Platform', 'API Development', 'Database Migration', 'UI/UX Design', 'Testing Suite', 'DevOps Setup'];
      
      // Generate 6-character alphanumeric ID in uppercase
      const generateOrderId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      
      return {
        id: generateOrderId(),
        customer: user?.name || 'Unknown User',
        product: projects[index % projects.length],
        amount: Math.floor(Math.random() * 1000) + 50,
        status: statuses[index % statuses.length],
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        location: ['New York', 'San Francisco', 'London', 'Tokyo'][index % 4],
      };
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Weather API for additional data visualization
export const fetchWeatherData = async () => {
  try {
    // Using a free weather API (OpenWeatherMap requires API key, so using mock data)
    return {
      temperature: Math.floor(Math.random() * 30) + 10,
      humidity: Math.floor(Math.random() * 40) + 30,
      windSpeed: Math.floor(Math.random() * 20) + 5,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { temperature: 22, humidity: 65, windSpeed: 12 };
  }
};

// Export all API functions
export const apiService = {
  fetchUsers,
  fetchOrders,
  fetchWeatherData,
  generateMockData,
};