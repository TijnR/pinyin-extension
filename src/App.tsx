import { OnOff } from "./components/shared/OnOff/OnOff";
import { Collection } from "./components/shared/Collection/Collection";
import { Zoom } from "./components/shared/Zoom/Zoom";
import { useChromeState } from "./hooks/useChromeState";
import { CHROME_STORAGE_KEYS } from "./utils/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { cn } from "./lib/utils";

function App() {
  const [enable, setEnable] = useChromeState<boolean>(
    CHROME_STORAGE_KEYS.enable,
    true
  );
  const [activeTab, setActiveTab] = useChromeState<"auto" | "collection">(
    CHROME_STORAGE_KEYS.activeTab,
    "auto"
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-4 w-dvw">
      <img src="/logo.svg" alt="logo" className="w-40" />
      <h1 className="sr-only">Pinyin Extension</h1>
      <div className="flex flex-col items-center justify-center gap-8 w-80">
        <Tabs
          defaultValue="auto"
          className="flex flex-col w-full items-center justify-center m-auto backdrop-blur-2xl"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as "auto" | "collection");
            setEnable(value === "auto" ? true : false);
          }}
        >
          <TabsList className="self-center mb-4">
            <TabsTrigger value="auto">Auto</TabsTrigger>
            <TabsTrigger value="collection">Collection</TabsTrigger>
          </TabsList>
          <TabsContent
            value="auto"
            className="flex flex-col items-center justify-center gap-4"
          >
            <OnOff enable={enable} setEnable={setEnable} />
            <div className={cn(!enable && "pointer-events-none opacity-50")}>
              <Zoom />
            </div>
          </TabsContent>
          <TabsContent
            value="collection"
            className="flex flex-col items-center justify-center gap-4"
          >
            <Collection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
