import React from "react";
import styled from "styled-components";
import { useAuthContext } from "@root/src/context/AuthContext";
import { Layout } from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { NicheSearch } from "@components/pages/TrendingMarket/Niche/NicheSearch";
import { Search } from "@components/Search";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  max-height: 665px;
  width: 100%;
  background-color: #ffffff05;
  border-radius: 4px;
`;

export const SearchPage = () => {
  const { userDetails } = useAuthContext();

  // Reroute to subscription if user in no subscribed
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userDetails && !userDetails?.subscription) {
      navigate("/settings", { state: { tab: "subscription" } });
    }
  }, [userDetails]);

  return (
    <Layout
      children={
        <>
          <Search />
          <Wrapper>
            <NicheSearch />
          </Wrapper>
        </>
      }
    />
  );
};
