import {
  AiOutlineDashboard,
  AiOutlineRise,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiNewspaper, PiChatsCircle, PiClipboardText } from "react-icons/pi";

export const navItems = [
  {
    id: 1,
    text: "Overview",
    icon: <AiOutlineDashboard fontSize={16} />,
    link: "/",
    position: "top",
  },
  {
    id: 2,
    text: "Trending markets",
    icon: <AiOutlineRise fontSize={16} />,
    link: "/trending-markets",
    position: "top",
  },
  {
    id: 3,
    text: "Spy Ads",
    icon: <PiNewspaper fontSize={16} />,
    link: "/spy-ads",
    position: "top",
  },
  {
    id: 4,
    text: "Feedback",
    icon: <PiChatsCircle fontSize={16} />,
    link: "/feedback",
    position: "bottom",
  },
  {
    id: 5,
    text: "My lists",
    icon: <PiClipboardText fontSize={16} />,
    link: "/lists",
    position: "bottom",
  },
  {
    id: 6,
    text: "Settings",
    icon: <AiOutlineSetting fontSize={16} />,
    link: "/settings",
    position: "bottom",
  },
];
