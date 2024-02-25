import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import { useNicheContext } from "./NicheContext";
import { useSetAtom } from "jotai";
import { nicheAtom } from "@root/src/main.atom";
import { nicheIcons } from "@root/src/utils/icons";

const NicheCardWrapper = styled.div`
  border-radius: 4px;
  border: 0.5px solid rgba(255, 255, 255, 0.12);
  display: flex;
  padding: 24px;
  align-items: flex-start;
  gap: 12px;
  flex-basis: calc(50% - 12px);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  background: linear-gradient(
    149deg,
    rgba(255, 255, 255, 0.16) 11.23%,
    rgba(255, 255, 255, 0) 109.72%
  );
  img {
    filter: brightness(0) invert(1);
    width: 22px;
    height: 22px;
  }
`;

interface NicheCardProps {
  text: string;
  id: number;
  value: string;
  parentId?: string;
  isParent?: boolean;
}

export const NicheCard = ({
  text,
  id,
  value,
  parentId,
  isParent,
}: NicheCardProps) => {
  const navigate = useNavigate();
  const setNicheAtomData = useSetAtom(nicheAtom);

  // Filter niche icon from icons list using niche ID
  const getNicheIcon = nicheIcons.filter((fil) => fil.id === id)[0];

  return (
    <NicheCardWrapper
      onClick={() => {
        setNicheAtomData({ id });
        navigate(
          isParent
            ? `/trending-markets/${value}`
            : `/trending-markets/${parentId}/${value}`
        );
      }}
    >
      <IconWrapper>
        <img src={getNicheIcon.icon} />
      </IconWrapper>
      <div className="flex flex-col gap-[8px]">
        <p className="py-[2px] text-[14px] text-white">{text}</p>
      </div>
    </NicheCardWrapper>
  );
};
