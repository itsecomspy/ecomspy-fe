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
// import { data } from "@/utils/_demoData";
import { calculateGrowth, calculateVolume } from "@/utils/calculations";
import { useNavigate } from "react-router-dom";
import { PiArrowRight } from "react-icons/pi";

const ChartWrapper = styled.div`
  width: auto;
  padding: 16px 0 0;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  height: fit-content;
`;

const CustomTooltipWapper = styled.div`
  background-color: #010519;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  color: white;
  font-weight: 300;
  gap: 6px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);
  & .date {
    font-size: 12px;
    font-weight: 700;
    padding-bottom: 6px;
    color: rgba(255, 255, 255, 0.64);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    border-style: dashed;
  }
  & .label {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    gap: 36px;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const InsightsWrapper = styled.div<{
  $size?: "small" | "large";
}>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 24px 28px;
  display: flex;
  gap: ${(props) => (props.$size === "large" ? "24px" : "12px")};
`;

interface ChartProps {
  button?: React.ReactElement;
  width: number;
  height: number;
  margin?: { t: number; b: number; l: number; r: number };
  style?: string;
  name?: string;
  volume?: number;
  chartData?: {
    name: string;
    pv: number;
  }[];
  size?: "small" | "large";
  insights?: boolean;
}

export const Chart = ({
  width,
  height,
  margin,
  style,
  name,
  volume = 0,
  chartData,
  size = "small",
  insights = true,
  button,
}: ChartProps) => {
  const navigate = useNavigate();

  const getGrowth = chartData
    ? calculateGrowth(chartData[0]?.pv, chartData[chartData.length - 1]?.pv)
    : [];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      let tooltipGrowth = chartData
        ? calculateGrowth(chartData[0]?.pv, payload[0].value)
        : [];

      const getPointVolume =
        Number(volume) + (Number(volume) * Number(tooltipGrowth)) / 100;
      const getVolume = chartData ? calculateVolume(getPointVolume) : [];

      let chartLabel =
        size === "large"
          ? `${payload[0].payload.name.split(" ")[0]} ${
              payload[0].payload.amt
            }`
          : payload[0].payload.label;

      return (
        <CustomTooltipWapper>
          <p className="date">{chartLabel}</p>
          <p className="label">
            <span>Volume</span>
            <span className="font-medium text-white">{getVolume}</span>
          </p>
          <p className="label">
            <span>Growth</span>
            <span className="font-medium text-white">{tooltipGrowth}%</span>
          </p>
        </CustomTooltipWapper>
      );
    }
    return null;
  };

  return (
    <ChartWrapper className={style}>
      {insights && (
        <InsightsWrapper $size={size}>
          <div>
            <p
              className={`${
                size === "large" ? "text-[14px]" : "text-[10px]"
              } text-[rgba(255,255,255,.64)]`}
            >
              Volume
            </p>
            <p
              className={`font-medium ${
                size === "large" ? "text-[24px]" : "text-[12px]"
              }`}
            >
              {Intl.NumberFormat("en", { notation: "compact" }).format(
                volume / 10 || 0
              )}
              {(volume / 10 || 0) < 1000 && "K"}
            </p>
          </div>
          <div>
            <p
              className={`${
                size === "large" ? "text-[14px]" : "text-[10px]"
              } text-[rgba(255,255,255,.64)]`}
            >
              Growth
            </p>
            <p
              className={`font-medium ${
                size === "large" ? "text-[24px]" : "text-[12px]"
              } ${
                getGrowth === "+0"
                  ? "text-white"
                  : // @ts-ignore
                  getGrowth.includes("+")
                  ? "text-[#4fea47]"
                  : "text-[#f44336]"
              }`}
            >
              {getGrowth}%
            </p>
          </div>
        </InsightsWrapper>
      )}
      <ComposedChart
        width={width}
        height={height}
        data={chartData}
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
        <p className="capitalize">{name || "N/A"}</p>
        <div className="flex mt-[24px] justify-end w-full items-center">
          {/* <Button text="View Ads" height={24} backgroundColor="none" border /> */}
          {button ? (
            button
          ) : (
            <Button
              action={() =>
                navigate(`${name?.replaceAll(" ", "-").toLowerCase()}`)
              }
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
