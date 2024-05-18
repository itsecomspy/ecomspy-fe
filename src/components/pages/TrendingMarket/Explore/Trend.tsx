import styled from "styled-components";
import { ComposedChart, Line, Area } from "recharts";
import { calculateGrowth } from "@/utils/calculations";
// import { useNavigate } from "react-router-dom";

const TrendWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 88px;
  &:last-child {
    border: 0;
  }
`;

export const Trend = ({
  text,
  data,
  border,
}: {
  text: string;
  data?: any;
  border: boolean;
}) => {
  const getGrowth = calculateGrowth(data[0]?.pv, data[data.length - 1]?.pv);
  // const navigate = useNavigate();
  // const handleNavigate = () => {
  //   const formatText = text.replaceAll(" ", "-");
  //   navigate(`/trending-markets/search/${formatText}`);
  // };

  return (
    <TrendWrapper
      // onClick={handleNavigate}
      className={`${border ? "border-b" : ""} border-[rgba(255,255,255,0.03)]`}
    >
      <p className="text-[12px] sm:text-[14px] capitalize w-full max-w-[66.6px] sm:max-w-[100px]">{text}</p>
      <ComposedChart
        width={128}
        height={44}
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        style={{
          borderRadius: "4px",
          margin: "0 16px",
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="1.25" y2="1">
            <stop offset="5%" stopColor="#E18B0A" stopOpacity={1} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={1} />
          </linearGradient>
        </defs>
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
      <p className="max-w-[40px] w-full text-right text-[11px] sm:text-[14px] text-[#4EF654] font-medium">
        {getGrowth}%
      </p>
    </TrendWrapper>
  );
};
