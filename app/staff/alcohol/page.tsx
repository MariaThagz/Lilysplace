'use client';
import { motion } from 'framer-motion';
import { 
  Wine,
  Package,
  DollarSign,
  ShoppingCart,
  ClipboardList,
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface DashboardCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  iconBg: string;
  cardBg: string;
  borderColor: string;
  link: string;
  linkColor: string;
}

const dashboardCards: DashboardCard[] = [
  {
    id: 'inventory',
    title: 'Alcohol Inventory',
    description: 'Manage alcohol stock, track purchases and monitor reorder levels',
    icon: Wine,
    iconBg: 'bg-red-500',
    cardBg: 'bg-gradient-to-br from-red-900/40 to-red-950/60',
    borderColor: 'border-red-700/40',
    link: '/staff/alcohol/inventory',
    linkColor: 'text-red-400 hover:text-red-300'
  },
  {
    id: 'sales',
    title: 'Sales Records',
    description: 'Record alcohol sales, generate receipts with KRA tax calculations',
    icon: ShoppingCart,
    iconBg: 'bg-green-500',
    cardBg: 'bg-gradient-to-br from-green-900/40 to-green-950/60',
    borderColor: 'border-green-700/40',
    link: '/staff/alcohol/sales',
    linkColor: 'text-green-400 hover:text-green-300'
  },
  {
    id: 'stock',
    title: 'Stock Management',
    description: 'Perform stock takes, track stock movements and manage reorders',
    icon: ClipboardList,
    iconBg: 'bg-purple-500',
    cardBg: 'bg-gradient-to-br from-purple-900/40 to-purple-950/60',
    borderColor: 'border-purple-700/40',
    link: '/staff/alcohol/stock',
    linkColor: 'text-purple-400 hover:text-purple-300'
  }
];

// Sample stats data
const stats = {
  totalItems: 48,
  stockValue: 245000,
  totalProfit: 85000,
  lowStockItems: 5
};

export default function AlcoholDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Alcohol Management</h1>
          <p className="text-gray-400">Manage alcohol inventory, sales and stock with KRA tax compliance</p>
        </div>

        {/* Stats Header */}
        <motion.div
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Total Items</p>
            <p className="text-white text-xl font-bold">{stats.totalItems}</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Stock Value</p>
            <p className="text-white text-xl font-bold">KES {stats.stockValue.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Total Profit</p>
            <p className="text-white text-xl font-bold">KES {stats.totalProfit.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Low Stock Alerts</p>
            <p className="text-white text-xl font-bold">{stats.lowStockItems}</p>
          </div>
        </motion.div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                className={`${card.cardBg} backdrop-blur-sm border ${card.borderColor} rounded-2xl p-8 hover:border-opacity-80 transition-all cursor-pointer group relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => window.location.href = card.link}
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className={`${card.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-8 relative z-10 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="mb-8 relative z-10">
                  <h3 className="text-white text-2xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-300 text-base leading-relaxed">{card.description}</p>
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 relative z-10">
                  <span className={`${card.linkColor} font-medium text-sm transition-colors`}>
                    Access Tool
                  </span>
                  <ArrowRight className={`w-4 h-4 ${card.linkColor} group-hover:translate-x-1 transition-transform`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Info Section */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* KRA Tax Info */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-orange-400" />
              <h3 className="text-white font-semibold">KRA Tax Rates</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Excise Duty (Alcohol):</span>
                <span className="text-orange-400 font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">VAT (Value Added Tax):</span>
                <span className="text-purple-400 font-semibold">16%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Restaurant Markup:</span>
                <span className="text-green-400 font-semibold">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Wholesale Margin:</span>
                <span className="text-blue-400 font-semibold">10%</span>
              </div>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-white font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div>
                  <p className="text-white font-medium text-sm">Tusker Lager</p>
                  <p className="text-gray-400 text-xs">Stock: 15 bottles</p>
                </div>
                <span className="text-red-400 text-xs font-semibold">LOW</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div>
                  <p className="text-white font-medium text-sm">Johnnie Walker</p>
                  <p className="text-gray-400 text-xs">Sold: 3 bottles today</p>
                </div>
                <span className="text-green-400 text-xs font-semibold">+KES 13,572</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div>
                  <p className="text-white font-medium text-sm">Wine Collection</p>
                  <p className="text-gray-400 text-xs">Restocked: 24 bottles</p>
                </div>
                <span className="text-blue-400 text-xs font-semibold">UPDATED</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}