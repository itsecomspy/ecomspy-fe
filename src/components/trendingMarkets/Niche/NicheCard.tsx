import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: linear-gradient(
    149deg,
    rgba(255, 255, 255, 0.16) 11.23%,
    rgba(255, 255, 255, 0) 109.72%
  );
`;

interface NicheCardProps {
  icon: React.ReactElement;
  text: string;
  id: string;
  parentId: string;
}

export const NicheCard = ({
  icon,
  text,
  id,
  parentId,
}: NicheCardProps) => {
  const navigate = useNavigate();

  return (
    <NicheCardWrapper
      onClick={() => navigate(`/trending-markets/${parentId}/${id}`)}
    >
      <IconWrapper>{icon}</IconWrapper>
      <div className="flex flex-col gap-[8px]">
        <p className="py-[2px] text-[14px] text-white">{text}</p>
      </div>
    </NicheCardWrapper>
  );
};
