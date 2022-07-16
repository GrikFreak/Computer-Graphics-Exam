//Davide Greco

var pxCone1, pyCone1, pzCone1, 
	pxCone2, pyCone2, pzCone2,
	pxCone3, pyCone3, pzCone3, 
	pxCone4, pyCone4, pzCone4, 
	pxCone5, pyCone5, pzCone5;

var pxLowObstacle, pyLowObstacle, pzLowObstacle;
	
var pxBarrier, pyBarrier, pzBarrier;

var pxPaletto1, pyPaletto1, pzPaletto1, 
	pxPaletto2, pyPaletto2, pzPaletto2,	
	pxPaletto3, pyPaletto3, pzPaletto3;

var pxGoal1, pyGoal1, pzGoal1, 
	pxGoal2, pyGoal2, pzGoal2;

var pxStart, pzStart;

var ob1Passed = false, ob2Passed = false, ob3Passed = false, ob4Passed = false,
	ob5Passed = false, ob6Passed = false, ob7Passed = false, ob8Passed = false,
	ob9Passed = false;

var obstacleArea = false; 
var goalArea = false;
var shootArea = false;
var startArea = false;
var hitted = false; 

var endGame = false;

function handleAreas() {
	if (obstacleArea) { 
		console.log("Hai perso");
		endGame = true;
		
		alert("Ostacolo colpito, riprova!");
		reset();
		
	}
	if (goalArea && 
		ob1Passed && ob2Passed && ob3Passed && ob4Passed &&
		ob5Passed && ob6Passed && ob7Passed && ob8Passed && ob9Passed){
		console.log("Hai vinto");
		endGame = true;
		hitted = false;
		
		alert("Hai segnato! Complimenti.");
		reset();
	}
	if(startArea && !hitted) { 
		alert("START!\n -Slalom sui coni\n -Passo in mezzo ai paletti\n -Salto l'ostacolo\n -Schivo la barriera\n -Faccio Gol!")
		startArea = false;
		px = 0;
		py = 0;
		pz = 0;
		vx = 0;
		vy = 0;
		vz = 0;
		vxm = 0;
		vym = 0;
		vzm = 0;
		stadiumInit();
		hitted = true;
	}	

}

function stadiumInit(){
	
	//posizione ostacoli e porta
	pxCone1 = 30;
	pyCone1 = 0;
	pzCone1 = 0;
	pxCone2 = 60;
	pyCone2 = 0;
	pzCone2 = 0;
	pxCone3 = 90;
	pyCone3 = 0; 
	pzCone3 = 0;
	pxCone4 = 120; 
	pyCone4 = 0;
	pzCone4 = 0;
	pxCone5 = 150; 
	pyCone5 = 0;
	pzCone5 = 0;

	pxBarrier = 240;
	pyBarrier = 0;
	pzBarrier = 0;

	pxLowObstacle = 195;
	pyLowObstacle = 0;
	pzLowObstacle = 0;

	pxPaletto1 = 170;
	pyPaletto1 = 0;
	pzPaletto1 = 8;
	pxPaletto2 = 170;
	pyPaletto2 = 0;
	pzPaletto2 = -8;
	pxPaletto3 = 180;
	pyPaletto3 = 0;
	pzPaletto3 = 0;

	pxGoal1 = 367;
	pyGoal1 = 0;
	pzGoal1 = 0;
	pxGoal2 = -367;
	pyGoal2 = 0;
	pzGoal2 = 0;

	pxStart = 0;
	pzStart = 0;
	
	//azzero i bool per far ripartire il gameplay
	ob1Passed = false; ob2Passed = false; ob3Passed = false; ob4Passed = false;
	ob5Passed = false; ob6Passed = false; ob7Passed = false; ob8Passed = false;
	ob9Passed = false;
	
}

function reset(){
	//resetto con il setting iniziale
	ballInit();
	px = -10;
	ob1Passed = false; ob2Passed = false; ob3Passed = false; ob4Passed = false;
	ob5Passed = false; ob6Passed = false; ob7Passed = false; ob8Passed = false;
	ob9Passed = false;
}
