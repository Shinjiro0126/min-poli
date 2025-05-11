import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

const ParkChartTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-stone-300 rounded p-2 shadow text-sm">
      <p className="font-bold mb-1">合計投票</p>
      <ul className="space-y-1">
        {payload.map((entry) => {
          if (!entry) return null;
          return (
            <li key={entry.name} style={{ color: entry.color }}>
              {entry.name}: {entry.value}票
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ParkChartTooltip;