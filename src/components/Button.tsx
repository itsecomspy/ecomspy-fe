import * as React from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const ButtonWrapper = styled.button<{
  $backgroundColor?: string;
  $color?: string;
  $icon?: boolean;
  $iconBefore?: boolean;
  $height?: number;
  $border?: string;
  $disable?: boolean;
  $full?: boolean;
  $size?: "large" | "small";
}>`
  position: relative;
  width: ${(props) => (props.$full ? "100%" : "auto")};
  height: ${(props) => (props.$height ? `${props.$height}px` : "auto")};
  background: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor
      : "linear-gradient(109.62deg, #2D55FB 33.2%, rgba(173, 2, 215, 0.4) 124.3%)"};
  color: ${(props) => (props.$color ? props.$color : "white")};
  column-gap: ${(props) => (props.$icon || props.$iconBefore ? "8px" : "0px")};
  border-radius: 1000px;
  border: ${(props) => (props.$border ? props.$border : "none")};
  padding: ${(props) => (props.$size === "small" ? "8px 16px" : "16px 32px")};
  font-size: ${(props) => (props.$size === "small" ? "12px" : "16px")};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.$disable
      ? `
      pointer-events: none;
      cursor: auto;
      opacity: .25;

    `
      : ``}
  &:hover {
    transition: 0.25s;
    opacity: 0.75;
  }
`;

const ColorLoader = ({ size }: { size: "small" | "large" }) => (
  <Oval
    visible={true}
    color="white"
    secondaryColor="black"
    strokeWidth={size == "small" ? 6 : 4}
    ariaLabel="oval-loading"
    wrapperStyle={{
      height: "100%",
      width: size == "small" ? "25px" : "40px",
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0 auto",
      inset: "0",
    }}
  />
);

interface ButtonProps {
  text: string | React.ReactElement;
  icon?: React.ReactElement;
  iconBefore?: React.ReactElement;
  color?: string;
  backgroundColor?: string;
  action?: (arg0: any) => void;
  height?: number;
  border?: string;
  disable?: boolean;
  full?: boolean;
  size?: "large" | "small";
  loading?: boolean;
}

export const Button = ({
  text,
  icon,
  iconBefore,
  color,
  backgroundColor,
  action,
  height,
  border,
  disable,
  full,
  size = "small",
  loading = false,
}: ButtonProps) => {
  return (
    <ButtonWrapper
      onClick={action}
      $color={color}
      $backgroundColor={backgroundColor}
      $icon={!!icon}
      $iconBefore={!!iconBefore}
      $height={height}
      $border={border}
      $disable={disable || loading}
      $full={full}
      $size={size}
    >
      {loading && <ColorLoader size={size} />}
      {iconBefore && iconBefore}
      {text}
      {icon && icon}
    </ButtonWrapper>
  );
};
