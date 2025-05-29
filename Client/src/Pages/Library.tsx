import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";
import { getLibrary } from "../Services/media.service";
import { LibraryMediaItem } from "../Types/LibraryMediaItem";
import MediaCard from "../Components/Card/MediaCard";
import { ArrowLeftOutlined, BookOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { type } from "./../../../Server/Backend/src/MongoDB/anime.schema";

export default function Library() {
  const [library, setLibrary] = useState<LibraryMediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchLibrary = async () => {
      await getLibrary().then((res) => {
        setLibrary(res.data);
        setLoading(false);
      });
    };
    fetchLibrary();
  }, []);
  if (loading) return <Loading />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button type="text" iconPosition="start" icon={<ArrowLeftOutlined />}>
        Back to Home
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          backgroundColor: "red",
          width: "100%",
        }}
      >
        <h1>
          <BookOutlined />
          Your Library
        </h1>
      </div>
      {/* {library.map(media => <MediaCard media={media._doc} loading={false}/>)} */}
    </div>
  );
}
