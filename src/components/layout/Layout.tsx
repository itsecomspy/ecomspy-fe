import React from "react";
import logo from "@assets/ecom-logo.png";
import styled from "styled-components";
import { Navbar, Heading, Loader } from "../";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@root/src/context/AuthContext";
import { PiList } from "react-icons/pi";
import { useWindowSize } from "usehooks-ts";

const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  overflow: clip;
  min-height: 100vh;
  height: 100vh;
  @media (max-height: 512px) and (max-width: 1024px) {
    overflow-y: scroll;
    max-height: 100%;
    height: 100%;
  }
`;

const LayoutWrapper = styled.div`
  height: calc(100% - 72.16px);
  width: 100%;
  margin: auto;
  background-color: #010519;
  display: flex;
  @media screen and (max-width: 479px) {
    padding-top: 53px;
    height: 100%;
    overflow-y: clip;
  }
`;

const HeaderWrapper = styled.div`
  padding: 16px;
  padding-right: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  z-index: 100;
  background-color: #010519;
  @media screen and (max-width: 768px) {
    padding: 8px 16px;
  }
  @media screen and (max-width: 479px) {
    position: fixed;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 24px 0;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  height: 100%;
  max-height: 778px;
  overflow: clip;
  @media screen and (max-width: 479px) {
    padding: 0;
    max-height: 100%;
    gap: 0px;
  }
  @media (max-height: 512px) and (max-width: 1024px) {
    padding: 24px 24px;
    max-height: 100%;
    min-height: 100vh;
  }
`;

const LogoLink = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.72);
  position: relative;
  z-index: -1;
  width: 100%;
  @media (max-width: 1200px) {
    position: absolute;
    left: 0;
    justify-content: center;
    img {
      padding: 0;
    }
  }
`;

export const Layout = ({
  children,
  header,
}: {
  children?: React.ReactNode;
  header?: string | any;
}) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Handle wait for user auth
  const [load, setLoad] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (user === 0) {
      navigate("/login");
    } else {
      setLoad(false);
    }
  }, [user]);

  // Set handler for open/close-ing mobile navbar
  const [open, setOpen] = React.useState<boolean>(false);
  const { width = 0 } = useWindowSize();
  React.useEffect(() => setOpen(false), [width]);

  React.useEffect(() => {
    const updateDocument = (style: string) => {
      if (width < 479) {
        document.documentElement.style.overflowY = style;
        document.body.style.overflowY = style;
      }
    };
    updateDocument("clip");
    return () => updateDocument("auto");
  }, [width]);

  if (load) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader compact height={150} width={150} />
      </div>
    );
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        {width <= 1200 && (
          <div
            onClick={() => setOpen(!open)}
            className="p-2 border-2 border-[#FFFFFF1A] rounded-[8px] cursor-pointer"
          >
            <PiList fontSize={16} />
          </div>
        )}
        <LogoLink>
          <Link to={"/"}>
            <img
              src={logo}
              className="w-[150px] relative top-1"
              alt="ecomspy logo"
            />
          </Link>
        </LogoLink>
      </HeaderWrapper>
      <LayoutWrapper>
        <Navbar open={width > 1200 ? true : open} />
        <div className="md:pt-[12px] md:pl-[24px] md:pb-[24px] mb:pr-[16px] w-full flex flex-col overflow-clip">
          {open && width < 1024 && (
            <div
              onClick={() => setOpen(false)}
              className="absolute z-10 inset-0 h-full w-full bg-[rgba(0,0,0,0.5)]"
            />
          )}
          {width > 1024 && <Heading header={header} />}
          <ContentWrapper>{children}</ContentWrapper>
        </div>
      </LayoutWrapper>
    </Wrapper>
  );
};
