import { useLanguageContext } from "@root/src/context/LanguageContext";
import { privacy } from "@root/src/utils/privacyAndTerms";
import { Key } from "react";

export const PrivacyPage = () => {
  const { lan } = useLanguageContext();

  return (
    <div>
      <p className="my-20 text-display-2-md lg:text-display-2">
        {titleText[lan]}
      </p>
      {privacy[lan].map((text: any, k: Key) => (
        <div key={k} className="whitespace-pre-line">
          <p className="mb-4 text-2xl">{text.t}</p>
          <p className="mb-4 text-[#FFFFFFB8] text-[15px]">{text.p}</p>
        </div>
      ))}
    </div>
  );
};

const titleText: any = {
  en: "Privacy Policy",
  fr: "Politique de confidentialité",
};
