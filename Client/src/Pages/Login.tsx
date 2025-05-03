import RegisterForm from "./../Components/RegisterForm/RegisterForm";
import GoogleButton from "./../Components/Buttons/GoogleButton/GoogleButton";
import { useEffect } from "react";
import { useAppConfigs } from "../Context/App";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";

export default function Login() {
  const { toggleTheme, darkMode } = useAppConfigs();

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
            justifyContent: "space-around ",
            alignItems: "center",
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
            <h1 style={{ fontWeight: "bold", margin: "0px" }}>WE RECOMMEND</h1>
          </div>
          <RegisterForm />
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
