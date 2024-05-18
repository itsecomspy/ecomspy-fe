import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";
import tempImg from "@assets/images/landing/mock.png";
import pattern from "@assets/images/landing/landing-pattern.png";
import avatar from "@assets/images/landing/imageUsers.png";
import { useLanguageContext } from "@root/src/context/LanguageContext";

export const Landing = () => {
  const navigate = useNavigate();
  const { lan } = useLanguageContext();

  return (
    <div className="py-[64px] lg:py-[104px] flex flex-col w-full gap-[60px] lg:gap-[80px]">
      <div className="relative z-10 text-center flex flex-col items-center">
        <p className="landing-text-color text-sm uppercase">{subtext[lan]}</p>
        <p className="px-2 text-h3 xs:text-display-2-md lg:text-display-2 max-w-[710px]">
          {headerText[lan]} <span className="landing-text-color">{clickText[lan]}</span>
        </p>
        <p className="max-w-[634px] text-[#FFFFFFB8] text-[19px] font-light mt-[12px] lg:mt-[24px] mb-[40px]">
          {bodyText[lan]}
        </p>
        <Button
          action={() => navigate("/plans")}
          size="large"
          text={buttonText[lan]}
        />
        <div className="flex flex-col text-center items-center mt-[40px] gap-2">
          <p className="uppercase text-sm text-[#FFFFFFB8]">
            {trustedText[lan]} {usersText[lan]}
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-2">
            <img
              src={avatar}
              alt="user avatar icons"
              className="w-[400px] h-full"
            />
          </div>
        </div>
      </div>
      {/* <div className="relative lg:static min-h-[607px] md:h-[883px]"> */}
      <img
        src={pattern}
        alt="landing page pattern overlay"
        className="absolute object-cover left-0 top-0 w-[150vw] h-[auto] object-left-top"
      />
      <div className="relative min-h-[367px] rounded-[16px] lg:border-8 border-[rgba(255,255,255,0.04)] md:h-[883px] lg:overflow-clip">
        <img
          src={tempImg}
          alt="demo image of ecomspy"
          className="absolute max-w-max h-full object-left object-cover"
        />
      </div>
    </div>
  );
};
const subtext: any = {
  en: "well ahead of the competition",
  fr: "bien avant la concurrence",
};
const headerText: any = {
  en: "Find your winning products in",
  fr: "Trouvez vos produits gagnants en",
};
const clickText: any = {
  en: "2 clicks",
  fr: "2 clics",
};
const bodyText: any = {
  en: "EcomSpy is an all-in-one solution designed to help you get started in e-commerce, increase your sales and boost your profits using AI.",
  fr: "EcomSpy est une solution tout-en-un, conçue pour vous aider à vous lancer en e-commerce, augmenter vos ventes et booster vos profits grâce à l'IA.",
};
const buttonText: any = {
  en: "Get Started",
  fr: "Commencer",
};
const trustedText: any = {
  en: "trusted by",
  fr: "approuvé par",
};
const usersText: any = {
  en: "+200,000 Ecommerce enthusiasts",
  fr: "+200,000 passionnés d'e-commerce",
};
