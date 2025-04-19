import { Stock, User, Portfolio, PortfolioHolding, Strategy, Trade } from '../types';

// Mock User Data
export const currentUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@tradepi.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  joinDate: '2024-04-01',
};

// Mock Stock Data
export const generateStockData = (): Stock[] => {
  const stocks: Stock[] = [
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 2.34, changePercent: 1.25, volume: 67842156, marketCap: 2950000000000, chart: [] },
    { id: '2', symbol: 'MSFT', name: 'Microsoft Corp', price: 417.88, change: -3.45, changePercent: -0.82, volume: 25431897, marketCap: 3110000000000, chart: [] },
    { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 163.2, change: 1.87, changePercent: 1.16, volume: 18965423, marketCap: 2050000000000, chart: [] },
    { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 183.06, change: -1.25, changePercent: -0.68, volume: 35698741, marketCap: 1900000000000, chart: [] },
    { id: '5', symbol: 'NVDA', name: 'NVIDIA Corp', price: 124.67, change: 3.56, changePercent: 2.94, volume: 98745632, marketCap: 1850000000000, chart: [] },
    { id: '6', symbol: 'META', name: 'Meta Platforms', price: 505.95, change: 7.98, changePercent: 1.60, volume: 19654321, marketCap: 1280000000000, chart: [] },
    { id: '7', symbol: 'TSLA', name: 'Tesla Inc', price: 215.65, change: -12.45, changePercent: -5.46, volume: 158964752, marketCap: 685000000000, chart: [] },
    { id: '8', symbol: 'BRK.A', name: 'Berkshire Hathaway', price: 636782.25, change: 4523.78, changePercent: 0.71, volume: 1235, marketCap: 788000000000, chart: [] },
    { id: '9', symbol: 'AVGO', name: 'Broadcom Inc', price: 1456.37, change: 32.45, changePercent: 2.28, volume: 3521478, marketCap: 675000000000, chart: [] },
    { id: '10', symbol: 'JPM', name: 'JPMorgan Chase', price: 198.47, change: -0.35, changePercent: -0.18, volume: 8745123, marketCap: 569000000000, chart: [] },
  ];

  // Generate random chart data for each stock
  return stocks.map(stock => {
    const chartLength = 30;
    let lastPrice = stock.price * 0.85;
    const chart = Array(chartLength).fill(0).map(() => {
      lastPrice = lastPrice * (1 + (Math.random() * 0.06 - 0.03));
      return Number(lastPrice.toFixed(2));
    });
    return { ...stock, chart };
  });
};

// Generate 50 stocks for the top performers
export const generateTop50Stocks = (): Stock[] => {
  const baseStocks = generateStockData();
  const additionalStocks: Stock[] = [];
  
  const symbols = [
    'V', 'UNH', 'XOM', 'JNJ', 'WMT', 'PG', 'MA', 'HD', 'BAC', 'KO', 
    'PFE', 'CSCO', 'TMO', 'ADBE', 'ORCL', 'CRM', 'NFLX', 'CMCSA', 'PEP', 'ABT',
    'COST', 'DIS', 'VZ', 'INTC', 'MRK', 'QCOM', 'AMD', 'T', 'UPS', 'NEE',
    'PYPL', 'SBUX', 'RTX', 'GS', 'MS', 'IBM', 'INTU', 'TXN', 'MDT', 'AMAT'
  ];
  
  for (let i = 0; i < 40; i++) {
    const price = 50 + Math.random() * 450;
    const change = (Math.random() * 20) - 10;
    const changePercent = (change / price) * 100;
    
    const chartLength = 30;
    let lastPrice = price * 0.85;
    const chart = Array(chartLength).fill(0).map(() => {
      lastPrice = lastPrice * (1 + (Math.random() * 0.06 - 0.03));
      return Number(lastPrice.toFixed(2));
    });
    
    additionalStocks.push({
      id: `${i + 11}`,
      symbol: symbols[i],
      name: `${symbols[i]} Corporation`,
      price: Number(price.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 30000000) + 5000000,
      marketCap: Math.floor(Math.random() * 500000000000) + 100000000000,
      chart
    });
  }
  
  return [...baseStocks, ...additionalStocks].sort((a, b) => b.changePercent - a.changePercent);
};

// Mock Portfolio Data
export const demoPortfolio: Portfolio = {
  id: '1',
  name: 'Demo Portfolio',
  initialBalance: 1000,
  currentBalance: 475.32,
  totalValue: 1248.67,
  pnl: 248.67,
  pnlPercent: 24.87,
  holdings: [
    {
      id: '1',
      stockId: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 2,
      averagePrice: 175.25,
      currentPrice: 189.84,
      totalValue: 379.68,
      pnl: 29.18,
      pnlPercent: 8.33
    },
    {
      id: '2',
      stockId: '5',
      symbol: 'NVDA',
      name: 'NVIDIA Corp',
      quantity: 3,
      averagePrice: 111.24,
      currentPrice: 124.67,
      totalValue: 374.01,
      pnl: 40.29,
      pnlPercent: 12.07
    },
    {
      id: '3',
      stockId: '3',
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 1,
      averagePrice: 145.25,
      currentPrice: 163.2,
      totalValue: 163.2,
      pnl: 17.95,
      pnlPercent: 12.36
    },
    {
      id: '4',
      stockId: '7',
      symbol: 'TSLA',
      name: 'Tesla Inc',
      quantity: 2,
      averagePrice: 242.36,
      currentPrice: 215.65,
      totalValue: 431.3,
      pnl: -53.42,
      pnlPercent: -11.02
    }
  ]
};

// Mock Strategy Data
export const strategies: Strategy[] = [
  {
    id: '1',
    name: 'Mean Reversion - Pairs Trading',
    description: 'Exploits temporary price divergences between historically correlated securities, buying the underperformer and selling the outperformer with the expectation they will converge to their historical relationship.',
    category: 'mean-reversion',
    features: [
      'Statistical arbitrage between correlated pairs',
      'Time-series analysis for price divergence',
      'Z-score based entry and exit signals',
      'Automatic pair selection and correlation testing'
    ],
    performance: {
      monthly: 2.8,
      yearly: 18.5,
      maxDrawdown: 12.3
    },
    isActive: true
  },
  {
    id: '2',
    name: 'Statistical Arbitrage',
    description: 'Identifies and exploits pricing inefficiencies across multiple securities using complex statistical models to capture small price discrepancies at scale.',
    category: 'mean-reversion',
    features: [
      'High-frequency multi-asset trading',
      'Cointegration analysis for mean reversion',
      'Machine learning for pattern recognition',
      'Market-neutral positioning'
    ],
    performance: {
      monthly: 3.2,
      yearly: 22.7,
      maxDrawdown: 15.1
    },
    isActive: false
  },
  {
    id: '3',
    name: 'Momentum Trading',
    description: 'Capitalizes on the tendency of assets that have performed well to continue performing well in the short to medium term, with systematic entry and exit rules.',
    category: 'momentum',
    features: [
      'Trend following across multiple timeframes',
      'Relative strength indicators',
      'Volume-weighted momentum signals',
      'Trailing stop management'
    ],
    performance: {
      monthly: 3.9,
      yearly: 28.4,
      maxDrawdown: 22.7
    },
    isActive: false
  },
  {
    id: '4',
    name: 'Fama-French Multi-Factor Model',
    description: 'Leverages the academically proven Fama-French factors (market beta, size, value, profitability, investment) to create diversified portfolios with factor tilts.',
    category: 'factor-models',
    features: [
      'Systematic factor exposure management',
      'Risk-adjusted portfolio construction',
      'Fundamental data analysis',
      'Factor rotation based on economic regimes'
    ],
    performance: {
      monthly: 1.9,
      yearly: 16.3,
      maxDrawdown: 18.2
    },
    isActive: false
  },
  {
    id: '5',
    name: 'ML-Powered Gradient Boosting',
    description: 'Uses ensemble machine learning models (XGBoost, LightGBM) to identify complex patterns in market data and predict short-term price movements.',
    category: 'machine-learning',
    features: [
      'Feature engineering pipeline',
      'Hyperparameter optimization',
      'Cross-validation testing framework',
      'Probability-based position sizing'
    ],
    performance: {
      monthly: 4.2,
      yearly: 32.1,
      maxDrawdown: 26.8
    },
    isActive: false
  },
  {
    id: '6',
    name: 'Deep Learning Neural Network',
    description: 'Implements state-of-the-art deep learning models (LSTM, Transformers) to capture temporal dependencies and non-linear relationships in financial time series.',
    category: 'machine-learning',
    features: [
      'Sequential data processing',
      'Attention mechanisms for key event detection',
      'Transfer learning from pre-trained models',
      'Reinforcement learning for trade execution'
    ],
    performance: {
      monthly: 5.1,
      yearly: 37.8,
      maxDrawdown: 31.5
    },
    isActive: false
  }
];

// Mock Trade Data
export const recentTrades: Trade[] = [
  {
    id: '1',
    stockId: '1',
    symbol: 'AAPL',
    type: 'buy',
    quantity: 2,
    price: 175.25,
    total: 350.50,
    strategy: 'Mean Reversion - Pairs Trading',
    timestamp: '2024-04-22T10:23:45Z',
    status: 'executed'
  },
  {
    id: '2',
    stockId: '5',
    symbol: 'NVDA',
    type: 'buy',
    quantity: 3,
    price: 111.24,
    total: 333.72,
    strategy: 'ML-Powered Gradient Boosting',
    timestamp: '2024-04-21T14:12:33Z',
    status: 'executed'
  },
  {
    id: '3',
    stockId: '3',
    symbol: 'GOOGL',
    type: 'buy',
    quantity: 1,
    price: 145.25,
    total: 145.25,
    strategy: 'Momentum Trading',
    timestamp: '2024-04-20T09:45:12Z',
    status: 'executed'
  },
  {
    id: '4',
    stockId: '7',
    symbol: 'TSLA',
    type: 'buy',
    quantity: 2,
    price: 242.36,
    total: 484.72,
    strategy: 'Deep Learning Neural Network',
    timestamp: '2024-04-19T11:32:18Z',
    status: 'executed'
  },
  {
    id: '5',
    stockId: '4',
    symbol: 'AMZN',
    type: 'sell',
    quantity: 1,
    price: 178.92,
    total: 178.92,
    strategy: 'Statistical Arbitrage',
    timestamp: '2024-04-18T15:47:29Z',
    status: 'executed'
  }
];

// About Us team data
export const teamMembers = [
  {
    id: '1',
    name: 'Sonal',
    role: 'Chief Data Scientist',
    bio: 'PhD in Statistical Learning with 10+ years of experience developing quantitative trading models at top hedge funds. Specializes in machine learning and statistical arbitrage.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: '2',
    name: 'Ayush',
    role: 'Algorithm Engineer',
    bio: 'Former quant at Goldman Sachs with expertise in designing high-frequency trading systems and optimization algorithms. Masters in Financial Engineering from MIT.',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
  },
  {
    id: '3',
    name: 'Sakshat',
    role: 'Financial Analyst',
    bio: 'CFA charterholder with extensive background in portfolio management and risk modeling. Previously led research at a leading quantitative investment firm.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  }
];