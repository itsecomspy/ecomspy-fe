import styled from "styled-components";
import { Chart } from "../Chart";

const ProductsTabWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 12px;
  row-gap: 12px;
`;

export const ProductsTab = () => {
  return (
    <ProductsTabWrapper>
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
      <Chart height={225} width={275} />
    </ProductsTabWrapper>
  );
};
