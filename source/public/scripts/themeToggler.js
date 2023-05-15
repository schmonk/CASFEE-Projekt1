const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if(themeButton.innerText === '☽'){
    themeButton.innerText = '☼';
  } else {
    themeButton.innerText = '☽';
  };
});