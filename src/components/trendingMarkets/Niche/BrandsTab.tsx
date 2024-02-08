import styled from "styled-components";
import { Chart } from "../Chart";

const BrandsTabWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 12px;
  row-gap: 12px;
`;

export const BrandsTab = () => {
  return (
    <BrandsTabWrapper>
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
    </BrandsTabWrapper>
  );
};
