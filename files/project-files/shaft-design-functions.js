// IMPORTANT STANDARDS

shaftDiameterIN = [0.25, 0.5, 0.75, 0.875, 1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5,8];
shaftDiameterMM = [6.35, 12.7, 19.05, 22.23, 25.4, 28.58, 31.75, 34.93, 38.1, 44.45, 50.8, 57.15, 63.5, 69.85, 76.2, 82.55, 88.9, 95.25, 101.6, 114.3, 127, 139.7, 152.4, 165.1, 177.8, 190.5,203.2];

const ui = document.getElementById("projConsole"); // console: 	ui.innerHTML += "";

function fsTestInitial(){
  console.warn("Function Script Loaded!");
}

// GUESS DIAMETER USING DE-GOODMAN
function guessDiameter(fKf, fKfs, Nfos, Ma, Mm, Ta, Tm, fSe, fSu, funits){
		
			 fKf = parseFloat(fKf);
			 fKfs = parseFloat(fKfs);
			 Nfos = parseFloat(Nfos);

			// CONVERT EVERYTHING FROM KILA OR MEGA TO FULL UNITS
			if(funits == "english"){
				Ma = parseFloat(Ma);
			 	Mm = parseFloat(Mm);
			 	Ta = parseFloat(Ta);
			 	Tm = parseFloat(Tm);
				
			 	fSe = parseFloat(fSe)*1000;
			 	fSu = parseFloat(fSu)*1000;
			}else{
				Ma = parseFloat(Ma);
			 	Mm = parseFloat(Mm);
			 	Ta = parseFloat(Ta);
			 	Tm = parseFloat(Tm);
				
			 	fSe = parseFloat(fSe)*1000000;
			 	fSu = parseFloat(fSu)*1000000;
			}
			 
		
			
			 ui.innerHTML += "<p style='margin-left:40px;'><em>Guessing a new diameter d (DE-Goodman)</em> with FOS = " + Nfos + "</p>";
			 ui.innerHTML += "<p style='margin-left:40px;'>Kf = " + fKf + ", Kfs = " + fKfs + "</p>";
			 ui.innerHTML += "<p style='margin-left:40px;'>Se = " + fSe + ", Su = " + fSu + "</p>";
			    
			  var d_new = 0;
			
			  var $tempVar = 4*(Math.pow((fKf*Ma),2)) + 3*(Math.pow((fKfs*Ta),2));
			  let Aval = parseFloat(Math.sqrt($tempVar));
			
			  $tempVar = 4*(Math.pow((fKf*Mm),2)) + 3*(Math.pow((fKfs*Tm),2));
			  let Bval = parseFloat(Math.sqrt($tempVar));
			  
			   ui.innerHTML += "<p style='margin-left:40px;'>A Value: " + Aval + ", B Value: " + Bval + "</p>";
		
			$tempVar = ((16*Nfos) / Math.PI)*((Aval / fSe) + (Bval / fSu));
				console.log("Inner DE-Goodman Calculated = " + $tempVar);
			d_new = Math.pow($tempVar, (1/3));
		
			   console.log("D_new Calculated = " + d_new);
					
		  return d_new;
		}// returns new guess for diameter d (unscaled)


// ROUND D GUESS TO NEAREST STANDARD
function roundToStandard(d_value, funits){
  
			ui.innerHTML += "<p style='margin-left:40px'>Rounding Diameter (" + d_value + ") to next standard size.</p>";
  			var $standards = [];
			if(funits == 'english'){
				$standards = shaftDiameterIN;
			}else{
				$standards = shaftDiameterMM;
			}

			var d_new = 0;
			var findexVal = 1;

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
						findexVal = tempIteration;
						ui.innerHTML += "<p style='margin-left:40px;color:violet'>New Value of d: " + d_new + "</p>";
						doLoop = 'false';
            
					}else{
            
						tempIteration += 1;
            
					}
				}
			}// end of while loop

			return foutput = [d_new, findexVal];
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

function determineVonStress(dval, fKf, fKfs, fMoment, fTorque, funits){
			
			if(funits == 'english'){funits = 'lbf*in';}else{funits = 'N*m';}
			ui.innerHTML += "<p style='margin-left:40px'>Finding Von Mices Stress using values: Moment = " + fMoment + ", Torque = " + fTorque + "(" + funits + ")</p>";
			if(funits == 'english'){funits = 'Psi';}else{funits = 'Pa';}
			
			var fvonStress = 0;

			var fSa = (32*fKf*fMoment)/(Math.PI * Math.pow(dval,3));
			var fTa = (16*fKfs*fTorque)/(Math.PI * Math.pow(dval,3));

			var tempVar = (Math.pow(fSa,2)) + 3*(Math.pow(fTa,2));
			
			fvonStress = Math.pow(tempVar, 0.5);

			ui.innerHTML += "<p style='margin-left:40px;color:violet;'>Von Misces Stress: " + fvonStress + "</p>";
			return fvonStress;
			
		}// Returns vonStress

		function determineFOS(dval, fvonStressA, fvonStressM, fSe, fSu, funits){
			ui.innerHTML += "<p style='margin-left:40px'>Determining Factor of Safety of Current Shaft Guess: " + dval + "</p>";

			// Convert Se, Su to psi or pa (from kpsi or MPa)
			if(funits == 'english'){fSe = fSe*1000; fSu = fSu*1000;}else{fSe = fSe*1000000; fSu = fSu*1000000;}
			
			var tempVal = (fvonStressA / fSe) + (fvonStressM / fSu);

			tempVal = Math.pow(tempVal, -1);

			ui.innerHTML += "<p style='margin-left:40px;color:violet;font-weight:bold;'>Factor of Safety for Guessed Shaft Diameter: " + tempVal + "</p>";

			return tempVal;
		}// returns a factor of safety given the vonStresses and diameter


		function determineNy(dval, fvonStressA, fvonStressM, fSy, funits){

			if(funits == 'english'){fSy = fSy*1000;}else{fSy = fSy*1000000;}
			
			var fSmax = fvonStressA + fvonStressM;
			
			var tempVal = fSy / fSmax;
			
			ui.innerHTML += "<p style='margin-left:40px;color:violet;'><u>Yielding</u> Factor of Safety for Guessed Shaft Diameter: " + tempVal + "</p>";

			return tempVal;
			
		}// end of fnction determineNy, returns ny (yielding factor of safety)

		function changeDval(fstandardIndexVal, funits, fprev){
			var $standards = [];
			
			if(funits == 'english'){
				$standards = shaftDiameterIN;
			}else{
				$standards = shaftDiameterMM;
			}

			if(fstandardIndexVal > ($standards.length - 1) || fstandardIndexVal < 0){
				return 'NaN';
			}else{
				return $standards[fstandardIndexVal];
			}

			ui.innerHTML += "<p>Changed Diameter from " + fprev + " to " + $standards[fstandardIndexVal] + "</p>";

		}// increase (or decrease) the diameter to next standard size.
