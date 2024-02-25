import React, { createContext, useContext, useState } from "react";

// create niche context for handling niche data
const NicheContext = createContext<any>({});

// create niche context provider
export const NicheProvider = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = useState<object | undefined>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <NicheContext.Provider value={{ data, setData, searchTerm, setSearchTerm }}>
      {children}
    </NicheContext.Provider>
  );
};

export const useNicheContext = () => useContext(NicheContext);
