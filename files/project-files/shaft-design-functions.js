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
						ui.innerHTML += "<p style='color:violet'>New Value of d: " + d_new + "</p>";
						doLoop = 'false';
            
					}else{
            
						tempIteration += 1;
            
					}
				}
			}// end of while loop

			return d_new;
			
		} // returns a new d value which is in next lowest standard sizing
