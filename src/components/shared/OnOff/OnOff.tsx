import { Switch } from "@/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { sendOnOff } from "./api";

export const OnOff = ({
  onOff,
  setOnOff,
}: {
  onOff: boolean;
  setOnOff: (onOff: boolean) => void;
}) => {
  const { mutate: sendEvent } = useMutation({
    mutationFn: (onOff: boolean) => {
      return sendOnOff(onOff);
    },
  });

  const handleOnOff = (onOff: boolean) => {
    setOnOff(onOff);
    sendEvent(onOff);
  };

  return (
    <Switch
      checked={onOff}
      onCheckedChange={handleOnOff}
      style={{ zoom: 1.5 }}
    />
  );
};
