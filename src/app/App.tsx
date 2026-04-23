import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Auth } from "./components/Auth";

export default function App() {
  return <RouterProvider router={router} />;
}
