'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Mail, 
  Phone, 
  Calendar, 
  Shield, 
  Edit,
  Save,
  X,
  Clock,
  TrendingUp,
  Award,
  FileText
} from 'lucide-react';

interface StaffProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
  shifts: {
    day: string;
    time: string;
  }[];
  performance: {
    totalSales: number;
    commissionEarned: number;
    servicesCompleted: number;
    rating: number;
  };
}

const sampleStaffProfile: StaffProfile = {
  id: '1',
  name: 'James Mwangi',
  email: 'james.mwangi@lilysplace.com',
  phone: '+254 712 345 678',
  role: 'Senior Staff',
  department: 'All Departments',
  joinDate: '2023-03-15',
  status: 'Active',
  shifts: [
    { day: 'Monday', time: '08:00 - 17:00' },
    { day: 'Tuesday', time: '08:00 - 17:00' },
    { day: 'Wednesday', time: '08:00 - 17:00' },
    { day: 'Thursday', time: '08:00 - 17:00' },
    { day: 'Friday', time: '08:00 - 17:00' },
    { day: 'Saturday', time: '10:00 - 16:00' },
  ],
  performance: {
    totalSales: 450000,
    commissionEarned: 135000,
    servicesCompleted: 342,
    rating: 4.8,
  },
};

export default function StaffProfilePage() {
  const [profile, setProfile] = useState<StaffProfile>(sampleStaffProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const handleSave = () => {
    setProfile({
      ...profile,
      ...editForm,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
    setIsEditing(false);
  };

  const PerformanceCard = ({ icon: Icon, label, value, subtitle, color }: any) => (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
      <div className="flex items-center gap-3 mb-3">
        <div className={`${color} p-2 rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-white text-xl font-bold">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Staff Profile</h1>
          <p className="text-gray-400">Manage your profile and view performance metrics</p>
        </div>
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-4 lg:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="bg-red-500 p-4 rounded-xl">
                <UserCircle className="w-16 h-16 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white focus:outline-none focus:border-red-500"
                    />
                  ) : (
                    profile.name
                  )}
                </h2>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>{profile.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{profile.department}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    profile.status === 'Active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <Phone className="w-4 h-4" />
                    {profile.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Join Date</label>
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-4 h-4" />
                  {new Date(profile.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Employee ID</label>
                <div className="text-white font-mono">EMP-{profile.id.padStart(4, '0')}</div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PerformanceCard
                icon={TrendingUp}
                label="Total Sales"
                value={`KES ${profile.performance.totalSales.toLocaleString()}`}
                color="bg-green-500"
              />
              <PerformanceCard
                icon={Award}
                label="Commission Earned"
                value={`KES ${profile.performance.commissionEarned.toLocaleString()}`}
                subtitle="30% of sales"
                color="bg-blue-500"
              />
              <PerformanceCard
                icon={FileText}
                label="Services Completed"
                value={profile.performance.servicesCompleted}
                color="bg-purple-500"
              />
              <PerformanceCard
                icon={UserCircle}
                label="Customer Rating"
                value={profile.performance.rating}
                subtitle="/ 5.0 stars"
                color="bg-orange-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column - Schedule & Quick Actions */}
        <div className="space-y-6">
          {/* Schedule */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Weekly Schedule
            </h3>
            <div className="space-y-3">
              {profile.shifts.map((shift, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <span className="text-gray-300 font-medium">{shift.day}</span>
                  <span className="text-white bg-blue-500/20 px-3 py-1 rounded-full text-sm">
                    {shift.time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-left transition-colors">
                View My Sales Report
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-left transition-colors">
                Request Leave
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-left transition-colors">
                Update Availability
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg text-left transition-colors">
                Change Password
              </button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="bg-gray-800 p-6 rounded-xl border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-sm">Recorded 5 car wash services</p>
                  <p className="text-gray-400 text-xs">Today at 14:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Award className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm">Earned KES 2,400 in commissions</p>
                  <p className="text-gray-400 text-xs">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <UserCircle className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-sm">Received 5-star customer rating</p>
                  <p className="text-gray-400 text-xs">2 days ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}