import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrer les éléments nécessaires pour le graphique
ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  type: string;
  amount: number;
}

const ExpenseChart: React.FC<{ expenses: Expense[] }> = ({ expenses }) => {
  // Regrouper les dépenses par type et calculer les totaux
  const groupedExpenses = expenses.reduce((acc: Record<string, number>, expense) => {
    acc[expense.type] = (acc[expense.type] || 0) + expense.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(groupedExpenses),
    datasets: [
      {
        label: 'Dépenses',
        data: Object.values(groupedExpenses),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;
