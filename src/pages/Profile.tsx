import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { currentUser } from '../data/mockData';
import Button from '../components/ui/Button';
import { Mail, Lock, Bell, CreditCard, User, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-xl font-semibold text-white">{currentUser.name}</h2>
                  <p className="text-gray-400">{currentUser.email}</p>
                  <p className="text-gray-400 text-sm mt-1">Member since {new Date(currentUser.joinDate).toLocaleDateString()}</p>
                  
                  <div className="mt-6">
                    <Button variant="outline" fullWidth>
                      Edit Profile
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Account Navigation</h3>
                  <nav className="space-y-2">
                    <a href="#profile" className="flex items-center px-3 py-2 rounded-md bg-gray-700 text-white">
                      <User size={16} className="mr-3" />
                      Profile Information
                    </a>
                    <a href="#security" className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                      <Lock size={16} className="mr-3" />
                      Security
                    </a>
                    <a href="#notifications" className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                      <Bell size={16} className="mr-3" />
                      Notifications
                    </a>
                    <a href="#payment" className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                      <CreditCard size={16} className="mr-3" />
                      Payment Methods
                    </a>
                    <a href="#settings" className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                      <Settings size={16} className="mr-3" />
                      Settings
                    </a>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>Profile Information</CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Full Name</label>
                    <input
                      type="text"
                      value={currentUser.name}
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Email Address</label>
                    <input
                      type="email"
                      value={currentUser.email}
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Location</label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Bio</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about yourself"
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2"
                    ></textarea>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>Trading Preferences</CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Risk Tolerance</label>
                    <select className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
                      <option>Conservative</option>
                      <option>Moderate</option>
                      <option selected>Aggressive</option>
                      <option>Very Aggressive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Investment Horizon</label>
                    <select className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-3 py-2">
                      <option>Short-term (less than 1 year)</option>
                      <option selected>Medium-term (1-3 years)</option>
                      <option>Long-term (3+ years)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Trading Strategies</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label className="ml-2 text-white">Mean Reversion</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label className="ml-2 text-white">Momentum Trading</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label className="ml-2 text-white">Factor Models</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                        />
                        <label className="ml-2 text-white">Machine Learning Models</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Trading Frequency</label>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value="4"
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button>Save Preferences</Button>
                    <Button variant="outline">Reset Defaults</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;