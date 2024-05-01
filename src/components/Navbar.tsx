import React from "react";
import styled from "styled-components";
import { NavItems } from "./NavItems";
import { navItems } from "../utils/navItems";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguageContext } from "../context/LanguageContext";
import { LanguageSwitcher } from ".";
import { useAuthContext } from "../context/AuthContext";
import ClickAwayListener from "react-click-away-listener";
import img1 from "@assets/images/avatars/base1.png";
import img2 from "@assets/images/avatars/base2.png";
import img3 from "@assets/images/avatars/base3.png";
import img4 from "@assets/images/avatars/base4.png";
import img5 from "@assets/images/avatars/base5.png";

const NavWrapper = styled.div`
  font-size: 14px;
  padding: 12px 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  height: 100%;
  color: rgba(255, 255, 255, 0.72);
  background-color: #010519;
  overflow-y: scroll;
  @media screen and (max-width: 1200px) {
    height: calc(100% - 72px);
    position: fixed;
    bottom: 0;
    z-index: 100;
    left: 0;
  }
  @media screen and (max-width: 768px) {
    height: calc(100% - 53px);
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const Dropdown = styled.div`
  position: absolute;
  right: -8px;
  padding: 6px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 12px;
  top: -30px;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
    transition: 0.25s;
  }
`;

export const Navbar = ({ open }: { open?: boolean }) => {
  const [selected, setSelected] = React.useState<string | undefined>();
  let location = useLocation();
  const navigate = useNavigate();

  // Get current language
  const { lan } = useLanguageContext();

  const onSelect = (nav: string) => {
    navigate(nav);
  };

  // Get location from url and set on page load
  React.useEffect(() => {
    const getNavUrl = `/${location.pathname.split("/")[1]}`;
    setSelected(getNavUrl);
  }, [location]);

  if (!open) {
    return;
  }

  return (
    <NavWrapper className="w-[280px] min-w-[280px]">
      <div className="flex flex-col gap-y-[40px] pb-[46px] h-full">
        <div className="flex border-b border-[rgba(255,255,255,.04)] h-[48px] justify-between items-center">
          <div className="p-[13px]">{languageText[lan]}</div>
          <LanguageSwitcher />
        </div>
        <NavContainer>
          {navItems
            .filter((f) => f.position === "top")
            .map((nav, key) => {
              // @ts-ignore
              const navText = nav.text[lan];
              return (
                <div
                  key={key}
                  onClick={() => !nav.disabled && onSelect(nav.link)}
                >
                  <NavItems
                    selected={nav.link === selected}
                    icon={nav.icon}
                    text={navText}
                    link={nav.link}
                    disabled={nav.disabled}
                  />
                </div>
              );
            })}
        </NavContainer>
        <NavContainer>
          {navItems
            .filter((f) => f.position === "bottom")
            .map((nav, key) => (
              <div key={key} onClick={() => onSelect(nav.link)}>
                <NavItems
                  selected={nav.link === selected}
                  icon={nav.icon}
                  // @ts-ignore
                  text={nav.text[lan]}
                  link={nav.link}
                />
              </div>
            ))}
        </NavContainer>
        <AuthComponent />
      </div>
    </NavWrapper>
  );
};

const AuthComponent = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { logout, userDetails } = useAuthContext();
  const { lan } = useLanguageContext();

  const getIcon = (i: number) => {
    let icon;
    switch (i) {
      case 1:
        icon = img1;
        break;
      case 2:
        icon = img2;
        break;
      case 3:
        icon = img3;
        break;
      case 4:
        icon = img4;
        break;
      case 5:
        icon = img5;
        break;
      default:
        icon = img1;
        break;
    }
    return icon;
  };

  return (
    <div className="relative mt-auto flex pb-4 gap-3 w-full items-center">
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Dropdown onClick={logout} className="">
            {logoutText[lan]}
          </Dropdown>
        </ClickAwayListener>
      )}
      <img
        src={getIcon(userDetails?.uicon)}
        className="object-cover w-9 h-9"
        alt="user avatar"
      />
      <div className="flex flex-col w-full overflow-hidden">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium ext-[#FFFFFFCC] capitalize">
            {userDetails?.fullName}
          </p>
          <p
            className="text-base cursor-pointer font-medium leading-[10px]"
            onClick={() => setOpen(!open)}
          >
            ...
          </p>
        </div>
        <p className="text-xs text-[#FFFFFF66] text-ellipsis overflow-hidden">
          {userDetails?.email}
        </p>
      </div>
    </div>
  );
};

const languageText: any = {
  en: "Language",
  fr: "Langue",
};
const logoutText: any = {
  en: "Logout",
  fr: "Se Déconnecter",
};
