'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search,
  Car,
  DollarSign,
  Users,
  Sparkles,
  CreditCard,
  Smartphone,
  Wallet,
  TrendingUp,
  Calendar,
  Edit,
  Check,
  X
} from 'lucide-react';

const COMMISSION_RATE = 0.30; // 30%

interface ServiceLog {
  id: string;
  date: string;
  time: string;
  customerName: string;
  vehicleType: string;
  plateNumber: string;
  serviceType: string;
  price: number;
  employeeName: string;
  employeeCommission: number;
  paymentMethod: 'Cash' | 'M-Pesa' | 'Card';
  airFreshener: boolean;
  airFreshenerPrice: number;
}

interface Employee {
  id: string;
  name: string;
  totalServices: number;
  totalRevenue: number;
  totalCommission: number;
}

interface Expense {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
}

const serviceTypes = [
  { name: 'Basic Wash', price: 500 },
  { name: 'Full Service', price: 1000 },
  { name: 'Premium Detailing', price: 2000 },
  { name: 'Interior Only', price: 700 },
  { name: 'Exterior Only', price: 400 },
];

const sampleLogs: ServiceLog[] = [
  {
    id: '1',
    date: '2024-11-10',
    time: '09:30',
    customerName: 'John Doe',
    vehicleType: 'Sedan',
    plateNumber: 'KCA 123A',
    serviceType: 'Full Service',
    price: 1000,
    employeeName: 'James Mwangi',
    employeeCommission: 300,
    paymentMethod: 'M-Pesa',
    airFreshener: true,
    airFreshenerPrice: 150,
  },
];

const sampleExpenses: Expense[] = [
  { id: '1', date: '2024-11-01', category: 'Water', description: 'Water bill - November', amount: 5000 },
  { id: '2', date: '2024-11-01', category: 'Electricity', description: 'Electricity bill - November', amount: 3500 },
  { id: '3', date: '2024-11-05', category: 'Salaries', description: 'Staff salaries - Week 1', amount: 12000 },
];

export default function CarWashPage() {
  const [activeTab, setActiveTab] = useState<'logs' | 'employees' | 'expenses'>('logs');
  const [serviceLogs, setServiceLogs] = useState<ServiceLog[]>(sampleLogs);
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [newService, setNewService] = useState({
    customerName: '',
    vehicleType: 'Sedan',
    plateNumber: '',
    serviceType: 'Basic Wash',
    price: 500,
    employeeName: '',
    paymentMethod: 'Cash' as 'Cash' | 'M-Pesa' | 'Card',
    airFreshener: false,
    airFreshenerPrice: 150,
  });

  const [newExpense, setNewExpense] = useState({
    category: 'Water',
    description: '',
    amount: 0,
  });

  const handleAddService = () => {
    const commission = newService.price * COMMISSION_RATE;
    const now = new Date();
    
    const service: ServiceLog = {
      id: Date.now().toString(),
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 5),
      customerName: newService.customerName,
      vehicleType: newService.vehicleType,
      plateNumber: newService.plateNumber,
      serviceType: newService.serviceType,
      price: newService.price,
      employeeName: newService.employeeName,
      employeeCommission: commission,
      paymentMethod: newService.paymentMethod,
      airFreshener: newService.airFreshener,
      airFreshenerPrice: newService.airFreshener ? newService.airFreshenerPrice : 0,
    };

    setServiceLogs([service, ...serviceLogs]);
    setShowAddModal(false);
    setNewService({
      customerName: '',
      vehicleType: 'Sedan',
      plateNumber: '',
      serviceType: 'Basic Wash',
      price: 500,
      employeeName: '',
      paymentMethod: 'Cash',
      airFreshener: false,
      airFreshenerPrice: 150,
    });
  };

  // Calculate employee statistics
  const employeeStats = serviceLogs.reduce((acc, log) => {
    if (!acc[log.employeeName]) {
      acc[log.employeeName] = {
        id: log.employeeName,
        name: log.employeeName,
        totalServices: 0,
        totalRevenue: 0,
        totalCommission: 0,
      };
    }
    acc[log.employeeName].totalServices++;
    acc[log.employeeName].totalRevenue += log.price + log.airFreshenerPrice;
    acc[log.employeeName].totalCommission += log.employeeCommission;
    return acc;
  }, {} as Record<string, Employee>);

  const employees = Object.values(employeeStats);

  // Calculate totals
  const totalRevenue = serviceLogs.reduce((sum, log) => sum + log.price + log.airFreshenerPrice, 0);
  const totalCommissions = serviceLogs.reduce((sum, log) => sum + log.employeeCommission, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalProfit = totalRevenue - totalCommissions - totalExpenses;

  const PaymentMethodIcon = ({ method }: { method: string }) => {
    switch (method) {
      case 'M-Pesa':
        return <Smartphone className="w-4 h-4" />;
      case 'Card':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Car Wash Management</h1>
          <p className="text-gray-400">Track services, commissions, and expenses</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          className="mt-4 lg:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          {activeTab === 'logs' ? 'New Service' : activeTab === 'expenses' ? 'Add Expense' : 'View Services'}
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
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Services</p>
              <p className="text-white text-2xl font-bold">{serviceLogs.length}</p>
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
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-white text-2xl font-bold">KES {totalRevenue.toLocaleString()}</p>
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
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Commissions (30%)</p>
              <p className="text-white text-2xl font-bold">KES {totalCommissions.toLocaleString()}</p>
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
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Net Profit</p>
              <p className="text-white text-2xl font-bold">KES {totalProfit.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'logs'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Service Logs
        </button>
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'employees'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Employee Performance
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'expenses'
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Service Logs Tab */}
      {activeTab === 'logs' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date/Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Employee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Commission</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {serviceLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    className="hover:bg-gray-700/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{log.date}</div>
                      <div className="text-gray-400 text-sm">{log.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">{log.customerName}</div>
                      <div className="text-gray-400 text-sm">{log.plateNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{log.vehicleType}</td>
                    <td className="px-6 py-4">
                      <div className="text-white">{log.serviceType}</div>
                      {log.airFreshener && (
                        <div className="flex items-center gap-1 text-xs text-blue-400 mt-1">
                          <Sparkles className="w-3 h-3" />
                          Air Freshener
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{log.employeeName}</td>
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">KES {log.price}</div>
                      {log.airFreshener && (
                        <div className="text-xs text-gray-400">+{log.airFreshenerPrice}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-green-400 font-medium">KES {log.employeeCommission}</div>
                      <div className="text-xs text-gray-400">30%</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${
                        log.paymentMethod === 'M-Pesa' 
                          ? 'bg-green-500/20 text-green-400'
                          : log.paymentMethod === 'Card'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <PaymentMethodIcon method={log.paymentMethod} />
                        <span className="text-sm font-medium">{log.paymentMethod}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Employee Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total Services</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Total Commission</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Avg per Service</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {employees.map((emp, index) => (
                  <motion.tr
                    key={emp.id}
                    className="hover:bg-gray-700/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-6 py-4 text-white font-medium">{emp.name}</td>
                    <td className="px-6 py-4 text-gray-300">{emp.totalServices}</td>
                    <td className="px-6 py-4 text-white font-medium">KES {emp.totalRevenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-green-400 font-medium">KES {emp.totalCommission.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-300">
                      KES {Math.round(emp.totalCommission / emp.totalServices).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Monthly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Water & Utilities</p>
                <p className="text-white text-xl font-bold mt-1">
                  KES {expenses.filter(e => e.category === 'Water' || e.category === 'Electricity').reduce((s, e) => s + e.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Salaries</p>
                <p className="text-white text-xl font-bold mt-1">
                  KES {expenses.filter(e => e.category === 'Salaries').reduce((s, e) => s + e.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Expenses</p>
                <p className="text-white text-xl font-bold mt-1">KES {totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {expenses.map((expense, index) => (
                    <motion.tr
                      key={expense.id}
                      className="hover:bg-gray-700/50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-4 text-gray-300">{expense.date}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{expense.description}</td>
                      <td className="px-6 py-4 text-white font-medium">KES {expense.amount.toLocaleString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      {showAddModal && activeTab === 'logs' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full border border-gray-700 my-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Record New Service</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Customer Name</label>
                  <input
                    type="text"
                    value={newService.customerName}
                    onChange={(e) => setNewService({...newService, customerName: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Plate Number</label>
                  <input
                    type="text"
                    value={newService.plateNumber}
                    onChange={(e) => setNewService({...newService, plateNumber: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="KCA 123A"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Vehicle Type</label>
                  <select
                    value={newService.vehicleType}
                    onChange={(e) => setNewService({...newService, vehicleType: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Truck</option>
                    <option>Van</option>
                    <option>Motorcycle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Service Type</label>
                  <select
                    value={newService.serviceType}
                    onChange={(e) => {
                      const service = serviceTypes.find(s => s.name === e.target.value);
                      setNewService({...newService, serviceType: e.target.value, price: service?.price || 0});
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    {serviceTypes.map(service => (
                      <option key={service.name} value={service.name}>{service.name} - KES {service.price}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Employee Name</label>
                  <input
                    type="text"
                    value={newService.employeeName}
                    onChange={(e) => setNewService({...newService, employeeName: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Employee name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Payment Method</label>
                  <select
                    value={newService.paymentMethod}
                    onChange={(e) => setNewService({...newService, paymentMethod: e.target.value as any})}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Cash">Cash</option>
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Card">Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newService.airFreshener}
                    onChange={(e) => setNewService({...newService, airFreshener: e.target.checked})}
                    className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Add Air Freshener (KES 150)</span>
                </label>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Service Price:</span>
                  <span className="font-medium">KES {newService.price}</span>
                </div>
                {newService.airFreshener && (
                  <div className="flex justify-between text-gray-300">
                    <span>Air Freshener:</span>
                    <span className="font-medium">KES {newService.airFreshenerPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-bold pt-2 border-t border-gray-600">
                  <span>Total:</span>
                  <span>KES {newService.price + (newService.airFreshener ? newService.airFreshenerPrice : 0)}</span>
                </div>
                <div className="flex justify-between text-green-400 text-sm">
                  <span>Employee Commission (30%):</span>
                  <span className="font-medium">KES {Math.round(newService.price * COMMISSION_RATE)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddService}
                  disabled={!newService.customerName || !newService.employeeName}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Add Service
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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