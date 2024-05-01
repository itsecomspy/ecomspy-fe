import { useState, Key, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useNicheContext } from "./NicheContext";
import { useAuthContext } from "@root/src/context/AuthContext";
import useSearch from "@root/src/hooks/useSearch";
// import { useLanguageContext } from "@/context/LanguageContext";

const ContentWrapper = styled.div`
  gap: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  overflow-y: scroll;
  align-content: flex-start;
  @media screen and (max-width: 479px) {
    gap: 16px;
  }
`;

const SearchKeyWrapper = styled.div<{
  $disabled?: boolean;
}>`
  position: relative;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(255, 255, 255, 0.04);
  z-index: 1;
  color: rgba(255, 255, 255, 0.64);
  font-size: 12px;
  cursor: ${(props) => (props.$disabled ? "auto" : "pointer")};
  &:hover {
    transition: 0.2s;
    color: white;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  hr {
    width: 50%;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  p {
    width: 250px;
    line-height: 1;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.24);
  }
`;

const Heading = ({ title }: { title: string }) => (
  <HeadingWrapper>
    <hr />
    <p>{title}</p>
    <hr />
  </HeadingWrapper>
);

export const NicheSearch = () => {
  // const { lan } = useLanguageContext();
  const { clearSearch } = useNicheContext();

  const navigate = useNavigate();
  const handleSelect = (s: string) => {
    let formattedSearchTerm = s.replaceAll(" ", "-");
    navigate(`/search/${formattedSearchTerm}`);
    clearSearch();
  };

  const [popularTerms, setPopularTerms] = useState<any[]>([]);

  const { userDetails, subscriptionData } = useAuthContext();

  const { searchCount } = useSearch();
  const isUserSearchEnabled =
    userDetails?.subscription?.planId === 3 ||
    searchCount > 0 ||
    Date.now() > subscriptionData.endDate * 1000;

  const handleSearch = (item: any) => {
    if (isUserSearchEnabled) {
      handleSelect(item.keyword);
    } else {
      navigate("/settings", { state: { tab: "subscription" } });
    }
  };

  useMemo(() => {
    if (searchKeywords.length !== 0) {
      let filterKeywords = searchKeywords
        .sort((a, b) => {
          return Number(b.count) - Number(a.count);
        })
        .slice(0, 10);
      setPopularTerms(filterKeywords);
    }
  }, [searchKeywords]);

  return (
    <div className="flex flex-wrap w-full">
      {/* <div className="p-[24px] flex overflow-clip rounded-[4px] w-full flex-col gap-[24px]">
        <Heading title="Suggested keywords" />
        <ContentWrapper>
          {popularTerms.map((item: any, key: Key) => {
            return (
              <SearchKeyWrapper
                onClick={() => handleSelect(item.keyword)}
                key={key}
              >
                {item.keyword}
              </SearchKeyWrapper>
            );
          })}
        </ContentWrapper>
      </div> */}
      <div className="p-[24px] flex overflow-clip rounded-[4px] w-full flex-col gap-[24px]">
        <Heading title="Popular keywords" />
        <ContentWrapper>
          {popularTerms.map((item: any, key: Key) => {
            return (
              <SearchKeyWrapper onClick={() => handleSearch(item)} key={key}>
                {item.keyword}
              </SearchKeyWrapper>
            );
          })}
        </ContentWrapper>
      </div>
    </div>
  );
};

// Mock data from database
const searchKeywords = [
  { keyword: "acne spray", count: 13 },
  { keyword: "celimax", count: 1 },
  { keyword: "sunscreen", count: 64 },
  { keyword: "nike air max", count: 23 },
  { keyword: "saltair", count: 64 },
  { keyword: "heatless curler", count: 2 },
  { keyword: "tacobo", count: 7 },
  { keyword: "wonderskin", count: 86 },
  { keyword: "celimax", count: 10 },
  { keyword: "bonding conditioner", count: 22 },
  { keyword: "mushroom gummies", count: 33 },
  { keyword: "lab grown diamonds", count: 33 },
  { keyword: "moissanite ring", count: 41 },
  { keyword: "ackermans", count: 121 },
  { keyword: "crew clothing", count: 12 },
];
