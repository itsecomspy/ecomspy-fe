import { Key } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { NicheCard } from "./NicheCard";
//import { niches } from "../../../utils/niches";
// import { useQuery } from "@tanstack/react-query";
import useCategories from "@root/src/hooks/useCategories";
import { PiArrowLeft } from "react-icons/pi";
import { useWindowSize } from "usehooks-ts";

const NicheContentWrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-content: flex-start;
`;

export const NicheContent = ({ isSelected }: { isSelected?: any }) => {

  let location = useLocation();

  // Use context to get Niches
  const { categories } = useCategories();

  let getLocation = parseInt(location.pathname.split("/")[2] || "0");
  const currentCat =
    categories.find((c) => c.categoryId === getLocation);

  const { width } = useWindowSize();

  return (
    <div className="p-[24px] relative flex overflow-clip rounded-[4px] w-full h-full flex-col gap-[24px]">
      {width < 480 && (
        <div
          className="flex gap-2 cursor-pointer items-center"
          onClick={() => isSelected(false)}
        >
          <PiArrowLeft fontSize={16} />
          <p className="text-[14px] font-medium">Back</p>
        </div>
      )}
      <NicheContentWrapper>
        {currentCat?.niches.map((item: any, key: Key) => {
          return (
            <NicheCard
              key={key}
              parentId={currentCat.id}
              id={item.niche}
              value={item.nicheId}
              //icon={item.icon}
              text={item.keyword}
            />
          );
        })}
      </NicheContentWrapper>
    </div>
  );
};
