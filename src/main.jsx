import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, SpyAds, Feedback, Lists, Settings } from "./pages";
import { TrendingMarkets, Niche, Explore } from "./pages/TrendingMarkets";
import { LanguageProvider } from "./context/LanguageContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/trending-markets",
    children: [
      {
        index: true,
        element: <TrendingMarkets />,
      },
      {
        path: ":nicheId",
        element: <TrendingMarkets />,
      },
      {
        path: ":nicheParent/:nicheChild",
        element: <Niche />,
      },
      {
        path: ":nicheParent/:nicheChild/:explore",
        element: <Explore />,
      },
    ],
  },
  {
    path: "/spy-ads/*",
    element: <SpyAds />,
  },
  {
    path: "/feedback/*",
    element: <Feedback />,
  },
  {
    path: "/lists/*",
    element: <Lists />,
  },
  {
    path: "/settings/*",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);
