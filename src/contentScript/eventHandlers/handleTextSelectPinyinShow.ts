// import { pinyin as pinyinPro } from "pinyin-pro";

// const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });

// export const handleTextSelectPinyinShow = (payload: string) => {
//   const segmentedPayload = Array.from(segmenter.segment(payload));
//   const segmentedText = segmentedPayload.map(({ segment }) => segment);

//   const pinyinFull = segmentedPayload.map((segment) =>
//     pinyinPro(segment.segment, { nonZh: "removed" }).replace(/ /g, "")
//   );
//   console.log(pinyinFull);
//   alert(`${segmentedText.join(" ")} \n ${pinyinFull.join(" ")}`);
// };
