import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";
import { Tooltip } from ".";
import { useAuthContext } from "../context/AuthContext";
import { useLanguageContext } from "../context/LanguageContext";

const DropdownWrapper = styled.div<{
  $width?: number;
  $side?: "left" | "right";
}>`
  position: absolute;
  top: 40px;
  border-radius: 4px;
  min-height: 100%;
  max-height: 500px;
  min-width: 200px;
  padding: 16px;
  background: #101427;
  border: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  ${(props) => (props.$side === "right" ? "right: 0;" : "left: 0;")}
  ${(props) => (props.$width ? props.$width : `100%`)};
  hr {
    border: 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
  }
`;

const DrowndownItem = styled.div<{
  $disabled?: boolean;
}>`
  font-size: 14px;
  text-align: left;
  padding: 10px;
  color: ${(props) =>
    props.$disabled ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.72)"};
  cursor: ${(props) => (props.$disabled ? "auto" : "pointer")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.04);
    color: ${(props) =>
      props.$disabled ? "rgba(255, 255, 255, 0.3)" : "white"};
  }
`;

interface DropdownProps {
  side?: "left" | "right";
  width: string | number;
  items: object[];
  title?: string;
  onSelect: (arg: any) => void;
  handleClose: () => void;
}

export const Dropdown = ({
  side,
  width,
  items,
  title,
  onSelect,
  handleClose,
}: DropdownProps) => {
  const handleSelect = (val: string | number) => {
    onSelect(val);
    handleClose();
  };

  const { userDetails = {} } = useAuthContext();
  const subscription = userDetails?.subscription;
  const { lan } = useLanguageContext();

  return (
    <ClickAwayListener onClickAway={() => handleClose()}>
      <DropdownWrapper
        $side={side}
        onClick={(e) => e.stopPropagation()}
        className={`w-full z-10 sm:w-[${width}px] right-0`}
      >
        <p className="text-xs pb-4 uppercase border-b border-dashed border-[rgba(255,255,255,.06)]">
          {title}
        </p>
        {items.map((item: any, k: any) => {
          const isSubscriptionBusiness =
            !!item.hidden &&
            (subscription?.planId === 3 || subscription?.planId === 2);
          return (
            <>
              <DrowndownItem
                $disabled={!isSubscriptionBusiness && !!item.hidden}
                key={k}
                onClick={() =>
                  (!item.hidden || isSubscriptionBusiness) &&
                  handleSelect(item.value)
                }
              >
                {item.text?.[lan] || item.text}
                {item?.info && !isSubscriptionBusiness && (
                  <Tooltip
                    left="-175px"
                    text={item?.hidden ? item?.hidden[lan] : item?.info[lan]}
                  />
                )}
              </DrowndownItem>
              {item.id === 0 && <hr />}
            </>
          );
        })}
      </DropdownWrapper>
    </ClickAwayListener>
  );
};
