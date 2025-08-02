import { useChromeState } from "../../../hooks/useChromeState";
import { useMutation } from "@tanstack/react-query";
import { sendDirection } from "./api";
import { Switch } from "@/components/ui/switch";
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";

export const TopBottom = () => {
  const { mutate: sendEvent } = useMutation({
    mutationFn: (direction: "top" | "bottom") => {
      return sendDirection(direction);
    },
  });
  const [topBottom, setTopBottom] = useChromeState<"top" | "bottom">(
    "topBottom",
    "top"
  );

  const handleTop = (direction: "top" | "bottom") => {
    sendEvent(direction);
    setTopBottom(direction);
  };

  return (
    <div className="flex gap-2 items-center">
      <span>
        <ArrowUpIcon size={16} /> Top
      </span>
      <Switch
        checked={topBottom === "bottom"}
        onCheckedChange={() =>
          handleTop(topBottom === "bottom" ? "top" : "bottom")
        }
      />
      <span>
        Bottom <ArrowDownIcon size={16} />
      </span>
    </div>
  );
};
