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
  Calendar,
  BarChart3,
  Receipt,
  Tag
} from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  costPerUnit: number;
  reorderLevel: number;
  lastPurchaseDate?: string;
  lastPurchaseQuantity?: number;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  sellingPrice: number;
  ingredients: { ingredientId: string; quantity: number }[];
  preparationTime: number;
  isActive: boolean;
}

interface Utensil {
  id: string;
  name: string;
  quantity: number;
  condition: 'Good' | 'Fair' | 'Poor';
  lastStockTake: string;
  minimumQuantity: number;
}

interface Sale {
  id: string;
  menuItemId: string;
  quantity: number;
  totalAmount: number;
  paymentMethod: 'Cash' | 'Card' | 'Mobile Money' | 'Other';
  saleDate: string;
  customerName?: string;
}

interface Purchase {
  id: string;
  ingredientId: string;
  quantity: number;
  costPerUnit: number;
  totalCost: number;
  purchaseDate: string;
  supplier: string;
}

interface StockTake {
  id: string;
  type: 'ingredient' | 'utensil';
  itemId: string;
  quantity: number;
  date: string;
  period: 'daily' | 'weekly' | 'monthly';
  notes?: string;
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
    preparationTime: 45,
    isActive: true
  },
  { 
    id: '2', 
    name: 'French Fries', 
    category: 'Snacks', 
    sellingPrice: 200,
    ingredients: [
      { ingredientId: '5', quantity: 0.2 }
    ],
    preparationTime: 15,
    isActive: true
  },
];

const sampleUtensils: Utensil[] = [
  { id: '1', name: 'Plates', quantity: 100, condition: 'Good', lastStockTake: '2024-10-01', minimumQuantity: 50 },
  { id: '2', name: 'Forks', quantity: 120, condition: 'Fair', lastStockTake: '2024-10-01', minimumQuantity: 60 },
  { id: '3', name: 'Knives', quantity: 95, condition: 'Good', lastStockTake: '2024-10-01', minimumQuantity: 40 },
];

const sampleSales: Sale[] = [
  { id: '1', menuItemId: '1', quantity: 2, totalAmount: 700, paymentMethod: 'Cash', saleDate: '2024-10-15' },
  { id: '2', menuItemId: '2', quantity: 1, totalAmount: 200, paymentMethod: 'Mobile Money', saleDate: '2024-10-15' },
];

const samplePurchases: Purchase[] = [
  { id: '1', ingredientId: '1', quantity: 25, costPerUnit: 120, totalCost: 3000, purchaseDate: '2024-10-14', supplier: 'Local Market' },
  { id: '2', ingredientId: '2', quantity: 15, costPerUnit: 350, totalCost: 5250, purchaseDate: '2024-10-14', supplier: 'Butchery' },
];

const sampleStockTakes: StockTake[] = [
  { id: '1', type: 'ingredient', itemId: '1', quantity: 50, date: '2024-10-15', period: 'daily' },
  { id: '2', type: 'utensil', itemId: '1', quantity: 100, date: '2024-10-01', period: 'monthly' },
];

export default function FoodPage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'ingredients' | 'utensils' | 'sales' | 'purchases' | 'stock'>('menu');
  const [ingredients, setIngredients] = useState<Ingredient[]>(sampleIngredients);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(sampleMenu);
  const [utensils, setUtensils] = useState<Utensil[]>(sampleUtensils);
  const [sales, setSales] = useState<Sale[]>(sampleSales);
  const [purchases, setPurchases] = useState<Purchase[]>(samplePurchases);
  const [stockTakes, setStockTakes] = useState<StockTake[]>(sampleStockTakes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showStockTakeModal, setShowStockTakeModal] = useState(false);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    category: 'Main Course',
    sellingPrice: 0,
    preparationTime: 30,
    ingredients: [] as { ingredientId: string; quantity: number }[]
  });

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    unit: 'kg',
    quantity: 0,
    costPerUnit: 0,
    reorderLevel: 10,
  });

  const [newSale, setNewSale] = useState({
    menuItemId: '',
    quantity: 1,
    paymentMethod: 'Cash' as 'Cash' | 'Card' | 'Mobile Money' | 'Other',
    customerName: ''
  });

  const [newPurchase, setNewPurchase] = useState({
    ingredientId: '',
    quantity: 0,
    costPerUnit: 0,
    supplier: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

  const [newStockTake, setNewStockTake] = useState({
    type: 'ingredient' as 'ingredient' | 'utensil',
    itemId: '',
    quantity: 0,
    period: 'daily' as 'daily' | 'weekly' | 'monthly',
    notes: ''
  });

  const categories = ['Main Course', 'Snacks', 'Beverages', 'Breakfast', 'Lunch', 'Dinner', 'Desserts'];

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
  
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const todaySales = sales.filter(sale => sale.saleDate === new Date().toISOString().split('T')[0])
                         .reduce((sum, sale) => sum + sale.totalAmount, 0);

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: Date.now().toString(),
      ...newMenuItem,
      isActive: true
    };
    setMenuItems([...menuItems, newItem]);
    setShowAddModal(false);
    setNewMenuItem({
      name: '',
      category: 'Main Course',
      sellingPrice: 0,
      preparationTime: 30,
      ingredients: []
    });
  };

  const handleAddSale = () => {
    const menuItem = menuItems.find(item => item.id === newSale.menuItemId);
    if (!menuItem) return;

    const sale: Sale = {
      id: Date.now().toString(),
      menuItemId: newSale.menuItemId,
      quantity: newSale.quantity,
      totalAmount: menuItem.sellingPrice * newSale.quantity,
      paymentMethod: newSale.paymentMethod,
      saleDate: new Date().toISOString().split('T')[0],
      customerName: newSale.customerName || undefined
    };

    setSales([...sales, sale]);
    setShowSaleModal(false);
    setNewSale({
      menuItemId: '',
      quantity: 1,
      paymentMethod: 'Cash',
      customerName: ''
    });
  };

  const handleAddPurchase = () => {
    const purchase: Purchase = {
      id: Date.now().toString(),
      ingredientId: newPurchase.ingredientId,
      quantity: newPurchase.quantity,
      costPerUnit: newPurchase.costPerUnit,
      totalCost: newPurchase.quantity * newPurchase.costPerUnit,
      purchaseDate: newPurchase.purchaseDate,
      supplier: newPurchase.supplier
    };

    setPurchases([...purchases, purchase]);
    
    // Update ingredient quantity
    setIngredients(ingredients.map(ing => 
      ing.id === newPurchase.ingredientId 
        ? { ...ing, quantity: ing.quantity + newPurchase.quantity }
        : ing
    ));

    setShowPurchaseModal(false);
    setNewPurchase({
      ingredientId: '',
      quantity: 0,
      costPerUnit: 0,
      supplier: '',
      purchaseDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleStockTake = () => {
    const stockTake: StockTake = {
      id: Date.now().toString(),
      type: newStockTake.type,
      itemId: newStockTake.itemId,
      quantity: newStockTake.quantity,
      date: new Date().toISOString().split('T')[0],
      period: newStockTake.period,
      notes: newStockTake.notes || undefined
    };

    setStockTakes([...stockTakes, stockTake]);
    setShowStockTakeModal(false);
    setNewStockTake({
      type: 'ingredient',
      itemId: '',
      quantity: 0,
      period: 'daily',
      notes: ''
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Food Management</h1>
          <p className="text-gray-400">Manage menu, ingredients, sales, and kitchen inventory</p>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          {activeTab === 'sales' && (
            <motion.button
              onClick={() => setShowSaleModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              New Sale
            </motion.button>
          )}
          {activeTab === 'ingredients' && (
            <motion.button
              onClick={() => setShowPurchaseModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              New Purchase
            </motion.button>
          )}
          {activeTab === 'stock' && (
            <motion.button
              onClick={() => setShowStockTakeModal(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ClipboardList className="w-5 h-5" />
              Stock Take
            </motion.button>
          )}
          {(activeTab === 'menu' || activeTab === 'ingredients' || activeTab === 'utensils') && (
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              Add {activeTab === 'menu' ? 'Menu Item' : activeTab === 'ingredients' ? 'Ingredient' : 'Utensil'}
            </motion.button>
          )}
        </div>
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
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Today's Sales</p>
              <p className="text-white text-2xl font-bold">KES {todaySales.toLocaleString()}</p>
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
      <div className="flex gap-2 mb-6 border-b border-gray-700 overflow-x-auto">
        {['menu', 'ingredients', 'utensils', 'sales', 'purchases', 'stock'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
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
                      <td className="px-6 py-4 text-gray-300">
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">KES {Math.round(cost)}</td>
                      <td className="px-6 py-4 text-white font-medium">KES {item.sellingPrice}</td>
                      <td className="px-6 py-4">
                        <div className="text-green-400 font-medium">KES {Math.round(profit)}</div>
                        <div className="text-xs text-gray-400">{profitMargin}% margin</div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{item.preparationTime} min</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.isActive 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
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

      {/* Sales Tab */}
      {activeTab === 'sales' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Item</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Payment Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sales.map((sale, index) => {
                  const menuItem = menuItems.find(item => item.id === sale.menuItemId);
                  return (
                    <motion.tr
                      key={sale.id}
                      className="hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-gray-300">{sale.saleDate}</td>
                      <td className="px-6 py-4 text-white font-medium">{menuItem?.name}</td>
                      <td className="px-6 py-4 text-gray-300">{sale.quantity}</td>
                      <td className="px-6 py-4 text-green-400 font-medium">KES {sale.totalAmount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sale.paymentMethod === 'Cash' 
                            ? 'bg-green-500/20 text-green-400'
                            : sale.paymentMethod === 'Card'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{sale.customerName || 'Walk-in'}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Purchases Tab */}
      {activeTab === 'purchases' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ingredient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Cost/Unit</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Supplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {purchases.map((purchase, index) => {
                  const ingredient = ingredients.find(ing => ing.id === purchase.ingredientId);
                  return (
                    <motion.tr
                      key={purchase.id}
                      className="hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-gray-300">{purchase.purchaseDate}</td>
                      <td className="px-6 py-4 text-white font-medium">{ingredient?.name}</td>
                      <td className="px-6 py-4 text-gray-300">{purchase.quantity} {ingredient?.unit}</td>
                      <td className="px-6 py-4 text-gray-300">KES {purchase.costPerUnit}</td>
                      <td className="px-6 py-4 text-red-400 font-medium">KES {purchase.totalCost}</td>
                      <td className="px-6 py-4 text-gray-300">{purchase.supplier}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stock Take Tab */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="text-white font-semibold mb-2">Daily Stock Takes</h3>
              <p className="text-2xl text-green-400 font-bold">
                {stockTakes.filter(st => st.period === 'daily').length}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="text-white font-semibold mb-2">Weekly Stock Takes</h3>
              <p className="text-2xl text-blue-400 font-bold">
                {stockTakes.filter(st => st.period === 'weekly').length}
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="text-white font-semibold mb-2">Monthly Stock Takes</h3>
              <p className="text-2xl text-purple-400 font-bold">
                {stockTakes.filter(st => st.period === 'monthly').length}
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Item</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Period</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {stockTakes.map((stockTake, index) => {
                    const item = stockTake.type === 'ingredient' 
                      ? ingredients.find(ing => ing.id === stockTake.itemId)
                      : utensils.find(ut => ut.id === stockTake.itemId);
                    
                    return (
                      <motion.tr
                        key={stockTake.id}
                        className="hover:bg-gray-700/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="px-6 py-4 text-gray-300">{stockTake.date}</td>
                        <td className="px-6 py-4 text-gray-300 capitalize">{stockTake.type}</td>
                        <td className="px-6 py-4 text-white font-medium">{item?.name}</td>
                        <td className="px-6 py-4 text-gray-300">{stockTake.quantity}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            stockTake.period === 'daily'
                              ? 'bg-green-500/20 text-green-400'
                              : stockTake.period === 'weekly'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-purple-500/20 text-purple-400'
                          }`}>
                            {stockTake.period}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{stockTake.notes || '-'}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Sale Modal */}
      {showSaleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Record New Sale</h3>
              <button onClick={() => setShowSaleModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Menu Item</label>
                <select
                  value={newSale.menuItemId}
                  onChange={(e) => setNewSale({...newSale, menuItemId: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="">Select menu item</option>
                  {menuItems.filter(item => item.isActive).map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - KES {item.sellingPrice}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Quantity</label>
                <input
                  type="number"
                  value={newSale.quantity}
                  onChange={(e) => setNewSale({...newSale, quantity: parseInt(e.target.value)})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  min="1"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Payment Method</label>
                <select
                  value={newSale.paymentMethod}
                  onChange={(e) => setNewSale({...newSale, paymentMethod: e.target.value as any})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Customer Name (Optional)</label>
                <input
                  type="text"
                  value={newSale.customerName}
                  onChange={(e) => setNewSale({...newSale, customerName: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  placeholder="Walk-in customer"
                />
              </div>

              <button
                onClick={handleAddSale}
                disabled={!newSale.menuItemId}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Record Sale
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Record Purchase</h3>
              <button onClick={() => setShowPurchaseModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Ingredient</label>
                <select
                  value={newPurchase.ingredientId}
                  onChange={(e) => setNewPurchase({...newPurchase, ingredientId: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="">Select ingredient</option>
                  {ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Quantity</label>
                <input
                  type="number"
                  value={newPurchase.quantity}
                  onChange={(e) => setNewPurchase({...newPurchase, quantity: parseFloat(e.target.value)})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  min="0"
                  step="0.1"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Cost Per Unit (KES)</label>
                <input
                  type="number"
                  value={newPurchase.costPerUnit}
                  onChange={(e) => setNewPurchase({...newPurchase, costPerUnit: parseFloat(e.target.value)})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Supplier</label>
                <input
                  type="text"
                  value={newPurchase.supplier}
                  onChange={(e) => setNewPurchase({...newPurchase, supplier: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  placeholder="Supplier name"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Purchase Date</label>
                <input
                  type="date"
                  value={newPurchase.purchaseDate}
                  onChange={(e) => setNewPurchase({...newPurchase, purchaseDate: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                />
              </div>

              <button
                onClick={handleAddPurchase}
                disabled={!newPurchase.ingredientId || !newPurchase.quantity || !newPurchase.costPerUnit}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Record Purchase
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Stock Take Modal */}
      {showStockTakeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-gray-800 rounded-xl border border-gray-700 p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-lg font-semibold">Stock Take</h3>
              <button onClick={() => setShowStockTakeModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Type</label>
                <select
                  value={newStockTake.type}
                  onChange={(e) => setNewStockTake({...newStockTake, type: e.target.value as any, itemId: ''})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="ingredient">Ingredient</option>
                  <option value="utensil">Utensil</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Item</label>
                <select
                  value={newStockTake.itemId}
                  onChange={(e) => setNewStockTake({...newStockTake, itemId: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="">Select {newStockTake.type}</option>
                  {newStockTake.type === 'ingredient' 
                    ? ingredients.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} ({item.unit})
                        </option>
                      ))
                    : utensils.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))
                  }
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Quantity</label>
                <input
                  type="number"
                  value={newStockTake.quantity}
                  onChange={(e) => setNewStockTake({...newStockTake, quantity: parseFloat(e.target.value)})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  min="0"
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Period</label>
                <select
                  value={newStockTake.period}
                  onChange={(e) => setNewStockTake({...newStockTake, period: e.target.value as any})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Notes (Optional)</label>
                <textarea
                  value={newStockTake.notes}
                  onChange={(e) => setNewStockTake({...newStockTake, notes: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-green-500"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>

              <button
                onClick={handleStockTake}
                disabled={!newStockTake.itemId || !newStockTake.quantity}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Record Stock Take
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}