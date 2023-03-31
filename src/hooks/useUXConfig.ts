import { UXConfig } from "../service/types";
import { useEffect, useState } from "react";
import { usePhotoService } from "../service/mphotoservice";
import { DefaultUxConfig } from "../service/apiutil";

export function useUXConfig(): [UXConfig, () => void] {
  const ps = usePhotoService();
  const [uxConfig, setUXConfig] = useState<UXConfig>(DefaultUxConfig);
  const [refresh, setRefresh] = useState<boolean>(false);

  function checkUXConfig() {
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ps.getUXConfig();
        setUXConfig(res);
      } catch (error) {
        if (error instanceof Error) {
          alert("error fetching uxConfig: " + error.toString());
        }
      }
    };
    void fetchData();
  }, [refresh, ps]);

  return [uxConfig, checkUXConfig];
}
