import React from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { demoPortfolio } from '../data/mockData';
import { formatCurrency, formatPercentage, getValueColor } from '../utils/formatting';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, PieChart } from 'lucide-react';
import StockChart from '../components/dashboard/StockChart';
import Button from '../components/ui/Button';

const Portfolio: React.FC = () => {
  const portfolio = demoPortfolio;
  
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <Button>Deposit Funds</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">Total Value</span>
              </div>
              <div className="text-2xl font-bold text-white">{formatCurrency(portfolio.totalValue)}</div>
              <div className={`flex items-center mt-1 ${getValueColor(portfolio.pnl)}`}>
                {portfolio.pnl >= 0 ? (
                  <TrendingUp size={16} className="mr-1" />
                ) : (
                  <TrendingDown size={16} className="mr-1" />
                )}
                <span>{formatCurrency(portfolio.pnl)}</span>
                <span className="ml-1">({formatPercentage(portfolio.pnlPercent)})</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <BarChart2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-400">Cash Available</span>
              </div>
              <div className="text-2xl font-bold text-white">{formatCurrency(portfolio.currentBalance)}</div>
              <div className="text-gray-400 text-sm mt-1">Initial: {formatCurrency(portfolio.initialBalance)}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <PieChart className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-gray-400">Holdings</span>
              </div>
              <div className="text-2xl font-bold text-white">{portfolio.holdings.length}</div>
              <div className="text-gray-400 text-sm mt-1">Invested in {portfolio.holdings.length} assets</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-gray-400">Performance (30d)</span>
              </div>
              <div className="text-2xl font-bold text-white">+8.4%</div>
              <div className="text-gray-400 text-sm mt-1">vs. S&P 500: +3.2%</div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>Portfolio Performance</CardHeader>
          <CardContent>
            <div style={{ height: '300px' }}>
              <StockChart 
                data={[924, 932, 941, 925, 935, 950, 943, 970, 985, 982, 991, 999, 994, 1010, 1020, 1015, 1030, 1045, 1052, 1060, 1085, 1092, 1080, 1095, 1087, 1125, 1138, 1142, 1190, 1210, 1248.67]}
                height={300}
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
          <CardHeader>Portfolio Holdings</CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Asset
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Avg. Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      P&L
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Change
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {portfolio.holdings.map((holding) => (
                    <tr key={holding.id} className="hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-medium text-white">{holding.symbol}</div>
                            <div className="text-sm text-gray-400">{holding.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white">{holding.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white">{formatCurrency(holding.averagePrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white">{formatCurrency(holding.currentPrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-white">{formatCurrency(holding.totalValue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-white ${getValueColor(holding.pnl)}`}>
                          {formatCurrency(holding.pnl)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${getValueColor(holding.pnlPercent)}`}>
                          {holding.pnlPercent > 0 ? (
                            <TrendingUp size={16} className="mr-1" />
                          ) : (
                            <TrendingDown size={16} className="mr-1" />
                          )}
                          {formatPercentage(holding.pnlPercent)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-500 hover:text-blue-400 mr-3">
                          Buy
                        </button>
                        <button className="text-red-500 hover:text-red-400">
                          Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>Asset Allocation</CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="h-80 flex items-center justify-center">
                  <svg width="320" height="320" viewBox="0 0 320 320">
                    <g transform="translate(160,160)">
                      <path d="M0,-160A160,160,0,0,1,138.56,80L0,0Z" fill="#3b82f6"></path>
                      <path d="M138.56,80A160,160,0,0,1,-80,138.56L0,0Z" fill="#10b981"></path>
                      <path d="M-80,138.56A160,160,0,0,1,-138.56,-80L0,0Z" fill="#f59e0b"></path>
                      <path d="M-138.56,-80A160,160,0,0,1,0,-160L0,0Z" fill="#ef4444"></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span>Technology</span>
                      </div>
                      <span>30%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span>Consumer Cyclical</span>
                      </div>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span>Financial Services</span>
                      </div>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span>Energy</span>
                      </div>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Portfolio;