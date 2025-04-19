import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { demoPortfolio, strategies } from '../data/mockData';
import { formatPercentage, getValueColor } from '../utils/formatting';
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react';
import StockChart from '../components/dashboard/StockChart';

const Performance: React.FC = () => {
  const portfolio = demoPortfolio;
  const activeStrategies = strategies.filter(s => s.isActive);
  
  // Mock performance data
  const monthlyPerformance = [2.4, 3.1, -1.2, 4.5, 2.8, 1.9, -0.8, 3.4, 5.1, 2.2, -1.5, 8.4];
  const benchmarkPerformance = [1.8, 2.2, -0.9, 3.2, 1.5, 1.1, -1.2, 2.8, 3.5, 1.6, -0.8, 3.2];
  
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Performance Analysis</h1>
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">YTD Return</span>
              </div>
              <div className="text-2xl font-bold text-white">+32.8%</div>
              <div className="text-gray-400 text-sm mt-1">vs. S&P 500: +18.4%</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-400">Win Rate</span>
              </div>
              <div className="text-2xl font-bold text-white">68%</div>
              <div className="text-gray-400 text-sm mt-1">Last 100 trades</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-400">Max Drawdown</span>
              </div>
              <div className="text-2xl font-bold text-white">-12.3%</div>
              <div className="text-gray-400 text-sm mt-1">Historical maximum</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>Monthly Performance</CardHeader>
          <CardContent>
            <div style={{ height: '400px' }}>
              <StockChart 
                data={monthlyPerformance}
                height={400}
                lineColor="#3b82f6"
                fillColor="rgba(59, 130, 246, 0.1)"
                showTooltip={true}
                showGrid={true}
                showAxis={true}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>Strategy Performance</CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeStrategies.map((strategy) => (
                <div key={strategy.id} className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-white">{strategy.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{strategy.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      strategy.performance.monthly >= 0 ? 'bg-green-500 bg-opacity-10 text-green-400' : 'bg-red-500 bg-opacity-10 text-red-400'
                    }`}>
                      {formatPercentage(strategy.performance.monthly)} (30d)
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Monthly Avg.</div>
                      <div className={`text-lg font-medium ${getValueColor(strategy.performance.monthly)}`}>
                        {formatPercentage(strategy.performance.monthly)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Yearly Proj.</div>
                      <div className={`text-lg font-medium ${getValueColor(strategy.performance.yearly)}`}>
                        {formatPercentage(strategy.performance.yearly)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Max Drawdown</div>
                      <div className="text-lg font-medium text-red-500">
                        {formatPercentage(strategy.performance.maxDrawdown * -1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {activeStrategies.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">No active strategies to display performance metrics.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Performance;