import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { sendEnable } from "./api";
import { useEffect } from "react";

export const OnOff = ({
  enable,
  setEnable,
}: {
  enable: boolean;
  setEnable: (enable: boolean) => void;
}) => {
  const { mutate: sendEvent } = useMutation({
    mutationFn: (enable: boolean) => {
      return sendEnable(enable);
    },
  });

  useEffect(() => {
    sendEvent(enable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enable]);

  const handleOnOff = (enable: boolean) => {
    setEnable(enable);
    sendEvent(enable);
  };
  return (
    <Switch
      checked={enable}
      onCheckedChange={handleOnOff}
      style={{ zoom: 1.5 }}
    />
  );
};
