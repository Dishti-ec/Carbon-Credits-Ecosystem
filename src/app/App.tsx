import { RouterProvider } from "react-router";
import { router } from "./routes";
import { UserRoleProvider } from "./context/UserProvider";

export default function App() {
  return (
    <UserRoleProvider>
      <RouterProvider router={router} />
    </UserRoleProvider>
  );
}
