import { createBrowserRouter } from "react-router-dom";
import AppWireframe from "./Pages/AppWireframe";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Library from "./Pages/Library";
import Recommendations from "./Pages/Recommendations";
import Login from "./Pages/Login";
import Media from "./Pages/Media";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWireframe />,
    children: [
      { index: true, element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "library", element: <Library /> },
      { path: "recommendations", element: <Recommendations /> },
      { path: "media/:id", element: <Media /> },
    ],
  },
  { path: "/Login", element: <Login /> },
]);
