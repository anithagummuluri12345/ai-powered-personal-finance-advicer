'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import ConnectPlaid from './components/ConnectPlaid';
import LoadingSpinner from './components/LoadingSpinner';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await axios.get('/api/plaid/status');
      setIsConnected(response.data.connected);
      if (response.data.connected) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaidSuccess = async () => {
    setIsConnected(true);
    toast.success('Successfully connected to your bank account!');
    await checkConnectionStatus();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                AI Finance Advisor
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {isConnected && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800">
                  Connected
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isConnected ? (
          <Dashboard userData={userData} />
        ) : (
          <ConnectPlaid onSuccess={handlePlaidSuccess} />
        )}
      </main>
    </div>
  );
} 