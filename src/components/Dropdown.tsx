import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";

const DropdownWrapper = styled.div<{
  $width?: number;
}>`
  position: absolute;
  top: 40px;
  border-radius: 4px;
  min-height: 100%;
  max-height: 400px;
  min-width: 150px;
  overflow: scroll;
  padding: 16px;
  background: #101427;
  border: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${(props) => (props.$width ? props.$width : `100%`)}
`;

const DrowndownItem = styled.div`
  font-size: 14px;
  text-align: left;
  padding: 10px;
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
  &:hover {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    color: white;
  }
`;

interface DropdownProps {
  anchor?: string;
  width: string | number;
  items: object[];
  title: string;
  onSelect: (arg: any) => void;
  handleClose: () => void;
}

export const Dropdown = ({
  anchor,
  width,
  items,
  title,
  onSelect,
  handleClose,
}: DropdownProps) => {
  const handleSelect = (select: any) => {
    onSelect(select);
    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <DropdownWrapper
        onClick={(e) => e.stopPropagation()}
        className={`w-[${width}px] ${anchor ? `${anchor}-0` : "left-0"}`}
      >
        <p className="text-xs pb-4 uppercase border-b border-dashed border-[rgba(255,255,255,.06)]">
          {title}
        </p>
        {items.map((item: any, k: any) => (
          <DrowndownItem
            key={k}
            onClick={() =>
              handleSelect({
                id: item.id,
                text: item.text.en ? item.text.en : item.text,
              })
            }
          >
            {item.text.en ? item.text.en : item.text}
          </DrowndownItem>
        ))}
      </DropdownWrapper>
    </ClickAwayListener>
  );
};
