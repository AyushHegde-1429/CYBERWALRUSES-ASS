// Stock Types
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  chart: number[];
  bid?: number;
  ask?: number;
  dayHigh?: number;
  dayLow?: number;
  openPrice?: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
}

// Portfolio Types
export interface PortfolioHolding {
  id: string;
  stockId: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
  type: 'long' | 'short';
  leverage?: number;
}

export interface Portfolio {
  id: string;
  name: string;
  initialBalance: number;
  currentBalance: number;
  totalValue: number;
  holdings: PortfolioHolding[];
  pnl: number;
  pnlPercent: number;
  marginAvailable?: number;
  marginUsed?: number;
}

// Strategy Types
export interface Strategy {
  id: string;
  name: string;
  description: string;
  category: 'mean-reversion' | 'momentum' | 'factor-models' | 'machine-learning';
  features: string[];
  performance: {
    monthly: number;
    yearly: number;
    maxDrawdown: number;
  };
  isActive: boolean;
}

// Trade Types
export interface Trade {
  id: string;
  stockId: string;
  symbol: string;
  type: 'buy' | 'sell' | 'short' | 'cover';
  quantity: number;
  price: number;
  total: number;
  strategy: string;
  timestamp: string;
  status: 'pending' | 'executed' | 'cancelled';
  orderType: 'market' | 'limit' | 'stop' | 'stop-limit';
  timeInForce: 'day' | 'gtc' | 'ioc' | 'fok';
  leverage?: number;
  stopLoss?: number;
  takeProfit?: number;
}

// Order Types
export interface Order {
  id: string;
  stockId: string;
  symbol: string;
  type: 'buy' | 'sell' | 'short' | 'cover';
  quantity: number;
  price: number;
  orderType: 'market' | 'limit' | 'stop' | 'stop-limit';
  timeInForce: 'day' | 'gtc' | 'ioc' | 'fok';
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: string;
  expiresAt?: string;
  stopPrice?: number;
  limitPrice?: number;
  leverage?: number;
  stopLoss?: number;
  takeProfit?: number;
}

// Position Types
export interface Position {
  id: string;
  stockId: string;
  symbol: string;
  type: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  leverage?: number;
  margin?: number;
  liquidationPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  timestamp: string;
}