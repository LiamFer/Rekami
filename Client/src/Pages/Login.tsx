import RegisterForm from "./../Components/RegisterForm/RegisterForm";
import { useEffect, useState } from "react";
import { useAppConfigs } from "../Context/App";
import { Content } from "antd/es/layout/layout";
import { Layout, Segmented, Typography } from "antd";
import LoginForm from "../Components/LoginForm/LoginForm";
const { Text } = Typography;

export default function Login() {
  const { toggleTheme, darkMode } = useAppConfigs();
  const [mode, setMode] = useState("Login");

  useEffect(() => {
    if (darkMode) {
      toggleTheme();
    }
  }, []);

  return (
    <Layout>
      <Content
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "center",
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "20px",
          gap: "20px",
          flexWrap: "wrap-reverse",
        }}
      >
        <div
          style={{
            flex: "1 1 400px",
            maxWidth: "600px",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            margin: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              width={60}
              src={darkMode ? "./darkModeLogo.svg" : "./lightModeLogo.svg"}
              alt=""
            />
            <h1 style={{ fontWeight: "bold", margin: "0px" }}>REKAMI</h1>
            <Text style={{ fontSize: "1.2rem" }} type="secondary">
              We Recommend, you Watch.
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              width: "100%",
              maxWidth: "400px",
              flexGrow: 1,
            }}
          >
            <Segmented
              options={["Login", "Register"]}
              onChange={(value) => setMode(value)}
              block
            />
            {mode == "Register" ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>

        <div
          style={{
            flex: "1 1 300px",
            minWidth: "300px",
          }}
        >
          <img
            src="https://wallpapercave.com/wp/wp6058611.jpg"
            alt="Wallpaper"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </div>
      </Content>
    </Layout>
  );
}
