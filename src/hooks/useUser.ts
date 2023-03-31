import { User } from "../service/types";
import { useEffect, useState } from "react";
import { usePhotoService } from "../service/mphotoservice";

export default function useUser(): [boolean, User, () => void] {
  const ps = usePhotoService();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ name: "", bio: "", pic: "" });
  const [refresh, setRefresh] = useState<boolean>(false);

  function checkUser() {
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ps.isLoggedIn();
        const res1 = await ps.getUser();
        setUser(res1);
        setIsUser(res);
      } catch (error) {
        if (error instanceof Error) {
          alert("rror fetching account: " + error.toString());
        }
      }
    };
    void fetchData();
  }, [refresh, ps]);

  return [isUser, user, checkUser];
}
