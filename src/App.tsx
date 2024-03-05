import { createSignal } from "solid-js";

function App() {
  const [searchTerm, setSearchTerm] = createSignal("");

  return (
    <div class="flex h-screen justify-center bg-neutral-100 p-2 dark:bg-neutral-900">
      <input
        class="h-fit w-full rounded-lg px-5 py-2 leading-normal text-neutral-950 shadow shadow-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-950"
        placeholder="BigBrainSearch"
        value={searchTerm()}
        onChange={(e) => setSearchTerm(e.currentTarget.value)}
      />
    </div>
  );
}

export default App;
