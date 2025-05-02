import { motion } from "motion/react";
import { Button, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

export default function LoginCard() {
  const { token } = theme.useToken();
  const navigate = useNavigate()
  const goToLoginPage = () => navigate("/login")

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
        }}
      >
        <h1 style={{ margin: 0 }}>WELCOME TO REKAMI</h1>
        <h3 style={{ margin: 0 }}>CAN WE GUESS YOUR NEXT FAVORITE ANIME?</h3>
        <Text type="secondary">
          Create an Account to start getting Recommendations!
        </Text>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={goToLoginPage} type="primary">Sign in</Button>
          <Button onClick={goToLoginPage}>Register</Button>
        </div>
      </div>
    </motion.div>
  );
}
