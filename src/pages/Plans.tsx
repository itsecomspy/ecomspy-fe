import { LandingLayout } from "../components/layout/LandingLayout";
import { Plans as PlanComponent } from "@components/pages/Home";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import avatar from "@assets/images/landing/imageUsers.png";

export const Plans = () => {
  const { lan } = useLanguageContext();

  return (
    <LandingLayout>
      <PlanComponent />
      <div className="flex flex-col text-center items-center mb-[40px] gap-2">
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
    </LandingLayout>
  );
};

const trustedText: any = {
  en: "trusted by",
  fr: "approuvé par",
};
const usersText: any = {
  en: "+200,000 Ecommerce enthusiasts",
  fr: "+200,000 passionnes d'e-commerce",
};
