const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock transaction data for analysis
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

// Calculate spending analysis
const analyzeSpending = (transactions) => {
  const totalSpent = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
    
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalSpent) / totalIncome) * 100 : 0;
  
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
    topCategory,
    categorySpending
  };
};

// Generate AI insights using OpenAI
const generateAIInsights = async (analysis) => {
  try {
    const prompt = `As a financial advisor, analyze this spending data and provide personalized advice:

Total Income: $${analysis.totalIncome.toFixed(2)}
Total Spent: $${analysis.totalSpent.toFixed(2)}
Savings Rate: ${analysis.savingsRate.toFixed(1)}%
Top Spending Category: ${analysis.topCategory}

Spending by Category:
${Object.entries(analysis.categorySpending)
  .map(([category, amount]) => `${category}: $${amount.toFixed(2)}`)
  .join('\n')}

Please provide:
1. 3 specific, actionable financial advice items with priority levels (high/medium/low)
2. 3 spending trends or observations
3. 3 financial goals with completion percentages

Format the response as JSON with this structure:
{
  "advice": [
    {
      "type": "savings|spending|investment",
      "title": "Brief title",
      "description": "Detailed description",
      "icon": "trending|alert|target",
      "priority": "high|medium|low"
    }
  ],
  "trends": [
    "Trend observation 1",
    "Trend observation 2",
    "Trend observation 3"
  ],
  "goals": [
    "Goal name: X% complete",
    "Goal name: X% complete",
    "Goal name: X% complete"
  ]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional financial advisor. Provide practical, actionable advice based on spending data. Keep advice specific and measurable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    
    // Try to parse JSON response
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Return fallback insights if parsing fails
      return {
        advice: [
          {
            type: 'savings',
            title: 'Increase Your Savings',
            description: `You can save an additional $${Math.round(analysis.totalSpent * 0.1)}/month by reducing ${analysis.topCategory} expenses by 10%.`,
            icon: 'trending',
            priority: 'high'
          },
          {
            type: 'spending',
            title: 'Monitor Subscription Costs',
            description: 'Review your recurring subscriptions and consider canceling unused services.',
            icon: 'alert',
            priority: 'medium'
          },
          {
            type: 'investment',
            title: 'Investment Opportunity',
            description: `With your current savings rate of ${analysis.savingsRate.toFixed(1)}%, consider investing in a diversified portfolio.`,
            icon: 'target',
            priority: 'low'
          }
        ],
        trends: [
          `Your ${analysis.topCategory} spending represents ${((analysis.categorySpending[analysis.topCategory] / analysis.totalSpent) * 100).toFixed(1)}% of total expenses`,
          `Your savings rate of ${analysis.savingsRate.toFixed(1)}% is ${analysis.savingsRate > 20 ? 'good' : 'below recommended'} for financial health`,
          'Consider setting up automatic savings transfers to improve your savings rate'
        ],
        goals: [
          'Emergency fund: 75% complete',
          'Vacation savings: 40% complete',
          'Investment portfolio: 60% complete'
        ]
      };
    }
  } catch (error) {
    console.error('Error generating AI insights:', error);
    // Return fallback insights if OpenAI fails
    return {
      advice: [
        {
          type: 'savings',
          title: 'Focus on Savings',
          description: 'Consider increasing your savings rate to 20% of income for better financial security.',
          icon: 'trending',
          priority: 'high'
        }
      ],
      trends: [
        'Unable to generate AI insights at this time'
      ],
      goals: [
        'Emergency fund: 75% complete'
      ]
    };
  }
};

// Get AI insights
router.get('/', async (req, res) => {
  try {
    const analysis = analyzeSpending(mockTransactions);
    const insights = await generateAIInsights(analysis);
    
    res.json({
      insights,
      analysis,
      generated_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating insights:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

// Get insights for specific category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const categoryTransactions = mockTransactions.filter(
      t => t.category.toLowerCase() === category.toLowerCase()
    );
    
    if (categoryTransactions.length === 0) {
      return res.status(404).json({ error: 'No transactions found for this category' });
    }
    
    const analysis = analyzeSpending(categoryTransactions);
    const insights = await generateAIInsights(analysis);
    
    res.json({
      insights,
      analysis,
      category,
      generated_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating category insights:', error);
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

module.exports = router; 