/* @refresh reload */
import { render } from "solid-js/web";

import "./styles.css";
import App from "./App";

import { LogicalSize, appWindow } from "@tauri-apps/api/window";
await appWindow.setSize(new LogicalSize(600, 30));
await appWindow.center();

render(() => <App />, document.getElementById("root") as HTMLElement);
