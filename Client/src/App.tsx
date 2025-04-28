import React from "react";
import AppWireframe from "./Pages/AppWireframe";
import { AppProvider } from "./Context/App";

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppWireframe></AppWireframe>
    </AppProvider>
  );
};

export default App;
