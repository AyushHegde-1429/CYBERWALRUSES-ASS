import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  BarChart2, 
  PieChart, 
  Settings, 
  HelpCircle, 
  Activity,
  Briefcase
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', icon: <BarChart3 size={20} />, href: '/' },
        { name: 'Markets', icon: <TrendingUp size={20} />, href: '/markets' },
        { name: 'Portfolio', icon: <Briefcase size={20} />, href: '/portfolio' },
      ]
    },
    {
      title: 'Trading',
      items: [
        { name: 'Strategies', icon: <Activity size={20} />, href: '/strategies' },
        { name: 'Analytics', icon: <BarChart2 size={20} />, href: '/analytics' },
        { name: 'Performance', icon: <PieChart size={20} />, href: '/performance' },
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'Settings', icon: <Settings size={20} />, href: '/settings' },
        { name: 'Help', icon: <HelpCircle size={20} />, href: '/help' },
      ]
    }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gray-800 border-r border-gray-700">
      <div className="h-0 flex-1 flex flex-col overflow-y-auto">
        <div className="space-y-6 py-6">
          {menuItems.map((group, index) => (
            <div key={index} className="px-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {group.title}
              </h3>
              <nav className="mt-2 space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className={`mr-3 ${isActive(item.href) ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-300'}`}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="bg-blue-600 bg-opacity-10 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-blue-500 mb-1">Pro Upgrade</h4>
          <p className="text-xs text-gray-400">Unlock advanced algorithms and real-time data.</p>
          <button
            className="mt-2 w-full px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;