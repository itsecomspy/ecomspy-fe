import React from "react";
import styled from "styled-components";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { CategoryButton } from "./CategoryButton";
import { IoMenuOutline } from "react-icons/io5";
import { niches } from "../../utils/niches";
import { useNavigate, useLocation } from "react-router-dom";
import { useNicheContext } from "./NicheContext";
import { useLanguageContext } from "@/context/LanguageContext";

const CategoriesWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const ArrowWrapper = styled.div`
  cursor: pointer;
  height: 36px;
  width: 36px;
  min-height: 36px;
  min-width: 36px;
  border-radius: 50%;
  border: 1px solid rgba(244, 244, 244, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    transition: 0.25s;
    background-color: rgba(255, 255, 255, 0.04);
  }
`;

const HrBorder = styled.div`
  height: 16px;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
`;

const CategoryMapContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  overflow-y: clip;
  align-items: flex-start;
  top: 0px;
  right: -20px;
  left: 0px;
  bottom: -20px;
  position: absolute;
  column-gap: 16px;
  width: 100%;
`;

export const Categories = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const { setData } = useNicheContext();

  // Get language from context
  const { lan } = useLanguageContext();

  const [active, setActive] = React.useState<string | undefined>("");

  const handleSelected = (data: {
    name?: object;
    icon?: React.ReactElement;
    id?: string;
    items?: object[];
  }) => {
    setData(data);
    setActive(data.id);
    navigate(`/trending-markets/${data.id}`);
  };

  // Get niche from url and set on page load
  React.useMemo(() => {
    let getLocation = location.pathname.split("/")[2];
    getLocation && setActive(getLocation);
  }, [location]);

  // Set All Categories on page load
  React.useMemo(() => {
    setActive("");
  }, []);

  return (
    <CategoriesWrapper>
      <ArrowWrapper>
        <HiArrowLeft color="rgba(255, 255, 255, .72)" fontSize={16} />
      </ArrowWrapper>
      <HrBorder />
      <div onClick={() => handleSelected({ id: "" })}>
        <CategoryButton
          selected={active === ""}
          text="All Categories"
          icon={<IoMenuOutline fontSize={16} />}
        />
      </div>
      <HrBorder />
      <div className="w-full h-[36px] max-w-[608px] relative overflow-hidden">
        <CategoryMapContainer>
          {niches.map((n, i) => (
            <div key={i} onClick={() => handleSelected(n)}>
              <CategoryButton
                selected={n.id === active}
                // @ts-ignore
                text={n.name[lan]}
                icon={n.icon}
              />
            </div>
          ))}
        </CategoryMapContainer>
      </div>
      <HrBorder />
      <ArrowWrapper>
        <HiArrowRight color="rgba(255, 255, 255, .72)" fontSize={16} />
      </ArrowWrapper>
    </CategoriesWrapper>
  );
};
