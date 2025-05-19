import {
  ShareAltOutlined,
  DislikeOutlined,
  LikeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import { interestValue } from "../../Types/interestValue";
import { editInterest, saveInterest } from "../../Services/media.service";
import { mediaType } from "../../Types/mediaType";
import { useState } from "react";

export default function MediaActionOptions({ anime }: { anime: FullAnime }) {
  const [interested,setInterested] = useState(anime.interest?.value)
  const { token } = theme.useToken();

  const handleInterest = async (value: interestValue) => {
    if (value == interested) {
      return;
    }
    if (anime.interest == undefined) {
      await saveInterest(value, anime.mal_id, mediaType.anime);
    } else {
      await editInterest(value,anime.interest.id)
    }
    setInterested(value)
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
          interested == interestValue.notInterested
            ? "red"
            : undefined
        }
        icon={<DislikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button
        onClick={() => handleInterest(interestValue.interested)}
        variant="solid"
        type="text"
        color={
          interested == interestValue.interested
            ? "blue"
            : undefined
        }
        icon={<LikeOutlined />}
        style={{ flex: 1 }}
      />
      <Button type="text" icon={<BookOutlined />} style={{ flex: 1 }} />
    </div>
  );
}
