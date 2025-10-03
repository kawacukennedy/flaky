import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SeverityData {
  critical: number;
  moderate: number;
  minor: number;
}

interface PieChartProps {
  data: SeverityData;
}

const COLORS = {
  critical: '#FF8042',
  moderate: '#FFBB28',
  minor: '#00C49F',
};

const PieChartComponent = ({ data: severityData }: PieChartProps) => {
  const chartData = Object.entries(severityData).map(([name, value]) => ({ name, value }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;