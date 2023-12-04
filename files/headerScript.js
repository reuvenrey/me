const loader = document.getElementById("loader");

const footer = document.getElementById("footer");
const header = document.getElementById("header");

function runHeader(){
  console.log("Creating Header and Footer");
  header.innerHTML = "";
  header.innerHTML += "<div id='headerBar'> <img src='https://reuvenrey.github.io/me/files/images/favicon.ico'> <a href=''>Contact</a> <a href=''>Projects</a> <a href=''>Experience</a> <a href=''>Skills</a> </div>";
}

function finishLoad(){
  console.log("Destroy Loading Screen");
  loader.style.opacity = 0;
  setInterval(function () {loader.style.display = 'none'}, 500);
}

//<div id='headerSpacer'></div> <div id='headerBar'><img id='headerLogo' src='https://reuvenrey.github.io/me/files/images/favicon.ico'> <a href=''>Link 1</a></div>
