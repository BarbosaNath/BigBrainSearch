import { Accessor, For } from "solid-js";
import Application, { AppType } from "./Application";

export default function ResultList({
  results,
}: {
  results: Accessor<AppType[]>;
}) {
  return (
    <div class="flex flex-col overflow-y-auto">
      <For each={results()}>{(result) => <Application appData={result} />}</For>
    </div>
  );
}
