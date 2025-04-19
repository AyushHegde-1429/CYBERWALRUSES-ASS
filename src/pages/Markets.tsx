import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import StockList from '../components/markets/StockList';

const Markets: React.FC = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Markets</h1>
          <div className="text-sm text-gray-400">
            Data refreshes every 15 minutes | Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        
        <Card>
          <CardHeader>Top 50 NASDAQ Stocks</CardHeader>
          <CardContent>
            <StockList />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Markets;