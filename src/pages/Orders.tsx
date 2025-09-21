import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { apiService } from '../services/api';
import {
  Search,
  MoreHorizontal,
  Plus,
  X,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import type { Order } from '../types';

const Orders: React.FC = () => {
  const { theme } = useTheme();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<string>('id');
  const [isSorted, setIsSorted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showStatusPopover, setShowStatusPopover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const loadOrders = async () => {
    try {
      const ordersData = await apiService.fetchOrders();
      setOrders(ordersData);
      setFilteredOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Sort the filtered orders only if sorting is enabled
    if (isSorted) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any = a[sortBy as keyof typeof a];
        let bValue: any = b[sortBy as keyof typeof b];

        if (sortBy === 'amount') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        } else if (sortBy === 'date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = aValue.toString().toLowerCase();
          bValue = bValue.toString().toLowerCase();
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, searchTerm, sortBy, sortOrder, isSorted, statusFilter]);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showStatusPopover && 
          !(event.target as Element).closest('.status-filter-button') && 
          !(event.target as Element).closest('.status-popover')) {
        setShowStatusPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStatusPopover]);

  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'approved':
        return '#F97316'; // Orange color for approved
      case 'pending':
        return '#0EA5E9'; // Sky blue color for pending
      case 'in progress':
        return '#8B5CF6'; // Purple color for in progress
      case 'rejected':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
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
    <div className="orders-page" style={{ backgroundColor: theme.colors.surface }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="page-header"
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h1 style={{ 
            color: theme.colors.text, 
            fontSize: '32px', 
            fontWeight: '700',
            margin: '0 0 8px 0'
          }}>
            Order List
          </h1>
        </div>
        
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="filters"
        style={{
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const statuses: Array<'pending' | 'in progress' | 'approved' | 'rejected'> = ['pending', 'in progress', 'approved', 'rejected'];
              const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
              
              const newOrder = {
                id: (orders.length + 1).toString(),
                customer: 'New Customer',
                product: 'New Product',
                amount: Math.floor(Math.random() * 1000) + 100,
                status: randomStatus,
                date: new Date().toLocaleDateString(),
              };
              setOrders(prev => [...prev, newOrder]);
            }}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              padding: '12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title="Add Order"
          >
            <Plus size={20} />
          </motion.button>
          
          <motion.button
            className="status-filter-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStatusPopover(!showStatusPopover)}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              padding: '12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}
            title="Filter by Status"
          >
            <Filter size={20} />
          </motion.button>
          
          {showStatusPopover && (
            <div
              className="status-popover"
              style={{
                position: 'absolute',
                top: '160px',
                left: '52px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 9999,
                minWidth: '120px',
              }}
            >
              {/* Arrow pointing up */}
              <div
                style={{
                  position: 'absolute',
                  top: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderBottom: `6px solid ${theme.colors.surface}`,
                  zIndex: 10000,
                }}
              />
              {/* Arrow border */}
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderBottom: `7px solid ${theme.colors.border}`,
                  zIndex: 9999,
                }}
              />
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: statusFilter === 'all' ? theme.colors.primary : theme.colors.text,
                  fontWeight: statusFilter === 'all' ? '600' : 'normal',
                }}
                onClick={() => {
                  setStatusFilter('all');
                  setShowStatusPopover(false);
                }}
              >
                All Status
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: statusFilter === 'pending' ? theme.colors.primary : getStatusColor('pending'),
                  fontWeight: statusFilter === 'pending' ? '600' : 'normal',
                }}
                onClick={() => {
                  setStatusFilter('pending');
                  setShowStatusPopover(false);
                }}
              >
                Pending
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: statusFilter === 'in progress' ? theme.colors.primary : getStatusColor('in progress'),
                  fontWeight: statusFilter === 'in progress' ? '600' : 'normal',
                }}
                onClick={() => {
                  setStatusFilter('in progress');
                  setShowStatusPopover(false);
                }}
              >
                In Progress
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: statusFilter === 'approved' ? theme.colors.primary : getStatusColor('approved'),
                  fontWeight: statusFilter === 'approved' ? '600' : 'normal',
                }}
                onClick={() => {
                  setStatusFilter('approved');
                  setShowStatusPopover(false);
                }}
              >
                Approved
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: statusFilter === 'completed' ? theme.colors.primary : getStatusColor('completed'),
                  fontWeight: statusFilter === 'completed' ? '600' : 'normal',
                }}
                onClick={() => {
                  setStatusFilter('completed');
                  setShowStatusPopover(false);
                }}
              >
                Completed
              </div>
              <div
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  color: statusFilter === 'rejected' ? theme.colors.primary : getStatusColor('rejected'),
                  fontWeight: statusFilter === 'rejected' ? '600' : 'normal',
                }}
                onClick={() => {
                  setStatusFilter('rejected');
                  setShowStatusPopover(false);
                }}
              >
                Rejected
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!isSorted) {
                setIsSorted(true);
                setSortBy('id');
                setSortOrder('asc');
              } else if (sortBy === 'id' && sortOrder === 'asc') {
                setSortBy('customer');
                setSortOrder('asc');
              } else if (sortBy === 'customer' && sortOrder === 'asc') {
                setSortBy('amount');
                setSortOrder('desc');
              } else if (sortBy === 'amount' && sortOrder === 'desc') {
                setSortBy('date');
                setSortOrder('desc');
              } else {
                setIsSorted(false);
              }
            }}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              padding: '12px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={isSorted ? `Sort by ${sortBy} (${sortOrder})` : 'Sort Orders'}
          >
            <ArrowUpDown size={20} />
          </motion.button>
        </div>
        
        <div style={{ width: '200px', marginLeft: 'auto' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 40px 8px 40px',
                backgroundColor: theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '8px',
                color: theme.colors.text,
                outline: 'none',
              }}
            />
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.colors.textSecondary,
                pointerEvents: 'none',
              }}
            />
            {searchTerm && (
              <X
                size={16}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.colors.textSecondary,
                  cursor: 'pointer',
                }}
                onClick={() => setSearchTerm('')}
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          backgroundColor: theme.colors.background,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* Table Header */}
        <div
          className="orders-table-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 100px 120px 100px 60px',
            gap: '16px',
            padding: '4px 8px',
            backgroundColor: theme.colors.surface,
            borderBottom: `1px solid ${theme.colors.border}`,
            fontWeight: '600',
            fontSize: '13px',
            color: theme.colors.textSecondary,
          }}
        >
          <div>Order ID</div>
          <div>User</div>
          <div>Project</div>
          <div>Address</div>
          <div>Status</div>
          <div>Date</div>
          <div></div>
        </div>

        {/* Table Body */}
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {paginatedOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ backgroundColor: theme.colors.surface }}
              className="orders-table-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 100px 120px 100px 60px',
                gap: '16px',
                padding: '4px 8px',
                borderBottom: `1px solid ${theme.colors.border}`,
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                fontSize: '13px',
              }}
            >
              <div className="orders-table-cell" data-label="Order ID" style={{ color: theme.colors.text, fontWeight: '500' }}>
                #{order.id}
              </div>
              <div className="orders-table-cell" data-label="Customer" style={{ color: theme.colors.text, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={`https://picsum.photos/seed/${order.customer.replace(/\s+/g, '')}/24/24`}
                  alt={`${order.customer} avatar`}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                {order.customer}
              </div>
              <div className="orders-table-cell" data-label="Product" style={{ color: theme.colors.text }}>
                {order.product}
              </div>
              <div 
                className="orders-table-cell" 
                data-label="Address" 
                style={{ 
                  color: theme.colors.text, 
                  fontWeight: '600',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100px'
                }}
                title={(() => {
                  const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr', 'Cedar Ln', 'Birch Blvd', 'Spruce Way', 'Willow Ct', 'Cherry Ln'];
                  const cities = ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin', 'Paris', 'Sydney', 'Toronto', 'Chicago', 'Los Angeles'];
                  const states = ['NY', 'CA', 'UK', 'Japan', 'Germany', 'France', 'Australia', 'Canada', 'IL', 'TX'];
                  const streetNum = Math.floor(Math.random() * 999) + 1;
                  const street = streets[Math.floor(Math.random() * streets.length)];
                  const city = cities[Math.floor(Math.random() * cities.length)];
                  const state = states[Math.floor(Math.random() * states.length)];
                  return `${streetNum} ${street}, ${city}, ${state} ${Math.floor(Math.random() * 90000) + 10000}`;
                })()}
              >
                {(() => {
                  const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm St', 'Maple Dr', 'Cedar Ln', 'Birch Blvd', 'Spruce Way', 'Willow Ct', 'Cherry Ln'];
                  const cities = ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin', 'Paris', 'Sydney', 'Toronto', 'Chicago', 'Los Angeles'];
                  const states = ['NY', 'CA', 'UK', 'Japan', 'Germany', 'France', 'Australia', 'Canada', 'IL', 'TX'];
                  const streetNum = Math.floor(Math.random() * 999) + 1;
                  const street = streets[Math.floor(Math.random() * streets.length)];
                  const city = cities[Math.floor(Math.random() * cities.length)];
                  const state = states[Math.floor(Math.random() * states.length)];
                  return `${streetNum} ${street}, ${city}, ${state} ${Math.floor(Math.random() * 90000) + 10000}`;
                })()}
              </div>
              <div className="orders-table-cell" data-label="Status">
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: getStatusColor(order.status),
                    textTransform: 'capitalize',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(order.status),
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  {order.status}
                </span>
              </div>
              <div className="orders-table-cell" data-label="Date" style={{ color: theme.colors.textSecondary, fontSize: '14px' }}>
                {getRelativeTime(order.date)}
              </div>
              <div className="orders-table-cell" style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '6px',
                    color: theme.colors.textSecondary,
                  }}
                >
                  <MoreHorizontal size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {paginatedOrders.length === 0 && (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              color: theme.colors.textSecondary,
            }}
          >
            <p>No orders found</p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '24px',
        }}
      >
        <div style={{ color: theme.colors.textSecondary }}>
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: currentPage > 1 ? 'pointer' : 'not-allowed',
              opacity: currentPage > 1 ? 1 : 0.5,
            }}
          >
            Previous
          </motion.button>
          {Array.from({ length: Math.ceil(filteredOrders.length / pageSize) }, (_, i) => i + 1).map(page => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(page)}
              style={{
                backgroundColor: currentPage === page ? theme.colors.primary : theme.colors.surface,
                border: `1px solid ${theme.colors.border}`,
                color: currentPage === page ? 'white' : theme.colors.text,
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: currentPage === page ? '600' : 'normal',
              }}
            >
              {page}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: currentPage < Math.ceil(filteredOrders.length / pageSize) ? 1.05 : 1 }}
            whileTap={{ scale: currentPage < Math.ceil(filteredOrders.length / pageSize) ? 0.95 : 1 }}
            onClick={() => setCurrentPage(Math.min(Math.ceil(filteredOrders.length / pageSize), currentPage + 1))}
            disabled={currentPage === Math.ceil(filteredOrders.length / pageSize)}
            style={{
              backgroundColor: theme.colors.surface,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.text,
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: currentPage < Math.ceil(filteredOrders.length / pageSize) ? 'pointer' : 'not-allowed',
              opacity: currentPage < Math.ceil(filteredOrders.length / pageSize) ? 1 : 0.5,
            }}
          >
            Next
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Orders;