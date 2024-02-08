import styled from "styled-components";
import { Chart } from "../Chart";

const KeywordsTabWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 12px;
  row-gap: 12px;
`;

export const KeywordsTab = () => {
  return (
    <KeywordsTabWrapper>
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
    </KeywordsTabWrapper>
  );
};
