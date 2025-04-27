import { useState, createContext, useContext, useEffect } from "react";
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

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1677ff",
            colorInfo: "#1677ff",
            colorBgBase: darkMode ? "#020817" : "",
          },
          algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
