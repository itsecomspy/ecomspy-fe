import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { useNicheContext } from "./pages/TrendingMarket/Niche/NicheContext";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useAuthContext } from "../context/AuthContext";
import useSearch from "../hooks/useSearch";

const SearchWrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  padding: 8px 12px;
  column-gap: 8px;
  border-radius: 4px;
`;

const SearchBar = styled.input`
  font-weight: 400;
  color: rgba(255, 255, 255, 0.24);
  outline: none;
  width: 100%;
  font-size: 14px;
  background-color: inherit;
  &::placeholder {
    color: rgba(255, 255, 255, 0.24);
    font-size: 14px;
    font-weight: 400;
  }
`;

const Close = styled.div`
  border-radius: 500px;
  height: 20px;
  width: 20px;
  min-height: 20px;
  min-width: 20px;
  font-size: 10px;
  background-color: rgba(255, 255, 255, 0.02);
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 12px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const NumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  gap: 8px;
  border-radius: var(--Radius-radius-full, 100px);
  background: #000;
  height: 100%;
  right: 0;
  max-height: 24px;
  width: max-content;
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
`;

function useController() {
  const { searchTerm, clearSearch } = useNicheContext();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let formattedSearchTerm = searchTerm.replaceAll(" ", "-");

    navigate(`/search/${formattedSearchTerm}`);
    clearSearch();
  };
  return { handleSubmit };
}

export const Search = ({ width }: { width?: number | string }) => {
  const { setSearchTerm, searchTerm, clearSearch } = useNicheContext();
  const { handleSubmit } = useController();
  const { userDetails, subscriptionData } = useAuthContext();

  const { searchCount } = useSearch();
  const isUserSearchEnabled =
    userDetails?.subscription?.planId === 3 ||
    searchCount > 0 ||
    Date.now() > subscriptionData.endDate * 1000;

  return (
    <SearchWrapper className={`${width ? `w-[${width}]` : "w-full"}`}>
      <CgSearch color="rgba(255, 255, 255, 0.24)" />
      <form className="w-full flex items-center" onSubmit={handleSubmit}>
        <SearchBar
          disabled={!isUserSearchEnabled}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by products, trends..."
        />
        {userDetails?.subscription?.planId !== 3 &&
          userDetails?.subscription && (
            <NumberWrapper>
              {searchCount}/10{" "}
              <span className="hidden md:flex">searches remaining</span>
            </NumberWrapper>
          )}
        {searchTerm.length > 0 && (
          <Close onClick={() => clearSearch()}>&#x2715;</Close>
        )}
      </form>
    </SearchWrapper>
  );
};
