import { chromeQueryClient } from "@/utils/chromeQueryClient";

// Legacy function for backward compatibility
export const sendDirection = async (direction: "top" | "bottom") => {
  return chromeQueryClient({ type: "direction", payload: { direction } });
};
