import React from "react";
import styled from "styled-components";
import { PiCaretDown } from "react-icons/pi";
import { useLanguageContext } from "../context/LanguageContext";
import ClickAwayListener from "react-click-away-listener";
import en from "@assets/images/en.png";
import fr from "@assets/images/fr.png";
import { setWithExpiry } from "../utils/functions";

const HeaderWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  border-radius: 8px;
  width: max-content;
  background: #ffffff09;
`;

const LanguageDropdown = styled.div<{
  $bottom?: boolean;
}>`
  position: absolute;
  right: 0;
  top: 42px;
  ${(props) =>
    props.$bottom
      ? `
  top: initial;
  bottom: 42px;
  `
      : ``}
  border-radius: 4px;
  height: auto;
  width: max-content;
  padding: 8px;
  background: #101427;
  border: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  gap: 12px;
  hr {
    border: 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.06);
  }
`;

const items: any = {
  en: {
    icon: en,
    text: "EN",
    value: "en",
  },
  fr: {
    icon: fr,
    text: "FR",
    value: "fr",
  },
};

export const LanguageSwitcher = ({ bottom }: { bottom?: boolean }) => {
  const { lan, setLan } = useLanguageContext();
  const [open, setOpen] = React.useState<boolean>(false);

  const onLanguageChange = (val: "en" | "fr") => {
    setLan(val);
    setOpen(false);
    // Save FreeTrial value
    setWithExpiry({ key: "lan", value: val, ttl: "" });
  };

  return (
    <HeaderWrapper>
      <div className="relative flex gap-[36px] items-center">
        <div
          onClick={() => setOpen(!open)}
          className="gap-2 flex items-center p-2 cursor-pointer border-[#FFFFFF1A] rounded-lg"
        >
          <img
            src={items[lan].icon}
            alt={`${items[lan].text} language icon`}
            width={24}
            className="max-h-[14.75px]"
          />
          <PiCaretDown fontSize={16} />
        </div>
        {open && (
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <LanguageDropdown $bottom={bottom}>
              {Object.values(items).map((i: any, k) => (
                <div key={k}>
                  <div
                    onClick={() => onLanguageChange(i.value)}
                    className="flex gap-4 p-1 cursor-pointer"
                  >
                    <img src={i.icon} width={20} className="h-[14px]" />
                    <p className="text-xs font-bold">{i.text}</p>
                  </div>
                  {Object.values(items).length !== k + 1 && <hr />}
                </div>
              ))}
            </LanguageDropdown>
          </ClickAwayListener>
        )}
      </div>
    </HeaderWrapper>
  );
};
