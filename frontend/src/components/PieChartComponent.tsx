import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SeverityData {
  critical: number;
  moderate: number;
  minor: number;
}

interface PieChartProps {
  data: SeverityData;
}

const COLORS: { [key: string]: string } = {
  critical: '#DC2626', // danger
  moderate: '#F59E0B', // warning
  minor: '#16A34A',    // success
};

const PieChartComponent = ({ data: severityData }: PieChartProps) => {
  const chartData = Object.entries(severityData || {}).map(([name, value]) => ({
    name,
    value,
  }));

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
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
