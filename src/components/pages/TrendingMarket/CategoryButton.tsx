import React from "react";
import styled from "styled-components";
import { categoryIcons } from "@/utils/icons";
import useCategories from "@root/src/hooks/useCategories";
import { Tooltip } from "../..";
import { useLanguageContext } from "@root/src/context/LanguageContext";

const CategoryButtonWrapper = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  position: relative;
  height: 75px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  display: flex;
  padding: 8px 24px;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  white-space: nowrap;
  text-transform: capitalize;
  align-items: center;
  &:hover {
    transition: 0.25s;
    background-color: rgba(255, 255, 255, 0.02);
  }
  ${(props) =>
    props.$disabled
      ? `
      cursor: auto;
      background-color: rgba(255, 255, 255, 0.02);
      color: rgba(255, 255, 255, 0.3);
      transition: .25s;`
      : ``};
  ${(props) =>
    props.$selected
      ? `
      background-color: rgba(255,255,255,.075);
      transition: .25s;
      &:hover {
        background-color: rgba(255,255,255,.075);
      }`
      : ""};

  img {
    filter: brightness(0) invert(1);
    width: 22px;
    height: 22px;
  }
`;

const NumberWrapper = styled.div`
  display: flex;
  padding: 4px 8px;
  align-items: flex-start;
  gap: 8px;
  border-radius: var(--Radius-radius-full, 100px);
  background: #000;
  color: rgba(255, 255, 255, 0.72);
  font-size: 12px;
  position: absolute;
  max-width: 56px;
  max-height: 24px;
  height: 100%;
  right: 0;
  margin-right: 24px;
  width: max-content;
`;

interface CategoryButtonProps {
  item: any;
  selected?: boolean;
  disabled?: boolean;
}

const getNicheIcon = (id: number) =>
  categoryIcons.filter((fil) => fil.id === id)[0];

export const CategoryButton = ({
  item,
  selected,
  disabled,
}: CategoryButtonProps) => {
  const { getCategoryCount } = useCategories();
  const [count, setCount] = React.useState<number>(0);
  const { lan } = useLanguageContext();
  const icon = getNicheIcon(item.categoryId);

  React.useMemo(() => {
    if (count === 0) {
      item.niches?.forEach(async (n: { nicheId: any }) => {
        const res = await getCategoryCount(n);
        setCount((prev: number) => prev + res);
      });
    }
  }, []);

  return (
    <CategoryButtonWrapper $disabled={disabled} $selected={selected}>
      {icon?.icon && (
        <img className={disabled ? "opacity-30" : ""} src={icon?.icon} width={20} />
      )}
      {item.title}
      {disabled ? (
        <div className="ml-auto">
          <Tooltip position="right" arrow={false} text={comingText[lan]} />
        </div>
      ) : (
        count !== 0 && <NumberWrapper>{count * 6}</NumberWrapper>
      )}
    </CategoryButtonWrapper>
  );
};

const comingText: any = {
  en: "Coming Soon",
  fr: "À venir",
};
