import { OnOff } from "./components/shared/OnOff/OnOff";
import { Selections } from "./components/shared/Selection/Selections";
import { Zoom } from "./components/shared/Zoom/Zoom";
import { useChromeState } from "./hooks/useChromeState";
import { cn } from "./lib/utils";
import { CHROME_STORAGE_KEYS } from "./utils/constants";

function App() {
  const [enable, setEnable] = useChromeState<boolean>(
    CHROME_STORAGE_KEYS.enable,
    true
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 w-dvw">
      <img src="/logo.svg" alt="logo" className="w-40" />
      {/* {disableExtension && (
        <div className="opacity-30 pointer-events-none">
          <p>Extension Could not find any Chinese characters on the page</p>
        </div>
      )} */}
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-8"
          // disableExtension && "opacity-30 pointer-events-none"
        )}
      >
        <h2 className="text-2xl font-thin ">Auto mode: </h2>
        <OnOff enable={enable} setEnable={setEnable} />
        <div
          className={cn(
            "flex flex-col items-center gap-2",
            !enable && "opacity-30 pointer-events-none"
          )}
        >
          <Zoom />
        </div>
        <h2 className="text-2xl font-thin ">Selection mode: </h2>
        <Selections />
      </div>
    </div>
  );
}

export default App;
