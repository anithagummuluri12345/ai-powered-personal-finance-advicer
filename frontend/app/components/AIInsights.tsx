'use client';

import { useState } from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Target } from 'lucide-react';

interface AIInsightsProps {
  insights: any;
}

export default function AIInsights({ insights }: AIInsightsProps) {
  const [activeTab, setActiveTab] = useState('advice');

  // Mock insights if none provided
  const defaultInsights = {
    advice: [
      {
        type: 'savings',
        title: 'Increase Your Savings',
        description: 'You can save an additional $500/month by reducing dining out expenses by 30%.',
        icon: 'trending',
        priority: 'high'
      },
      {
        type: 'spending',
        title: 'Monitor Subscription Costs',
        description: 'You have $120/month in recurring subscriptions. Consider canceling unused services.',
        icon: 'alert',
        priority: 'medium'
      },
      {
        type: 'investment',
        title: 'Investment Opportunity',
        description: 'With your current savings rate, you could invest $300/month in a diversified portfolio.',
        icon: 'target',
        priority: 'low'
      }
    ],
    trends: [
      'Your food spending increased 15% this month',
      'Transportation costs are 20% below average',
      'Entertainment spending is consistent with budget'
    ],
    goals: [
      'Emergency fund: 75% complete',
      'Vacation savings: 40% complete',
      'Investment portfolio: 60% complete'
    ]
  };

  const insightsData = insights || defaultInsights;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'trending':
        return <TrendingUp className="w-5 h-5" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5" />;
      case 'target':
        return <Target className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-danger-500 bg-danger-50';
      case 'medium':
        return 'border-l-warning-500 bg-warning-50';
      case 'low':
        return 'border-l-success-500 bg-success-50';
      default:
        return 'border-l-primary-500 bg-primary-50';
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('advice')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'advice'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Brain className="w-4 h-4 inline mr-2" />
          AI Advice
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'trends'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 inline mr-2" />
          Trends
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'goals'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="w-4 h-4 inline mr-2" />
          Goals
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'advice' && (
          <div className="space-y-3">
            {insightsData.advice.map((advice: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(advice.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(advice.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {advice.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {advice.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="space-y-3">
            {insightsData.trends.map((trend: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{trend}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-4">
            {insightsData.goals.map((goal: string, index: number) => {
              const [name, progress] = goal.split(': ');
              const percentage = parseInt(progress);
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{name}</span>
                    <span className="text-sm text-gray-500">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 