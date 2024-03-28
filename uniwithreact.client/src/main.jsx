import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import Home from "./components/Pages/Home.jsx";
import ErrorPage from "./components/Pages/Error.jsx";
import StudentDisplay from "./components/Pages/Students.jsx";
import { studentLoader } from "./components/Loaders/Loaders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/students",
        loader: async () => {
          const data = fetch("/students").then(res => res.json());
          return data;
        },
        element: <StudentDisplay />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
