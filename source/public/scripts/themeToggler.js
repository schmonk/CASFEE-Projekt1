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
  // alert('check for style now');
  if (localStorage.getItem('themeState')) {
    console.log('there is a theme');
    if (localStorage.getItem('themeState') === 'light') {
      console.log('the theme should be light');
    } else {
      console.log('the theme should be dark');
      toggleTheme();
    }
  }
});
