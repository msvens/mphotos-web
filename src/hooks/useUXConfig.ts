import { UXConfig } from "../api/types";
import PhotosApi from "../api/photoapi";
import { useEffect, useState } from "react";

export function useUXConfig(): [UXConfig, () => void] {
  const [uxConfig, setUXConfig] = useState<UXConfig>(PhotosApi.defaultUxConfig);
  const [refresh, setRefresh] = useState<boolean>(false);

  function checkUXConfig() {
    setRefresh((prev) => !prev);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await PhotosApi.getUXConfig();
        setUXConfig(res);
      } catch (error) {
        if (error instanceof Error) {
          alert("error fetching uxConfig: " + error.toString());
        }
      }
    };
    fetchData();
  }, [refresh]);

  return [uxConfig, checkUXConfig];
}
