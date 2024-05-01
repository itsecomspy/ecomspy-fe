import React from "react";
import { PiQuestion } from "react-icons/pi";
import styled from "styled-components";

const TooltipWrapper = styled.div<{
  $arrow?: boolean;
  $position?: "left" | "right";
  $top?: string;
  $right?: string;
  $left?: string;
  $bottom?: string;
}>`
  position: relative;
  & .tooltip-text {
    position: absolute;
    width: max-content;
    max-width: 200px;
    font-size: 12px;
    z-index: 10;
    color: rgba(255, 255, 255, 0.72);
    background: #010519;
    padding: 12px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

    ${(props) =>
      props.$position === "right"
        ? `
        right: 100%;
        top: -12px;
        `
        : `
        left: 0px;
        top: 24px;
        right: 0;
        `}
    ${(props) =>
      props.$arrow
        ? `
      left: -100px;
        &:after {
          content: "◀";
          z-index: 10;
          position: absolute;
          left: -12px;
          top: -8px;
          color: #010519;
          font-size: 20px;
          transform: rotate(90deg);
          height: 20px;
          width: 20px;
          left: 102px;
          `
        : ``}
      }
      ${(props) => (props.$top ? `top: ${props.$top};` : "")}
      ${(props) => (props.$right ? `right: ${props.$right};` : "")}
      ${(props) => (props.$left ? `left: ${props.$left};` : "")}
      ${(props) => (props.$bottom ? `bottom: ${props.$bottom};` : "")}
  }
`;

export const Tooltip = ({
  text,
  arrow = true,
  position = "left",
  top,
  right,
  left,
  bottom,
}: {
  text: string;
  arrow?: boolean;
  position?: "left" | "right";
  top?: string;
  right?: string;
  left?: string;
  bottom?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipWrapper
      $top={top}
      $right={right}
      $left={left}
      $bottom={bottom}
      $position={position}
      $arrow={arrow}
    >
      <div
        onMouseOver={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <PiQuestion fontSize={16} />
      </div>
      {open && <div className="tooltip-text">{text}</div>}
    </TooltipWrapper>
  );
};
