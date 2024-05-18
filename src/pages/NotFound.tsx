import { Button } from "@components/Button";
import { LandingLayout } from "../components/layout/LandingLayout";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const { lan } = useLanguageContext();
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <div className="h-[75vh] flex flex-col items-center justify-center gap-[8px]">
        <p className="text-3xl font-medium">{notFoundText[lan]}</p>
        <p className="font-light text-[15px] text-[#FFFFFFB8] mb-8">
          {redirectText[lan]}
        </p>
        <Button text={buttonText[lan]} action={() => navigate("/")} />
      </div>
    </LandingLayout>
  );
};

const notFoundText: any = {
  en: "404 Error Page",
  fr: "Page d'erreur 404",
};
const redirectText: any = {
  en: "Oops! The requested URL was not found.",
  fr: "Oops! L'URL demandée n'a pas été trouvée.",
};
const buttonText: any = {
  en: "Back Home",
  fr: "Retour d'accueil",
};
