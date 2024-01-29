import React from "react";
import styled from "styled-components";
import { NavItems } from "./NavItems";
import { navItems } from "../utils/navItems";
import { useLocation, useNavigate } from "react-router-dom";

const NavWrapper = styled.div`
  font-size: 14px;
  padding: 12px 24px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  height: 100%;
  color: rgba(255, 255, 255, 0.72);
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Navbar = () => {
  const [selected, setSelected] = React.useState<string | undefined>();
  let location = useLocation();
  const navigate = useNavigate();

  const onSelect = (nav: string) => {
    navigate(nav);
  };

  // Get location from url and set on page load
  React.useEffect(() => {
    setSelected(location.pathname);
  }, [selected]);

  return (
    <NavWrapper className="w-[280px] min-w-[280px]">
      <div className="flex flex-col gap-y-[40px]">
        <div className="p-[13px] border-b border-[rgba(255,255,255,.04)] h-[48px]">
          Language
        </div>
        <NavContainer>
          {navItems
            .filter((f) => f.position === "top")
            .map((nav, key) => (
              <div key={key} onClick={() => onSelect(nav.link)}>
                <NavItems
                  selected={nav.link === selected}
                  icon={nav.icon}
                  text={nav.text}
                  link={nav.link}
                />
              </div>
            ))}
        </NavContainer>
        <NavContainer>
          {navItems
            .filter((f) => f.position === "bottom")
            .map((nav, key) => (
              <div key={key} onClick={() => onSelect(nav.link)}>
                <NavItems
                  selected={nav.link === selected}
                  icon={nav.icon}
                  text={nav.text}
                  // link={nav.text}
                />
              </div>
            ))}
        </NavContainer>
      </div>
    </NavWrapper>
  );
};
