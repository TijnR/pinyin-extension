import { chromeQueryClient } from "@/utils/chromeQueryClient";

export const sendZoom = async (zoom: number[]) => {
  return chromeQueryClient({
    type: "zoom",
    payload: { zoom: zoom[0] },
  });
};
