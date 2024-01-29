import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  TrendingMarkets,
  SpyAds,
  Feedback,
  Lists,
  Settings,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/trending-markets/*",
    element: <TrendingMarkets />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
