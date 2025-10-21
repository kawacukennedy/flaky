// Purpose: Show flaky distribution

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
  options?: any;
}

const PieChartComponent: React.FC<PieChartProps> = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Flaky Distribution",
      },
    },
  };

  return <Pie options={options || defaultOptions} data={data} />;
};

export default PieChartComponent;
