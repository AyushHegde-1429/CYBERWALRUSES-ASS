import React, { useState, useEffect } from 'react';
import { Stock, Order } from '../../types';
import { formatCurrency, formatPercentage } from '../../utils/formatting';
import Button from '../ui/Button';
import { X, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface TradeModalProps {
  stock: Stock;
  onClose: () => void;
  onSubmit: (order: Partial<Order>) => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ stock, onClose, onSubmit }) => {
  const [orderType, setOrderType] = useState<'market' | 'limit' | 'stop' | 'stop-limit'>('market');
  const [tradeType, setTradeType] = useState<'buy' | 'sell' | 'short' | 'cover'>('buy');
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(stock.price);
  const [stopPrice, setStopPrice] = useState<number>(stock.price);
  const [limitPrice, setLimitPrice] = useState<number>(stock.price);
  const [timeInForce, setTimeInForce] = useState<'day' | 'gtc' | 'ioc' | 'fok'>('day');
  const [leverage, setLeverage] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number | undefined>();
  const [takeProfit, setTakeProfit] = useState<number | undefined>();
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const calculateTotal = () => {
    return quantity * (orderType === 'market' ? stock.price : price);
  };

  const calculateMargin = () => {
    return calculateTotal() / leverage;
  };

  const calculateLiquidationPrice = () => {
    if (tradeType === 'short') {
      return price * (1 + (1 / leverage));
    }
    return price * (1 - (1 / leverage));
  };

  const handleSubmit = () => {
    const order: Partial<Order> = {
      stockId: stock.id,
      symbol: stock.symbol,
      type: tradeType,
      quantity,
      price: orderType === 'market' ? stock.price : price,
      orderType,
      timeInForce,
      status: 'pending',
      timestamp: new Date().toISOString(),
      leverage,
      stopLoss,
      takeProfit
    };

    if (orderType === 'stop' || orderType === 'stop-limit') {
      order.stopPrice = stopPrice;
    }
    
    if (orderType === 'limit' || orderType === 'stop-limit') {
      order.limitPrice = limitPrice;
    }

    onSubmit(order);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">{stock.symbol}</h2>
            <p className="text-gray-400">{stock.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Trade Type Selection */}
          <div className="grid grid-cols-4 gap-2">
            <button
              className={`p-2 rounded-lg text-center ${
                tradeType === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setTradeType('buy')}
            >
              Buy
            </button>
            <button
              className={`p-2 rounded-lg text-center ${
                tradeType === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setTradeType('sell')}
            >
              Sell
            </button>
            <button
              className={`p-2 rounded-lg text-center ${
                tradeType === 'short' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setTradeType('short')}
            >
              Short
            </button>
            <button
              className={`p-2 rounded-lg text-center ${
                tradeType === 'cover' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setTradeType('cover')}
            >
              Cover
            </button>
          </div>

          {/* Order Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Order Type</label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value as any)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            >
              <option value="market">Market</option>
              <option value="limit">Limit</option>
              <option value="stop">Stop</option>
              <option value="stop-limit">Stop Limit</option>
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Quantity</label>
            <input
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            />
          </div>

          {/* Price Inputs based on Order Type */}
          {orderType !== 'market' && (
            <div>
              {(orderType === 'limit' || orderType === 'stop-limit') && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Limit Price</label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                  />
                </div>
              )}
              
              {(orderType === 'stop' || orderType === 'stop-limit') && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Stop Price</label>
                  <input
                    type="number"
                    value={stopPrice}
                    onChange={(e) => setStopPrice(Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
                  />
                </div>
              )}
            </div>
          )}

          {/* Time in Force Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Time in Force</label>
            <select
              value={timeInForce}
              onChange={(e) => setTimeInForce(e.target.value as any)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
            >
              <option value="day">Day</option>
              <option value="gtc">Good Till Cancelled</option>
              <option value="ioc">Immediate or Cancel</option>
              <option value="fok">Fill or Kill</option>
            </select>
          </div>

          {/* Leverage Selection for Margin Trading */}
          {(tradeType === 'buy' || tradeType === 'short') && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Leverage</label>
              <select
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              >
                <option value={1}>1x</option>
                <option value={2}>2x</option>
                <option value={5}>5x</option>
                <option value={10}>10x</option>
                <option value={20}>20x</option>
              </select>
            </div>
          )}

          {/* Stop Loss & Take Profit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Stop Loss</label>
              <input
                type="number"
                value={stopLoss || ''}
                onChange={(e) => setStopLoss(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Optional"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Take Profit</label>
              <input
                type="number"
                value={takeProfit || ''}
                onChange={(e) => setTakeProfit(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Optional"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="text-white">{formatCurrency(calculateTotal())}</span>
              </div>
              {leverage > 1 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Required Margin</span>
                    <span className="text-white">{formatCurrency(calculateMargin())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Liquidation Price</span>
                    <span className="text-red-500">{formatCurrency(calculateLiquidationPrice())}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Risk Warning */}
          {leverage > 1 && (
            <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="text-red-500 mr-2 mt-1" size={20} />
                <div>
                  <h4 className="text-red-500 font-medium">High Risk Warning</h4>
                  <p className="text-gray-400 text-sm">
                    Trading with {leverage}x leverage significantly increases your risk of loss.
                    You could lose your entire investment rapidly.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant={tradeType === 'buy' || tradeType === 'cover' ? 'primary' : 'danger'}
              fullWidth
              onClick={handleSubmit}
            >
              {tradeType === 'buy' && <TrendingUp size={16} className="mr-2" />}
              {tradeType === 'short' && <TrendingDown size={16} className="mr-2" />}
              Confirm {tradeType.charAt(0).toUpperCase() + tradeType.slice(1)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;