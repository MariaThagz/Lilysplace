'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Wine,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  X,
  Printer
} from 'lucide-react';

// KRA Tax rates for alcohol in Kenya
const EXCISE_DUTY_RATE = 0.30; // 30% Excise Duty on alcohol
const VAT_RATE = 0.16; // 16% VAT (mandatory)
const RESTAURANT_MARKUP = 0.20; // 20% Restaurant markup for retail
const WHOLESALE_MARGIN = 0.10; // 10% margin for wholesale

interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  type: 'purchase' | 'sale';
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  exciseDuty?: number;
  vat?: number;
  profit?: number;
  paymentMethod?: string;
  saleType?: 'retail' | 'wholesale';
  date: string;
}

interface AlcoholItem {
  id: string;
  name: string;
  type: string;
  volume: number;
  purchasePrice: number;
  wholesalePrice: number;
  retailPrice: number;
  retailPriceWithTax: number;
  stock: number;
  totsPerBottle: number;
  totPrice: number;
  reorderLevel: number;
}

const sampleAlcohol: AlcoholItem[] = [
  { 
    id: '1', 
    name: 'Tusker Lager', 
    type: 'Beer', 
    volume: 500,
    purchasePrice: 200, 
    wholesalePrice: 220,
    retailPrice: 240, 
    retailPriceWithTax: 363,
    stock: 48, 
    totsPerBottle: 0,
    totPrice: 0, 
    reorderLevel: 20 
  },
  { 
    id: '2', 
    name: 'Johnnie Walker Black', 
    type: 'Whisky', 
    volume: 750,
    purchasePrice: 2500, 
    wholesalePrice: 2750,
    retailPrice: 3000, 
    retailPriceWithTax: 4524,
    stock: 12, 
    totsPerBottle: 25,
    totPrice: 181, 
    reorderLevel: 5 
  },
];

export default function AlcoholPage() {
  const [alcoholItems, setAlcoholItems] = useState<AlcoholItem[]>(sampleAlcohol);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showTransactionsModal, setShowTransactionsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AlcoholItem | null>(null);
  const [lastReceipt, setLastReceipt] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceView, setPriceView] = useState<'retail' | 'wholesale'>('retail');

  const [newItem, setNewItem] = useState({
    name: '',
    type: 'Beer',
    volume: 750,
    purchasePrice: 0,
    stock: 0,
    reorderLevel: 10,
  });

  const [saleForm, setSaleForm] = useState({
    quantity: 1,
    saleType: 'retail' as 'retail' | 'wholesale',
    paymentMethod: 'Cash',
  });

  const calculateTotsForVolume = (volume: number, type: string) => {
    if (type === 'Beer') return 0;
    if (volume === 750) return 25;
    if (volume === 1000) return 30;
    return Math.floor(volume / 30);
  };

  const calculatePrices = (purchasePrice: number, volume: number, type: string) => {
    const totsPerBottle = calculateTotsForVolume(volume, type);
    const wholesalePrice = Math.round(purchasePrice * (1 + WHOLESALE_MARGIN));
    const retailPrice = Math.round(purchasePrice * (1 + RESTAURANT_MARKUP));
    const exciseDuty = Math.round(retailPrice * EXCISE_DUTY_RATE);
    const priceWithExcise = retailPrice + exciseDuty;
    const vat = Math.round(priceWithExcise * VAT_RATE);
    const retailPriceWithTax = retailPrice + exciseDuty + vat;
    const totPrice = totsPerBottle > 0 ? Math.round(retailPriceWithTax / totsPerBottle) : 0;
    
    return { 
      wholesalePrice, 
      retailPrice, 
      retailPriceWithTax: Math.round(retailPriceWithTax),
      totPrice,
      totsPerBottle,
      exciseDuty,
      vat
    };
  };

  const handleAddItem = () => {
    const prices = calculatePrices(newItem.purchasePrice, newItem.volume, newItem.type);
    
    const item: AlcoholItem = {
      id: Date.now().toString(),
      name: newItem.name,
      type: newItem.type,
      volume: newItem.volume,
      purchasePrice: newItem.purchasePrice,
      wholesalePrice: prices.wholesalePrice,
      retailPrice: prices.retailPrice,
      retailPriceWithTax: prices.retailPriceWithTax,
      stock: newItem.stock,
      totsPerBottle: prices.totsPerBottle,
      totPrice: prices.totPrice,
      reorderLevel: newItem.reorderLevel,
    };

    setAlcoholItems([...alcoholItems, item]);
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      itemId: item.id,
      itemName: item.name,
      type: 'purchase',
      quantity: newItem.stock,
      unitPrice: newItem.purchasePrice,
      totalAmount: newItem.purchasePrice * newItem.stock,
      date: new Date().toISOString(),
    };
    
    setTransactions([transaction, ...transactions]);
    setShowAddModal(false);
    setNewItem({ name: '', type: 'Beer', volume: 750, purchasePrice: 0, stock: 0, reorderLevel: 10 });
  };

  const handleSale = () => {
    if (!selectedItem) return;
    
    const isRetail = saleForm.saleType === 'retail';
    const unitPrice = isRetail ? selectedItem.retailPriceWithTax : selectedItem.wholesalePrice;
    const totalAmount = unitPrice * saleForm.quantity;
    
    let profit = 0;
    let exciseDuty = 0;
    let vat = 0;
    
    if (isRetail) {
      const costBasis = selectedItem.purchasePrice * saleForm.quantity;
      profit = totalAmount - costBasis;
      const retailAmount = selectedItem.retailPrice * saleForm.quantity;
      exciseDuty = Math.round(retailAmount * EXCISE_DUTY_RATE);
      const priceWithExcise = retailAmount + exciseDuty;
      vat = Math.round(priceWithExcise * VAT_RATE);
    } else {
      profit = (selectedItem.wholesalePrice - selectedItem.purchasePrice) * saleForm.quantity;
    }
    
    const updatedItems = alcoholItems.map(item => 
      item.id === selectedItem.id 
        ? { ...item, stock: item.stock - saleForm.quantity }
        : item
    );
    
    const transaction: Transaction = {
      id: Date.now().toString(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      type: 'sale',
      quantity: saleForm.quantity,
      unitPrice: unitPrice,
      totalAmount: totalAmount,
      exciseDuty: isRetail ? exciseDuty : undefined,
      vat: isRetail ? vat : undefined,
      profit: profit,
      paymentMethod: saleForm.paymentMethod,
      saleType: saleForm.saleType,
      date: new Date().toISOString(),
    };
    
    setAlcoholItems(updatedItems);
    setTransactions([transaction, ...transactions]);
    setLastReceipt(transaction);
    setShowSaleModal(false);
    setShowReceiptModal(true);
    setSaleForm({ quantity: 1, saleType: 'retail', paymentMethod: 'Cash' });
    setSelectedItem(null);
  };

  const totalValue = alcoholItems.reduce((sum, item) => sum + (item.purchasePrice * item.stock), 0);
  const lowStockItems = alcoholItems.filter(item => item.stock <= item.reorderLevel);
  const totalProfit = transactions
    .filter(t => t.type === 'sale')
    .reduce((sum, t) => sum + (t.profit || 0), 0);

  const filteredItems = alcoholItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const printReceipt = () => {
    window.print();
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Alcohol Management</h1>
          <p className="text-gray-400">Manage purchases, sales, stock with KRA excise duty & VAT calculation</p>
        </div>
        <div className="mt-4 lg:mt-0 flex gap-3">
          <motion.button
            onClick={() => setShowTransactionsModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 className="w-5 h-5" />
            Transactions
          </motion.button>
          <motion.button
            onClick={() => setShowAddModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Add New Item
          </motion.button>
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
            <div className="bg-blue-500 p-3 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Items</p>
              <p className="text-white text-2xl font-bold">{alcoholItems.length}</p>
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
            <div className="bg-green-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Stock Value</p>
              <p className="text-white text-2xl font-bold">KES {totalValue.toLocaleString()}</p>
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
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Profit</p>
              <p className="text-white text-2xl font-bold">KES {totalProfit.toLocaleString()}</p>
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
            <div className="bg-orange-500 p-3 rounded-lg">
              <Wine className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Low Stock</p>
              <p className="text-white text-2xl font-bold">{lowStockItems.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="radio"
                name="priceView"
                checked={priceView === 'retail'}
                onChange={() => setPriceView('retail')}
                className="w-4 h-4 text-red-500"
              />
              <span className="text-sm">Retail Prices (with taxes)</span>
            </label>
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="radio"
                name="priceView"
                checked={priceView === 'wholesale'}
                onChange={() => setPriceView('wholesale')}
                className="w-4 h-4 text-red-500"
              />
              <span className="text-sm">Wholesale Prices</span>
            </label>
          </div>
        </div>
      </div>

      {/* Alcohol Items Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Volume</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Purchase</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Selling Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Tots</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  className="hover:bg-gray-700/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 text-white font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-300">{item.type}</td>
                  <td className="px-6 py-4 text-gray-300">{item.volume}ml</td>
                  <td className="px-6 py-4 text-gray-300">KES {item.purchasePrice}</td>
                  <td className="px-6 py-4">
                    {priceView === 'retail' ? (
                      <div>
                        <div className="text-white font-medium">KES {item.retailPriceWithTax}</div>
                        <div className="text-xs text-gray-400">
                          Base: KES {item.retailPrice} + Taxes
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-white font-medium">KES {item.wholesalePrice}</div>
                        <div className="text-xs text-gray-400">Wholesale</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.stock <= item.reorderLevel 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {item.totsPerBottle > 0 ? (
                      <div>
                        <div>{item.totsPerBottle} tots</div>
                        <div className="text-xs text-gray-400">KES {item.totPrice}/tot</div>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setShowSaleModal(true);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                      title="Record Sale"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add New Alcohol Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="e.g., Tusker Lager"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Type</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({...newItem, type: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  <option>Beer</option>
                  <option>Whisky</option>
                  <option>Vodka</option>
                  <option>Wine</option>
                  <option>Rum</option>
                  <option>Gin</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Volume (ml)</label>
                <select
                  value={newItem.volume}
                  onChange={(e) => setNewItem({...newItem, volume: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  <option value="330">330ml (Small Beer)</option>
                  <option value="500">500ml (Large Beer)</option>
                  <option value="750">750ml (Standard Bottle - 25 tots)</option>
                  <option value="1000">1000ml (1 Liter - 30 tots)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Purchase Price (KES)</label>
                <input
                  type="number"
                  value={newItem.purchasePrice || ''}
                  onChange={(e) => setNewItem({...newItem, purchasePrice: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="0"
                />
              </div>

              {newItem.purchasePrice > 0 && (
                <div className="bg-gray-700/50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-300 font-medium text-sm">PRICE CALCULATIONS:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Purchase Price:</span>
                      <span className="text-white">KES {newItem.purchasePrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-400">Wholesale Price (10%):</span>
                      <span className="text-blue-400">KES {Math.round(newItem.purchasePrice * 1.10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-400">Retail Base (20%):</span>
                      <span className="text-green-400">KES {Math.round(newItem.purchasePrice * 1.20)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-400">Excise Duty (30%):</span>
                      <span className="text-orange-400">
                        KES {Math.round(newItem.purchasePrice * 1.20 * EXCISE_DUTY_RATE)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-400">VAT (16%):</span>
                      <span className="text-purple-400">
                        KES {Math.round((newItem.purchasePrice * 1.20) * (1 + EXCISE_DUTY_RATE) * VAT_RATE)}
                      </span>
                    </div>
                    <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                      <span className="text-white">Final Retail Price:</span>
                      <span className="text-green-400">
                        KES {Math.round(
                          (newItem.purchasePrice * 1.20) + 
                          (newItem.purchasePrice * 1.20 * EXCISE_DUTY_RATE) + 
                          ((newItem.purchasePrice * 1.20) * (1 + EXCISE_DUTY_RATE) * VAT_RATE)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Initial Stock</label>
                <input
                  type="number"
                  value={newItem.stock || ''}
                  onChange={(e) => setNewItem({...newItem, stock: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Reorder Level</label>
                <input
                  type="number"
                  value={newItem.reorderLevel || ''}
                  onChange={(e) => setNewItem({...newItem, reorderLevel: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="10"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddItem}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  disabled={!newItem.name || !newItem.purchasePrice}
                >
                  Add Item
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Sale Modal */}
      {showSaleModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Record Sale</h3>
              <button onClick={() => setShowSaleModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Item</p>
                <p className="text-white font-semibold text-lg">{selectedItem.name}</p>
                <p className="text-gray-400 text-sm">Current Stock: <span className="text-white">{selectedItem.stock}</span></p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Sale Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="saleType"
                      checked={saleForm.saleType === 'retail'}
                      onChange={() => setSaleForm({...saleForm, saleType: 'retail'})}
                      className="w-4 h-4 text-red-500"
                    />
                    <span>Retail (With 20% + Taxes)</span>
                  </label>
                  <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="saleType"
                      checked={saleForm.saleType === 'wholesale'}
                      onChange={() => setSaleForm({...saleForm, saleType: 'wholesale'})}
                      className="w-4 h-4 text-red-500"
                    />
                    <span>Wholesale (10% margin)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  value={saleForm.quantity}
                  onChange={(e) => setSaleForm({...saleForm, quantity: Number(e.target.value)})}
                  min="1"
                  max={selectedItem.stock}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Payment Method</label>
                <select
                  value={saleForm.paymentMethod}
                  onChange={(e) => setSaleForm({...saleForm, paymentMethod: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                >
                  <option>Cash</option>
                  <option>Card</option>
                  <option>M-Pesa</option>
                </select>
              </div>

              {saleForm.quantity > 0 && (
                <div className="bg-gray-700/50 p-4 rounded-lg space-y-2">
                  <p className="text-gray-300 font-medium">Sale Summary</p>
                  <div className="flex justify-between text-sm">
                    <span>Unit Price:</span>
                    <span className="font-medium">
                      KES {saleForm.saleType === 'retail' ? selectedItem.retailPriceWithTax : selectedItem.wholesalePrice}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-green-400">
                      KES {(
                        (saleForm.saleType === 'retail' ? selectedItem.retailPriceWithTax : selectedItem.wholesalePrice) * 
                        saleForm.quantity
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSale}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  disabled={saleForm.quantity > selectedItem.stock}
                >
                  Complete Sale
                </button>
                <button
                  onClick={() => setShowSaleModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceiptModal && lastReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-xl p-6 max-w-md w-full border border-gray-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-lg font-bold text-gray-800">BAR & RESTAURANT</h4>
              <p className="text-sm text-gray-600">Official Receipt</p>
              <p className="text-xs text-gray-500 mt-2">{formatDate(lastReceipt.date)}</p>
            </div>

            <div className="space-y-3 text-gray-700 mb-6">
              <div className="flex justify-between">
                <span className="font-medium">Item:</span>
                <span>{lastReceipt.itemName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Quantity:</span>
                <span>{lastReceipt.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Unit Price:</span>
                <span>KES {lastReceipt.unitPrice}</span>
              </div>

              {lastReceipt.exciseDuty && (
                <div className="flex justify-between text-sm text-orange-600">
                  <span>Excise Duty:</span>
                  <span>KES {lastReceipt.exciseDuty}</span>
                </div>
              )}

              {lastReceipt.vat && (
                <div className="flex justify-between text-sm text-purple-600">
                  <span>VAT:</span>
                  <span>KES {lastReceipt.vat}</span>
                </div>
              )}

              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>TOTAL:</span>
                  <span className="text-green-600">KES {lastReceipt.totalAmount}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 text-sm">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{lastReceipt.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={printReceipt}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Transactions Modal */}
      {showTransactionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 w-full max-w-6xl border border-gray-700 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Transaction History</h3>
              <button onClick={() => setShowTransactionsModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Item</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Qty</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Unit Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-300">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-600/50">
                      <td className="px-6 py-4 text-gray-300 text-sm">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {transaction.itemName}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'sale' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {transaction.quantity}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        KES {transaction.unitPrice}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        KES {transaction.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        {transaction.profit ? (
                          <span className="text-green-400 font-medium">
                            KES {transaction.profit}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}