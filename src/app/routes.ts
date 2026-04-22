import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { CarbonCredits } from "./components/CarbonCredits";
import { MapView } from "./components/MapView";
import { EducationHub } from "./components/EducationHub";
import { Alerts } from "./components/Alerts";
import { Settings } from "./components/Settings";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "carbon-credits", Component: CarbonCredits },
      { path: "map", Component: MapView },
      { path: "education", Component: EducationHub },
      { path: "alerts", Component: Alerts },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
