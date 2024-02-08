import styled from "styled-components";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Button } from "..";
import { data } from "@/utils/_demoData";
import { PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ChartWrapper = styled.div`
  width: auto;
  padding: 16px 0 0;
  gap: 24px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(255, 255, 255, 0.02);
`;

const CustomTooltipWapper = styled.div`
  background-color: #010519;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  & .title {
    font-size: 10px;
    font-weight: 700;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.64);
  }
  font-size: 14px;
  color: white;
  font-weight: 300;
`;

interface ChartProps {
  button?: React.ReactElement;
  width: number;
  height: number;
  margin?: { t: number; b: number; l: number; r: number };
  style?: string;
}

// export const Chart = ({ data }: { data: any }) => {
export const Chart = ({ button, width, height, margin, style }: ChartProps) => {
  const navigate = useNavigate();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltipWapper>
          <p className="title">{label}</p>
          <p className="label">${payload[0].value} / mo.</p>
        </CustomTooltipWapper>
      );
    }
    return null;
  };

  return (
    <ChartWrapper className={style}>
      <ComposedChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: margin ? margin.t : 16,
          right: margin ? margin.r : 16,
          left: margin ? margin.l : 16,
          bottom: margin ? margin.b : 16,
        }}
        style={{
          background: "#FFFFFF05",
          borderRadius: "4px",
          margin: "0 16px",
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="1.25" y2="1">
            <stop offset="5%" stopColor="#E18B0A" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          strokeOpacity={0.05}
          strokeDasharray="5 5"
        />
        <XAxis dataKey="amt" />
        <Tooltip content={<CustomTooltip />} />
        <Line dot={false} type="monotone" dataKey="pv" stroke="#E18B0A" />
        <Area
          type="monotone"
          dataKey="pv"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
          stroke="none"
        />
      </ComposedChart>
      <div className="p-4">
        <p>Bitwave</p>
        <div className="flex mt-[24px] justify-between w-full items-center">
          <Button text="View Ads" height={24} backgroundColor="none" border />
          {button ? (
            button
          ) : (
            <Button
              action={() => navigate("bitwave")}
              text="Explore"
              height={24}
              icon={<PiArrowRight />}
              backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
            />
          )}
        </div>
      </div>
    </ChartWrapper>
  );
};
