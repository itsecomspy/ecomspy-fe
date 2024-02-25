import React from "react";
import styled from "styled-components";
import { PiCaretDown, PiCalendarBlank } from "react-icons/pi";
import { Dropdown } from "../index";
import { useLocation } from "react-router-dom";
import { niches } from "@/utils/niches";
import {
  categoriesFilter,
  timelineFilter,
  statusFilter,
} from "@/utils/filters";
import { useAtom, useSetAtom } from "jotai";
import { filterAtom } from "@root/src/main.atom";

const FiltersWrapper = styled.div<{
  $justify?: string;
}>`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: ${(props) =>
    props.$justify ? props.$justify : "flex-start"};
  width: ${(props) => (props.$justify ? "100%" : "auto")};
`;

const FilterWrapper = styled.div`
  position: relative;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  background: rgba(255, 255, 255, 0.04);
  z-index: 1;
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
      className={`${width ? `w-[${width}px]` : ""}`}
      onClick={handleClick}
    >
      <div className="container">
        <div className="flex gap-[8px] items-center">
          {icon}
          <p>{selection}</p>
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
  const [filterAtomData, setFilterAtomData] = useAtom(filterAtom);
  // Get location and match with filter
  let location = useLocation();
  let nicheId = location.pathname.split("/")[2];
  const [currentNiche, setCurrentNiche] = React.useState<any>();

  React.useMemo(() => {
    let filterNiche = niches.filter((fil) => nicheId === `${fil.id}`);
    setCurrentNiche(filterNiche[0]);
  }, [nicheId]);

  const [filters, setFilters] = React.useState<any>({
    categoriesFilter: false,
    timelineFilter: false,
    statusFilter: false,
  });

  const [niche, setNiche] = React.useState<{ text: string; id: string }>();
  const handleSetNiche = (fil: { text: string; id: string }) => {
    setNiche(fil);
  };

  const [timeline, setTimeline] = React.useState<{
    text: string;
    id: number;
  }>({ id: 4, text: "5 Years" });
  const handleSetTimeline = (fil: { text: string; id: number }) => {
    setTimeline(fil);
    const d = new Date();
    switch (fil.id) {
      case 0:
        d.setMonth(d.getMonth() - 3);
        break;
      case 1:
        d.setMonth(d.getMonth() - 6);
        break;
      case 2:
        d.setFullYear(d.getFullYear() - 1);
        break;
      case 3:
        d.setFullYear(d.getFullYear() - 2);
        break;
      case 4:
        d.setFullYear(d.getFullYear() - 5);
        break;
      default:
        d.setMonth(d.getMonth() - 3);
        break;
    }

    setFilterAtomData({ timeline: { date: d, ...fil } });
  };

  const [status, setStatus] = React.useState<{
    text: string;
    id: number;
    value: { min: number; max: number };
  }>({
    id: 0,
    text: "All",
    value: { min: 0, max: 100 },
  });
  const handleSetStatus = (fil: {
    text: string;
    id: number;
    value: { min: number; max: number };
  }) => {
    setStatus(fil);
    setFilterAtomData({ ...filterAtomData, status: fil });
  };

  const onClose = () =>
    setFilters({
      categoriesFilter: false,
      timelineFilter: false,
      statusFilter: false,
    });

  return (
    <FiltersWrapper $justify={justify}>
      {!hideCategories && (
        <FilterComponent
          width={200}
          handleClick={() => {
            setFilters((prev: any) => ({ ...prev, categoriesFilter: true }));
          }}
          selection={niche ? niche?.text : "All Categories"}
        >
          {filters.categoriesFilter && categoriesFilter && (
            <Dropdown
              width={200}
              handleClose={onClose}
              title={"Default"}
              onSelect={handleSetNiche}
              items={categoriesFilter}
            />
          )}
        </FilterComponent>
      )}
      <div className="flex gap-4">
        <FilterComponent
          icon={<PiCalendarBlank fontSize={16} />}
          handleClick={() => {
            setFilters((prev: any) => ({ ...prev, timelineFilter: true }));
          }}
          selection={filterAtomData?.timeline?.text || timeline?.text}
        >
          {filters.timelineFilter && (
            <Dropdown
              width={200}
              handleClose={onClose}
              title={timeline?.text}
              onSelect={handleSetTimeline}
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
            selection={filterAtomData?.status?.text || status?.text}
          >
            {filters.statusFilter && (
              <Dropdown
                anchor="right"
                width={200}
                handleClose={onClose}
                title={status?.text}
                onSelect={handleSetStatus}
                items={statusFilter}
              />
            )}
          </FilterComponent>
        )}
      </div>
    </FiltersWrapper>
  );
};
