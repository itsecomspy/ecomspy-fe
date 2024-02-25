import { Key, useMemo, useState } from "react";
import styled from "styled-components";
import { NicheCard } from "./NicheCard";
import { useLanguageContext } from "@/context/LanguageContext";
import { niches } from "../../../utils/niches";
import { useNicheContext } from "./NicheContext";

const NicheContentWrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-content: flex-start;
`;

export const NicheSearch = () => {
  const { lan } = useLanguageContext();

  const [results, setResults] = useState<object[]>([]);
  const { searchTerm } = useNicheContext();

  useMemo(() => {
    if (searchTerm.length > 2) {
      let filterResults = niches.filter((res) => {
        let searchCategory = res.category
          .toLowerCase()
          .search(searchTerm.toLowerCase());
        let searchName = res.name
          .toLowerCase()
          .search(searchTerm.toLowerCase());
        if (searchCategory >= 0 || searchName >= 0) return true;
      });
      setResults(filterResults);
      // console.log(filterResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="p-[24px] flex overflow-clip rounded-[4px] w-full h-full flex-col gap-[24px]">
      <NicheContentWrapper>
        {results.map((item: any, key: Key) => {
          return (
            <NicheCard
              parentId={item.category}
              key={key}
              id={item.id}
              value={item.value}
              icon={item.icon}
              text={item.name}
            />
          );
        })}
      </NicheContentWrapper>
    </div>
  );
};
