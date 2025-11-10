'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search,
  UtensilsCrossed,
  Package,
  DollarSign,
  ShoppingCart,
  Edit,
  Trash2,
  X,
  ChefHat,
  ClipboardList,
  Calendar
} from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  costPerUnit: number;
  reorderLevel: number;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  sellingPrice: number;
  ingredients: { ingredientId: string; quantity: number }[];
  preparationTime: number;
}

interface Utensil {
  id: string;
  name: string;
  quantity: number;
  condition: 'Good' | 'Fair' | 'Poor';
  lastStockTake: string;
}

const sampleIngredients: Ingredient[] = [
  { id: '1', name: 'Rice', unit: 'kg', quantity: 50, costPerUnit: 120, reorderLevel: 20 },
  { id: '2', name: 'Chicken', unit: 'kg', quantity: 30, costPerUnit: 350, reorderLevel: 10 },
  { id: '3', name: 'Tomatoes', unit: 'kg', quantity: 15, costPerUnit: 80, reorderLevel: 8 },
  { id: '4', name: 'Onions', unit: 'kg', quantity: 20, costPerUnit: 60, reorderLevel: 10 },
];

const sampleMenu: MenuItem[] = [
  { 
    id: '1', 
    name: 'Chicken Stew', 
    category: 'Main Course', 
    sellingPrice: 350,
    ingredients: [
      { ingredientId: '2', quantity: 0.3 },
      { ingredientId: '3', quantity: 0.2 },
      { ingredientId: '4', quantity: 0.1 }
    ],
    preparationTime: 45
  },
];

const sampleUtensils: Utensil[] = [
  { id: '1', name: 'Plates', quantity: 100, condition: 'Good', lastStockTake: '2024-10-01' },
  { id: '2', name: 'Forks', quantity: 120, condition: 'Fair', lastStockTake: '2024-10-01' },
  { id: '3', name: 'Knives', quantity: 95, condition: 'Good', lastStockTake: '2024-10-01' },
];

export default function FoodPage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'ingredients' | 'utensils'>('menu');
  const [ingredients, setIngredients] = useState<Ingredient[]>(sampleIngredients);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenu);
  const [utensils, setUtensils] = useState<Utensil[]>(sampleUtensils);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    category: 'Main Course',
    sellingPrice: 0,
    preparationTime: 30,
  });

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    unit: 'kg',
    quantity: 0,
    costPerUnit: 0,
    reorderLevel: 10,
  });

  const calculateMenuItemCost = (item: MenuItem) => {
    return item.ingredients.reduce((total, ing) => {
      const ingredient = ingredients.find(i => i.id === ing.ingredientId);
      if (ingredient) {
        return total + (ingredient.costPerUnit * ing.quantity);
      }
      return total;
    }, 0);
  };

  const lowStockIngredients = ingredients.filter(ing => ing.quantity <= ing.reorderLevel);
  const totalIngredientsValue = ingredients.reduce((sum, ing) => sum + (ing.quantity * ing.costPerUnit), 0);

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Food Management</h1>
          <p className="text-gray-400">Manage menu, ingredients, and kitchen inventory</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="mt-4 lg:mt-0 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Add {activeTab === 'menu' ? 'Menu Item' : activeTab === 'ingredients' ? 'Ingredient' : 'Utensil'}
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Menu Items</p>
              <p className="text-white text-2xl font-bold">{menuItems.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Ingredients</p>
              <p className="text-white text-2xl font-bold">{ingredients.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Stock Value</p>
              <p className="text-white text-2xl font-bold">KES {Math.round(totalIngredientsValue).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-500 p-3 rounded-lg">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Low Stock</p>
              <p className="text-white text-2xl font-bold">{lowStockIngredients.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'menu'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Menu Items
        </button>
        <button
          onClick={() => setActiveTab('ingredients')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'ingredients'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Ingredients
        </button>
        <button
          onClick={() => setActiveTab('utensils')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'utensils'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Utensils
        </button>
      </div>

      {/* Search */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* Menu Items Tab */}
      {activeTab === 'menu' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Dish Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Selling Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Profit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Prep Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {menuItems.map((item, index) => {
                  const cost = calculateMenuItemCost(item);
                  const profit = item.sellingPrice - cost;
                  const profitMargin = ((profit / item.sellingPrice) * 100).toFixed(1);
                  
                  return (
                    <motion.tr
                      key={item.id}
                      className="hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-gray-300">{item.category}</td>
                      <td className="px-6 py-4 text-gray-300">KES {Math.round(cost)}</td>
                      <td className="px-6 py-4 text-white font-medium">KES {item.sellingPrice}</td>
                      <td className="px-6 py-4">
                        <div className="text-green-400 font-medium">KES {Math.round(profit)}</div>
                        <div className="text-xs text-gray-400">{profitMargin}% margin</div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.preparationTime} min</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Ingredients Tab */}
      {activeTab === 'ingredients' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Cost/Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {ingredients.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    className="hover:bg-gray-700/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-gray-300">{item.quantity}</td>
                    <td className="px-6 py-4 text-gray-300">{item.unit}</td>
                    <td className="px-6 py-4 text-gray-300">KES {item.costPerUnit}</td>
                    <td className="px-6 py-4 text-white font-medium">KES {Math.round(item.quantity * item.costPerUnit)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.quantity <= item.reorderLevel 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {item.quantity <= item.reorderLevel ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Utensils Tab */}
      {activeTab === 'utensils' && (
        <div className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-lg flex items-start gap-3">
            <Calendar className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-400">Monthly Stock Take Due</h4>
              <p className="text-gray-400 text-sm mt-1">Next utensils inventory check: November 15, 2024</p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Item</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Condition</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Last Stock Take</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {utensils.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      className="hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                      <td className="px-6 py-4 text-gray-300">{item.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.condition === 'Good' 
                            ? 'bg-green-500/20 text-green-400' 
                            : item.condition === 'Fair'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.lastStockTake}</td>
                      <td className="px-6 py-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                          Update Stock
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}