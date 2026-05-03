import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { CarbonCredits } from "./components/CarbonCredits";
import { MapView } from "./components/MapView";
import { EducationHub } from "./components/EducationHub";
import { Alerts } from "./components/Alerts";
import { Settings } from "./components/Settings";
import { NotFound } from "./components/NotFound";
import { Companies } from "./components/Companies";
import { Farmlands } from "./components/Farmlands";
import { LandingPage } from "./components/LandingPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          { index: true, Component: Dashboard },
          { path: "my-properties", Component: Farmlands }, // Reusing Farmlands for now
          { path: "portfolio", Component: Companies }, // Reusing Companies for now
          { path: "compliance", Component: Companies }, // Reusing Companies for now
          { path: "carbon-credits", Component: CarbonCredits },
          { path: "companies", Component: Companies },
          { path: "farmlands", Component: Farmlands },
          { path: "map", Component: MapView },
          { path: "education", Component: EducationHub },
          { path: "alerts", Component: Alerts },
          { path: "settings", Component: Settings },
          { path: "*", Component: NotFound },
        ],
      },
    ],
  },
  { path: "*", Component: NotFound },
]);
