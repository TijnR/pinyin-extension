import { chromeQueryClient } from "@/utils/chromeQueryClient";

export const sendEnable = async (enable: boolean) => {
  return chromeQueryClient({
    type: "enable",
    payload: { enable },
  });
};
