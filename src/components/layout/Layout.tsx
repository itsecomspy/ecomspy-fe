import React from "react";
import logo from "@assets/ecom-logo.png";
import styled from "styled-components";
import { GoNorthStar } from "react-icons/go";
import { Button, Navbar, Header } from "../";

const LayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  background-color: #010519;
  display: flex;
`;

const HeaderWrapper = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="max-w-[1304px] mx-auto h-full pb-[46px] overflow-clip">
      <HeaderWrapper>
        <div className="gap-x-[8px] items-center flex text-[rgba(255,255,255,.72)]">
          <img src={logo} width={32} alt="ecomspy logo" />
          <div className="text-[14px] font-medium">ECOMSPY</div>
        </div>
        <Button icon={<GoNorthStar fontSize={14} />} text="button" />
      </HeaderWrapper>
      <LayoutWrapper>
        <Navbar />
        <div className="pt-[12px] pl-[24px] pb-[24px] w-full">
          <Header />
          {children}
        </div>
      </LayoutWrapper>
    </div>
  );
};
