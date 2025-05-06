import { Button, Layout, theme } from "antd";
import { useAppConfigs } from "../../Context/App";
import Navbar from "./Navbar";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function HeaderComponent() {
  const { darkMode, isMobile, showMobileMenu } = useAppConfigs();
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Header
        style={{
          top: "-1px",
          position: "sticky",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 20px",
          backgroundColor: darkMode
            ? "rgba(2, 8, 23, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          backdropFilter: "blur(10px)",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              type="text"
              onClick={showMobileMenu}
            />
          )}
          <img
            src={darkMode ? "./darkModeLogo.svg" : "./lightModeLogo.svg"}
            alt=""
            width={30}
          />
          <h1
            onClick={handleClick}
            style={{ margin: 0, fontSize: "1.5rem", cursor: "pointer" }}
          >
            Rekami
          </h1>
        </div>
        <Navbar></Navbar>
      </Header>
    </>
  );
}
