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
  saveInLibrary,
  saveInterest,
} from "../../Services/media.service";
import { MediaType } from "../../Types/mediaType";
import { useState } from "react";
import useUser from "../../Hooks/useUser";
import MediaStatus from "../../Types/mediaStatus";

export default function MediaActionOptions({ anime }: { anime: FullAnime }) {
  const [interested, setInterested] = useState(anime.interest);
  const [savedInLibrary, setSavedInLibrary] = useState(anime.library);
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
        mediaType: MediaType.anime,
        value,
      });
      await saveInterest(value, anime.mal_id, MediaType.anime)
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

  const handleLibrary = async () => {
    if (!user) {
      return;
    }
    if (savedInLibrary == undefined) {
      await saveInLibrary(
        anime.mal_id,
        MediaStatus.ToWatch,
        MediaType.anime,
        false
      ).then((res) => {
        setSavedInLibrary(res.data.data);
      });
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
      <Button
        onClick={handleLibrary}
        color={savedInLibrary != undefined ? "green" : undefined}
        variant="solid"
        type="text"
        icon={<BookOutlined />}
        style={{ flex: 1 }}
      />
    </div>
  );
}
