// IMPORTANT STANDARDS

shaftDiameterIN = [0.25, 0.5, 0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5,8];
shaftDiameterMM = [6.35, 12.7, 19.05, 22.23, 25.4, 28.58, 31.75, 34.93, 38.1, 44.45, 50.8, 57.15, 63.5, 69.85, 76.2, 82.55, 88.9, 95.25, 101.6, 114.3, 127, 139.7, 152.4, 165.1, 177.8, 190.5,203.2];

const ui = document.getElementById("projConsole"); // console: 	ui.innerHTML += "";

function fsTestInitial(){
  console.warn("Function Script Loaded!");
}

// ROUND D GUESS TO NEAREST STANDARD
function roundToStandard(d_value, funits){
  
			ui.innerHTML += "<p style='margin-left:40px'>Rounding Diameter (" + d_value + ") DOWN to next standard size.</p>";
  			var $standards = [];
			if(funits == 'english'){
				$standards = shaftDiameterIN;
			}else{
				$standards = shaftDiameterMM;
			}

			var d_new = 0;

			var doLoop = 'true';
			var tempIteration = 1;

			while(doLoop == 'true'){
        
				if(tempIteration > ($standards.length - 1)){
          
					d_new = $standards[$standards.length - 1];
					ui.innerHTML += "<p style='color:orange'>Reached the end of Standard Diameters -- Shaft cannot be made any <b>Larger</b> than " + d_new + "(units) </p>";
					doLoop = 'false';
          
				}else if(d_value < $standards[0]){
          
  					d_new = $standards[0];
  					ui.innerHTML += "<p style='color:orange'>Reached the end of Standard Diameters -- Shaft cannot be made any <b>Smaller</b> than " + d_new + "(units) </p>";
  					doLoop = 'false';
				}
				else{
					var lowerLim = $standards[tempIteration - 1];
					var upperLim = $standards[tempIteration + 1];
					console.log("lowerLim = " + lowerLim + ", upperLim = " + upperLim);
					
					if(d_value > lowerLim && d_value < upperLim){ // Found a match!
            
						d_new = $standards[tempIteration];
						ui.innerHTML += "<p style='margin-left:40px;color:violet'>New Value of d: " + d_new + "</p>";
						doLoop = 'false';
            
					}else{
            
						tempIteration += 1;
            
					}
				}
			}// end of while loop

			return d_new;
			
		} // returns a new d value which is in next lowest standard sizing



	// from (6-19) in text book (pg 333)
	function determineNewSe(dval, fSePrime, fSu, fka,fkc,fkd,fke, funits){
			ui.innerHTML += "<p style='margin-left:40px;'>Determining new Se value (Diameter = " + dval + ")</p>";
			var kfb = 0.9;
			
			if(funits == 'english'){
				if(dval >= 0.3 && dval <= 2){
					kfb = 0.879*Math.pow(dval,(-0.107));
				}else if(dval <= 10){
					kfb = 0.91*Math.pow(dval,(-0.157));
				}else{
					kfb = 1;
				}
			}else{
				dval = dval*Math.pow(10, -3);
				if(dval >= 7.62 && dval <= 2){
					kfb = 1.24*Math.pow(dval,(-0.107));
				}else if(dval <= 10){
					kfb = 1.51*Math.pow(dval,(-0.157));
				}else{
					kfb = 1;
				}
			}

			if(funits == 'english'){funits = "Kpsi";}else{funits = "MPa";}
			
			fSe = fSePrime*fka*kfb**fkc*fkd*fke;
			
			ui.innerHTML += "<p style='margin-left:40px; color:violet;'>New Se value: " + fSe + " " + funits + "</p>";
			return fSe;
	} // end of function determineNewSe (returns Se)


// Using Chapter 6 - pg 343 / 323 of the textbook
	function determineKfKfs(dval, fSu, fRd, fKt, fKts, funits){
			ui.innerHTML += "<p style='margin-left:40px;'>Determining new Kf, Kfs values (Diameter = " + dval + ", Radius = d*" + fRd +")</p>";
			
			var fKfKfs = [];
			
			var sqrtAt = 0;
			var sqrtAts = 0;
			var fKf = 0;
			var fKfs = 0;

			let fr = fRd*dval;
			let sqrtR = Math.pow(fr, 0.5);

			if(funits == 'standard'){sqrtR = sqrtR*Math.pow(1000,0.5);} // convert radius^1/2 to meters^1/2
			
			if(funits == 'english'){
				if(fSu >= 50 && fSu <= 250){
					sqrtAt = 0.246 - (3.08*Math.pow(10,-3)*fSu) + (1.51*Math.pow(10,-5)*Math.pow(fSu,2)) - (2.67*Math.pow(10,-8)*Math.pow(fSu,3));
					sqrtAts = 0.190 - (2.51*Math.pow(10,-3)*fSu) + (1.35*Math.pow(10,-5)*Math.pow(fSu,2)) - (2.67*Math.pow(10,-8)*Math.pow(fSu,3));

					fKf = 1 + (fKt - 1)/(1 + (sqrtAt/sqrtR));
					fKfs = 1 + (fKts - 1)/(1 + (sqrtAts/sqrtR));

					fKfKfs = [fKf, fKfs];
				}else{
					ui.innerHTML += "<p style='margin-left:40px; color:orange'>Because Su is outside range of 50 to 250 KPsi, Kt = Kf, Kts = Kfs. Results may be inaccurate</p>";
					fKfKfs = [fKt, fKts];
				}
			}else{
				if(fSu >= 340 && fSu <= 1500){
					sqrtAt = 1.24 - (2.25*Math.pow(10,-3)*fSu) + (1.60*Math.pow(10,-6)*Math.pow(fSu,2)) - (4.11*Math.pow(10,-10)*Math.pow(fSu,3));
					sqrtAts = 0.958 - (1.83*Math.pow(10,-3)*fSu) + (1.43*Math.pow(10,-6)*Math.pow(fSu,2)) - (4.11*Math.pow(10,-10)*Math.pow(fSu,3));

					fKf = 1 + (fKt - 1)/(1 + (sqrtAt/sqrtR));
					fKfs = 1 + (fKts - 1)/(1 + (sqrtAts/sqrtR));

					fKfKfs = [fKf, fKfs];
				}else{
					ui.innerHTML += "<p style='margin-left:40px; color:orange'>Because Su is outside range of 340 to 1500 MPa, Kt = Kf, Kts = Kfs. Results may be inaccurate</p>";
					fKfKfs = [fKt, fKts];
				}
			}

			ui.innerHTML += "<p style='margin-left:40px; color:violet;'>New Values: Kf = " + fKfKfs[0] + ", Kfs = " + fKfKfs[1] + "</p>";

			return fKfKfs;
			
	}// returns array fKfKfs = [Kf, Kfs]
