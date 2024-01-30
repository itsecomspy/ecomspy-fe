import styled from "styled-components";

const NicheTabsWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  width: 100%;
`;
const TabsWrapper = styled.div<{
  $selcted?: boolean;
}>`
  font-size: 14px;
  height: 36px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  border: ${(props) =>
    props.$selcted ? "1px solid rgba(255, 255, 255, 0.03)" : "none"};
  color: ${(props) => (props.$selcted ? "white" : "rgba(255, 255, 255, 0.72)")};
  background: ${(props) =>
    props.$selcted ? "rgba(255, 255, 255, 0.04)" : "transparent"};
  &:hover {
    transition: 0.25s;
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const NicheTabs = () => {
  return (
    <NicheTabsWrapper>
      <TabsWrapper $selcted>All</TabsWrapper>
      <TabsWrapper>Products</TabsWrapper>
      <TabsWrapper>Brands</TabsWrapper>
      <TabsWrapper>Keywords</TabsWrapper>
    </NicheTabsWrapper>
  );
};
