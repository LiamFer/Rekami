import React from "react";
import AppWireframe from "./Pages/AppWireframe";
import { ThemeProvider } from "./Context/Theme";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppWireframe></AppWireframe>
    </ThemeProvider>
  );
};

export default App;
