const themeButton = document.getElementById("themeButton");
const lsThemeKey = "Theme";
import { valueStorage } from "./storage-manager.js";

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  if (themeButton.innerText === "☽") {
    themeButton.innerText = "☼";
    valueStorage.setItem(lsThemeKey, "dark");
  } else {
    themeButton.innerText = "☽";
    valueStorage.setItem(lsThemeKey, "light");
  }
}
themeButton.addEventListener("click", () => {
  toggleTheme();
});

export function initializeTheme() {
  if (valueStorage.getItem(lsThemeKey)) {
    if (valueStorage.getItem(lsThemeKey) === "dark") {
      toggleTheme();
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
});
