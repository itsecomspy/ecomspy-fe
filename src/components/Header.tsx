// import { BreadCrumbs } from "../components";
import { useLocation } from "react-router-dom";

export const Header = ({ header }: { header?: string }) => {
  let location = useLocation();
  const locationPathnameCleaned = location.pathname.replace("-", " ");
  let headerText = locationPathnameCleaned.split("/")[1];

  if (location.pathname === "/") {
    headerText = "Overview";
  }

  return (
    <div className="p-[13px] border-b border-[rgba(255,255,255,.04)] h-[48px] mb-[24px] capitalize">
      {header ? header : headerText}
    </div>
  );
};
