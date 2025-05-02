import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button, Rate, Spin, Tag, theme, Typography } from "antd";
import { useAnimeFull } from "../../Hooks/useAnimeFull";
import NotInterestedButton from "../Buttons/NotInterested/NotInterestedButton";
const { Paragraph, Text } = Typography;
import "./recommendationcard.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import CardTour from "./CardTour";

export default function RecommendationCard() {
  const { token } = theme.useToken();
  const [animeID, setID] = useState(42310);
  const { animeFull, loading } = useAnimeFull(animeID);

  const card = useRef(null);
  const buttons = useRef(null);
  const interested = useRef(null);
  const notInterested = useRef(null);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleInterest = () => {
    setID((prev) => (prev == 6 ? 42310 : 6));
  };

  if (loading || !animeFull)
    return (
      <motion.div
        key={animeID}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
          <Spin percent="auto" size="large" />
          <Text type="secondary">
            Wait a moment while we build your recommendations
          </Text>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      key={animeID}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        ref={card}
        className="recommendationCard"
        style={{
          border: `1px solid ${token.colorBorderSecondary}`,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <div
          style={{
            flex: "1 1 0%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "250px",
            overflow: "hidden",
          }}
        >
          <motion.div
            variants={containerVariants}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <motion.h1
              variants={itemVariants}
              style={{
                fontSize: "2rem",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {animeFull?.title}
            </motion.h1>

            <motion.div variants={itemVariants}>
              <Rate
                disabled
                allowHalf
                defaultValue={(animeFull?.score || 0) / 2}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Swiper
                style={{ width: "100%" }}
                spaceBetween={8}
                slidesPerView="auto"
                modules={[Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {[
                  ...(animeFull?.genres.map((g) => {
                    return { ...g, about: "genres" };
                  }) || []),
                  ...(animeFull?.themes.map((t) => {
                    return { ...t, about: "themes" };
                  }) || []),
                ].map((item) => (
                  <SwiperSlide key={item.name} style={{ width: "auto" }}>
                    <Tag color={item?.about == "genres" ? "default" : "red"}>
                      {item.name}
                    </Tag>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Paragraph ellipsis={{ rows: 6 }}>{animeFull?.synopsis}</Paragraph>
          </motion.div>

          <motion.div
            ref={buttons}
            variants={itemVariants}
            style={{ display: "flex", gap: "10px" }}
          >
            <NotInterestedButton onClick={handleInterest} ref={notInterested} />
            <Button
              ref={interested}
              onClick={handleInterest}
              style={{ height: "32px" }}
              type="primary"
            >
              Interested
            </Button>
          </motion.div>
        </div>

        <motion.img
          className="recommendationImage"
          src={animeFull?.images.jpg.large_image_url}
          alt="anime"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <CardTour
        card={card}
        buttons={buttons}
        interested={interested}
        notInterested={notInterested}
      />
    </motion.div>
  );
}
