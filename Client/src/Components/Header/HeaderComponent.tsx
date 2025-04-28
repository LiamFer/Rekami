import { Layout, theme } from "antd";
import { useTheme } from "../../Context/Theme";
import Navbar from "./Navbar";
const { Header } = Layout;

export default function HeaderComponent() {
  const { darkMode } = useTheme();
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
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>REKAMI</h1>
        <Navbar></Navbar>
      </Header>
    </>
  );
}
