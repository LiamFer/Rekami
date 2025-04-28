import { Button, Layout, theme } from "antd";
import { useAppConfigs } from "../../Context/App";
import Navbar from "./Navbar";
import { MenuOutlined } from "@ant-design/icons";
const { Header } = Layout;

export default function HeaderComponent() {
  const { darkMode, isMobile, showMobileMenu } = useAppConfigs();
  const { token } = theme.useToken();

  return (
    <>
      <Header
        style={{
          top: "0px",
          position: "sticky",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: darkMode
            ? "rgba(2, 8, 23, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap:"5px" }}>
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              type="text"
              onClick={showMobileMenu}
            />
          )}
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>REKAMI</h1>
        </div>
        <Navbar></Navbar>
      </Header>
    </>
  );
}
