import "swiper/swiper-bundle.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { AppProvider } from "./Context/App.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import App from "./App.tsx";
import { App as AntdApp } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <AntdApp>
          <App />
        </AntdApp>
      </AppProvider>
    </Provider>
  </StrictMode>
);
