import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";
import { getLibrary } from "../Services/media.service";

export default function Library() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
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
  return <div>Library</div>;
}
