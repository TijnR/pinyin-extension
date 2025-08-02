import { OnOff } from "./components/shared/OnOff/OnOff";
import { TopBottom } from "./components/shared/TopBottom/TopBottom";
import { Zoom } from "./components/shared/Zoom/Zoom";
import { useChromeState } from "./hooks/useChromeState";
import { cn } from "./lib/utils";

function App() {
  const [onOff, setOnOff] = useChromeState<boolean>("onOff", true);
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 w-dvw">
      <img src="/logo.svg" alt="logo" className="w-40" />
      <OnOff onOff={onOff} setOnOff={setOnOff} />
      <div
        className={cn(
          "flex flex-col items-center gap-2",
          !onOff && "opacity-30 pointer-events-none"
        )}
      >
        <TopBottom />
        <Zoom />
      </div>
    </div>
  );
}

export default App;
