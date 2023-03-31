import { Guest } from "../service/types";
import { useEffect, useState } from "react";
import { usePhotoService } from "../service/mphotoservice";

export function useGuest(): [boolean, Guest, () => void] {
  const ps = usePhotoService();
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [guest, setGuest] = useState<Guest>({
    name: "",
    email: "",
    verified: false,
    time: new Date(0).toISOString(),
  });
  const [refresh, setRefresh] = useState<boolean>(false);

  function checkGuest() {
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ps.isGuest();
        if (res) {
          const res1 = await ps.getGuest();
          setGuest(res1);
        }
        setIsGuest(res);
      } catch (error) {
        if (error instanceof Error) {
          alert("rror fetching account: " + error.toString());
        }
      }
    };
    void fetchData();
  }, [refresh, ps]);

  return [isGuest, guest, checkGuest];
}
