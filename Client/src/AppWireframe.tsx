import { Layout, theme } from "antd";
import HeaderComponent from "./Components/HeaderComponent";

const {  Content, Footer } = Layout;

export default function AppWireframe() {
  const { token } = theme.useToken();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <HeaderComponent/>

      <Content style={{ flexGrow: 1, padding: "0 48px" }}>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>
        <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo harum cum facere eligendi velit, quos magnam, quibusdam provident repudiandae hic ea natus sit earum nam ipsam placeat quia, exercitationem rerum?</h1>

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
