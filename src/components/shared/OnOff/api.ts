import { chromeQueryClient } from "@/utils/chromeQueryClient";

export const sendOnOff = async (onOff: boolean) => {
  return chromeQueryClient({
    type: "onOff",
    payload: { onOff },
  });
};
