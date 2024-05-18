import React from "react";
import { Categories } from "../Categories";
import { NicheContent } from "./NicheContent";
import { NicheSearch } from "./NicheSearch";
import { useNicheContext } from "./NicheContext";
import { useWindowSize } from "usehooks-ts";

export const NicheDisplay = ({ parentWidth = 0 }: { parentWidth?: number }) => {
  const { searchTerm } = useNicheContext();

  const [isSelected, setSelected] = React.useState<boolean>(false);
  const { width } = useWindowSize();

  if (searchTerm !== "") {
    return <NicheSearch />;
  }

  return (
    <div className="relative flex w-full">
      {(width > 479 || !isSelected) && (
        <Categories isSelected={setSelected} parentWidth={parentWidth} />
      )}

      <NicheContent isSelected={setSelected} />
    </div>
  );
};
