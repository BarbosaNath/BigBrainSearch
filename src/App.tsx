import { createSignal } from "solid-js";

interface AppType {
  name: string;
  icon_path: string;
  app_path_exe: string;
  app_desktop_path: string;
}

function App() {
  const [searchTerm, setSearchTerm] = createSignal("");

  return (
    <div class="flex h-screen justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
      <input
        class="h-fit w-full rounded-lg px-5 py-4 text-lg text-neutral-950 shadow shadow-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-950"
        placeholder="BigBrainSearch"
        value={searchTerm()}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
      />
    </div>
  );
}

export default App;
