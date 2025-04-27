import { useState, createContext, useContext } from "react";
import { ConfigProvider, theme } from "antd";

const ThemeContext = createContext<any>(undefined);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((mode) => !mode);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fa541c",
            colorInfo: "#fa541c",
          },
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
