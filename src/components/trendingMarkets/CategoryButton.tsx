import styled from "styled-components";

const CategoryButtonWrapper = styled.div<{
  $selected?: boolean;
}>`
  border-radius: 1000px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  display: flex;
  padding: 8px 12px;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  max-height: 36px;
  text-transform: capitalize;
  &:hover {
    transition: 0.25s;
    background-color: rgba(255, 255, 255, 0.02);
  }
  ${(props) =>
    props.$selected
      ? `
      background-color: rgba(255,255,255,.4);
      transition: .25s;
      &:hover {
        background-color: rgba(255,255,255,.4);
      }`
      : ""};
`;

interface CategoryButtonProps {
  icon: React.ReactElement;
  text: string;
  selected?: boolean;
}

export const CategoryButton = ({
  icon,
  text,
  selected,
}: CategoryButtonProps) => {
  return (
    <CategoryButtonWrapper $selected={selected}>
      {icon}
      {text}
    </CategoryButtonWrapper>
  );
};
