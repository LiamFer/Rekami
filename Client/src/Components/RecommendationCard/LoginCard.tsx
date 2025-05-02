import { motion } from "motion/react";
import { Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "./logincard.css";

export default function LoginCard() {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/login");

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: token.colorBgContainer,
          border: "1px solid",
          borderColor: token.colorBorderSecondary,
          borderRadius: "10px",
          width: "100%",
          height: "350px",
          minHeight: "350px",
          textAlign: "center",
          gap: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{ position: "absolute", height: "650px", zIndex: 0 }}
          className="loginCard"
        ></div>

        <div style={{ zIndex: 1, textAlign: "center", padding: "0 1rem" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: "bold",
            }}
          >
            WELCOME TO <span style={{color:token.colorPrimary}}>REKAMI</span>
          </h1>
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(1.25rem, 2vw, 2rem)",
              marginTop: "0.5rem",
            }}
          >
            CAN WE GUESS YOUR NEXT FAVORITE{" "}
            <TypeAnimation
              sequence={["ANIME?", 3000, "MANGA?", 3000, "MOVIE?", 3500]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
            />
          </h3>
          <p
            style={{
              color: "gray",
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              marginTop: "1rem",
            }}
          >
            Create an account to start getting recommendations!
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "1.5rem",
            }}
          >
            <Button size="large" onClick={goToLoginPage} type="primary">
              Sign in
            </Button>
            <Button size="large" onClick={goToLoginPage}>Register</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
