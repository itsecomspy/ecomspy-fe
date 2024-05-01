import styled from "styled-components";
import { PiFirstAidThin } from "react-icons/pi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  opacity: .25;
`;

export const NoData = () => {
  return (
    <Wrapper>
      <PiFirstAidThin
        className="text-[200px] mb-4"
        style={{ transform: "rotate(45deg)" }}
      />
      <p className="text-xl">No results found</p>
      <p className="text-xs">
        Try adjusting your search & filters or refresh the page
      </p>
    </Wrapper>
  );
};
