import {
  AiOutlineDashboard,
  AiOutlineRise,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  PiNewspaper,
  PiChatsCircle,
  PiPackage,
  PiChartBarHorizontal,
} from "react-icons/pi";
import { CgSearch } from "react-icons/cg";

export const navItems = [
  {
    id: 1,
    text: { en: "Dashboard", fr: "Tableau De Bord" },
    icon: <AiOutlineDashboard fontSize={16} />,
    link: "/dashboard",
    position: "top",
  },
  {
    id: 2,
    text: { en: "Trending markets", fr: "Marchés tendance" },
    icon: <PiChartBarHorizontal fontSize={16} />,
    link: "/trending-markets",
    position: "top",
  },
  {
    id: 3,
    text: { en: "Top 10 Markets", fr: "Top 10 Marchés Tendance" },
    icon: <AiOutlineRise fontSize={16} />,
    link: "/top-markets",
    position: "top",
  },
  {
    id: 4,
    text: { en: "Trending products", fr: "Produits tendance" },
    icon: <PiPackage fontSize={16} />,
    link: "/trending-products",
    position: "top",
    disabled: true,
  },
  {
    id: 5,
    text: { en: "Spy Ads", fr: "Spy Ads" },
    icon: <PiNewspaper fontSize={16} />,
    link: "/spy-ads",
    position: "top",
    disabled: true,
  },
  {
    id: 6,
    text: { en: "Search", fr: "Recherche" },
    icon: <CgSearch fontSize={16} />,
    link: "/search",
    position: "top",
  },
  {
    id: 7,
    text: { en: "Feedback", fr: "Feedback" },
    icon: <PiChatsCircle fontSize={16} />,
    link: "/feedback",
    position: "bottom",
  },
  {
    id: 8,
    text: { en: "Settings", fr: "Paramètres" },
    icon: <AiOutlineSetting fontSize={16} />,
    link: "/settings",
    position: "bottom",
  },
];
