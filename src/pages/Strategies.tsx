import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card, { CardHeader, CardContent } from '../components/ui/Card';
import { strategies as initialStrategies } from '../data/mockData';
import StrategyCard from '../components/strategies/StrategyCard';
import { Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';

const Strategies: React.FC = () => {
  const [strategies, setStrategies] = useState(initialStrategies);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (category: string | null) => {
    setActiveFilter(category);
  };
  
  const handleToggleActive = (id: string, active: boolean) => {
    setStrategies(
      strategies.map((strategy) => 
        strategy.id === id ? { ...strategy, isActive: active } : strategy
      )
    );
  };
  
  const filteredStrategies = strategies.filter((strategy) => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === null || strategy.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Trading Strategies</h1>
          <Button variant="outline" icon={<Filter size={16} />}>
            Compare Strategies
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search strategies..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeFilter === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => handleFilterChange(null)}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeFilter === 'mean-reversion'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => handleFilterChange('mean-reversion')}
                >
                  Mean Reversion
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeFilter === 'momentum'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => handleFilterChange('momentum')}
                >
                  Momentum
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeFilter === 'factor-models'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => handleFilterChange('factor-models')}
                >
                  Factor Models
                </button>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    activeFilter === 'machine-learning'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  onClick={() => handleFilterChange('machine-learning')}
                >
                  Machine Learning
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStrategies.map((strategy) => (
                <StrategyCard
                  key={strategy.id}
                  strategy={strategy}
                  onToggleActive={handleToggleActive}
                />
              ))}
            </div>
            
            {filteredStrategies.length === 0 && (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No strategies matching your search criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Strategies;