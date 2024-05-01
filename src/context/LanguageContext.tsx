import React, { createContext, useContext, useState } from "react";

// create Language context for handling Language data
const LanguageContext = createContext<any | undefined>(undefined);

// create Language context provider
export const LanguageProvider = ({ children }: React.PropsWithChildren) => {
  const [lan, setLan] = useState<"en" | "fr">("en");

  React.useMemo(() => {
    let fetchLan: string | null = localStorage.getItem("lan");

    if (fetchLan !== null) {
      let parseLanguage: { value: "en" | "fr"; expiry: number } =
        JSON.parse(fetchLan);
      setLan(parseLanguage?.value);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lan, setLan }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
