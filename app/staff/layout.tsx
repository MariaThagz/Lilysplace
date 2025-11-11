'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Wine, 
  UtensilsCrossed, 
  Car, 
  Menu, 
  X,
  LogOut,
  UserCircle,
  Lock,
  BarChart3,
  ChevronDown,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/staff', icon: LayoutDashboard },
  { name: 'Alcohol', href: '/staff/alcohol', icon: Wine },
  { name: 'Food', href: '/staff/food', icon: UtensilsCrossed },
  { name: 'Car Wash', href: '/staff/carwash', icon: Car },
  { name: 'Analytics', href: '/staff/analytics', icon: BarChart3 },
];

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const auth = localStorage.getItem('staffAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    if (username === 'staff' && password === 'lily2024') {
      setIsAuthenticated(true);
      localStorage.setItem('staffAuth', 'true');
      setError('');
      if (pathname === '/staff') {
        router.refresh();
      }
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('staffAuth');
    setUserDropdownOpen(false);
    router.push('/staff');
  };

  const handleProfileClick = () => {
    router.push('/staff/profile');
    setUserDropdownOpen(false);
  };

  // Show login page if not authenticated
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

  // Show dashboard layout if authenticated
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <div className="relative h-16 w-32 mx-auto">
              <Image
                src="/logo.png"
                alt="Lily's Place"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-center text-gray-400 text-sm mt-2">Staff Portal</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-red-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info & Dropdown */}
          <div className="p-4 border-t border-gray-700" ref={dropdownRef}>
            <div className="relative">
              {/* User dropdown trigger */}
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors group"
              >
                <UserCircle className="w-5 h-5" />
                <span className="text-sm font-medium flex-1 text-left">Staff User</span>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    userDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown menu */}
              {userDropdownOpen && (
                <motion.div
                  className="absolute bottom-full left-0 right-0 mb-2 bg-gray-700 border border-gray-600 rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors text-left"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span className="text-sm">My Profile</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors text-left border-t border-gray-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </motion.aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-gray-800 border-b border-gray-700 lg:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="text-white font-semibold">Staff Portal</span>
            <div className="w-6" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}