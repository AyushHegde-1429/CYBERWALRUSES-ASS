import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { strategies } from '../../data/mockData';
import { formatPercentage, getValueColor } from '../../utils/formatting';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Pause } from 'lucide-react';

const ActiveStrategies: React.FC = () => {
  const activeStrategies = strategies.filter(s => s.isActive);
  const recommendedStrategies = strategies.filter(s => !s.isActive).slice(0, 2);
  
  return (
    <Card>
      <CardHeader>Trading Strategies</CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeStrategies.length > 0 ? (
            <div>
              <div className="font-medium mb-3">Active Strategies</div>
              {activeStrategies.map((strategy) => (
                <div key={strategy.id} className="p-4 bg-gray-700 bg-opacity-30 rounded-lg mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{strategy.name}</div>
                      <div className="text-sm text-gray-400 mt-1">{strategy.description.slice(0, 100)}...</div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<Pause size={14} />}>
                      Pause
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <div className="text-sm text-gray-400">Monthly Perf.</div>
                      <div className={`text-lg font-medium ${getValueColor(strategy.performance.monthly)}`}>
                        {formatPercentage(strategy.performance.monthly)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Yearly</div>
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
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {strategy.features.slice(0, 2).map((feature, idx) => (
                      <Badge key={idx} variant="primary" size="sm">{feature}</Badge>
                    ))}
                    {strategy.features.length > 2 && <Badge variant="default" size="sm">+{strategy.features.length - 2} more</Badge>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-700 bg-opacity-20 rounded-lg">
              <div className="text-lg font-medium mb-2">No Active Strategies</div>
              <p className="text-gray-400 mb-4">
                Select a trading strategy to begin automated trading.
              </p>
              <Link to="/strategies">
                <Button>Browse Strategies</Button>
              </Link>
            </div>
          )}
          
          <div>
            <div className="font-medium mb-3">Recommended Strategies</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedStrategies.map((strategy) => (
                <div key={strategy.id} className="p-4 bg-gray-700 bg-opacity-30 rounded-lg">
                  <div className="font-medium">{strategy.name}</div>
                  <div className="text-sm text-gray-400 mt-1 line-clamp-2">{strategy.description}</div>
                  <div className="mt-3">
                    <div className="text-sm text-gray-400">Yearly Performance</div>
                    <div className={`text-lg font-medium ${getValueColor(strategy.performance.yearly)}`}>
                      {formatPercentage(strategy.performance.yearly)}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    size="sm" 
                    className="mt-3"
                    icon={<Play size={14} />}
                  >
                    Activate
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/strategies" className="w-full">
          <Button fullWidth variant="secondary">
            View All Strategies
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ActiveStrategies;