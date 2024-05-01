import { useLanguageContext } from "@root/src/context/LanguageContext";
import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";
import avatar from "@assets/images/landing/imageUsers.png";
import pattern from "@assets/images/landing/landing-pattern.png";

export const InfoSection = () => {
  const { lan } = useLanguageContext();
  const navigate = useNavigate();
  return (
    <div className="relative py-[64px] lg:py-[104px] flex flex-col gap-[80px] w-full">
      <img
        src={pattern}
        alt="landing page pattern overlay"
        className="pointer-events-none absolute object-cover z-10 left-0 top-0 w-[100vw] h-[auto] object-left-top max-w-[200vw]"
      />
      <div className="text-center flex flex-col items-center">
        <p className="text-[15px] text-[#FFFFFFB8]">{subHeader[lan]}</p>
        <p className="text-display-2-md lg:text-display-2 lg:text-display-2 mb-10">
          {title[lan]}
        </p>
        <Button
          size="large"
          text={buttonText[lan]}
          action={() => navigate("/plans")}
        />
      </div>
      <div className="flex flex-col text-center items-center lg:mt-[20px] gap-2">
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
  );
};

const subHeader: any = {
  en: "12,824 e-commerce \n enthusiasts started with EcomSpy... last week",
  fr: "12,824 passionés d'e-commerce \n ont débuté avec EcomSpy... la semaine dernière",
};
const title: any = {
  en: "Now it's your turn!",
  fr: "Maintenant c'est ton tour!",
};
const buttonText: any = {
  en: "Get started",
  fr: "Démarrer",
};
const trustedText: any = {
  en: "trusted by",
  fr: "approuvé par",
};
const usersText: any = {
  en: "+200,000 Ecommerce enthusiasts",
  fr: "+200,000 passionnés d'e-commerce",
};
