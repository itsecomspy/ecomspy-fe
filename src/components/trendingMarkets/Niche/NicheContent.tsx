import React, { Key } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useNicheContext } from "./NicheContext";
import { NicheCard } from "./NicheCard";
import { useLanguageContext } from "@/context/LanguageContext";
//import { niches } from "../../../utils/niches";
import { useQuery } from "@tanstack/react-query";
import useCategories from "@root/src/hooks/use-categories";

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

  let location = useLocation();

  // Use context to get Niches
  const { categories, getSubCategories } = useCategories();

  let getLocation = parseInt(location.pathname.split("/")[2] || "0");
  const currentCat = categories.find((c) => c.id === getLocation);

  const { data: subcategories = [], isLoading: subcategoriesLoading } =
    useQuery({
      queryKey: ["subcategories", getLocation],
      queryFn: () => getSubCategories(getLocation),
    });


  return (
    <div className="p-[24px] flex overflow-clip rounded-[4px] w-full h-full flex-col gap-[24px]">
      <NicheContentWrapper>
        {subcategories.map((item: any, key: Key) => {
          return (
            <NicheCard
              parentId={`${currentCat?.value}`}
              key={key}
              id={item.id}
              value={item.value}
              icon={item.icon}
              text={item.name}
            />
          );
        })}
      </NicheContentWrapper>
    </div>
  );
};
