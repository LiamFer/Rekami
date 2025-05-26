import {
  ShareAltOutlined,
  DislikeOutlined,
  LikeOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Button, Select, theme } from "antd";
import { FullAnime } from "../../Types/FullAnime";
import { interestValue } from "../../Types/interestValue";
import {
  deleteInLibrary,
  editInLibrary,
  editInterest,
  removeInterest,
  saveInLibrary,
  saveInterest,
} from "../../Services/media.service";
import { MediaType } from "../../Types/mediaType";
import { useState } from "react";
import useUser from "../../Hooks/useUser";
import MediaStatus from "../../Types/mediaStatus";

const mediaStatusOptions = [
  { value: MediaStatus.Watched, label: "Watched" },
  { value: MediaStatus.Watching, label: "Watching" },
  { value: MediaStatus.ToWatch, label: "To Watch" },
  { value: MediaStatus.Paused, label: "Paused" },
  { value: MediaStatus.Planning, label: "Planning" },
];

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
        anime.library = res.data.data;
      });
    } else {
      await deleteInLibrary(anime.mal_id).then(() => {
        setSavedInLibrary(undefined);
        anime.library = undefined;
      });
    }
  };

  const handleEdit = async (value: {
    favorite?: boolean;
    status?: MediaStatus;
  }) => {
    if(savedInLibrary==undefined) return
    const actual = {
      favorite: savedInLibrary.favorite,
      status: savedInLibrary.status,
      ...value,
    };
    await editInLibrary(anime.mal_id, actual.status, actual.favorite).then(
      (res) => {
        console.log(res.data)
        setSavedInLibrary(res.data);
        anime.library = res.data;
      }
    );
  };

  return (
    <>
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
      {savedInLibrary && (
        <Select
          defaultValue={savedInLibrary.status}
          style={{ width: "100%", marginTop: "10px", textAlign: "center" }}
          options={mediaStatusOptions}
          onChange={(value) => handleEdit({ status: value })}
        />
      )}
    </>
  );
}
