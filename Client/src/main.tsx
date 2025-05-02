import "swiper/swiper-bundle.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import { AppProvider } from "./Context/App.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  </StrictMode>
);
