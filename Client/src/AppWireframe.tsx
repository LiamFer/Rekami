import { Layout, Menu, theme, Button } from "antd";
import {
  HomeOutlined,
  CompassOutlined,
  BookOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useTheme } from "./Context/Theme";

const { Header, Content, Footer } = Layout;

const items = [
  { key: "home", icon: <HomeOutlined />, label: "Homepage" },
  { key: "explore", icon: <CompassOutlined />, label: "Explore" },
  { key: "library", icon: <BookOutlined />, label: "Library" },
  { key: "recommendations", icon: <StarOutlined />, label: "Recommendations" },
];

export default function AppWireframe() {
  const { toggleTheme } = useTheme();
  const { token } = theme.useToken();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <h1 style={{ margin: 0 }}>REKAMI</h1>
        <Menu
          style={{ flexGrow: 1, justifyContent: "flex-end" }}
          mode="horizontal"
          items={items}
        />
        <Button onClick={toggleTheme}>
          Change Theme
        </Button>
      </Header>

      <Content style={{ flexGrow: 1, padding: "0 48px" }}></Content>

      <Footer
        style={{ textAlign: "center", backgroundColor: token.colorBgContainer }}
      >
        Rekami ©{new Date().getFullYear()} Created by LiamFer
      </Footer>
    </Layout>
  );
}
