import { invoke } from "@tauri-apps/api";
import { createEffect, createSignal, onMount } from "solid-js";
import { AppType } from "./components/Application";
import ResultList from "./components/ResultList";
import { LogicalSize, appWindow } from "@tauri-apps/api/window";

function App() {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [apps, setApps] = createSignal<AppType[]>([] as AppType[]);
  const [shownApps, setShownApps] = createSignal<AppType[]>([] as AppType[]);

  onMount(() => {
    async function get_apps() {
      const apps = await invoke("get_apps");
      setApps(apps as AppType[]);
    }
    get_apps();
  });

  createEffect(() => {
    if (searchTerm() === "") {
      setShownApps([]);
      return;
    }

    setShownApps(
      apps()?.filter((app) => {
        return app.name.match(new RegExp(searchTerm(), "gi"));
      }),
    );
  });

  createEffect(async () => {
    if (searchTerm().length <= 0) {
      await appWindow.setSize(new LogicalSize(600, 30));
      await appWindow.center();
    } else await appWindow.setSize(new LogicalSize(600, 600));
  });

  return (
    <main class="flex flex-col justify-center gap-2 bg-neutral-100 p-2 dark:bg-neutral-900">
      <input
        class="h-fit w-full rounded-lg px-5 py-4 text-lg text-neutral-950 shadow shadow-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-950"
        placeholder="BigBrainSearch"
        value={searchTerm()}
        onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
      />

      <ResultList results={shownApps} />
    </main>
  );
}

export default App;
