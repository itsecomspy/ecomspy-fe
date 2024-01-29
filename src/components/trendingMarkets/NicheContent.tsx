import styled from "styled-components";
import { useLocation } from "react-router-dom";

const NicheWrapper = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  width: 100%;
  height: 500px;
`;

export const NicheContent = () => {
  let location = useLocation();
  let locationText = location.pathname.split("/")[2];
  let headerText = locationText?.replaceAll("-", " ");

  // Use context to get Niches

  return (
    <NicheWrapper>
      <div className="capitalize">{headerText}</div>
      <div>Niche goes here</div>
    </NicheWrapper>
  );
};
