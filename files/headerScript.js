const loader = document.getElementById("loader");

const footer = document.getElementById("footer");
const header = document.getElementById("header");

const linkHead = "https://reuvenrey.github.io/me/";
const link1 = linkHead + "experience";
const link2 = linkHead + "projects";
const link3 = linkHead + "education";

function runHeader(){
  console.log("Creating Header and Footer");
  header.innerHTML = "<div id='headerSpacer'></div>";
  header.innerHTML += "<div id='headerBar'> <img id='headerLogo' src='https://reuvenrey.github.io/me/files/images/favicon.ico' onclick='window.open("+'"'+linkHead+'","_self"'+")'> <a href='"+link1+"'>Contact</a> <a href='"+link2+"'>Projects</a> <a href='"+link1+"'>Experience</a> <a href='"+link3+"'>Education</a> </div>";
}

function finishLoad(){
  console.log("Destroy Loading Screen");
  loader.style.opacity = 0;
  setInterval(function () {loader.style.display = 'none'}, 500);
}

//<div id='headerSpacer'></div> <div id='headerBar'><img id='headerLogo' src='https://reuvenrey.github.io/me/files/images/favicon.ico'> <a href=''>Link 1</a></div>
