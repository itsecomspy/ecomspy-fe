import { LandingLayout } from "../components/layout/LandingLayout";
import {
  Landing,
  WinningMarkets,
  Growth,
  SpyAds,
  Feedback,
  FAQ,
  Plans,
  InfoSection,
} from "@components/pages/Home";

export const Home = () => {
  return (
    <LandingLayout>
      <Landing />
      <div id="features">
        <WinningMarkets />
      </div>
      <Growth />
      <div id="spy-ads">
        <SpyAds />
      </div>
      <div id="prices">
        <Plans />
      </div>
      <Feedback />
      <FAQ />
      <InfoSection />
    </LandingLayout>
  );
};
