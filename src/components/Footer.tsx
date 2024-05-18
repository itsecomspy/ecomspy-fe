import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/ecom-logo.png";
import { useLanguageContext } from "../context/LanguageContext";
import styled from "styled-components";
import { Key } from "react";
import { LanguageSwitcher } from ".";

const FooterWrapper = styled.nav`
  display: flex;
  margin: auto;
  z-index: 1;
  justify-content: space-between;
  position: relative;
  padding: 64px 0 128px;
  @media screen and (max-width: 767px) {
    margin: auto;
    flex-direction: column;
    row-gap: 32px;
  }
`;

const navigation: any = [
  { item: { en: "Login", fr: "Se connecter" }, link: "/login" },
  { item: { en: "Register", fr: "Inscrivez-vous" }, link: "/register" },
  { item: { en: "Privacy Policy", fr: "Politique de Confidentialité" }, link: "/privacy" },
  { item: { en: "Terms Of Use", fr: "Conditions d'utilisation" }, link: "/terms" },
];
const page: any = [
  { item: { en: "Features", fr: "Fonctionnalités" }, ref: "#features" },
  { item: { en: "Prices", fr: "Prix" }, ref: "#prices" },
  { item: { en: "Spy Ads", fr: "Spy Ads" }, ref: "#spy-ads" },
  // { item: { en: "Free Trial", fr: "Essai Gratuit" }, ref: "/free-trial" },
  { item: { en: "Blog", fr: "Blog" }, ref: "/blog" },
];
const contact: any = [
  { item: "support@goecomspy.com", link: "mailto:support@goecomspy.com" },
  { item: "Instagram", link: "https://instagram.com/goecomspy" },
  { item: "Tiktok", link: "https://www.tiktok.com/@goecomspy" },
  { item: "Facebook", link: "https://www.facebook.com/ecomspy" },
];

export const Footer = () => {
  const { lan } = useLanguageContext();
  const navigate = useNavigate();

  return (
    <FooterWrapper>
      <div className="z-10 relative">
        <img
          onClick={() => navigate("/")}
          src={logo}
          width={150}
          className="relative left-[-14px] cursor-pointer"
          alt="ecomspy logo"
        />
        <p className="max-w-[450px] text-xs text-[#7F8190] mt-4 mb-6">
          {bodyText[lan]}
        </p>
        <LanguageSwitcher bottom />
      </div>
      <div className="z-10 relative flex flex-wrap gap-[64px]">
        <div className="md:ml-auto ml:mx-0 md:text-right lg:text-left">
          <p className="text-[15px] font-medium mb-4">{navigationText[lan]}</p>
          {navigation.map((i: any, k: Key) => (
            <Link key={k} to={i.link}>
              <p className="text-sm mb-4 text-[#7F8190]">{i.item[lan]}</p>
            </Link>
          ))}
        </div>
        <div className="md:text-right lg:text-left">
          <p className="text-[15px] font-medium mb-4">{accessText[lan]}</p>
          {page.map((i: any, k: Key) => (
            <a key={k} href={i.ref}>
              <p className="text-sm mb-4 text-[#7F8190]">{i.item[lan]}</p>
            </a>
          ))}
        </div>
        <div className="md:ml-auto ml:mx-0 md:text-right lg:text-left">
          <p className="text-[15px] font-medium mb-4">{contactText[lan]}</p>
          {contact.map((i: any, k: Key) => (
            <a key={k} href={i.link} target="_blank">
              <p className="text-sm mb-4 text-[#7F8190]">{i.item}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="absolute flex flex-col lg:flex-row justify-between py-[32px] bottom-0 w-full border-t-[.5px] border-[rgba(255,255,255,25%)]">
        <p className="text-[10px] lg:text-xs text-[#7F8190] text-center">
          Goecomspy.com - First AI tool aiming for profit, not bullshit.
        </p>
        <p className="text-[10px] lg:text-xs text-[#7F8190] text-center">
          &copy; 2029 (because we come from the future) - All Rights Reserved
        </p>
      </div>
    </FooterWrapper>
  );
};

const navigationText: any = {
  en: "Navigation",
  fr: "Navigation",
};
const accessText: any = {
  en: "Quick Access",
  fr: "Accès rapide",
};
const contactText: any = {
  en: "Contact Us",
  fr: "Nous Contacter",
};
const bodyText: any = {
  en: "EcomSpy is an all-in-one solution designed to help you get started in e-commerce, increase your sales and boost your profits using AI.",
  fr: "EcomSpy est une solution tout-en-un, conçue pour vous aider à vous lancer en e-commerce, augmenter vos ventes et booster vos profits grâce à l'IA.",
};
