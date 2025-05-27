import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";
import { getLibrary } from "../Services/media.service";
import { LibraryMediaItem } from "../Types/LibraryMediaItem";
import MediaCard from "../Components/Card/MediaCard";

export default function Library() {
  const [library, setLibrary] = useState<LibraryMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLibrary = async () => {
      await getLibrary().then((res) => {
        setLibrary(res.data);
        setLoading(false);
        console.log(res.data)
      });
    };
    fetchLibrary();
  }, []);
  if (loading) return <Loading />;
  return <div>{library.map(media => <MediaCard media={media._doc} loading={false}/>)}</div>;
}
