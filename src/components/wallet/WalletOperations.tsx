import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const WalletOperations: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (!isNaN(depositAmount) && depositAmount > 0) {
      setBalance(prev => prev + depositAmount);
      setAmount('');
    }
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(prev => prev - withdrawAmount);
      setAmount('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Wallet Operations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Balance</h2>
            <p className="text-4xl font-bold text-green-600">${balance.toFixed(2)}</p>
          </div>
        </Card>
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Transaction</h2>
            <div className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full p-2 border rounded-md"
                min="0"
                step="0.01"
              />
              <div className="flex space-x-4">
                <Button onClick={handleDeposit}>Deposit</Button>
                <Button onClick={handleWithdraw}>Withdraw</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WalletOperations;