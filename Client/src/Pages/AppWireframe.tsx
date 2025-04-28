import { Layout, theme } from "antd";
import HeaderComponent from "../Components/Header/HeaderComponent";

const {  Content, Footer } = Layout;

export default function AppWireframe() {
  const { token } = theme.useToken();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <HeaderComponent/>

      <Content style={{ flexGrow: 1, padding: "0 48px" }}>

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
