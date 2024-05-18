import React, { createContext, useContext, useState } from "react";

// create niche context for handling niche data
const NicheContext = createContext<any>({});

// create niche context provider
export const NicheProvider = ({ children }: React.PropsWithChildren) => {
  // Timeline filter
  const [timeline, setTimeline] = useState<
    "3mon" | "6mon" | "1year" | "2year" | "5year" | "10year"
  >("1year");
  // Status filter
  const [status, setStatus] = useState<0 | 1 | 2 | 3>(0);
  // Sort filter
  const [sort, setSort] = useState<
    "popularity" | "growth" | "trendLine" | "volume"
  >("popularity");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const clearSearch = () => setSearchTerm("");

  return (
    <NicheContext.Provider
      value={{
        timeline,
        setTimeline,
        status,
        setStatus,
        sort,
        setSort,
        searchTerm,
        setSearchTerm,
        clearSearch,
      }}
    >
      {children}
    </NicheContext.Provider>
  );
};

export const useNicheContext = () => useContext(NicheContext);
