import styled from "styled-components";
import { PieChart, Pie, Sector } from 'recharts';
import React from "react";

const ChannelBreakdownWrapper = styled.div`
  width: 50%;
  min-width: 417px;
  padding: 24px 0 0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  gap: 24px;
  & > div {
    display: flex;
    justify-content: center;
  }
  @media screen and (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
  }
  @media screen and (max-width: 479px) {
    min-width: 100%;
    & > div {
      justify-content: normal;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
`;

const Dot = styled.div<{
  $color: string;
}>`
  background-color: ${(props) => props.$color};
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  margin-right: 4px;
`

export const ChannelBreakdown = ({ chartData }: { chartData: { trendLine: string; volume: string; chartData: any[] } }) => {

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  // Get dummy channel breakdown for ig, tiktok, facebook
  const data = [
    { name: "Instagram", value: Number(chartData?.trendLine), color: "#a015d4" },
    { name: "TikTok", value: Number(chartData?.volume), color: "#1cddea" },
    { name: "Facebook", value: Number(chartData?.chartData?.[0].volume), color: "#2820df" },
  ]

  const getPercentage = (num: number) => {
    let value = data.reduce((partialSum, a) => partialSum + a.value, 0);
    return (num / value * 100).toFixed(2);
  }

  return (
    <ChannelBreakdownWrapper>
      <p className="px-6">Channel Breakdown</p>
      <div>
        <PieChart width={385} height={250}>
          <Pie
            // @ts-ignore
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#1F2234"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </div>
      <Wrapper>
        {
          data.map((d, i) => (
            <div key={i} className="flex w-full items-center">
              <Dot $color={d.color} />
              <p className="font-sm text-[#FFFFFF66]">{d.name}</p>
              <p className="ml-auto text-sm font-medium">{getPercentage(d.value)}%</p>
            </div>
          ))
        }
      </Wrapper>
    </ChannelBreakdownWrapper>
  );
};

// Pie chart function to render active shape
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={4} textAnchor={textAnchor} fill="#999">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};