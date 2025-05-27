import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading";

export default function Library() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);


  if (loading) return <Loading />;
  return <div>Library</div>;
}
