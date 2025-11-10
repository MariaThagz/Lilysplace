'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Lock, UserCircle, Calendar, ClipboardList, DollarSign, Users } from 'lucide-react';

export default function StaffPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simple authentication - replace with real authentication
    if (username === 'staff' && password === 'lily2024') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative h-20 w-40">
              <Image
                src="/logo.png"
                alt="Lily's Place Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Staff Portal</h1>
            <p className="text-gray-400">Sign in to access staff resources</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-semibold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <motion.div
                className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              onClick={handleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
          </div>

          {/* Back to Home */}
          <motion.a
            href="/"
            className="block text-center mt-6 text-gray-400 hover:text-red-500 transition-colors"
            whileHover={{ x: -5 }}
          >
            ← Back to Home
          </motion.a>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <p className="text-xs text-gray-400 text-center">
              Demo: username: <span className="text-red-400">staff</span> / password: <span className="text-red-400">lily2024</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <motion.div
        className="bg-black/80 backdrop-blur-sm py-4 sticky top-0 z-40 border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-24">
              <Image
                src="/logo.png"
                alt="Lily's Place Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-white font-semibold">Staff Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <UserCircle className="w-5 h-5" />
              <span className="text-sm">Welcome, Staff</span>
            </div>
            <motion.button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.h1
          className="text-4xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Staff Dashboard
        </motion.h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Calendar, label: 'Today\'s Reservations', value: '24', color: 'bg-blue-500' },
            { icon: ClipboardList, label: 'Pending Orders', value: '8', color: 'bg-orange-500' },
            { icon: DollarSign, label: 'Today\'s Revenue', value: '$2,450', color: 'bg-green-500' },
            { icon: Users, label: 'Active Staff', value: '12', color: 'bg-purple-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'View Reservations', color: 'bg-blue-500 hover:bg-blue-600' },
              { label: 'Manage Orders', color: 'bg-orange-500 hover:bg-orange-600' },
              { label: 'Update Menu', color: 'bg-green-500 hover:bg-green-600' },
              { label: 'Staff Schedule', color: 'bg-purple-500 hover:bg-purple-600' },
              { label: 'Inventory', color: 'bg-yellow-500 hover:bg-yellow-600' },
              { label: 'Reports', color: 'bg-red-500 hover:bg-red-600' },
            ].map((action) => (
              <motion.button
                key={action.label}
                className={`${action.color} text-white px-6 py-4 rounded-lg font-semibold transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Back to Main Site */}
        <motion.a
          href="/"
          className="block text-center mt-8 text-gray-400 hover:text-red-500 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ x: -5 }}
        >
          ← Back to Main Site
        </motion.a>
      </div>
    </div>
  );
}