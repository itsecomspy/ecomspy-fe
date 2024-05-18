import React from "react";
import styled from "styled-components";
import { PiCaretDown, PiCalendarBlank } from "react-icons/pi";
import { Dropdown } from "../../index";
import { sortFilter, timelineFilter, statusFilter } from "@/utils/filters";
// import { useAtom, useSetAtom } from "jotai";
// import { filterAtom } from "@root/src/main.atom";
import { useNicheContext } from "./Niche/NicheContext";
import { useLanguageContext } from "@root/src/context/LanguageContext";

const FiltersWrapper = styled.div<{
  $justify?: string;
}>`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: ${(props) =>
    props.$justify ? props.$justify : "flex-start"};
  width: ${(props) => (props.$justify ? "100%" : "auto")};
  @media screen and (max-width: 479px) {
    gap: 16px;
    width: 100%;
    margin-top: 16px;
  }
`;

const FilterWrapper = styled.div`
  min-width: 100px;
  position: relative;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.64);
  font-size: 12px;
  cursor: pointer;
  & .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  &:hover {
    transition: 0.2s;
    color: white;
  }
  @media screen and (max-width: 479px) {
    width: 100%;
  }
`;

interface FilterComponentProps {
  width?: number;
  selection: string;
  icon?: React.ReactElement;
  children?: any;
  handleClick?: (arg: any) => void;
}
const FilterComponent = ({
  width,
  selection,
  icon,
  children,
  handleClick,
}: FilterComponentProps) => {
  return (
    <FilterWrapper
      className={`${width ? `sm:w-[${width}px]` : ""}`}
      onClick={handleClick}
    >
      <div className="container">
        <div className="flex gap-[8px] items-center">
          {icon}
          <p className="whitespace-pre">{selection}</p>
        </div>
        <PiCaretDown />
      </div>
      {children}
    </FilterWrapper>
  );
};

export const Filters = ({
  justify,
  hideCategories,
  hideStatus,
}: {
  justify?: string;
  hideCategories?: boolean;
  hideStatus?: boolean;
}) => {
  const { lan } = useLanguageContext();

  const { timeline, setTimeline, status, setStatus, sort, setSort } =
    useNicheContext();

  const [filters, setFilters] = React.useState<any>({
    sortFilter: false,
    timelineFilter: false,
    statusFilter: false,
  });

  const onClose = () =>
    setFilters({
      sortFilter: false,
      timelineFilter: false,
      statusFilter: false,
    });

  return (
    <FiltersWrapper $justify={justify}>
      {!hideCategories && (
        <FilterComponent
          width={200}
          handleClick={() => {
            setFilters((prev: any) => ({ ...prev, sortFilter: true }));
          }}
          selection={
            // @ts-ignore
            sortFilter.filter((fil) => fil.value === sort)[0].text[lan]
          }
        >
          {filters.sortFilter && sortFilter && (
            <Dropdown
              width={200}
              handleClose={onClose}
              title={
                // @ts-ignore
                sortFilter.filter((fil) => fil.value === sort)[0].text[lan]
              }
              onSelect={setSort}
              items={sortFilter}
            />
          )}
        </FilterComponent>
      )}
      <div className="flex flex-row gap-4 w-full">
        <FilterComponent
          icon={<PiCalendarBlank fontSize={16} />}
          handleClick={() => {
            setFilters((prev: any) => ({ ...prev, timelineFilter: true }));
          }}
          selection={
            timelineFilter.filter((fil) => fil.value === timeline)[0].text
          }
        >
          {filters.timelineFilter && (
            <Dropdown
              side="right"
              width={200}
              handleClose={onClose}
              title={
                timelineFilter.filter((fil) => fil.value === timeline)[0].text
              }
              onSelect={setTimeline}
              items={timelineFilter}
            />
          )}
        </FilterComponent>
        {!hideStatus && (
          <FilterComponent
            icon={<PiCalendarBlank fontSize={16} />}
            handleClick={() => {
              setFilters((prev: any) => ({ ...prev, statusFilter: true }));
            }}
            selection={
              statusFilter.filter((fil) => fil.value === status)[0].text
            }
          >
            {filters.statusFilter && (
              <Dropdown
                side="right"
                width={200}
                handleClose={onClose}
                title={
                  statusFilter.filter((fil) => fil.value === status)[0].text
                }
                onSelect={setStatus}
                items={statusFilter}
              />
            )}
          </FilterComponent>
        )}
      </div>
    </FiltersWrapper>
  );
};
