"use client";
import React from "react";

type DataType = {
  label: string;
  value: number;
  is_answer: boolean;
  percent: number;
};

type Props = {
  percentData: DataType[];
};

const barColors = {
  selected: "bg-primary-500", // 赤系
  normal: "bg-stone-300", // 青系
};

class WorksheetChart extends React.Component<Props> {
  render() {
    const { percentData } = this.props;
    return (
      <ul className="list-none p-0 m-0">
        {percentData.map((item) => (
          <li
            key={item.label}
            className="mb-3 rounded-xl bg-gray-200 overflow-hidden relative h-10"
          >
            {/* 棒グラフ本体 */}
            <div
              className={`
                absolute top-0 left-0 h-10 rounded-xl transition-all duration-500
                ${item.is_answer ? barColors.selected : barColors.normal}
              `}
              style={{
                width: `${item.percent}%`,
                zIndex: 1,
              }}
            />
            {/* ラベル＋チェックアイコン（絶対配置で上に重ねる） */}
            <div
              className="absolute left-4 top-0 h-10 flex items-center font-semibold text-white text-base whitespace-nowrap overflow-hidden text-ellipsis z-10 max-w-[calc(100%-80px)] pointer-events-none"
            >
              <span
                className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full inline-block text-gray-800"
              >
                {item.label}
              </span>
              {item.is_answer && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="ml-2 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" stroke="#3d3d3d" strokeWidth="2" fill="none" />
                  <path d="M7 13l3 3 7-7" stroke="#3d3d3d" strokeWidth="2" fill="none" />
                </svg>
              )}
            </div>
            {/* パーセント表示（常に右端） */}
            <span
              className="absolute right-4 top-0 h-10 flex items-center font-semibold text-gray-800 text-base z-10 bg-transparent pointer-events-none"
            >
              {item.percent.toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    );
  }
}

export default WorksheetChart;