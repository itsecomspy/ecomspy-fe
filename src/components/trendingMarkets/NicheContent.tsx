import React, { Key } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useNicheContext } from "./NicheContext";
import { NicheCard } from "./NicheCard";
import { useLanguageContext } from "@/context/LanguageContext";
import { niches } from "../../utils/niches";

const NicheContentWrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-content: flex-start;
`;

export const NicheContent = () => {
  const { lan } = useLanguageContext();
  const [allData, setAllData] = React.useState<object[] | undefined>([]);

  let location = useLocation();
  let navigate = useNavigate();

  // Use context to get Niches
  const { data } = useNicheContext();

  let getLocation = location.pathname.split("/")[2];
  let headerText = getLocation
    ? getLocation.replaceAll("-", " ")
    : "All Categories";

  // Filter and get all niches
  React.useEffect(() => {

    navigate("/trending-markets");

    let allNiches: object[] = [];
    niches.map((n) => allNiches.push(...n.items));
    setAllData(allNiches);
  }, []);

  return (
    <div className="p-[24px] flex bg-[#FFFFFF05] overflow-clip rounded-[4px] w-full h-full flex-col gap-[24px]">
      <div className="capitalize">{headerText}</div>
      <NicheContentWrapper>
        {!getLocation
          ? allData?.map((item: any, key: Key) => {
              return (
                <NicheCard
                  parentId={item.parentId}
                  key={key}
                  id={item.id}
                  icon={item.icon}
                  text={item.text[lan]}
                />
              );
            })
          : Object.keys(data).length &&
            data?.items?.map((item: any, key: Key) => {
              return (
                <NicheCard
                  parentId={item.parentId}
                  key={key}
                  id={item.id}
                  icon={item.icon}
                  text={item.text[lan]}
                />
              );
            })}
      </NicheContentWrapper>
    </div>
  );
};
