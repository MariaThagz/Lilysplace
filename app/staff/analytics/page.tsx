'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  Users,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Eye,
  Wine,
  UtensilsCrossed,
  Car,
  ShoppingCart,
  Clock
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';

// Sample analytics data
const revenueData = [
  { month: 'Jan', alcohol: 380000, food: 280000, carwash: 45000, total: 705000 },
  { month: 'Feb', alcohol: 420000, food: 310000, carwash: 52000, total: 782000 },
  { month: 'Mar', alcohol: 395000, food: 295000, carwash: 48000, total: 738000 },
  { month: 'Apr', alcohol: 450000, food: 320000, carwash: 55000, total: 825000 },
  { month: 'May', alcohol: 520000, food: 350000, carwash: 62000, total: 932000 },
  { month: 'Jun', alcohol: 480000, food: 330000, carwash: 58000, total: 868000 },
];

const categoryData = [
  { name: 'Alcohol', value: 2645000, color: '#EF4444' },
  { name: 'Food', value: 1885000, color: '#10B981' },
  { name: 'Car Wash', value: 320000, color: '#3B82F6' },
];

const topSellingItems = [
  { name: 'Tusker Lager', category: 'Alcohol', sales: 1245, revenue: 373500, growth: 12 },
  { name: 'Chicken Stew', category: 'Food', sales: 856, revenue: 299600, growth: 8 },
  { name: 'Johnnie Walker Black', category: 'Alcohol', sales: 342, revenue: 1026000, growth: 15 },
  { name: 'Full Service Wash', category: 'Car Wash', sales: 298, revenue: 298000, growth: 22 },
  { name: 'Smirnoff Vodka', category: 'Alcohol', sales: 287, revenue: 516600, growth: 5 },
];

const inventoryMetrics = {
  turnoverRate: 2.8,
  stockoutRate: 4.2,
  carryingCost: 125000,
  lowStockItems: 12,
  deadStockValue: 45000,
};

const customerMetrics = {
  averageTransaction: 1250,
  repeatRate: 68,
  peakHours: ['19:00-21:00', '12:00-14:00'],
  customerGrowth: 15,
};

const StatCard = ({ icon: Icon, label, value, change, color, subtitle }: any) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
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
    {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
  </motion.div>
);

const MetricCard = ({ title, value, description, trend }: any) => (
  <div className="bg-gray-700/50 p-4 rounded-lg">
    <p className="text-gray-400 text-sm mb-1">{title}</p>
    <p className="text-white text-lg font-bold">{value}</p>
    <p className="text-gray-500 text-xs mt-1">{description}</p>
    {trend && (
      <p className={`text-xs mt-1 ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
      </p>
    )}
  </div>
);

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months');
  const [activeView, setActiveView] = useState('overview');

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Business Analytics</h1>
          <p className="text-gray-400">Deep insights into your business performance and trends</p>
        </div>
        <div className="flex items-center gap-4 mt-4 lg:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-600 focus:outline-none focus:border-red-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="year">Last Year</option>
          </select>
          <motion.button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        {['overview', 'sales', 'inventory', 'customers'].map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-6 py-3 font-semibold transition-colors capitalize ${
              activeView === view
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={DollarSign}
              label="Total Revenue"
              value="KES 4.85M"
              change={18}
              color="bg-green-500"
              subtitle="Last 6 months"
            />
            <StatCard
              icon={TrendingUp}
              label="Net Profit"
              value="KES 1.89M"
              change={12}
              color="bg-blue-500"
              subtitle="39% margin"
            />
            <StatCard
              icon={ShoppingCart}
              label="Total Transactions"
              value="3,872"
              change={8}
              color="bg-purple-500"
              subtitle="Avg: KES 1,252"
            />
            <StatCard
              icon={Users}
              label="Customer Growth"
              value="+15%"
              change={15}
              color="bg-orange-500"
              subtitle="Repeat rate: 68%"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <motion.div
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`KES ${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="alcohol" stroke="#EF4444" strokeWidth={2} name="Alcohol" />
                  <Line type="monotone" dataKey="food" stroke="#10B981" strokeWidth={2} name="Food" />
                  <Line type="monotone" dataKey="carwash" stroke="#3B82F6" strokeWidth={2} name="Car Wash" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Revenue Distribution */}
            <motion.div
              className="bg-gray-800 p-6 rounded-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Revenue by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`KES ${Number(value).toLocaleString()}`, 'Revenue']}
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Stock Turnover Rate"
              value="2.8x"
              description="Inventory turns per month"
              trend={0.3}
            />
            <MetricCard
              title="Gross Profit Margin"
              value="42%"
              description="Overall profit margin"
              trend={2}
            />
            <MetricCard
              title="Low Stock Items"
              value="12"
              description="Items below reorder level"
              trend={-3}
            />
            <MetricCard
              title="Customer Repeat Rate"
              value="68%"
              description="Returning customers"
              trend={5}
            />
          </div>
        </div>
      )}

      {/* Sales Analytics Tab */}
      {activeView === 'sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard
              icon={Wine}
              label="Alcohol Sales"
              value="KES 2.65M"
              change={15}
              color="bg-red-500"
            />
            <StatCard
              icon={UtensilsCrossed}
              label="Food Sales"
              value="KES 1.89M"
              change={12}
              color="bg-green-500"
            />
            <StatCard
              icon={Car}
              label="Car Wash Sales"
              value="KES 320K"
              change={22}
              color="bg-blue-500"
            />
          </div>

          {/* Top Selling Items */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Top Selling Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Item</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Units Sold</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Revenue</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {topSellingItems.map((item, index) => (
                    <tr key={item.name} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.category === 'Alcohol' ? 'bg-red-500/20 text-red-400' :
                          item.category === 'Food' ? 'bg-green-500/20 text-green-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.sales}</td>
                      <td className="px-6 py-4 text-white font-medium">KES {item.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.growth > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.growth > 0 ? '+' : ''}{item.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}

      {/* Inventory Analytics Tab */}
      {activeView === 'inventory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Package}
              label="Turnover Rate"
              value="2.8x"
              change={0.3}
              color="bg-blue-500"
              subtitle="Per month"
            />
            <StatCard
              icon={TrendingUp}
              label="Stockout Rate"
              value="4.2%"
              change={-1.2}
              color="bg-green-500"
              subtitle="Improved"
            />
            <StatCard
              icon={DollarSign}
              label="Carrying Cost"
              value="KES 125K"
              change={-8}
              color="bg-orange-500"
              subtitle="Monthly average"
            />
            <StatCard
              icon={Eye}
              label="Low Stock Items"
              value="12"
              change={-3}
              color="bg-red-500"
              subtitle="Need reordering"
            />
          </div>

          {/* Inventory Health */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Inventory Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Fast Moving"
                value="45 items"
                description="High turnover rate"
              />
              <MetricCard
                title="Slow Moving"
                value="23 items"
                description="Low turnover rate"
              />
              <MetricCard
                title="Dead Stock"
                value="8 items"
                description="No sales in 90 days"
              />
              <MetricCard
                title="Optimal Stock"
                value="67%"
                description="Items at ideal levels"
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Customer Analytics Tab */}
      {activeView === 'customers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={Users}
              label="Repeat Rate"
              value="68%"
              change={5}
              color="bg-purple-500"
              subtitle="Returning customers"
            />
            <StatCard
              icon={DollarSign}
              label="Avg. Transaction"
              value="KES 1,250"
              change={8}
              color="bg-green-500"
              subtitle="Per customer"
            />
            <StatCard
              icon={Clock}
              label="Peak Hours"
              value="7-9 PM"
              color="bg-orange-500"
              subtitle="Busiest time"
            />
            <StatCard
              icon={TrendingUp}
              label="New Customers"
              value="+15%"
              change={15}
              color="bg-blue-500"
              subtitle="Monthly growth"
            />
          </div>

          {/* Customer Insights */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Customer Behavior</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Peak Hours Analysis</h4>
                <div className="space-y-3">
                  {customerMetrics.peakHours.map((hour, index) => (
                    <div key={hour} className="flex items-center justify-between">
                      <span className="text-gray-300">{hour}</span>
                      <span className="text-white font-medium">+{65 - (index * 15)}% traffic</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Customer Segmentation</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Regular Customers</span>
                    <span className="text-green-400 font-medium">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Occasional Visitors</span>
                    <span className="text-blue-400 font-medium">35%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">New Customers</span>
                    <span className="text-orange-400 font-medium">23%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}