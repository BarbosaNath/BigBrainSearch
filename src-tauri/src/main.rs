// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use applications;
use std::path::PathBuf;
use serde::ser::{Serialize, SerializeStruct, Serializer};

pub struct App {
    pub name: String,
    pub icon_path: Option<PathBuf>,
    pub app_path_exe: PathBuf,
    pub app_desktop_path: PathBuf,
}

// This is what #[derive(Serialize)] would generate.
impl Serialize for App {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut s = serializer.serialize_struct("App", 4)?;
        s.serialize_field("name", &self.name)?;
        s.serialize_field("icon_path", &self.icon_path)?;
        s.serialize_field("app_path_exe", &self.app_path_exe)?;
        s.serialize_field("app_desktop_path", &self.app_desktop_path)?;
        s.end()
    }
}

#[tauri::command]
fn get_apps() -> Vec<App> {
    let raw_apps = applications::get_apps();
    let mut treated_apps:Vec<App> = Vec::new();
    for raw_app in raw_apps {
        let treated_app = App { 
            name: raw_app.name,
            icon_path: raw_app.icon_path,
            app_path_exe: raw_app.app_path_exe,
            app_desktop_path: raw_app.app_desktop_path};
        treated_apps.push(treated_app);       
    }
    treated_apps
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_apps])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
