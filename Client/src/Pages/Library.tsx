import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";
import { getLibrary } from "../Services/media.service";
import { LibraryMediaItem } from "../Types/LibraryMediaItem";
import MediaCard from "../Components/Card/MediaCard";
import { BookOutlined } from "@ant-design/icons";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <h1>
          <BookOutlined />
          Your Library
        </h1>
      </div>
    </div>
  );
}
