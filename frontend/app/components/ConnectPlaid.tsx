'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { CreditCard, Shield, TrendingUp } from 'lucide-react';

interface ConnectPlaidProps {
  onSuccess: () => void;
}

export default function ConnectPlaid({ onSuccess }: ConnectPlaidProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectToPlaid = async () => {
    setIsConnecting(true);
    try {
      // In sandbox mode, we'll simulate the connection
      const response = await axios.post('/api/plaid/connect', {
        useSandbox: true
      });
      
      if (response.data.success) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error connecting to Plaid:', error);
      toast.error('Failed to connect to bank account. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Connect Your Bank Account
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Securely connect your bank account to get personalized AI-powered financial insights and advice.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Connection</h3>
          <p className="text-gray-600">Bank-level security with Plaid's trusted platform</p>
        </div>
        
        <div className="text-center">
          <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
          <p className="text-gray-600">Get personalized financial advice powered by AI</p>
        </div>
        
        <div className="text-center">
          <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-warning-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Analysis</h3>
          <p className="text-gray-600">Detailed spending analysis and savings recommendations</p>
        </div>
      </div>

      <div className="card max-w-md mx-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Demo Mode
          </h3>
          <p className="text-gray-600 mb-6">
            This is a demo application using Plaid's sandbox environment. 
            Click below to connect with mock data.
          </p>
          
          <button
            onClick={connectToPlaid}
            disabled={isConnecting}
            className="btn-primary w-full flex items-center justify-center"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              'Connect Bank Account (Demo)'
            )}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Using Plaid Sandbox - No real bank connection required
          </p>
        </div>
      </div>
    </div>
  );
} 