import { Layout, Menu, theme, Button } from "antd";
import { useTheme } from "./Context/Theme";
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "home", label: "Homepage" },
  { key: "explore", label: "Explore" },
  { key: "library", label: "Library" },
  { key: "recommendations", label: "Recommendations" },
];

export default function AppWireframe() {
  const { toggleTheme,darkMode } = useTheme();
  const { token } = theme.useToken();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        style={{
          top: "0px",
          position: "sticky",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: token.colorBgBase,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>REKAMI</h1>
        <Menu
          style={{
            flexGrow: 1,
            justifyContent: "flex-end",
            backgroundColor: token.colorBgBase,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
          mode="horizontal"
          items={items}
        />
        <Button icon={<MenuOutlined/>} type="text"></Button>
        <Button icon={darkMode ? <MoonOutlined/> : <SunOutlined/>} onClick={toggleTheme}></Button>
      </Header>

      <Content style={{ flexGrow: 1, padding: "0 48px" }}>
        <h1>asdqw2</h1>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: token.colorBgBase,
          borderTop: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        Rekami ©{new Date().getFullYear()} Created by LiamFer
      </Footer>
    </Layout>
  );
}
