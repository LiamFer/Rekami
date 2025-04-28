import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Menu, Button, theme } from "antd";
import { useState, useEffect } from "react";
import { useTheme } from "../../Context/Theme";
import MobileMenu from "./MobileMenu";
import "./header.css";

const items = [
  { key: "home", label: "Homepage" },
  { key: "explore", label: "Explore" },
  { key: "library", label: "Library" },
  { key: "recommendations", label: "Recommendations" },
];

export default function Navbar() {
  const { toggleTheme, darkMode } = useTheme();
  const [menuActive, setMenuActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { token } = theme.useToken();
  
  const showMobileMenu = () => setMenuActive(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {!isMobile && (
          <div className="desktopMenu">
            <Menu
              style={{
                flexGrow: 1,
                justifyContent: "flex-end",
                backgroundColor: "transparent",
                borderBottom: `1px solid ${token.colorBorderSecondary}`,
              }}
              mode="horizontal"
              items={items}
            />
          </div>
        )}

        {isMobile && (
          <Button
            className="mobileMenubutton"
            icon={<MenuOutlined />}
            type="text"
            onClick={showMobileMenu}
          />
        )}
        <Button
          icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
          onClick={toggleTheme}
        />
      </nav>
      <MobileMenu
        menuActive={menuActive}
        setMenuActive={setMenuActive}
        items={items}
      />
    </>
  );
}
