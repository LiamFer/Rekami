import { useState, createContext, useContext, useEffect } from "react";
import { ConfigProvider, theme } from "antd";

const AppConfigsContext = createContext<any>(undefined);

export const useAppConfigs = () => {
  return useContext(AppConfigsContext);
};

export const AppProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuActive, setMenuActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);
  const showMobileMenu = () => setMenuActive(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setDarkMode((mode) => !mode);
  };

  useEffect(() => {
    setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <AppConfigsContext.Provider
      value={{
        toggleTheme,
        darkMode,
        isMobile,
        showMobileMenu,
        menuActive,
        setMenuActive,
        userMenuActive,
        setUserMenuActive,
      }}
    >
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
    </AppConfigsContext.Provider>
  );
};
