const themeButton = document.getElementById('themeButton');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  if (themeButton.innerText === '☽') {
    themeButton.innerText = '☼';
  } else {
    themeButton.innerText = '☽';
  }
});
