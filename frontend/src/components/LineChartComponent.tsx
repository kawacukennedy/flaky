import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RunHistory {
  run_id: string;
  status: string;
  duration_ms: number;
  timestamp: string;
}

interface FlakinessTrendData {
  name: string;
  flakiness: number;
}

interface LineChartComponentProps {
  data: RunHistory[] | FlakinessTrendData[];
  xDataKey?: string; // Optional prop for x-axis data key
  yDataKey?: string; // Optional prop for y-axis data key
}

const LineChartComponent = ({ data, xDataKey, yDataKey }: LineChartComponentProps) => {
  // Determine if the data is RunHistory or FlakinessTrendData
  const isRunHistory = data.length > 0 && 'status' in data[0];

  const processedData = data.map((item: any) => {
    if (isRunHistory) {
      const run = item as RunHistory;
      return {
        ...run,
        time: new Date(run.timestamp).toLocaleString(),
        numeric_status: run.status === 'pass' ? 1 : 0,
      };
    } else {
      const trend = item as FlakinessTrendData;
      return {
        ...trend,
        flakiness_percentage: trend.flakiness * 100,
      };
    }
  });

  const finalXDataKey = xDataKey || (isRunHistory ? 'time' : 'name');
  const finalYDataKey = yDataKey || (isRunHistory ? 'numeric_status' : 'flakiness_percentage');

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={finalXDataKey} />
        <YAxis
          domain={isRunHistory ? [0, 1] : undefined}
          tickFormatter={(tick) => (isRunHistory ? (tick === 1 ? 'Pass' : 'Fail') : `${tick}%`)}
        />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={finalYDataKey} stroke="#8884d8" name={isRunHistory ? "Status" : "Flakiness"} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
