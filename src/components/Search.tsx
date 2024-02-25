import styled from "styled-components";
import { CgSearch } from "react-icons/cg";
import { useNicheContext } from "./trendingMarkets/Niche/NicheContext";
import { useNavigate } from "react-router-dom";
import { FormEvent, FormEventHandler } from "react";

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

function useController() {
  const { searchTerm } = useNicheContext();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let formattedSearchTerm = searchTerm.replaceAll(" ", "-");

    navigate(`/trending-markets/all/search/${formattedSearchTerm}`);
  };
  return { handleSubmit };
}
export const Search = ({ width }: { width?: number | string }) => {
  const { setSearchTerm } = useNicheContext();
  const { handleSubmit } = useController();

  return (
    <SearchWrapper className={`${width ? `w-[${width}]` : "w-full"}`}>
      <CgSearch color="rgba(255, 255, 255, 0.24)" />
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <SearchBar
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by products, trends..."
        />
      </form>
    </SearchWrapper>
  );
};
