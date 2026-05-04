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
import { Compliance } from "./components/Compliance";
import { FarmerPortfolio } from "./components/FarmerPortfolio";

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
            element: (
              <ProtectedRoute role="farmer">
                <FarmerPortfolio />
              </ProtectedRoute>
            ),
          },
          { 
            path: "compliance", 
            element: <ProtectedRoute role="company"><Compliance /></ProtectedRoute>
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
