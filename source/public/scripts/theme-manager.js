const themeButton = document.getElementById('themeButton');

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  if (themeButton.innerText === '☽') {
    themeButton.innerText = '☼';
    localStorage.setItem('themeState', 'dark');
  } else {
    themeButton.innerText = '☽';
    localStorage.setItem('themeState', 'light');
  }
}
themeButton.addEventListener('click', () => {
  toggleTheme();
});

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('themeState')) {
    if (localStorage.getItem('themeState') === 'dark') {
      toggleTheme();
    }
  }
});
