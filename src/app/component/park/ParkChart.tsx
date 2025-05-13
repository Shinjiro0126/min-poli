'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import ParkChartTooltip from "@/app/component/park/ParkChartTooltip";

type DataType = {
  name: string;
  value: number;
  color: string;
}

type Props = {
  data: DataType[];
}

export default function ParkChart({data}: Props){
  // 1本のバー用にデータを1行に変換
  const chartData = [
    data.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), { name: "合計" })
  ];

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
      >
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" hide/>
        <Tooltip content={(props) => <ParkChartTooltip {...props} />} />
        <Legend />
        {data.map((entry, idx) => (
          <Bar
            key={entry.name}
            dataKey={entry.name}
            stackId="a"
            fill={entry.color}
            name={entry.name}
            radius={
              idx === 0
                ? [8, 0, 0, 8] // 左端
                : idx === data.length - 1
                ? [0, 8, 8, 0] // 右端
                : 0 // 中間は丸みなし
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
