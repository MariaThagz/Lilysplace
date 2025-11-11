'use client';
import { motion } from 'framer-motion';
import { 
  UtensilsCrossed,
  Package,
  DollarSign,
  ChefHat,
  ClipboardList,
  ArrowRight
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
    id: 'menu',
    title: 'Menu Management',
    description: 'Create and manage menu items, set prices and track profitability',
    icon: ChefHat,
    iconBg: 'bg-blue-500',
    cardBg: 'bg-gradient-to-br from-blue-900/40 to-blue-950/60',
    borderColor: 'border-blue-700/40',
    link: '/staff/food/menu',
    linkColor: 'text-blue-400 hover:text-blue-300'
  },
  {
    id: 'ingredients',
    title: 'Ingredients Inventory',
    description: 'Track ingredient stock levels, costs and reorder points',
    icon: Package,
    iconBg: 'bg-green-500',
    cardBg: 'bg-gradient-to-br from-green-900/40 to-green-950/60',
    borderColor: 'border-green-700/40',
    link: '/staff/food/ingredients',
    linkColor: 'text-green-400 hover:text-green-300'
  },
  {
    id: 'sales',
    title: 'Sales Records',
    description: 'View and record food sales, generate receipts and track revenue',
    icon: DollarSign,
    iconBg: 'bg-red-500',
    cardBg: 'bg-gradient-to-br from-red-900/40 to-red-950/60',
    borderColor: 'border-red-700/40',
    link: '/staff/food/sales',
    linkColor: 'text-red-400 hover:text-red-300'
  },
  {
    id: 'stock',
    title: 'Stock Takes',
    description: 'Perform daily, weekly and monthly stock counts and audits',
    icon: ClipboardList,
    iconBg: 'bg-purple-500',
    cardBg: 'bg-gradient-to-br from-purple-900/40 to-purple-950/60',
    borderColor: 'border-purple-700/40',
    link: '/staff/food/stock',
    linkColor: 'text-purple-400 hover:text-purple-300'
  },
  {
    id: 'utensils',
    title: 'Kitchen Utensils',
    description: 'Manage kitchen equipment, utensils and track conditions',
    icon: UtensilsCrossed,
    iconBg: 'bg-yellow-500',
    cardBg: 'bg-gradient-to-br from-yellow-900/40 to-yellow-950/60',
    borderColor: 'border-yellow-700/40',
    link: '/staff/food/utensils',
    linkColor: 'text-yellow-400 hover:text-yellow-300'
  }
];

export default function FoodDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Food Management</h1>
          <p className="text-gray-400">Manage your kitchen operations, inventory, and sales</p>
        </div>

        {/* Stats Header */}
        <motion.div
          className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Today's Sales</p>
            <p className="text-white text-xl font-bold">KES 45,750</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Menu Items</p>
            <p className="text-white text-xl font-bold">24</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Total Ingredients</p>
            <p className="text-white text-xl font-bold">48</p>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/80 transition-colors">
            <p className="text-gray-400 text-xs mb-1">Low Stock Alerts</p>
            <p className="text-white text-xl font-bold">5</p>
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


      </div>
    </div>
  );
}