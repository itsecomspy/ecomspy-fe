import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Plans,
  Faq,
  Dashboard,
  SpyAds,
  TrendingProducts,
  Feedback,
  Lists,
  Settings,
  Search,
  SearchPage,
  FreeTrial,
  NotFound,
  Privacy,
  Terms,
  SubsciptionSuccess,
} from "./pages";
import { Login, Register, ForgotPassword, ResetPassword } from "./pages/Auth";
import {
  TrendingMarkets,
  Niche,
  Explore,
  TopMarkets,
} from "./pages/TrendingMarkets";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { NicheProvider } from "./components/pages/TrendingMarket/Niche/NicheContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/free-trial",
    element: <FreeTrial />,
  },
  {
    path: "/dashboard/*",
    element: <Dashboard />,
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
    path: "/top-markets",
    element: <TopMarkets />,
  },
  {
    path: "/search",
    children: [
      {
        index: true,
        element: <SearchPage />,
      },
      {
        path: ":search",
        element: <Search />,
      },
    ],
  },
  {
    path: "/trending-products/*",
    element: <TrendingProducts />,
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
  {
    path: "/success/*",
    element: <SubsciptionSuccess />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  // 404 not found page
  {
    path: "*",
    element: <NotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NicheProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            <Provider>
              <RouterProvider router={router} />
            </Provider>
          </QueryClientProvider>
        </LanguageProvider>
      </NicheProvider>
    </AuthProvider>
  </React.StrictMode>
);
