import React, { useState } from 'react';
import { generateTop50Stocks } from '../../data/mockData';
import { formatPercentage, getValueColor, formatLargeNumber } from '../../utils/formatting';
import { TrendingUp, TrendingDown, Search, ArrowDown, ArrowUp } from 'lucide-react';
import StockChart from '../dashboard/StockChart';
import TradeModal from '../trading/TradeModal';
import { Stock, Order } from '../../types';

interface StockListProps {
  limit?: number;
}

const StockList: React.FC<StockListProps> = ({ limit }) => {
  const allStocks = generateTop50Stocks();
  const [stocks, setStocks] = useState(limit ? allStocks.slice(0, limit) : allStocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' }>({
    key: 'changePercent',
    direction: 'descending'
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setStocks(limit ? allStocks.slice(0, limit) : allStocks);
    } else {
      const filtered = allStocks.filter(
        stock => 
          stock.symbol.toLowerCase().includes(term.toLowerCase()) || 
          stock.name.toLowerCase().includes(term.toLowerCase())
      );
      setStocks(filtered);
    }
  };

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedStocks = [...stocks].sort((a, b) => {
      if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setStocks(sortedStocks);
  };

  const getSortIcon = (name: string) => {
    if (sortConfig.key !== name) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <ArrowUp size={14} />
    ) : (
      <ArrowDown size={14} />
    );
  };

  const handleTradeClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleTradeSubmit = (order: Partial<Order>) => {
    // In a real app, this would submit the order to a backend service
    console.log('Trade order submitted:', order);
  };

  return (
    <div>
      <div className="flex items-center mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by symbol or name..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('symbol')}
              >
                <div className="flex items-center">
                  Symbol / Name
                  {getSortIcon('symbol')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('price')}
              >
                <div className="flex items-center">
                  Price
                  {getSortIcon('price')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('changePercent')}
              >
                <div className="flex items-center">
                  Change
                  {getSortIcon('changePercent')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('marketCap')}
              >
                <div className="flex items-center">
                  Market Cap
                  {getSortIcon('marketCap')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('volume')}
              >
                <div className="flex items-center">
                  Volume
                  {getSortIcon('volume')}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Chart (7d)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {stocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-white">{stock.symbol}</div>
                  <div className="text-sm text-gray-400">{stock.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-white">${stock.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`flex items-center ${getValueColor(stock.changePercent)}`}>
                    {stock.changePercent > 0 ? (
                      <TrendingUp size={16} className="mr-1" />
                    ) : (
                      <TrendingDown size={16} className="mr-1" />
                    )}
                    {formatPercentage(stock.changePercent)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {formatLargeNumber(stock.marketCap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                  {stock.volume.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-10">
                    <StockChart
                      data={stock.chart}
                      height={40}
                      lineColor={stock.changePercent >= 0 ? '#10B981' : '#EF4444'}
                      fillColor={stock.changePercent >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-blue-500 hover:text-blue-400"
                    onClick={() => handleTradeClick(stock)}
                  >
                    Trade
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {stocks.length === 0 && (
        <div className="text-center py-6 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No stocks matching your search.</p>
        </div>
      )}

      {selectedStock && (
        <TradeModal
          stock={selectedStock}
          onClose={() => setSelectedStock(null)}
          onSubmit={handleTradeSubmit}
        />
      )}
    </div>
  );
};

export default StockList;