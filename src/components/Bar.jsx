import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import 'moment/locale/ro'; // Ensure Romanian locale is imported

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function FraudBarChart() {
  moment.locale('ro');

  const generateLastTwentyFourHours = () => {
    return Array.from({ length: 24 }, (_, i) =>
      moment()
        .subtract(23 - i, 'hours')
        .startOf('hour') // Round down to the nearest hour
        .format('HH:00'),
    );
  };

  const data = {
    labels: generateLastTwentyFourHours(),
    datasets: [
      {
        label: 'Frauds',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 20)), // Random hourly frauds data
        backgroundColor: '#fca5a5',
        barPercentage: 0.9,
        categoryPercentage: 0.5,
      },
      {
        label: 'Unsures',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 15)), // Random hourly unsures data
        backgroundColor: '#fde68a',
        barPercentage: 0.9,
        categoryPercentage: 0.5,
      },
      {
        label: 'Non-Frauds',
        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)), // Random hourly non-frauds data
        backgroundColor: '#bfdbfe',
        barPercentage: 0.9,
        categoryPercentage: 0.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to resize properly
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 10, // Adds space around legend labels
          font: {
            size: 12, // Smaller font size for mobile
          },
        },
      },
      title: {
        display: true,
        text: 'Analiza Fraudelor din Ultimele 24 de Ore',
        font: {
          size: 16, // Adjust title font size for mobile
        },
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          maxRotation: 90, // Ensures labels don't overlap by rotating them
          font: {
            size: 10, // Smaller labels on mobile
          },
        },
      },
      y: {
        stacked: false,
        ticks: {
          beginAtZero: true,
          font: {
            size: 10, // Smaller labels on mobile
          },
        },
      },
    },
  };

  return (
    <div className="h-[40vh]">
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}
