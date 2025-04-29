import { FloatButton, Layout, theme } from "antd";
import HeaderComponent from "../Components/Header/HeaderComponent";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAppConfigs } from "../Context/App";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;

export default function AppWireframe() {
  const { toggleTheme, darkMode } = useAppConfigs();
  const { token } = theme.useToken();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <HeaderComponent />

      <Content
        style={{ flexGrow: 1, padding: "0 48px"}}
      >
        <Outlet></Outlet>
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
      <FloatButton
        icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}
      ></FloatButton>
    </Layout>
  );
}
