import { useChromeState } from "../../../hooks/useChromeState";
import { Button } from "../../ui/button";
import { Slider } from "../../ui/slider";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@phosphor-icons/react";
import { MAX, MIN, STEP } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { sendZoom } from "./api";
import { CHROME_STORAGE_KEYS } from "@/utils/constants";

export const Zoom = () => {
  const { mutate: sendEvent } = useMutation({
    mutationFn: (zoom: number[]) => {
      return sendZoom(zoom);
    },
  });
  const [zoom, setZoom] = useChromeState<number[]>(CHROME_STORAGE_KEYS.zoom, [
    1.25,
  ]);

  const handleZoom = (value: number[]) => {
    setZoom(value);
    sendEvent(value);
  };

  const handleZoomIn = () => {
    handleZoom([Math.min(zoom[0] + STEP, MAX)]);
  };
  const handleZoomOut = () => {
    handleZoom([Math.max(zoom[0] - STEP, MIN)]);
  };

  return (
    <>
      <div className="flex gap-2 items-center relative py-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          disabled={zoom[0] <= MIN}
        >
          <span className="sr-only">Zoom out</span>
          <MagnifyingGlassMinusIcon size={40} />
        </Button>
        <Slider
          min={0.25}
          max={4}
          step={0.25}
          defaultValue={[1]}
          className="w-40 min-w-40"
          onValueChange={handleZoom}
          value={zoom}
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          disabled={zoom[0] >= MAX}
        >
          <span className="sr-only">Zoom in</span>
          <MagnifyingGlassPlusIcon size={32} />
        </Button>
        <span className="absolute top-0 right-0 left-0 text-center text-sm">
          zoom: {zoom[0].toFixed(2)}x
        </span>
      </div>
    </>
  );
};
