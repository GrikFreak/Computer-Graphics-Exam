//Davide Greco

// STATO DELLA PALLA
// (DoStep fa evolvere queste variabili nel tempo)
var px,
    py,
    pz,
    verticale,
    facing = 0; // posizione e orientamento
var mozzo, virata; // stato interno
var vx, vy, vz; // velocita' attuale

// costanti
var velVirata,
    velRitornoVirata,
    accMax,
    raggioPalla,
    grip,
    attrito,
    attritoX,
    attritoY,
    attritoZ; // attriti
var key;

var posMaxX;
var posMaxY;
var posMaxZ;
var posMinX;
var posMinY;
var posMinZ;

// DoStep: facciamo un passo di fisica (a delta-t costante)
// Indipendente dal rendering.
//
function BallDoStep() {
  // computiamo il movimento della palla
  var vxm, vym, vzm; // velocita' nello spazio della palla

  // da vel frame mondo a vel frame palla
  var cosf = Math.cos((facing * Math.PI) / 180.0);
  var sinf = Math.sin((facing * Math.PI) / 180.0);
  //var cosv = Math.cos((verticale * Math.PI) / 180.0);
  vxm = +cosf * vx - sinf * vz;
  vym = vy;
  vzm = +sinf * vx + cosf * vz;

  // gestione dello virata
  if (key[1]) virata += velVirata;
  if (key[3]) virata -= velVirata;
  virata *= velRitornoVirata; //cerco di far tornare la virata a zero

  if (key[0]) vzm -= accMax; // accelerazione in avanti
  if (key[2]) vzm += accMax; // accelerazione indietro

  // salto molto semplificato
  if (key[4] && py >= 0 && py < 20) 
  {
    py += 0.5;
  }
  if (py > 0 && !key[4]) py -= 0.5; 

  //shoot
  if(key[5]) vzm = -2;

  // attriti (semplificando)
  vxm *= attritoX;
  vym *= attritoY;
  vzm *= attritoZ;

  // l'orientamento della palla segue quello dello virata
  // (a seconda della velocita' sulla z)
  facing = facing - vzm * grip * virata;
  //verticale = verticale - vym;

  // rotazione mozzo palla (gestitia come una singola ruota) (a seconda della velocita' sulla z)
  var da; //delta angolo
  da = (180.0 * vzm) / 2 / (Math.PI * raggioPalla);
  mozzo += da;

  // ritorno a vel coord mondo
  vx = +cosf * vxm + sinf * vzm;
  vy = vym;
  vz = -sinf * vxm + cosf * vzm;

  
  //****************************************************************************************************
  //GESTIONE START AREA
  if (Math.round(px) == (-75) && Math.round(pz) >= (-50) && Math.round(pz) <= (50) && Math.round(py) >= (0)) {
    startArea = true;
  }
  else startArea = false;

  //****************************************************************************************************
  //GESTIONE AREA GOAL
  if (
    (Math.round(px) >= pxGoal1 - 5 &&
      Math.round(px) <= pxGoal1 + 10 &&
      Math.round(py) <= pyGoal1 + 18) &&
      Math.round(pz) >= pzGoal1 - 27 &&
      Math.round(pz) <= pzGoal1 + 27) 
 {
    console.log("sono dentro");
    goalArea = true;
  } else goalArea = false;

  //****************************************************************************************************
  //GESTIONE OSTACOLI
  if (
    // coni
    (Math.round(px) >= pxCone1 - 5 &&
      Math.round(px) <= pxCone1 + 5 &&
      Math.round(py) <= pyCone1 + 6 && 
      Math.round(pz) >= pzCone1 - 5 &&
      Math.round(pz) <= pzCone1 + 5) ||
    (Math.round(px) >= pxCone2 - 5 &&
      Math.round(px) <= pxCone2 + 5 &&
      Math.round(py) <= pyCone2 + 6 && 
      Math.round(pz) >= pzCone2 - 5 &&
      Math.round(pz) <= pzCone2 + 5) ||
    (Math.round(px) >= pxCone3 - 5 &&
      Math.round(px) <= pxCone3 + 5 &&
      Math.round(py) <= pyCone3 + 6 && 
      Math.round(pz) >= pzCone3 - 5 &&
      Math.round(pz) <= pzCone3 + 5) ||
    (Math.round(px) >= pxCone4 - 5 &&
      Math.round(px) <= pxCone4 + 5 &&
      Math.round(py) <= pyCone4 + 6 && 
      Math.round(pz) >= pzCone4 - 5 &&
      Math.round(pz) <= pzCone4 + 5) ||
    (Math.round(px) >= pxCone5 - 5 &&
      Math.round(px) <= pxCone5 + 5 &&
      Math.round(py) <= pyCone5 + 6 && 
      Math.round(pz) >= pzCone5 - 5 &&
      Math.round(pz) <= pzCone5 + 5) ||
    //ostacolo basso
    (Math.round(px) >= pxLowObstacle - 5 &&
      Math.round(px) <= pxLowObstacle + 5 &&
      Math.round(py) <= pyLowObstacle + 4 && 
      Math.round(pz) >= pzLowObstacle - 20 &&
      Math.round(pz) <= pzLowObstacle + 20) ||
    //barrier
    (Math.round(px) >= pxBarrier - 3 &&
      Math.round(px) <= pxBarrier + 3 &&
      Math.round(py) <= pyBarrier + 30 && 
      Math.round(pz) >= pzBarrier - 10 &&
      Math.round(pz) <= pzBarrier + 10) ||
    //paletti
    (Math.round(px) >= pxPaletto1 - 3 &&
      Math.round(px) <= pxPaletto1 + 3 &&
      Math.round(py) <= pyPaletto1 + 30 && 
      Math.round(pz) >= pzPaletto1 - 3 &&
      Math.round(pz) <= pzPaletto1 + 3) ||
    (Math.round(px) >= pxPaletto2 - 3 &&
      Math.round(px) <= pxPaletto2 + 3 &&
      Math.round(py) <= pyPaletto2 + 30 && 
      Math.round(pz) >= pzPaletto2 - 3 &&
      Math.round(pz) <= pzPaletto2 + 3) ||
    (Math.round(px) >= pxPaletto3 - 3 &&
      Math.round(px) <= pxPaletto3 + 3 &&
      Math.round(py) <= pyPaletto3 + 30 && 
      Math.round(pz) >= pzPaletto3 - 3 &&
      Math.round(pz) <= pzPaletto3 + 3) 
  ) {
    obstacleArea = true;
  } else 
    obstacleArea = false;

  //GESTIONE OSTACOLI SUPERATI
  if( //passo fra cono 1 e 2
    Math.round(px) > pxCone1 + 5 &&
      Math.round(px) < pxCone2 -5  &&
      Math.round(pz) == 0  
  ) ob1Passed = true;
  if( //passo fra cono 2 e 3
    Math.round(px) > pxCone2 + 5 &&
      Math.round(px) < pxCone3 -5  &&
      Math.round(pz) == 0  
  ) ob2Passed = true;
  if( //passo fra cono 3 e 4
    Math.round(px) > pxCone3 + 5 &&
      Math.round(px) < pxCone4 -5  &&
      Math.round(pz) == 0  
  ) ob3Passed = true;
  if( //passo fra cono 4 e 5 
    Math.round(px) > pxCone4 + 5 &&
      Math.round(px) < pxCone5 -5  &&
      Math.round(pz) == 0  
  ) ob4Passed = true;
  if( //passo fra cono 5 ed entro fra paletti 1 e 2
    Math.round(px) > pxCone5 + 5 &&
      Math.round(px) < pxPaletto1 - 1.5 &&
      ((Math.round(pz) > pzCone5 + 5 &&
      Math.round(pz) < pzPaletto1 - 1.5) ||
      (Math.round(pz) > pzCone5 + 5 &&
      Math.round(pz) > pzPaletto2 + 1.5))
  ) ob5Passed = true;
  if( //passo in mezzo fra paletti 1 e 2
    Math.round(px) == pxPaletto1 &&
      Math.round(pz) > pzPaletto2 + 1.5 &&
      Math.round(pz) < pzPaletto1 - 1.5
  ) ob6Passed = true;
  if( //passo a sx o dx del paletto 3
  Math.round(px) == pxPaletto3 &&
    (Math.round(pz) < pzPaletto3 + 1.5 ||
    Math.round(pz) > pzPaletto3 - 1.5)
  ) ob7Passed = true;
  if( //salto l'ostacolo basso
  Math.round(px) > pxLowObstacle - 5 &&
    Math.round(px) < pxLowObstacle + 5 &&
    Math.round(py) > pyLowObstacle + 4 &&
    Math.round(pz) > pzLowObstacle - 20 &&
    Math.round(pz) < pzLowObstacle + 20
  ) ob8Passed = true;
  if( //passo a sx o dx della barriera
  Math.round(px) == pxBarrier &&
    (Math.round(pz) > pzBarrier + 7 ||
    Math.round(pz) < pzBarrier - 7)
  ) ob9Passed = true;

  //suppongo che la palla provi ad uscire dal mondo
  const stepBack = 10;
  if (px >= 400 || px <= -400 || pz >= 250 || pz <= -250) {
    if(vzm <= 0){
      console.log("fuori dal mondo");
      px += stepBack * Math.sin(degToRad(facing));
      pz += stepBack * Math.cos(degToRad(facing));
    } else { // se provo ad uscire in retro dal mondo torno al punto di partenza
      px = -180;
      pz = 0;
    }
    vz = vy = vx = 0;
    vzm = vym = vxm = 0;
  } else {
    px += vx;
    pz += vz;
  }
}

function ballInit() {
  // inizializzo lo stato della palla
  // posizione e orientamento
  px = -180;
  py = 0;
  pz = 0;
  facing = -90;
  //verticale = 90; 

  mozzo = virata = 0; // stato
  vx = vy = vz = 0; // velocita' attuale
  // inizializzo la struttura di controllo
  key = [false, false, false, false, false];

  velVirata = 0.8;
  velRitornoVirata = 0.93; 

  accMax = 0.01; //se aumenta, aumenta la velocità della palla

  // attriti: percentuale di velocita' che viene mantenuta
  // 1 = no attrito
  // <<1 = attrito grande
  attritoZ = 0.991; // piccolo attrito sulla Z (nel senso di rotolamento delle ruote)
  attritoX = 0.8; // grande attrito sulla X (per non fare slittare la palla)
  attritoY = 0.88; // attrito sulla y per simulare aria/gravità (data la gestione base del salto)

  raggioPalla = 0.75;

  grip = 0.45;
}
