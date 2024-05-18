import { useLanguageContext } from "@root/src/context/LanguageContext";
import card1 from "@assets/images/landing/markets/card-1.png";
import card2 from "@assets/images/landing/markets/card-2.png";
import card3 from "@assets/images/landing/markets/card-3.png";
import card1Fr from "@assets/images/landing/markets/card-1-fr.png";
import card2Fr from "@assets/images/landing/markets/card-2-fr.png";
import card3Fr from "@assets/images/landing/markets/card-3-fr.png";
import styled from "styled-components";
import pattern from "@assets/images/landing/landing-pattern.png";

const BgColor = styled.div`
  background-color: #0b0e22;
  height: 100%;
  width: 300vw;
  position: absolute;
  inset: 0;
  left: -100vw;
  z-index: 0;
`;

export const Growth = () => {
  const { lan } = useLanguageContext();

  return (
    <div className="relative py-[64px] lg:py-[104px] flex flex-col w-full">
      <BgColor />
      <img
        src={pattern}
        alt="landing page pattern overlay"
        className="absolute object-cover left-0 top-0 w-[100vw] h-[auto] object-left-top max-w-[200vw] z-10"
      />
      <div className="relative z-10 text-center flex flex-col items-center mb-[64px]">
        <p className="px-2 text-h4 lg:text-h2 lg:text-display-2">
          {title[lan][0]}{" "}
          <span className="landing-text-color">{title[lan][1]}</span>
        </p>
        <p className="max-w-[418px] font-light text-lg text-[#FFFFFFB8] mt-[16px]">
          {subTitle[lan]}
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center lg:flex-row gap-[24px]">
        <div className="max-w-[751px]">
          <img
            src={images.img1[lan]}
            className="w-full max-w-[529px] lg:max-w-full h-full max-h-[745px]"
          />
        </div>
        <div className="flex flex-col gap-[24px] min-w-[300px]">
          <img
            src={images.img2[lan]}
            className="w-full max-w-[529px] h-full max-h-[386.5px]"
          />
          <img
            src={images.img3[lan]}
            className="w-full max-w-[529px] h-full max-h-[386.5px]"
          />
        </div>
      </div>
    </div>
  );
};

const title: any = {
  en: {
    0: "Accelerate your",
    1: "growth",
  },
  fr: {
    0: "Accélerez votre",
    1: "croissance",
  },
};
const subTitle: any = {
  en: "Simplify your operations and increase your profits with the power of our AI",
  fr: "Simplifiez vos opérations et augmentez vos profits grâce à la puissance de notre IA",
};
const images: any = {
  img1: { en: card1, fr: card1Fr },
  img2: { en: card2, fr: card2Fr },
  img3: { en: card3, fr: card3Fr },
};
