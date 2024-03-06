import { Accessor, For, Show } from "solid-js";
import Application, { AppType } from "./Application";

export default function ResultList({
  results,
}: {
  results: Accessor<AppType[]>;
}) {
  return (
    <Show when={results().length > 0}>
      <ul class="flex flex-col gap-2 overflow-y-auto rounded-lg bg-white px-5 py-4 text-neutral-950 shadow shadow-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-neutral-950">
        <For each={results()}>
          {(result) => <Application appData={result} />}
        </For>
      </ul>
    </Show>
  );
}
