import React from "react";
import styled from "styled-components";
import { CategoryButton } from "./CategoryButton";
import { useNavigate, useLocation } from "react-router-dom";
import useCategories from "@root/src/hooks/useCategories";
import { useWindowSize } from "usehooks-ts";

const CategoriesWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: scroll;
  border-right: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  @media screen and (min-width: 479px) {
    max-width: 300px;
  }
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

export const Categories = ({
  isSelected,
  parentWidth,
}: {
  isSelected?: any;
  parentWidth?: number;
}) => {
  const navigate = useNavigate();
  let location = useLocation();
  const { categories, categoriesLoading } = useCategories();

  const [active, setActive] = React.useState<string | number | undefined>();

  const handleSelected = (data: {
    name?: string;
    categoryId?: number;
    value?: string;
  }) => {
    setActive(data.categoryId);
    isSelected(true);
    navigate(`/trending-markets/${data.categoryId}`);
  };

  // Get niche from url and set on page load
  React.useMemo(() => {
    let getLocation = location.pathname.split("/")[2];
    getLocation && setActive(Number(getLocation));
  }, []);

  const { width } = useWindowSize();

  return (
    <CategoriesWrapper style={{ minWidth: width < 491 ? parentWidth : "auto" }}>
      <div className="w-full">
        <CategoryMapContainer>
          {!categoriesLoading &&
            categories.map((n, i) => {
              return (
                <div
                  className="w-full"
                  key={i}
                  onMouseEnter={() => handleSelected(n)}
                  onClick={() => handleSelected(n)}
                >
                  <CategoryButton
                    selected={n.categoryId === active}
                    item={n}
                    // icon={getNicheIcon.icon}
                  />
                </div>
              );
            })}
        </CategoryMapContainer>
      </div>
    </CategoriesWrapper>
  );
};
