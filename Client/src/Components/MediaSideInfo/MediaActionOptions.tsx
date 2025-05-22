import {
  ShareAltOutlined,
  DislikeOutlined,
  LikeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import { interestValue } from "../../Types/interestValue";
import {
  editInterest,
  removeInterest,
  saveInterest,
} from "../../Services/media.service";
import { mediaType } from "../../Types/mediaType";
import { useState } from "react";
import useUser from "../../Hooks/useUser";

export default function MediaActionOptions({ anime }: { anime: FullAnime }) {
  const [interested, setInterested] = useState(anime.interest);
  const { user } = useUser();
  const { token } = theme.useToken();

  const handleInterest = async (value: interestValue) => {
    if (!user) {
      return;
    }
    if (value == interested?.value) {
      setInterested(undefined);
      await removeInterest(interested.id);
      return;
    } else if (interested == undefined) {
      setInterested({
        id: 0,
        mediaId: anime.mal_id,
        mediaType: mediaType.anime,
        value,
      });
      await saveInterest(value, anime.mal_id, mediaType.anime)
        .then((res) => setInterested(res.data.data))
        .catch(() => setInterested(undefined));
    } else {
      const previous = interested;
      setInterested({ ...previous, value: previous.value });
      await editInterest(value, interested.id)
        .then((res) => setInterested(res.data))
        .catch(() => setInterested(previous));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: token.colorBgContainerDisabled,
      }}
    >
      <Button type="text" icon={<ShareAltOutlined />} style={{ flex: 1 }} />
      <Button
        onClick={() => handleInterest(interestValue.notInterested)}
        variant="solid"
        type="text"
        color={
          interested?.value == interestValue.notInterested ? "red" : undefined
        }
        icon={<DislikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button
        onClick={() => handleInterest(interestValue.interested)}
        variant="solid"
        type="text"
        color={
          interested?.value == interestValue.interested ? "blue" : undefined
        }
        icon={<LikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button type="text" icon={<BookOutlined />} style={{ flex: 1 }} />
    </div>
  );
}
