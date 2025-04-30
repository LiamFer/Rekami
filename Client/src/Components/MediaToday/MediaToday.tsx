import { ReadOutlined } from "@ant-design/icons";
import { Skeleton, theme } from "antd";
import { useScheduleAnimes } from "../../Hooks/useScheduleAnimes";
import ScheduleCard from "./ScheduleCard";
import { motion } from "framer-motion";

export default function MediaToday() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const { token } = theme.useToken();
  const { scheduleAnimes, loading } = useScheduleAnimes(today);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          width: "100%",
        }}
      >
        <ReadOutlined
          style={{
            marginRight: 10,
            fontSize: "22px",
            padding: 10,
            backgroundColor: token.colorText,
            color: token.colorBgBase,
            borderRadius: "15px",
          }}
        />
        <h1>Airing Today</h1>
      </div>
      <div
        id="scrollableDiv"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "auto",
          padding: "0 16px",
          height: "310px",
          scrollbarWidth: "none",
        }}
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} active paragraph={{ rows: 3 }} />
            ))
          : scheduleAnimes.map((media) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <ScheduleCard media={media} />
              </motion.div>
            ))}
      </div>
    </div>
  );
}
