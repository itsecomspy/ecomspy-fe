import styled from "styled-components";
import { Chart } from "../Chart";

const AllTabWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 12px;
  row-gap: 12px;
`;

export const AllTab = () => {
  return (
    <AllTabWrapper>
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
    </AllTabWrapper>
  );
};
