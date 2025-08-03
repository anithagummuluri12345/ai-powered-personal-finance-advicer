const express = require('express');
const router = express.Router();

// Mock transaction data (same as in plaid.js)
const mockTransactions = [
  {
    id: '1',
    name: 'Starbucks',
    amount: -5.67,
    category: 'Food & Dining',
    date: '2024-01-15',
    type: 'debit'
  },
  {
    id: '2',
    name: 'Salary Deposit',
    amount: 5200.00,
    category: 'Income',
    date: '2024-01-01',
    type: 'credit'
  },
  {
    id: '3',
    name: 'Uber',
    amount: -23.45,
    category: 'Transportation',
    date: '2024-01-14',
    type: 'debit'
  },
  {
    id: '4',
    name: 'Amazon',
    amount: -89.99,
    category: 'Shopping',
    date: '2024-01-13',
    type: 'debit'
  },
  {
    id: '5',
    name: 'Netflix',
    amount: -15.99,
    category: 'Entertainment',
    date: '2024-01-12',
    type: 'debit'
  },
  {
    id: '6',
    name: 'Grocery Store',
    amount: -156.78,
    category: 'Food & Dining',
    date: '2024-01-11',
    type: 'debit'
  },
  {
    id: '7',
    name: 'Gas Station',
    amount: -45.67,
    category: 'Transportation',
    date: '2024-01-10',
    type: 'debit'
  },
  {
    id: '8',
    name: 'Restaurant',
    amount: -78.90,
    category: 'Food & Dining',
    date: '2024-01-09',
    type: 'debit'
  },
  {
    id: '9',
    name: 'Target',
    amount: -234.56,
    category: 'Shopping',
    date: '2024-01-08',
    type: 'debit'
  },
  {
    id: '10',
    name: 'Spotify',
    amount: -9.99,
    category: 'Entertainment',
    date: '2024-01-07',
    type: 'debit'
  }
];

// Calculate summary statistics
const calculateSummary = (transactions) => {
  const totalSpent = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalSpent) / totalIncome) * 100 : 0;
  
  // Find top spending category
  const categorySpending = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
    
  const topCategory = Object.entries(categorySpending)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Other';
    
  return {
    totalSpent,
    totalIncome,
    savingsRate,
    topCategory
  };
};

// Get all transactions with summary
router.get('/', async (req, res) => {
  try {
    const summary = calculateSummary(mockTransactions);
    
    res.json({
      transactions: mockTransactions,
      summary,
      total_transactions: mockTransactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get transactions by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const filteredTransactions = mockTransactions.filter(
      t => t.category.toLowerCase() === category.toLowerCase()
    );
    
    const summary = calculateSummary(filteredTransactions);
    
    res.json({
      transactions: filteredTransactions,
      summary,
      category,
      total_transactions: filteredTransactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions by category:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get transactions by date range
router.get('/date-range', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }
    
    const filteredTransactions = mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    
    const summary = calculateSummary(filteredTransactions);
    
    res.json({
      transactions: filteredTransactions,
      summary,
      date_range: { start_date, end_date },
      total_transactions: filteredTransactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions by date range:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get spending summary
router.get('/summary', async (req, res) => {
  try {
    const summary = calculateSummary(mockTransactions);
    
    // Add category breakdown
    const categoryBreakdown = mockTransactions
      .filter(t => t.amount < 0)
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {});
    
    res.json({
      summary,
      category_breakdown: categoryBreakdown,
      total_transactions: mockTransactions.length
    });
  } catch (error) {
    console.error('Error fetching transaction summary:', error);
    res.status(500).json({ error: 'Failed to fetch transaction summary' });
  }
});

module.exports = router; 