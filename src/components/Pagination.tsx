import styled from "styled-components";
import { Button } from ".";

const PaginationWrapper = styled.div`
  display: flex;
  margin-top: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 12px;
  @media screen and (max-width: 479px) {
    padding-top: 16px;
  }
`;

const PaginationItem = styled.div<{
  $selected?: boolean;
}>`
  font-size: 12px;
  opacity: ${(props) => (props.$selected ? 1 : 0.5)};
  cursor: pointer;
  &:hover {
    opacity: ${(props) => (props.$selected ? 1 : 0.75)};
  }
`;

export const Pagination = ({
  currentItems = 0,
  itemsToDisplay,
  page,
  setPage,
}: {
  currentItems: number | undefined;
  itemsToDisplay: number;
  page: number;
  setPage: any;
}) => {
  const lastPage = Math.ceil(currentItems / itemsToDisplay);

  let isLastItem = page < Math.ceil(currentItems / itemsToDisplay);
  const nextPage = () => {
    if (isLastItem) {
      setPage(page + 1);
    }
  };

  let isFirstItem = page > 1;
  const prevPage = () => isFirstItem && setPage(page - 1);

  const PaginationItems = ({ currentPage }: { currentPage: number }) => {
    let totalPages = Math.ceil(currentItems / itemsToDisplay);
    let arrayItems = Array.from(
      Array(totalPages || 0),
      (_, index) => index + 1
    );

    let displayPage;

    let dots: boolean;
    // Filter pages to display fromm total pages
    if (arrayItems.length > 4 && page + 3 < lastPage) {
      dots = true;
      displayPage = [
        arrayItems[currentPage - 1],
        arrayItems[currentPage - 0],
        arrayItems[currentPage + 1],
        dots,
        totalPages,
      ];
    } else {
      const itemLength = arrayItems.length;
      let dp = Array.from({length: itemLength}, (_v,i) => i+1);
      displayPage = dp.slice(-4)
    }

    return (
      <>
        {displayPage.map((item, key) => {
          if (item === dots) {
            return <div key={key} className="text-[12px] opacity-50">...</div>;
          } else
            return (
              <PaginationItem
                $selected={item === page}
                onClick={() => setPage(item)}
                key={key}
              >
                {item}
              </PaginationItem>
            );
        })}
      </>
    );
  };

  if (currentItems === 0) {
    return;
  }

  return (
    <PaginationWrapper>
      <Button
        disable={lastPage === 1 || !isFirstItem}
        backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
        height={24}
        action={prevPage}
        text="back"
      />
      <PaginationItems currentPage={page} />
      <Button
        disable={lastPage === 1 || !isLastItem}
        backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
        height={24}
        action={nextPage}
        text="next"
      />
    </PaginationWrapper>
  );
};
