import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./components/Pages/Home.jsx";
import ErrorPage from "./components/Pages/Error.jsx";
import StudentDisplay from "./components/Pages/Students.jsx";
import { coursesLoader, departmentLoader, instructorsLoader, studentLoader } from "./components/Loaders/Loaders.jsx";
import Departments from "./components/Pages/Departments.jsx";
import Courses from "./components/Pages/Courses.jsx";
import Instructors from "./components/Pages/Instructors.jsx";
import { handleAdd } from "./components/Actions/Actions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/alumni",
        loader: studentLoader,
        element: <StudentDisplay />,
      },
      {
        path: "/departments",
        loader: departmentLoader,
        element: <Departments />
      },
      {
        path: "/courses",
        loader: coursesLoader,
        element: <Courses />
      },
      {
        path: "/professors",
        loader: instructorsLoader,
        action: handleAdd,
        element: <Instructors />
      },
      {
        path: "/professors/:instructorID"
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
