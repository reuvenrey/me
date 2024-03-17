// IMPORTANT STANDARDS

shaftDiameterIN = [0.25, 0.5, 0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5,8];
shaftDiameterMM = [6.35, 12.7, 19.05, 22.23, 25.4, 28.58, 31.75, 34.93, 38.1, 44.45, 50.8, 57.15, 63.5, 69.85, 76.2, 82.55, 88.9, 95.25, 101.6, 114.3, 127, 139.7, 152.4, 165.1, 177.8, 190.5,203.2];

const ui = document.getElementById("projConsole"); // console: 	ui.innerHTML += "";

function fsTestInitial(){
  console.warn("Function Script Loaded!");
}

// GUESS THE DIAMERTER USING DE GOODMAN
function guessDiameter(fKf, fKfs, Nfos, Ma, Mm, Ta, Tm, fSe, fSu){

	fKf = parseFloat(fKf);
	fKfs = parseFloat(fKfs);
	Nfos = parseFloat(Nfos);
	Ma = parseFloat(Ma);
	Mm = parseFloat(Mm);
	Ta = parseFloat(Ta);
	Tm = parseFloat(Tm);
	fSe = parseFloat(fSe);
	fSu = parseFloat(fSu);

	
	 ui.innerHTML += "<p style='margin-left:40px;'><em>Guessing a new diameter d (DE-Goodman)</em> with FOS = " + Nfos + "</p>";
	 ui.innerHTML += "<p style='margin-left:40px;'>Kf = " + fKf + ", Kfs = " + fKfs + "</p>";
	 ui.innerHTML += "<p style='margin-left:40px;'>Se = " + fSe + ", Su = " + fSu + "</p>";
	    
	  var d_new = 0;
	
	  var $tempVar = 4*(Math.pow((fKf*Ma),2)) + 3*(Math.pow((fKfs*Ta),2));
	  let Aval = Math.sqrt($tempVar);
	
	  $tempVar = 4*(Math.pow((fKf*Mm),2)) + 3*(Math.pow((fKfs*Tm),2));
	  let Bval = Math.sqrt($tempVar);
	  
	   ui.innerHTML += "<p style='margin-left:40px;'>A Value: " + Aval + ", B Value: " + Bval + "</p>";

	$tempVar = ((16*Nfos) / Math.pi)*((Aval / fSe) + (Bval / fSu));
		console.log("Inner DE-Goodman Calculated = " + $tempVar);
	d_new = Math.pow($tempVar, (1/3));

	   console.log("D_new Calculated = " + d_new);
			
  return d_new;
}// returns new guess for diameter d (unscaled)
