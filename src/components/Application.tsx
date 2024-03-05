import { Show } from "solid-js";

export interface AppType {
  name: string;
  icon_path: string;
  app_path_exe: string;
  app_desktop_path: string;
}

export default function Application({ appData }: { appData: AppType }) {
  return (
    <button class="flex gap-2">
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
  );
}
