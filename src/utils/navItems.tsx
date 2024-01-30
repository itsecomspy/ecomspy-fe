import {
  AiOutlineDashboard,
  AiOutlineRise,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiNewspaper, PiChatsCircle, PiClipboardText } from "react-icons/pi";

export const navItems = [
  {
    id: 1,
    text: { en: "Overview", fr: "" },
    icon: <AiOutlineDashboard fontSize={16} />,
    link: "/",
    position: "top",
  },
  {
    id: 2,
    text: { en: "Trending markets", fr: "" },
    icon: <AiOutlineRise fontSize={16} />,
    link: "/trending-markets",
    position: "top",
  },
  {
    id: 3,
    text: { en: "Spy Ads", fr: "" },
    icon: <PiNewspaper fontSize={16} />,
    link: "/spy-ads",
    position: "top",
  },
  {
    id: 4,
    text: { en: "Feedback", fr: "" },
    icon: <PiChatsCircle fontSize={16} />,
    link: "/feedback",
    position: "bottom",
  },
  {
    id: 5,
    text: { en: "My lists", fr: "" },
    icon: <PiClipboardText fontSize={16} />,
    link: "/lists",
    position: "bottom",
  },
  {
    id: 6,
    text: { en: "Settings", fr: "" },
    icon: <AiOutlineSetting fontSize={16} />,
    link: "/settings",
    position: "bottom",
  },
];
