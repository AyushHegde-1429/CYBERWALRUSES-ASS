import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { recentTrades } from '../../data/mockData';
import { formatCurrency, formatDate } from '../../utils/formatting';
import { ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const RecentTrades: React.FC = () => {
  return (
    <Card>
      <CardHeader>Recent Trades</CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTrades.slice(0, 4).map((trade) => (
            <div key={trade.id} className="p-3 bg-gray-700 bg-opacity-30 rounded-lg">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  trade.type === 'buy' ? 'bg-green-500 bg-opacity-10' : 'bg-red-500 bg-opacity-10'
                }`}>
                  {trade.type === 'buy' ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">
                      {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.symbol}
                    </div>
                    <div className="font-medium">
                      {formatCurrency(trade.total)}
                    </div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <div className="text-xs text-gray-400">
                      {trade.quantity} shares @ {formatCurrency(trade.price)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatDate(trade.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs bg-gray-800 rounded px-2 py-1 inline-block text-gray-300">
                Strategy: {trade.strategy}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/history" className="w-full">
          <Button fullWidth variant="outline" icon={<History size={16} />}>
            View Trade History
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentTrades;