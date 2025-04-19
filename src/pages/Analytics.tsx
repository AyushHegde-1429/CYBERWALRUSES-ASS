import React from 'react';
import Layout from '../components/layout/Layout';
import TradingAnalytics from '../components/analytics/TradingAnalytics';

const Analytics: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Trading Analytics</h1>
        <TradingAnalytics />
      </div>
    </Layout>
  );
};

export default Analytics;