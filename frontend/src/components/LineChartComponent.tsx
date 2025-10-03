import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data }) => {
  const chartData = data.map(run => ({
    ...run,
    // Convert timestamp to a more readable format for the tooltip if needed
    time: new Date(run.timestamp).toLocaleString(),
    // Convert pass/fail to a numerical value for plotting
    numeric_status: run.status === 'pass' ? 1 : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 1]} tickFormatter={(tick) => (tick === 1 ? 'Pass' : 'Fail')} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="numeric_status" stroke="#8884d8" name="Status" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
