const themeButton = document.getElementById("themeButton");
const localStorageThemeKey = "myTheme";
import { valueStorage } from "./storage-manager.js";

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  if (themeButton.innerText === "☽") {
    themeButton.innerText = "☼";
    valueStorage.setItem(localStorageThemeKey, "dark");
  } else {
    themeButton.innerText = "☽";
    valueStorage.setItem(localStorageThemeKey, "light");
  }
}
themeButton.addEventListener("click", () => {
  toggleTheme();
});

document.addEventListener("DOMContentLoaded", () => {
  if (valueStorage.getItem(localStorageThemeKey)) {
    if (valueStorage.getItem(localStorageThemeKey) === "dark") {
      toggleTheme();
    }
  }
});
