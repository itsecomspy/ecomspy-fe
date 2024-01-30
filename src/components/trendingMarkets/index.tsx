import styled from "styled-components";
import { Search } from "../";
import { Categories } from "./Categories";
import { NicheContent } from "./NicheContent";
import { NicheProvider } from "./NicheContext";

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  height: 100%;
  max-height: 778px;
`;

export const Content = () => {
  return (
    <NicheProvider>
      <ContentWrapper>
        <Search />
        <Categories />
        <NicheContent />
      </ContentWrapper>
    </NicheProvider>
  );
};
