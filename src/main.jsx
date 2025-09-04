import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import CreateTrip from "./create-trip/index";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips";
import Layout from "./components/custom/Layout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/create-trip",
//     element: <CreateTrip />,
//   },
//   {
//     path: "/view-trip/:tripId",
//     element: <ViewTrip />,
//   },
//   {
//     path: "/my-trips",
//     element: <MyTrips />,
//   },
// ]);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/create-trip", element: <CreateTrip /> },
      { path: "/view-trip/:tripId", element: <ViewTrip /> },
      { path: "/my-trips", element: <MyTrips /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
