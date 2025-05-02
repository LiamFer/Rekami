import { FloatButton, Layout } from "antd";
import HeaderComponent from "../Components/Header/HeaderComponent";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAppConfigs } from "../Context/App";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const { Content } = Layout;

export default function AppWireframe() {
  const { toggleTheme, darkMode } = useAppConfigs();

  return (
    <Layout
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <HeaderComponent />

      <Content
        style={{ flexGrow: 1, padding: "0 20px"}}
      >
        <Outlet></Outlet>
      </Content>

      <Footer/>

      <FloatButton
        icon={darkMode ? <MoonOutlined /> : <SunOutlined />}
        onClick={toggleTheme}
      ></FloatButton>
    </Layout>
  );
}
