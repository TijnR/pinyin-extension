import { CLASS_CHINESE_PINYIN } from "../const";

export const handleZoom = (zoom: number) => {
  [...document.querySelectorAll(`.${CLASS_CHINESE_PINYIN}`)].forEach(
    (element) => {
      (element as HTMLElement).dataset.zoom = zoom.toString();
    }
  );
};
