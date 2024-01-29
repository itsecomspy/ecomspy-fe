import styled from "styled-components";
import { CgSearch } from "react-icons/cg";

const SearchWrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.03);
  display: flex;
  align-items: center;
  padding: 8px 12px;
  width: 100%;
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

export const Search = () => {
  return (
    <SearchWrapper>
      <CgSearch color="rgba(255, 255, 255, 0.24)" />
      <SearchBar placeholder="Search by products, company..." />
    </SearchWrapper>
  );
};
