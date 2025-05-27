import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";
import { getLibrary } from "../Services/media.service";
import { LibraryMediaItem } from "../Types/LibraryMediaItem";

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
  return <div></div>;
}
