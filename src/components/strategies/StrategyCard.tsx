import React from 'react';
import Card, { CardContent } from '../ui/Card';
import { Strategy } from '../../types';
import { formatPercentage, getValueColor } from '../../utils/formatting';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Play, Pause, TrendingUp, TrendingDown } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface StrategyCardProps {
  strategy: Strategy;
  onToggleActive: (id: string, active: boolean) => void;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onToggleActive }) => {
  const handleToggle = () => {
    onToggleActive(strategy.id, !strategy.isActive);
  };
  
  return (
    <Card className={`transition-all hover:shadow-lg ${
      strategy.isActive ? 'border-blue-500' : 'hover:border-gray-600'
    }`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{strategy.name}</h3>
          <Badge 
            variant={strategy.isActive ? 'primary' : 'default'}
            size="sm"
          >
            {strategy.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <p className="text-gray-400 mt-2 mb-4 line-clamp-2 h-12">
          {strategy.description}
        </p>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded">
            <div className="text-xs text-gray-400">Monthly</div>
            <div className={`text-lg font-semibold ${getValueColor(strategy.performance.monthly)}`}>
              {formatPercentage(strategy.performance.monthly)}
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded">
            <div className="text-xs text-gray-400">Yearly</div>
            <div className={`text-lg font-semibold ${getValueColor(strategy.performance.yearly)}`}>
              {formatPercentage(strategy.performance.yearly)}
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 p-3 rounded">
            <div className="text-xs text-gray-400">Max Drawdown</div>
            <div className="text-lg font-semibold text-red-500">
              {formatPercentage(strategy.performance.maxDrawdown * -1)}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {strategy.features.map((feature, index) => (
            <Tooltip key={index} content={feature}>
              <Badge variant="secondary" size="sm">
                {feature.length > 20 ? `${feature.substring(0, 20)}...` : feature}
              </Badge>
            </Tooltip>
          ))}
        </div>
        
        <div className="mt-4 flex space-x-3">
          <Button 
            variant={strategy.isActive ? 'danger' : 'primary'}
            fullWidth
            icon={strategy.isActive ? <Pause size={16} /> : <Play size={16} />}
            onClick={handleToggle}
          >
            {strategy.isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-gray-400 flex items-center">
          <div className={`flex items-center mr-3 ${getValueColor(1)}`}>
            <TrendingUp size={12} className="mr-1" />
            Win rate: 68%
          </div>
          <div className={`flex items-center ${getValueColor(-1)}`}>
            <TrendingDown size={12} className="mr-1" />
            Loss rate: 32%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyCard;