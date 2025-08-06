import { CLASS_SHOW_PINYIN } from "../const";

export const handleOnOff = (enable: boolean) => {
  document.body.classList.toggle(CLASS_SHOW_PINYIN, enable);
};
