import React from 'react';
import Layout from '../components/layout/Layout';
import MarketOverview from '../components/dashboard/MarketOverview';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import TopPerformers from '../components/dashboard/TopPerformers';
import ActiveStrategies from '../components/dashboard/ActiveStrategies';
import RecentTrades from '../components/dashboard/RecentTrades';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        
        <MarketOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioSummary />
          <ActiveStrategies />
        </div>
        
        <TopPerformers />
        
        <RecentTrades />
      </div>
    </Layout>
  );
};

export default Dashboard;