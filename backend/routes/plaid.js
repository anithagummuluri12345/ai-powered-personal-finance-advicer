const express = require('express');
const router = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// Initialize Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Mock data for sandbox mode
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

// Check connection status
router.get('/status', async (req, res) => {
  try {
    // In a real app, you'd check if the user has a valid access token
    // For demo purposes, we'll simulate a connected state
    res.json({
      connected: true,
      userData: {
        name: 'Demo User',
        accounts: [
          {
            id: 'demo-checking',
            name: 'Demo Checking Account',
            type: 'depository',
            subtype: 'checking',
            mask: '1234'
          }
        ]
      }
    });
  } catch (error) {
    console.error('Error checking Plaid status:', error);
    res.status(500).json({ error: 'Failed to check connection status' });
  }
});

// Connect to Plaid (simulate connection)
router.post('/connect', async (req, res) => {
  try {
    const { useSandbox } = req.body;
    
    if (useSandbox) {
      // Simulate successful connection
      res.json({
        success: true,
        message: 'Successfully connected to bank account (sandbox mode)',
        accessToken: 'demo-access-token'
      });
    } else {
      // In a real app, you'd implement the full Plaid Link flow
      res.status(400).json({
        error: 'Real Plaid integration requires additional setup'
      });
    }
  } catch (error) {
    console.error('Error connecting to Plaid:', error);
    res.status(500).json({ error: 'Failed to connect to bank account' });
  }
});

// Get accounts (mock data)
router.get('/accounts', async (req, res) => {
  try {
    const accounts = [
      {
        id: 'demo-checking',
        name: 'Demo Checking Account',
        type: 'depository',
        subtype: 'checking',
        mask: '1234',
        balances: {
          available: 5000.00,
          current: 5000.00,
          limit: null
        }
      },
      {
        id: 'demo-savings',
        name: 'Demo Savings Account',
        type: 'depository',
        subtype: 'savings',
        mask: '5678',
        balances: {
          available: 15000.00,
          current: 15000.00,
          limit: null
        }
      }
    ];

    res.json({ accounts });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

// Get transactions (mock data)
router.get('/transactions', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    // Filter transactions by date if provided
    let filteredTransactions = mockTransactions;
    
    if (start_date && end_date) {
      filteredTransactions = mockTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    res.json({
      transactions: filteredTransactions,
      total_transactions: filteredTransactions.length,
      request_id: 'demo-request-id'
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

module.exports = router; 