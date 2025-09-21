export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: bigint | number;
  category?: string;
}

export interface Order {
  id: string;
  customer: string; // Used as user name
  product: string; // Used as project name
  amount: number; // Not displayed, but kept for compatibility
  status: 'pending' | 'in progress' | 'approved' | 'completed' | 'rejected';
  date: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface RevenueData {
  current: number;
  previous: number;
  growth: number;
  period: string;
}

export interface LocationData {
  location: string;
  value: number;
  percentage?: number;
}

export interface Theme {
  mode: 'light' | 'dark';
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    card_background: string;
    project_background: string;
    actual_background: string;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}