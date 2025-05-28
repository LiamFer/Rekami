import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect, useState } from "react";
import { refreshToken } from "./Services/server.service";
import { useDispatch } from "react-redux";
import { setUser } from "./Redux/userSlice";
import Loading from "./Components/Loading/Loading";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToken = async () => {
      const response = await refreshToken();
      if (response.success) {
        dispatch(setUser(response.data));
      }
      setLoading(false);
    };
    fetchToken();
  }, []);

  if (loading) return <Loading />;

  return <RouterProvider router={router} />;
}
