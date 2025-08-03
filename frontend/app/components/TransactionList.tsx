'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, CreditCard, ShoppingBag, Home, Car, Utensils } from 'lucide-react';

interface TransactionListProps {
  transactions: any[];
}

const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('food') || categoryLower.includes('restaurant')) {
    return <Utensils className="w-4 h-4" />;
  } else if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
    return <ShoppingBag className="w-4 h-4" />;
  } else if (categoryLower.includes('transport') || categoryLower.includes('gas')) {
    return <Car className="w-4 h-4" />;
  } else if (categoryLower.includes('home') || categoryLower.includes('rent')) {
    return <Home className="w-4 h-4" />;
  } else {
    return <CreditCard className="w-4 h-4" />;
  }
};

const getCategoryColor = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('food') || categoryLower.includes('restaurant')) {
    return 'text-orange-600 bg-orange-100';
  } else if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
    return 'text-blue-600 bg-blue-100';
  } else if (categoryLower.includes('transport') || categoryLower.includes('gas')) {
    return 'text-green-600 bg-green-100';
  } else if (categoryLower.includes('home') || categoryLower.includes('rent')) {
    return 'text-purple-600 bg-purple-100';
  } else {
    return 'text-gray-600 bg-gray-100';
  }
};

export default function TransactionList({ transactions }: TransactionListProps) {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'income') return transaction.amount > 0;
    if (filter === 'expense') return transaction.amount < 0;
    return true;
  });

  const recentTransactions = filteredTransactions.slice(0, 10);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'all' 
              ? 'bg-primary-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'income' 
              ? 'bg-success-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Income
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            filter === 'expense' 
              ? 'bg-danger-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Expenses
        </button>
      </div>

      {/* Transactions list */}
      <div className="space-y-3">
        {recentTransactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No transactions found
          </div>
        ) : (
          recentTransactions.map((transaction, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getCategoryColor(transaction.category)}`}>
                  {getCategoryIcon(transaction.category)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {transaction.amount > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-success-600" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-danger-600" />
                )}
                <span
                  className={`font-semibold ${
                    transaction.amount > 0 ? 'text-success-600' : 'text-danger-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {transactions.length > 10 && (
        <div className="text-center mt-4">
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            View all transactions
          </button>
        </div>
      )}
    </div>
  );
} 