import { invoke } from "@tauri-apps/api";
import { For, createEffect, createSignal, onMount } from "solid-js";

interface AppType {
  name: string;
  icon_path: string;
  app_path_exe: string;
  app_desktop_path: string;
}

function App() {
  const [searchTerm, setSearchTerm] = createSignal("");
  const [apps, setApps] = createSignal<AppType[]>();
  const [shownApps, setShownApps] = createSignal<AppType[]>();

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
      apps()
        ?.filter((app) => {
          return app.name.match(new RegExp(searchTerm(), "gi"));
        })
        .sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),
    );
  });

  return (
    <div class="flex flex-col justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
      <input
        class="h-fit w-full rounded-lg px-5 py-4 text-lg text-neutral-950 shadow shadow-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-950"
        placeholder="BigBrainSearch"
        value={searchTerm()}
        onKeyUp={(e) => setSearchTerm(e.currentTarget.value)}
      />

      <div class="flex flex-col overflow-y-auto">
        <For each={shownApps()}>{(app) => <p>{app.name}</p>}</For>
      </div>
    </div>
  );
}

export default App;
