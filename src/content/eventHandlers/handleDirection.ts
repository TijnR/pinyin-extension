import { CLASS_SHOW_BOTTOM, CLASS_SHOW_TOP } from "../const";

export const handleDirection = (direction: "top" | "bottom") => {
  document.body.classList.add(
    direction === "bottom" ? CLASS_SHOW_BOTTOM : CLASS_SHOW_TOP
  );
  document.body.classList.remove(
    direction === "bottom" ? CLASS_SHOW_TOP : CLASS_SHOW_BOTTOM
  );
};
