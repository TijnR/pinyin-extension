import { Button } from "@/components/ui/button";
import { useChromeState } from "@/hooks/useChromeState";
import { CHROME_STORAGE_KEYS } from "@/utils/constants";
import { pinyin } from "pinyin-pro";

const segmenter = new Intl.Segmenter("zh-CN", { granularity: "word" });

export const Collection = () => {
  const [selection, setSelection] = useChromeState<string[]>(
    CHROME_STORAGE_KEYS.selection,
    []
  );

  if (selection.length === 0) {
    return <p>No collection</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button onClick={() => setSelection([])} variant="outline" size="sm">
          Clear
        </Button>
      </div>
      <div className="w-100 border border-border rounded-lg bg-card shadow-md overflow-y-auto overflow-x-hidden p-4">
        <ul className="space-y-2">
          {selection.map((item) => (
            <li
              key={item}
              className="border-b border-border pb-2 last:border-b-0 flex flex-wrap gap-x-1 gap-y-0.5"
            >
              {Array.from(segmenter.segment(item)).map((segment) => {
                const cleanedSegment = segment.segment.replace(
                  /[^\p{Script=Han}。；？，]/gu,
                  ""
                );
                const isPunctuation = /^[；？，]+$/.test(cleanedSegment);

                if (isPunctuation) {
                  return (
                    <span
                      key={segment.segment}
                      className="text-3xl font-normal"
                    >
                      {cleanedSegment}
                    </span>
                  );
                }

                return (
                  <ruby key={segment.segment} className="text-3xl font-normal">
                    {cleanedSegment}
                    <rt>
                      {pinyin(segment.segment, { nonZh: "removed" }).replace(
                        / /g,
                        ""
                      )}
                    </rt>
                  </ruby>
                );
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
