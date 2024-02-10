import styled from "styled-components";
import { Search } from "../";
import { Categories } from "./Categories";
import { NicheContent } from "./Niche/NicheContent";
import { NicheProvider } from "./Niche/NicheContext";
import { Loader } from "../";
import useCategories from "@root/src/hooks/use-categories";

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
  overflow: clip;
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  max-height: 665px;
  width: 100%;
  background-color: #ffffff05;
  border-radius: 4px;
`;

export const Content = () => {
  const { categoriesLoading } = useCategories();

  return (
    <NicheProvider>
      <ContentWrapper>
        <Search />
        <Wrapper>
          {categoriesLoading ? (
            <Loader height={150} width={150} />
          ) : (
            <>
              <Categories />
              <NicheContent />
            </>
          )}
        </Wrapper>
      </ContentWrapper>
    </NicheProvider>
  );
};
