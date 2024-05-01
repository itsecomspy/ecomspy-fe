import React from "react";
import styled from "styled-components";
import { Header, Footer } from "../";

const LayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: #010519;
  max-width: 1304px;
  @media screen and (max-width: 1400px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

export const LandingLayout = ({ children }: { children?: React.ReactNode }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LayoutWrapper>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </LayoutWrapper>
  );
};
