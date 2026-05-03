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
import { Auth } from "./components/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Auth,
  },
  {
    path: "/app",
    Component: ProtectedRoute,
    children: [
      {
        path: "",
        Component: Layout,
        children: [
          { path: "dashboard", Component: Dashboard },
          { 
            path: "portfolio", 
            element: <ProtectedRoute role="farmer"><Companies /></ProtectedRoute> // Reusing Companies for now as placeholder
          },
          { 
            path: "compliance", 
            element: <ProtectedRoute role="company"><Companies /></ProtectedRoute> // Reusing Companies for now as placeholder
          },
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
