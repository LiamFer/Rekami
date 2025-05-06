import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useAnimeCharacters } from "../../Hooks/useAnimeCharacters";

export default function MediaCharacters({ id } : {id:string | undefined}) {
  const { characters, loading } = useAnimeCharacters(id);
  if (loading || !characters) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        maxWidth: "1200px",
      }}
    >
      <Swiper
        style={{
          width: "100%",
          padding: 8,
          margin: 0,
        }}
        slidesPerView={3}
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          800: { slidesPerView: 4 },
          950: { slidesPerView: 5 },
        }}
      >
        {characters.map((c) => (
          <SwiperSlide key={c?.character.mal_id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <CharacterCard character={c} loading={loading}></CharacterCard>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
