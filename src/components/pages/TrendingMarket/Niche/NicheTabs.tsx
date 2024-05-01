import styled from "styled-components";
import { Filters } from "../Filters";

const NicheTabsWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  align-items: flex-start;
  gap: 10px;
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
  line-height: 0;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const NicheTabs = ({
  active,
  handleTabSwtich,
}: {
  active: number;
  handleTabSwtich: (arg0: any) => void;
}) => {
  const tabComponents = [
    { id: 0, text: "All" },
    { id: 1, text: "Brands" },
    { id: 2, text: "Non Brands" },
    //{ id: 3, text: "Keywords" },
  ];

  return (
    <div className="w-full flex border-[rgba(255,255,255,0.03)] border-b pb-2 flex-wrap md:flex-nowrap">
      <NicheTabsWrapper>
        {tabComponents.map((item, i) => (
          <TabsWrapper
            key={i}
            $selcted={active === item.id}
            onClick={() => handleTabSwtich(item.id)}
          >
            {item.text}
          </TabsWrapper>
        ))}
      </NicheTabsWrapper>
      <div className="w-full flex items-center justify-end">
        {/* <Search width="333px" /> */}
        <Filters />
      </div>
    </div>
  );
};
