import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { demoPortfolio } from '../../data/mockData';
import { formatCurrency, formatPercentage, getValueColor } from '../../utils/formatting';
import { DollarSign, TrendingUp, TrendingDown, ArrowRight, PieChart } from 'lucide-react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const PortfolioSummary: React.FC = () => {
  const portfolio = demoPortfolio;
  
  // Calculate some stats
  const totalInvested = portfolio.initialBalance - portfolio.currentBalance;
  const pnlClass = getValueColor(portfolio.pnl);
  
  return (
    <Card>
      <CardHeader>Demo Portfolio</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
            <div className="text-gray-400 text-sm">Total Value</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(portfolio.totalValue)}</div>
            <div className={`flex items-center mt-1 ${pnlClass}`}>
              {portfolio.pnl >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span>{formatCurrency(portfolio.pnl)}</span>
              <span className="ml-1">({formatPercentage(portfolio.pnlPercent)})</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
            <div className="text-gray-400 text-sm">Cash Available</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(portfolio.currentBalance)}</div>
            <div className="text-gray-400 text-sm mt-1">Initial: {formatCurrency(portfolio.initialBalance)}</div>
          </div>
          
          <div className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
            <div className="text-gray-400 text-sm">Invested</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(totalInvested)}</div>
            <div className="text-gray-400 text-sm mt-1">{portfolio.holdings.length} holdings</div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="font-medium mb-3">Top Holdings</div>
          <div className="space-y-2">
            {portfolio.holdings.slice(0, 3).map((holding) => (
              <div key={holding.id} className="flex items-center p-3 bg-gray-700 bg-opacity-30 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center text-blue-500 mr-3">
                  {holding.symbol.substring(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-medium">{holding.symbol}</div>
                    <div className="ml-2 text-xs text-gray-400">{holding.quantity} shares</div>
                  </div>
                  <div className="text-sm text-gray-400">{holding.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(holding.totalValue)}</div>
                  <div className={`text-sm ${getValueColor(holding.pnl)}`}>
                    {formatPercentage(holding.pnlPercent)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="text-center">
            <PieChart size={48} className="mx-auto text-blue-500 mb-2" />
            <div className="text-sm">Portfolio<br />Diversity</div>
          </div>
          <div className="h-16 border-l border-gray-700"></div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 bg-opacity-10 text-green-500 mx-auto mb-2">
              <DollarSign size={24} />
            </div>
            <div className="text-sm">Available<br />to Trade</div>
          </div>
          <div className="h-16 border-l border-gray-700"></div>
          <div className="text-center">
            <div className="mx-auto mb-2 w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-6 bg-green-500 rounded-sm"></div>
            </div>
            <div className="text-sm">Algo<br />Trading</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Auto-Invest</Button>
        <Link to="/portfolio">
          <Button>
            View Portfolio
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PortfolioSummary;