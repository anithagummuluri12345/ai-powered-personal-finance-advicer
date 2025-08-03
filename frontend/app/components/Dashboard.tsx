'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import SpendingChart from './SpendingChart';
import TransactionList from './TransactionList';
import AIInsights from './AIInsights';
import MonthlyReport from './MonthlyReport';
import { Download, RefreshCw, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';

interface DashboardProps {
  userData: any;
}

export default function Dashboard({ userData }: DashboardProps) {
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalSpent: 0,
    totalIncome: 0,
    savingsRate: 0,
    topCategory: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [transactionsRes, insightsRes] = await Promise.all([
        axios.get('/api/transactions'),
        axios.get('/api/insights')
      ]);

      setTransactions(transactionsRes.data.transactions);
      setInsights(insightsRes.data.insights);
      setSummary(transactionsRes.data.summary);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
    toast.success('Dashboard refreshed!');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
          <p className="text-gray-600">Your AI-powered financial overview</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            className="btn-secondary flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <MonthlyReport />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-danger-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-danger-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary.totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary.totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <PiggyBank className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Savings Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary.savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-lg font-semibold text-gray-900">
                {summary.topCategory}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Spending Overview</h3>
          <SpendingChart transactions={transactions} />
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Insights</h3>
          <AIInsights insights={insights} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h3>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
} 