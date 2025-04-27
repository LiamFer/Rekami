import { Layout, Menu, theme, Button } from "antd";
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useTheme } from "../Context/Theme";
const { Header } = Layout;

const items = [
  { key: "home", label: "Homepage" },
  { key: "explore", label: "Explore" },
  { key: "library", label: "Library" },
  { key: "recommendations", label: "Recommendations" },
];

export default function HeaderComponent() {
  const { toggleTheme, darkMode } = useTheme();
  const { token } = theme.useToken();
  return (
    <Header
      style={{
        top: "0px",
        position: "sticky",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: darkMode ? "rgba(2, 8, 23, 0.7)" : "rgba(255, 255, 255, 0.7)",
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        backdropFilter: "blur(10px)", 
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>REKAMI</h1>
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
      <Button icon={<MenuOutlined />} type="text"></Button>
      <Button
        icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}
      ></Button>
    </Header>
  );
}
