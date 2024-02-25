import React from "react";
import styled from "styled-components";
import { CategoryButton } from "./CategoryButton";
import { useNavigate, useLocation } from "react-router-dom";
import useCategories from "@root/src/hooks/use-categories";
import { categoryIcons } from "@/utils/icons";

const CategoriesWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  overflow: scroll;
  border-right: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 4px;
`;

const CategoryMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  overflow-y: clip;
  align-items: flex-start;
  top: 0px;
  right: -20px;
  left: 0px;
  bottom: -20px;
  column-gap: 16px;
  width: 100%;
  scroll-behavior: smooth;
`;

export const Categories = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const { categories } = useCategories();

  // Get language from context
  //const { lan } = useLanguageContext();

  const [active, setActive] = React.useState<string | number | undefined>();

  const handleSelected = (data: {
    name?: string;
    id?: number;
    value?: string;
  }) => {
    setActive(data.id);
    navigate(`/trending-markets/${data.id}`);
  };

  // Get niche from url and set on page load
  React.useMemo(() => {
    let getLocation = location.pathname.split("/")[2];
    getLocation && setActive(Number(getLocation));
  }, []);

  return (
    <CategoriesWrapper>
      <div className="w-full">
        <CategoryMapContainer>
          {categories.map((n, i) => {
            // Filter niche icon from icons list using niche ID
            const getNicheIcon = categoryIcons.filter(
              (fil) => fil.id === n.id
            )[0];
            return (
              <div
                className="w-full"
                key={i}
                onMouseEnter={() => handleSelected(n)}
                onClick={() => handleSelected(n)}
              >
                <CategoryButton
                  selected={n.id === active}
                  icon={getNicheIcon.icon}
                  // @ts-ignore
                  text={n.name}
                />
              </div>
            );
          })}
        </CategoryMapContainer>
      </div>
    </CategoriesWrapper>
  );
};
