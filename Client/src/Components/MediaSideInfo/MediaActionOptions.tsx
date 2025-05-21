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
      await removeInterest(interested.id);
      setInterested(undefined);
      return;
    } else if (interested == undefined) {
      const newInterest = await saveInterest(
        value,
        anime.mal_id,
        mediaType.anime
      ).then((res) => res.data.data);
      setInterested(newInterest);
    } else {
      const editedInterest = await editInterest(value, interested.id).then(
        (res) => res.data
      );
      setInterested(editedInterest);
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
