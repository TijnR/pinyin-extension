import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { sendEnable } from "./api";

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
