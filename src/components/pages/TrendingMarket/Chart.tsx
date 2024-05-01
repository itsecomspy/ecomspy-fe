import styled from "styled-components";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  YAxis,
} from "recharts";
import { Button } from "../..";
import { useNicheContext } from "./Niche/NicheContext";
import { calculateGrowth, calculateVolume } from "@/utils/calculations";
import { useNavigate } from "react-router-dom";
import { PiArrowRight } from "react-icons/pi";
import { calculateForecastPoints } from "@root/src/utils/calculations";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import dayjs from "dayjs/esm/index.js";

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
    border-style: forecast;
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
  button?: React.ReactElement | true;
  width: number;
  height: number;
  margin?: { t: number; b: number; l: number; r: number };
  style?: string;
  name?: string;
  description?: string;
  growth?: string;
  volume?: number;
  datamax?: number;
  chartData?: any[];
  size?: "small" | "large";
  insights?: boolean;
  hiddenText?: boolean;
}

export const Chart = ({
  width,
  height,
  margin,
  style,
  name,
  description,
  growth,
  volume,
  datamax,
  chartData,
  size = "small",
  button,
  insights = true,
  hiddenText,
}: ChartProps) => {
  // Language context
  const { lan } = useLanguageContext();

  // Get current timeline value
  const { timeline } = useNicheContext();
  const navigate = useNavigate();

  const formattedChartData = formatChartDates(chartData, timeline);

  const setChartData =
    timeline === "forecast"
      ? calculateForecastPoints(formattedChartData)
      : formattedChartData;

  const currentVolume = setChartData?.[setChartData.length - 1]?.volume
    ? setChartData?.[setChartData.length - 1]?.volume
    : volume;

  const getGrowth = setChartData
    ? calculateGrowth(
        Number(setChartData[0]?.volume) || 1,
        Number(setChartData[setChartData.length - 1]?.volume)
      )
    : [];

  const xAxisInterval = (timeline: string) => {
    switch (timeline) {
      case "3mon":
      case "6mon":
        return 3;
      case "1year":
      case "forecast":
        return 4;
      case "2year":
        return 6;
      case "5year":
      case "10year":
        return 11;
      default:
        return 3;
    }
  };

  const chartDurationText = () => {
    switch (timeline) {
      case "3mon":
      case "6mon":
        return " / wk.";
      case "1year":
      case "2year":
      case "5year":
      case "10year":
      case "forecast":
        return " / mo.";
      default:
        return " / wk.";
    }
  };

  const multiplier = () => {
    switch (timeline) {
      case "3mon":
      case "6mon":
        return chartData?.length === 10 || chartData?.length === 19 ? 0.23 : 1;
      case "1year":
      case "2year":
      case "5year":
      case "10year":
      case "forecast":
        return 1;
      default:
        return 0.23;
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const currentPayload = payload[0].payload;

      const getVolume = calculateVolume(
        Number(currentPayload.volume) * multiplier()
      );

      return (
        <CustomTooltipWapper>
          <p className="date">{payload[0].payload.displayDate}</p>
          <p className="label">
            <span>Volume</span>
            <span className="font-medium text-white">
              {getVolume} {chartDurationText()}
            </span>
          </p>
          {/* <p className="label">
            <span>Growth</span>
            <span className="font-medium text-white">{tooltipGrowth}%</span>
          </p> */}
        </CustomTooltipWapper>
      );
    }
    return null;
  };

  // const xAxisValue = (val: any) => {
  //   switch (timeline) {
  //     case "30d":
  //     case "90d":
  //       return val?.formattedTime?.split(",")[0];
  //     case "12mo":
  //     case "2yrs":
  //     case "5yrs":
  //       const splitTimeline = val?.formattedTime?.split(" ");
  //       return `${splitTimeline?.[0]} ${splitTimeline?.[2].split(0)[1]}`;
  //     default:
  //       return val?.formattedTime?.split(",")[0];
  //   }
  // };

  return (
    <ChartWrapper className={style}>
      {insights && (
        <InsightsWrapper $size={size}>
          <div>
            <p
              className={`${
                size === "large" ? "text-[14px]" : "text-[12px]"
              } text-[rgba(255,255,255,.64)]`}
            >
              Volume
            </p>
            <p
              className={`font-medium ${
                size === "large" ? "text-[24px]" : "text-[12px]"
              }`}
            >
              {calculateVolume(Number(currentVolume) * multiplier())}
            </p>
          </div>
          <div>
            <p
              className={`${
                size === "large" ? "text-[14px]" : "text-[12px]"
              } text-[rgba(255,255,255,.64)]`}
            >
              {growthText[lan]}
            </p>
            <p
              className={`font-medium ${
                size === "large" ? "text-[24px]" : "text-[12px]"
              } ${
                growth && Number(growth) > 0
                  ? "text-[#4fea47]"
                  : getGrowth === "0"
                  ? "text-white"
                  : // @ts-ignore
                  getGrowth?.includes("+")
                  ? "text-[#4fea47]"
                  : "text-[#f44336]"
              }`}
            >
              {growth ? growth : getGrowth}%
            </p>
          </div>
        </InsightsWrapper>
      )}
      <ComposedChart
        width={width}
        height={height}
        data={setChartData}
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
        {/* @ts-ignore */}
        <YAxis hide allowDataOverflow={true} domain={[0, datamax]} />
        <XAxis dataKey="displayXAxis" interval={xAxisInterval(timeline)} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          dot={false}
          type="monotone"
          dataKey="volume"
          stroke="#E18B0A"
          strokeDasharray={timeline === "forecast" ? "10 5" : 0}
        />
        <Area
          type="monotone"
          dataKey="volume"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"
          stroke="none"
        />
      </ComposedChart>
      <div className="p-4">
        {!hiddenText && size === "small" && (
          <div className="">
            <p className="capitalize">{name || "N/A"}</p>
            <p
              style={{ width: width }}
              className={`text-[rgba(255,255,255,0.4)] line-clamp-2 mt-2 text-[12px]`}
            >
              {description ||
                "A description is currently not available for this keyword."}
            </p>
          </div>
        )}
        <div className="flex mt-[24px] justify-end w-full items-center">
          {/* <Button text="View Ads" height={24} backgroundColor="none" border /> */}
          {button ? (
            button
          ) : (
            <Button
              action={() =>
                navigate(`${name?.replaceAll(" ", "-").toLowerCase()}`, {
                  state: { props: { keyword: name } },
                })
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

const growthText: any = {
  en: "Growth",
  fr: "Croissance",
};

const formatChartDates = (data: any, timeline: string) => {
  const length = data?.length;
  switch (timeline) {
    case "3mon":
    case "6mon":
      return data?.map((d: any, i: number) => {
        const date = new Date();
        const newDate = date.setDate(date.getDate() - 7 * (length - i));
        d.displayDate = dayjs(newDate).format("MMM D");
        d.displayXAxis = dayjs(newDate).format("MMM YY");
        return d;
      });
    case "1year":
    case "forecast":
    case "2year":
    case "5year":
    case "10year":
      return data?.map((d: any, i: number) => {
        const date = new Date();
        const newDate = date.setMonth(date.getMonth() - 1 * (length - i));
        d.displayDate = dayjs(newDate).format("MMM D YY");
        d.displayXAxis = dayjs(newDate).format("YYYY");
        return d;
      });
    default:
      return data?.map((d: any, i: number) => {
        const date = new Date();
        const newDate = date.setDate(date.getDate() - 7 * (length - i));
        d.displayDate = dayjs(newDate).format("MMM D");
        d.displayXAxis = dayjs(newDate).format("MMM YY");
        return d;
      });
  }
};
