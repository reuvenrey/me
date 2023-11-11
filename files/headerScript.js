const loader = document.getElementById("loader");

const footer = document.getElementById("footer");

function runHeader(){
  console.log("Creating Header and Footer");
}

function finishLoad(){
  console.log("Destroy Loading Screen");
  loader.style.opacity = 0;
  setInterval(function () {loader.style.display = 'none'}, 500);
}
