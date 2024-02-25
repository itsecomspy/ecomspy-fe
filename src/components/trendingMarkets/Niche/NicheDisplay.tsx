import { Categories } from "../Categories";
import { NicheContent } from "./NicheContent";
import { NicheSearch } from "./NicheSearch";
import { useNicheContext } from "./NicheContext";

export const NicheDisplay = () => {
  const { searchTerm } = useNicheContext();

  if (searchTerm !== "") {
    return <NicheSearch />;
  } else {
    return (
      <>
        <Categories />
        <NicheContent />
      </>
    );
  }
};
