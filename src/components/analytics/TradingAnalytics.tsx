import React from 'react';
import Card from '../ui/Card';

const TradingAnalytics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Win Rate</h3>
          <p className="text-3xl font-bold text-green-600">67%</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
      </Card>
      
      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Profit Factor</h3>
          <p className="text-3xl font-bold text-blue-600">2.1</p>
          <p className="text-sm text-gray-500">All time</p>
        </div>
      </Card>

      <Card>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Total Trades</h3>
          <p className="text-3xl font-bold">156</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
      </Card>

      <Card>
        <div className="p-4 opacity-50">
          <h3 className="text-lg font-semibold mb-2">Advanced Metrics</h3>
          <p className="text-sm text-gray-500">Coming soon...</p>
        </div>
      </Card>
    </div>
  );
};

export default TradingAnalytics;