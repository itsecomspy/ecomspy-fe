import styled from "styled-components";
import { Link } from "react-router-dom";

const BreadcrumbWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

export const Breadcrumb = ({
  url,
  array,
}: {
  url?: string;
  array: string[];
}) => {
  return (
    <BreadcrumbWrapper>
      {array.map((arr, i) => {
        let isLast = array.length === i + 1;
        return (
          <Link
            to={url ? url : isLast ? "#" : "/trending-markets/"}
            key={i}
            className={`${
              isLast
                ? "text-white cursor-auto pointer-events-none"
                : "text-[rgba(255,255,255,.2)]"
            } text-[14px] flex gap-x-2 capitalize`}
          >
            {arr}
            <span>{!isLast && " / "}</span>
          </Link>
        );
      })}
    </BreadcrumbWrapper>
  );
};
