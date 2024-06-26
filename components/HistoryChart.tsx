"use client";
import { ResponsiveContainer, XAxis, Tooltip, Line, LineChart } from "recharts";
const CustomTooltip = ({ active, payload, label }) => {
  const dateLabel = new Date(label).toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  if (active) {
    const analysis = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    );
  }
  return null;
};
const HistoryChart = ({ data }) => {
  if (!data.length) {
    return <div>No History Available, Try making Some Journal Entries</div>;
  }
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} width={300} height={100}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#1E88E5"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
