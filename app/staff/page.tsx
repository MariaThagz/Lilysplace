'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users,
  Wine,
  UtensilsCrossed,
  Car,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data
const salesData = [
  { day: 'Mon', alcohol: 4000, food: 2400, carwash: 1200 },
  { day: 'Tue', alcohol: 3000, food: 1398, carwash: 980 },
  { day: 'Wed', alcohol: 5000, food: 3800, carwash: 1500 },
  { day: 'Thu', alcohol: 2780, food: 3908, carwash: 1100 },
  { day: 'Fri', alcohol: 6890, food: 4800, carwash: 1800 },
  { day: 'Sat', alcohol: 8390, food: 5800, carwash: 2200 },
  { day: 'Sun', alcohol: 7490, food: 4300, carwash: 1600 },
];

const departmentData = [
  { name: 'Alcohol', sales: 15420 },
  { name: 'Food', sales: 18650 },
  { name: 'Car Wash', sales: 11160 },
];

const StatCard = ({ icon: Icon, label, value, change, color, delay }: any) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`${color} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {change !== undefined && (
        <span className={`text-sm font-semibold ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <p className="text-gray-400 text-sm mb-1">{label}</p>
    <p className="text-white text-2xl font-bold">{value}</p>
  </motion.div>
);

const AlertCard = ({ title, message, type = 'warning' }: any) => (
  <motion.div
    className={`p-4 rounded-lg border ${
      type === 'warning' 
        ? 'bg-yellow-500/10 border-yellow-500/30' 
        : 'bg-red-500/10 border-red-500/30'
    }`}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ x: 5 }}
  >
    <div className="flex items-start gap-3">
      <AlertCircle className={`w-5 h-5 flex-shrink-0 ${type === 'warning' ? 'text-yellow-500' : 'text-red-500'}`} />
      <div>
        <h4 className={`font-semibold ${type === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
          {title}
        </h4>
        <p className="text-gray-400 text-sm mt-1">{message}</p>
      </div>
    </div>
  </motion.div>
);

export default function StaffDashboard() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening today at Lily's Place.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={DollarSign}
          label="Today's Revenue"
          value="KES 45,230"
          change={12}
          color="bg-green-500"
          delay={0.1}
        />
        <StatCard
          icon={TrendingUp}
          label="Weekly Profit"
          value="KES 189,450"
          change={8}
          color="bg-blue-500"
          delay={0.2}
        />
        <StatCard
          icon={Package}
          label="Low Stock Items"
          value="12"
          color="bg-orange-500"
          delay={0.3}
        />
        <StatCard
          icon={Users}
          label="Active Staff"
          value="8"
          color="bg-purple-500"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Sales Chart */}
        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Weekly Sales Overview</h3>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-red-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Legend />
              <Line type="monotone" dataKey="alcohol" stroke="#EF4444" strokeWidth={2} name="Alcohol" />
              <Line type="monotone" dataKey="food" stroke="#10B981" strokeWidth={2} name="Food" />
              <Line type="monotone" dataKey="carwash" stroke="#3B82F6" strokeWidth={2} name="Car Wash" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Today's Department Sales</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="sales" fill="#EF4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Access & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <motion.div
          className="lg:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/staff/alcohol">
              <motion.div 
                className="flex flex-col items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wine className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm font-medium text-center">Alcohol Management</span>
              </motion.div>
            </Link>
            
            <Link href="/staff/food">
              <motion.div 
                className="flex flex-col items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UtensilsCrossed className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm font-medium text-center">Food Menu</span>
              </motion.div>
            </Link>
            
            <Link href="/staff/carwash">
              <motion.div 
                className="flex flex-col items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Car className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-300 text-sm font-medium text-center">Car Wash Log</span>
              </motion.div>
            </Link>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Package className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm font-medium text-center">Inventory</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DollarSign className="w-8 h-8 text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm font-medium text-center">Sales Report</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center gap-3 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-gray-300 text-sm font-medium text-center">Analytics</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Alerts & Notifications</h3>
          <div className="space-y-3">
            <AlertCard
              type="warning"
              title="Low Stock Alert"
              message="Tusker beer running low - 8 bottles remaining"
            />
            <AlertCard
              type="warning"
              title="Inventory Check Due"
              message="Monthly utensils stock take due in 3 days"
            />
            <AlertCard
              type="critical"
              title="Payment Pending"
              message="5 unpaid invoices from suppliers"
            />
          </div>
          
          <Link href="/staff/alerts">
            <motion.button
              className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">View All Alerts</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}