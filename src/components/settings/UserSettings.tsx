import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const UserSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Trading Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Order Size</label>
              <input 
                type="number" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter amount"
                disabled
              />
              <p className="text-sm text-red-500 mt-1">Feature currently unavailable</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Risk Management</label>
              <select 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                disabled
              >
                <option>Conservative</option>
                <option>Moderate</option>
                <option>Aggressive</option>
              </select>
              <p className="text-sm text-red-500 mt-1">Coming soon</p>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">API Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">API Key</label>
              <input 
                type="password" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter API key"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">API Secret</label>
              <input 
                type="password" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="Enter API secret"
                disabled
              />
            </div>
            <Button disabled>Connect API (Unavailable)</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserSettings;