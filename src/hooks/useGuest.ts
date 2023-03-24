import { Guest } from "../api/types";
import { useEffect, useState } from "react";
import PhotosApi from "../api/photoapi";

export function useGuest(): [boolean, Guest, () => void] {
  const emptyGuest: Guest = {
    name: "",
    email: "",
    verified: false,
    time: new Date(0).toISOString(),
  };
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [guest, setGuest] = useState<Guest>(emptyGuest);
  const [refresh, setRefresh] = useState<boolean>(false);

  function checkGuest() {
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PhotosApi.isGuest();
        if (res) {
          const res1 = await PhotosApi.getGuest();
          setGuest(res1);
        }
        setIsGuest(res);
      } catch (error) {
        if (error instanceof Error) {
          alert("rror fetching account: " + error.toString());
        }
      }
    };
    fetchData();
  }, [refresh]);

  return [isGuest, guest, checkGuest];
}
