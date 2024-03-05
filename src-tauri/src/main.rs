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

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
