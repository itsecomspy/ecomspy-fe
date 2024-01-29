import React from "react";
import styled from "styled-components";

const NavItemWrapper = styled.div<{
  $selected?: boolean;
}>`
  border-radius: 4px;
  cursor: pointer;
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
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border: 1px inset rgba(255, 255, 255, 0.03);
      border-radius: 4px;
    }`
      : ``};
`;

const NavLink = styled.div`
  padding: 13px;
  display: flex;
  align-items: center;
  color: white;
  column-gap: 8px;
  text-transform: capitalize;
`;

interface NavItemProps {
  link?: string;
  text?: string;
  icon?: React.ReactElement;
  selected?: boolean;
  children?: React.ReactElement;
}

export const NavItems = ({
  text,
  icon,
  selected,
  children,
}: NavItemProps) => {
  return (
    <NavItemWrapper $selected={selected}>
      <NavLink>
        {icon}
        {text}
      </NavLink>
      {children && children}
    </NavItemWrapper>
  );
};
