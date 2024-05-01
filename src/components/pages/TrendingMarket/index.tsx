import React from "react";
import styled from "styled-components";
import { Search } from "../..";
import { NicheDisplay } from "./Niche/NicheDisplay";
import { Loader } from "../..";
import useCategories from "@root/src/hooks/useCategories";
import { useAuthContext } from "@root/src/context/AuthContext";
import { useClientRect } from "@root/src/utils/functions";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  max-height: 665px;
  width: 100%;
  background-color: #ffffff05;
  border-radius: 4px;
  height: calc(100% - 24px - 24px - 42px);
`;

export const Content = () => {
  const { categoriesLoading } = useCategories();
  const { userDetails } = useAuthContext();
  const [load, setLoad] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (userDetails) setLoad(false);
  }, [userDetails]);

  const {
    rect: { width },
    ref,
  } = useClientRect();

  return (
    <>
      <Search />
      <Wrapper ref={ref}>
        {!categoriesLoading && !load ? (
          <NicheDisplay parentWidth={width} />
        ) : (
          <Loader height={150} width={150} />
        )}
      </Wrapper>
    </>
  );
};
