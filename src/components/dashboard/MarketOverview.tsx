import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import StockChart from './StockChart';
import { generateTop50Stocks } from '../../data/mockData';
import { formatLargeNumber, formatPercentage, getValueColor } from '../../utils/formatting';

const MarketOverview: React.FC = () => {
  const stocks = generateTop50Stocks().slice(0, 5);
  
  // Mock market indices
  const indices = [
    { name: 'NASDAQ', value: 16832.62, change: 1.24, chart: [16500, 16550, 16480, 16600, 16700, 16750, 16832.62] },
    { name: 'S&P 500', value: 5021.84, change: 0.87, chart: [4950, 4980, 4960, 5000, 4990, 5010, 5021.84] },
    { name: 'DOW', value: 38996.38, change: 0.56, chart: [38700, 38750, 38800, 38850, 38900, 38950, 38996.38] },
    { name: 'Russell 2000', value: 2017.92, change: -0.34, chart: [2030, 2025, 2022, 2020, 2015, 2010, 2017.92] }
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Market Indices */}
      <Card className="lg:col-span-2">
        <CardHeader>Market Indices</CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {indices.map((index) => (
              <div key={index.name} className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{index.name}</span>
                  <div className={`flex items-center ${getValueColor(index.change)}`}>
                    {index.change > 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                    {formatPercentage(index.change)}
                  </div>
                </div>
                <div className="text-xl font-semibold mb-2">{index.value.toLocaleString()}</div>
                <StockChart
                  data={index.chart}
                  height={60}
                  lineColor={index.change >= 0 ? '#10B981' : '#EF4444'}
                  fillColor={index.change >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
                  showGrid={false}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Market Stats */}
      <Card>
        <CardHeader>Market Stats</CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Trading Volume</div>
              <div className="text-xl font-semibold flex items-center">
                <DollarSign size={20} className="text-blue-500 mr-1" />
                {formatLargeNumber(185762000000)}
              </div>
              <div className="text-xs text-gray-400 mt-1">Average: {formatLargeNumber(160000000000)}</div>
            </div>
            
            <div className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Market Volatility</div>
              <div className="flex items-end gap-1">
                <div className="bg-blue-600 w-1 h-8 rounded-t"></div>
                <div className="bg-blue-600 w-1 h-12 rounded-t"></div>
                <div className="bg-blue-600 w-1 h-6 rounded-t"></div>
                <div className="bg-blue-600 w-1 h-14 rounded-t"></div>
                <div className="bg-blue-600 w-1 h-10 rounded-t"></div>
                <div className="bg-blue-600 w-1 h-16 rounded-t"></div>
                <div className="bg-blue-600 w-1 h-9 rounded-t"></div>
                <div className="bg-red-500 w-1 h-20 rounded-t"></div>
                <div className="bg-red-500 w-1 h-14 rounded-t"></div>
                <div className="bg-green-500 w-1 h-7 rounded-t"></div>
                <div className="bg-green-500 w-1 h-5 rounded-t"></div>
                <div className="bg-green-500 w-1 h-11 rounded-t"></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">Current: 18.5% (Moderate)</div>
            </div>
            
            <div className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Sector Performance</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Technology</span>
                  <span className="text-xs text-green-500">+2.4%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Healthcare</span>
                  <span className="text-xs text-green-500">+1.1%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">Energy</span>
                  <span className="text-xs text-red-500">-0.8%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-1.5">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;