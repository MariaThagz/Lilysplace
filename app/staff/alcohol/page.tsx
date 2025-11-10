'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter,
  Wine,
  Package,
  DollarSign,
  TrendingUp,
  Settings,
  ShoppingCart,
  BarChart3,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';

// KRA Tax rate for alcohol in Kenya
const KRA_TAX_RATE = 0.20; // 20%
const MARKUP_RATE = 0.20; // 20%

interface AlcoholItem {
  id: string;
  name: string;
  type: string;
  purchasePrice: number;
  sellingPrice: number;
  priceWithMarkup: number;
  stock: number;
  totsPerBottle: number;
  totPrice: number;
  reorderLevel: number;
}

const sampleAlcohol: AlcoholItem[] = [
  { id: '1', name: 'Tusker Lager', type: 'Beer', purchasePrice: 250, sellingPrice: 300, priceWithMarkup: 360, stock: 48, totsPerBottle: 0, totPrice: 0, reorderLevel: 20 },
  { id: '2', name: 'Johnnie Walker Black', type: 'Whisky', purchasePrice: 2500, sellingPrice: 3000, priceWithMarkup: 3600, stock: 12, totsPerBottle: 25, totPrice: 150, reorderLevel: 5 },
  { id: '3', name: 'Smirnoff Vodka', type: 'Vodka', purchasePrice: 1200, sellingPrice: 1500, priceWithMarkup: 1800, stock: 15, totsPerBottle: 25, totPrice: 75, reorderLevel: 8 },
];

export default function AlcoholPage() {
  const [alcoholItems, setAlcoholItems] = useState<AlcoholItem[]>(sampleAlcohol);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AlcoholItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [useMarkupPrice, setUseMarkupPrice] = useState(false);

  // New item form
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'Beer',
    purchasePrice: 0,
    stock: 0,
    totsPerBottle: 0,
    reorderLevel: 10,
  });

  // Sale form
  const [saleForm, setSaleForm] = useState({
    quantity: 1,
    useMarkup: false,
  });

  const calculatePrices = (purchasePrice: number) => {
    const sellingPrice = purchasePrice * (1 + MARKUP_RATE);
    const priceWithMarkup = sellingPrice * (1 + KRA_TAX_RATE);
    return { sellingPrice, priceWithMarkup };
  };

  const handleAddItem = () => {
    const { sellingPrice, priceWithMarkup } = calculatePrices(newItem.purchasePrice);
    const totPrice = newItem.totsPerBottle > 0 ? sellingPrice / newItem.totsPerBottle : 0;
    
    const item: AlcoholItem = {
      id: Date.now().toString(),
      name: newItem.name,
      type: newItem.type,
      purchasePrice: newItem.purchasePrice,
      sellingPrice: Math.round(sellingPrice),
      priceWithMarkup: Math.round(priceWithMarkup),
      stock: newItem.stock,
      totsPerBottle: newItem.totsPerBottle,
      totPrice: Math.round(totPrice),
      reorderLevel: newItem.reorderLevel,
    };

    setAlcoholItems([...alcoholItems, item]);
    setShowAddModal(false);
    setNewItem({ name: '', type: 'Beer', purchasePrice: 0, stock: 0, totsPerBottle: 0, reorderLevel: 10 });
  };

  const handleSale = () => {
    if (!selectedItem) return;
    
    const updatedItems = alcoholItems.map(item => {
      if (item.id === selectedItem.id) {
        return { ...item, stock: item.stock - saleForm.quantity };
      }
      return item;
    });
    
    setAlcoholItems(updatedItems);
    setShowSaleModal(false);
    setSaleForm({ quantity: 1, useMarkup: false });
    setSelectedItem(null);
  };

  const totalValue = alcoholItems.reduce((sum, item) => sum + (item.purchasePrice * item.stock), 0);
  const lowStockItems = alcoholItems.filter(item => item.stock <= item.reorderLevel);

  const filteredItems = alcoholItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Alcohol Management</h1>
          <p className="text-gray-400">Manage purchases, sales, and stock with automatic KRA tax calculation</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="mt-4 lg:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          Add New Item
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
            <div className="bg-orange-500 p-3 rounded-lg">
              <Wine className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Low Stock</p>
              <p className="text-white text-2xl font-bold">{lowStockItems.length}</p>
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
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">KRA Tax Rate</p>
              <p className="text-white text-2xl font-bold">{KRA_TAX_RATE * 100}%</p>
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
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={useMarkupPrice}
                onChange={(e) => setUseMarkupPrice(e.target.checked)}
                className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
              />
              <span className="text-sm">Show 20% Markup Prices</span>
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
                  <td className="px-6 py-4 text-gray-300">KES {item.purchasePrice}</td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">
                      KES {useMarkupPrice ? item.priceWithMarkup : item.sellingPrice}
                    </div>
                    {useMarkupPrice && (
                      <div className="text-xs text-green-400">+20% KRA Tax</div>
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
                    <div className="flex items-center gap-2">
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
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowConfigModal(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
                        title="Configure"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
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
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700"
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
                  <option>Wine</option>
                  <option>Whisky</option>
                  <option>Vodka</option>
                  <option>Rum</option>
                  <option>Gin</option>
                  <option>Other</option>
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
                {newItem.purchasePrice > 0 && (
                  <div className="mt-2 text-sm space-y-1">
                    <p className="text-gray-400">Selling Price: <span className="text-green-400 font-medium">KES {Math.round(newItem.purchasePrice * 1.2)}</span></p>
                    <p className="text-gray-400">With 20% Tax: <span className="text-blue-400 font-medium">KES {Math.round(newItem.purchasePrice * 1.2 * 1.2)}</span></p>
                  </div>
                )}
              </div>

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
                <label className="block text-gray-300 mb-2 text-sm font-medium">Tots per Bottle (optional)</label>
                <input
                  type="number"
                  value={newItem.totsPerBottle || ''}
                  onChange={(e) => setNewItem({...newItem, totsPerBottle: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                  placeholder="0 (leave blank if not applicable)"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddItem}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  disabled={!newItem.name || !newItem.purchasePrice || !newItem.stock}
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
                <p className="text-gray-400 text-sm mt-2">Available Stock: <span className="text-white">{selectedItem.stock}</span></p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={selectedItem.stock}
                  value={saleForm.quantity}
                  onChange={(e) => setSaleForm({...saleForm, quantity: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saleForm.useMarkup}
                    onChange={(e) => setSaleForm({...saleForm, useMarkup: e.target.checked})}
                    className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
                  />
                  <span className="text-sm">Use 20% markup price</span>
                </label>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Sale Amount</p>
                <p className="text-white font-bold text-2xl">
                  KES {(saleForm.useMarkup ? selectedItem.priceWithMarkup : selectedItem.sellingPrice) * saleForm.quantity}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {saleForm.useMarkup ? 'Including 20% KRA Tax' : 'Normal Price'}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSale}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                  disabled={saleForm.quantity > selectedItem.stock || saleForm.quantity < 1}
                >
                  Record Sale
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
    </div>
  );
}