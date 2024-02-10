import styled from "styled-components";

const CategoryButtonWrapper = styled.div<{
  $selected?: boolean;
}>`
  height: 75px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  display: flex;
  padding: 8px 24px;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  white-space: nowrap;
  text-transform: capitalize;
  &:hover {
    transition: 0.25s;
    background-color: rgba(255, 255, 255, 0.02);
  }
  ${(props) =>
    props.$selected
      ? `
      background-color: rgba(255,255,255,.075);
      transition: .25s;
      &:hover {
        background-color: rgba(255,255,255,.075);
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
