import * as React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button<{
  $backgroundColor?: string;
  $color?: string;
  $icon?: boolean;
}>`
  height: 32px;
  background: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor
      : "linear-gradient(109.62deg, #2D55FB 33.2%, rgba(173, 2, 215, 0.4) 124.3%)"};
  color: ${(props) => (props.$color ? props.$color : "white")};
  column-gap: ${(props) => (props.$icon ? "8px" : "0px")};
  border-radius: 4px;
  padding: 0 12px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    transition: .25s;
    opacity: .75;
  }
`;

interface ButtonProps {
  text: string;
  icon?: React.ReactElement;
  color?: string;
  backgroundColor?: string;
  action?: (arg0: any) => void;
}

export const Button = ({
  text,
  icon,
  color,
  backgroundColor,
  action,
}: ButtonProps) => {
  return (
    <ButtonWrapper
      onClick={action}
      $color={color}
      $backgroundColor={backgroundColor}
      $icon={!!icon}
    >
      {icon && icon}
      {text}
    </ButtonWrapper>
  );
};
