import styled from "styled-components";
import { PiTrendUp } from "react-icons/pi";
import { Button } from "../../../index";
import pattern from "@assets/images/pattern.png";

const ForecastInfoWrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 398px;
  width: 282px;
  min-width: 282px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  background: #3a44e4;
  background-image: url(${pattern});
  background-position: bottom;
  background-size: contain;
  background-repeat: no-repeat;
  @media screen and (max-width: 479px) {
    width: auto;
    min-width: auto;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 100px;
  background: linear-gradient(
    149deg,
    rgba(255, 255, 255, 0.4) 11.23%,
    rgba(255, 255, 255, 0) 109.72%
  );
`;

export const ForecastInfo = () => {
  return (
    <ForecastInfoWrapper>
      <IconWrapper>
        <PiTrendUp />
      </IconWrapper>
      <p className="text-[16px] text-white">Forecast Product</p>
      <p className="text-[14px] text-[rgba(255,255,255,.72)]">
        This feature predicts the growth of this trend over the next 12 months.
      </p>
      <p className="text-[14px] text-[rgba(255,255,255,.72)]">
        Our forecasting uses a deep machine learning model trained on millions
        of data points.
      </p>
      <div className="mt-auto">
        <Button
          disable
          text="Forecast"
          backgroundColor="white"
          color="black"
          height={32}
          icon={<PiTrendUp />}
        />
      </div>
    </ForecastInfoWrapper>
  );
};
