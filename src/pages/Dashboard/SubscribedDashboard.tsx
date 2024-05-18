import { TrendingMarkets } from "@components/pages/Dashboard/TrendingMarkets";

export const SubscribedDashboard = () => {
  return (
    <div className="p-4 sm:p-0 h-full w-full relative overflow-scroll mb-10">
      <div>
        <TrendingMarkets />
      </div>
    </div>
  );
};
