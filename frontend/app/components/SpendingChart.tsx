'use client';

import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface SpendingChartProps {
  transactions: any[];
}

export default function SpendingChart({ transactions }: SpendingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  // Process transactions for chart data
  const processChartData = () => {
    if (!transactions || transactions.length === 0) {
      return {
        barData: {
          labels: ['No Data'],
          datasets: [{
            label: 'Spending',
            data: [0],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          }]
        },
        doughnutData: {
          labels: ['No Data'],
          datasets: [{
            data: [1],
            backgroundColor: ['rgba(156, 163, 175, 0.5)'],
            borderColor: ['rgba(156, 163, 175, 1)'],
            borderWidth: 1,
          }]
        }
      };
    }

    // Group by category
    const categorySpending = transactions.reduce((acc, transaction) => {
      const category = transaction.category || 'Other';
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
      return acc;
    }, {});

    // Group by date (last 7 days)
    const dateSpending = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + Math.abs(transaction.amount);
      return acc;
    }, {});

    const barData = {
      labels: Object.keys(dateSpending).slice(-7),
      datasets: [{
        label: 'Daily Spending',
        data: Object.values(dateSpending).slice(-7),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      }]
    };

    const doughnutData = {
      labels: Object.keys(categorySpending),
      datasets: [{
        data: Object.values(categorySpending),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(168, 85, 247, 0.5)',
          'rgba(236, 72, 153, 0.5)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
      }]
    };

    return { barData, doughnutData };
  };

  const { barData, doughnutData } = processChartData();

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        }
      },
      title: {
        display: false,
      },
    }
  };

  return (
    <div className="space-y-6">
      <div className="h-64">
        <Bar data={barData} options={barOptions} />
      </div>
      
      <div className="h-64">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
    </div>
  );
} 