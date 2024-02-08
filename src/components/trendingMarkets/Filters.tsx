import React from "react";
import styled from "styled-components";
import { PiCaretDown, PiCalendarBlank } from "react-icons/pi";
import { Dropdown } from "../index";
import { useLocation } from "react-router-dom";
import { niches } from "@/utils/niches";
import { timelineFilter, statusFilter } from "@/utils/filters";

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
  & .container {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    &:hover {
      transition: 0.2s;
      color: white;
    }
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

export const Filters = ({ justify }: { justify?: string }) => {
  // Get location and match with filter
  let location = useLocation();
  let nicheId = location.pathname.split("/")[2];
  const [currentNiche, setCurrentNiche] = React.useState<any>();

  React.useMemo(() => {
    let filterNiche = niches.filter((fil) => nicheId === fil.id);
    setCurrentNiche(filterNiche[0]);
  }, [nicheId]);

  const [filters, setFilters] = React.useState<any>({
    nicheFilter: false,
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
  }>({ id: 2, text: "1 Year" });
  const handleSetTimeline = (fil: { text: string; id: number }) => {
    setTimeline(fil);
  };

  const [status, setStatus] = React.useState<{ text: string; id: number }>({
    id: 0,
    text: "All",
  });
  const handleSetStatus = (fil: { text: string; id: number }) => {
    setStatus(fil);
  };

  const onClose = () =>
    setFilters({
      nicheFilter: false,
      timelineFilter: false,
      statusFilter: false,
    });

  return (
    <FiltersWrapper $justify={justify}>
      <FilterComponent
        width={200}
        handleClick={() => {
          setFilters((prev: any) => ({ ...prev, nicheFilter: true }));
        }}
        selection={niche ? niche?.text : "All Categories"}
      >
        {filters.nicheFilter && currentNiche && (
          <Dropdown
            width={200}
            handleClose={onClose}
            title={currentNiche?.name.en}
            onSelect={handleSetNiche}
            items={currentNiche?.items}
          />
        )}
      </FilterComponent>
      <div className="flex gap-4">
        <FilterComponent
          icon={<PiCalendarBlank fontSize={16} />}
          handleClick={() => {
            setFilters((prev: any) => ({ ...prev, timelineFilter: true }));
          }}
          selection={timeline?.text}
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
        <FilterComponent
          icon={<PiCalendarBlank fontSize={16} />}
          handleClick={() => {
            setFilters((prev: any) => ({ ...prev, statusFilter: true }));
          }}
          selection={status?.text}
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
      </div>
    </FiltersWrapper>
  );
};
