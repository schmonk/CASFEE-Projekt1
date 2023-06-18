const themeButton = document.getElementById('themeButton');
const localStorageThemeKey = 'myTheme';

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  if (themeButton.innerText === '☽') {
    themeButton.innerText = '☼';
    localStorage.setItem(localStorageThemeKey, 'dark');
  } else {
    themeButton.innerText = '☽';
    localStorage.setItem(localStorageThemeKey, 'light');
  }
}
themeButton.addEventListener('click', () => {
  toggleTheme();
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem(localStorageThemeKey)) {
    if (localStorage.getItem(localStorageThemeKey) === 'dark') {
      toggleTheme();
    }
  }
});
