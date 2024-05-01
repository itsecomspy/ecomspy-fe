import React from "react";
import styled from "styled-components";
import { Tooltip } from ".";
import { useLanguageContext } from "../context/LanguageContext";

const NavItemWrapper = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
}>`
  padding: 13px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-betweem;
  align-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  ${(props) =>
    props.$selected
      ? `
    position: relative;
    background: rgba(255, 255, 255, 0.04);
    &:hover {
      background: rgba(255, 255, 255, 0.04);
    }
    &:before {
      left: 0;
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border: 1px inset rgba(255, 255, 255, 0.03);
      border-radius: 4px;
    }`
      : ``};
  ${(props) =>
    props.$disabled
      ? `
          cursor: auto;
          background: rgba(255,255,255,0.01);
          &:hover {
            background: rgba(255,255,255,0.01);
          }
          & button {
            color: rgba(255,255,255,.2);
            cursor: auto;
          }
        `
      : ``}
`;

const NavLink = styled.button<{}>`
  display: flex;
  align-items: center;
  color: white;
  column-gap: 8px;
  text-transform: capitalize;
  width: 100%;
`;

interface NavItemProps {
  link?: string;
  text?: string;
  icon?: React.ReactElement;
  selected?: boolean;
  disabled?: boolean;
}

export const NavItems = ({ text, icon, selected, disabled }: NavItemProps) => {
  const { lan } = useLanguageContext();

  return (
    <NavItemWrapper $disabled={disabled} $selected={selected}>
      <NavLink>
        {icon}
        {text}
      </NavLink>
      {disabled && <Tooltip position="right" arrow={false} text={comingText[lan]} />}
    </NavItemWrapper>
  );
};

const comingText: any = {
  en: "Coming Soon",
  fr: "À venir",
};
