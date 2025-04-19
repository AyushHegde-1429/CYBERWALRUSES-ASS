import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { generateTop50Stocks } from '../../data/mockData';
import { formatPercentage, getValueColor } from '../../utils/formatting';
import { TrendingUp, TrendingDown } from 'lucide-react';
import StockChart from './StockChart';

const TopPerformers: React.FC = () => {
  const stocks = generateTop50Stocks();
  const topGainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);
  const topLosers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <Card>
        <CardHeader>Top Gainers</CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topGainers.map((stock) => (
              <div key={stock.id} className="flex items-center p-3 bg-gray-700 bg-opacity-30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="ml-2 text-xs text-gray-400">{stock.name}</div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="text-lg font-semibold">${stock.price.toFixed(2)}</div>
                    <div className={`ml-2 flex items-center ${getValueColor(stock.changePercent)}`}>
                      <TrendingUp size={14} className="mr-1" />
                      {formatPercentage(stock.changePercent)}
                    </div>
                  </div>
                </div>
                <div className="w-24 h-12">
                  <StockChart
                    data={stock.chart}
                    height={48}
                    lineColor="#10B981"
                    fillColor="rgba(16, 185, 129, 0.1)"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Top Losers */}
      <Card>
        <CardHeader>Top Losers</CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topLosers.map((stock) => (
              <div key={stock.id} className="flex items-center p-3 bg-gray-700 bg-opacity-30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="ml-2 text-xs text-gray-400">{stock.name}</div>
                  </div>
                  <div className="flex items-center mt-1">
                    <div className="text-lg font-semibold">${stock.price.toFixed(2)}</div>
                    <div className={`ml-2 flex items-center ${getValueColor(stock.changePercent)}`}>
                      <TrendingDown size={14} className="mr-1" />
                      {formatPercentage(stock.changePercent)}
                    </div>
                  </div>
                </div>
                <div className="w-24 h-12">
                  <StockChart
                    data={stock.chart}
                    height={48}
                    lineColor="#EF4444"
                    fillColor="rgba(239, 68, 68, 0.1)"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopPerformers;