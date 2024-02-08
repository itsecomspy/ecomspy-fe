import React, { createContext, useContext, useState } from "react";

// create niche context for handling niche data
const NicheContext = createContext<any>({});

// create niche context provider
export const NicheProvider = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = useState<object | undefined>({});

  return (
    <NicheContext.Provider value={{ data, setData }}>
      {children}
    </NicheContext.Provider>
  );
};

export const useNicheContext = () => useContext(NicheContext);
