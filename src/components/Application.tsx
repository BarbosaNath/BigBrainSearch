import { convertFileSrc } from "@tauri-apps/api/tauri";
import { Show, createSignal, onMount } from "solid-js";

export interface AppType {
  name: string;
  icon_path: string;
  app_path_exe: string;
  app_desktop_path: string;
}

export default function Application({ appData }: { appData: AppType }) {
  const [imagePath, setImagePath] = createSignal<string | null>(null);

  async function updatePaths() {
    setImagePath(convertFileSrc(appData.icon_path));
  }

  onMount(() => {
    updatePaths();
  });

  return (
    <li>
      <button class="flex items-center gap-2">
        <Show
          when={imagePath() !== "asset://localhost/null"}
          fallback={<div class="size-8" />}
        >
          <img class="size-8" src={imagePath() || ""} />
        </Show>

        <div class="text-start">
          <div>{appData.name}</div>
          <Show
            when={appData.app_path_exe}
            fallback={
              <div class="text-xs text-neutral-400">
                {appData.app_desktop_path}
              </div>
            }
          >
            <div class="text-xs text-neutral-400">{appData.app_path_exe}</div>
          </Show>
        </div>
      </button>
    </li>
  );
}
