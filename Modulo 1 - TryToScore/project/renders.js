//Davide Greco	

function update(time){
	if(nstep*PHYS_SAMPLING_STEP <= timeNow){ //skip the frame if the call is too early
		handleAreas();
		BallDoStep(); 
		nstep++; 
		doneSomething=true;
		window.requestAnimationFrame(update);
		return; // return as there is nothing to do
	}
	timeNow=time;
	if (doneSomething) {
		render();
		doneSomething=false;
	}
	window.requestAnimationFrame(update); // get next frame
}

// variabili globali per scelta camera
var cambiaCamera = false; // per passare tra la camera posteriore e first person
var cameraLibera = false; // drag del mouse

//matrici globali
var lightWorldMatrix, lightProjectionMatrix, projectionMatrix, cameraMatrix;

function render(){

    gl.enable(gl.DEPTH_TEST);

    // first draw from the POV of the light
    lightWorldMatrix = m4.lookAt(
        [settings.x_light, settings.y_light, settings.z_light],          			// position
        [settings.x_targetlight, settings.y_targetlight, settings.z_targetlight], 	// target
        settings.up,                                              					// up
    );

    lightProjectionMatrix = m4.perspective(
            degToRad(settings.fovLight),
            settings.width_projLight / settings.height_projLight,
            1,  	// near
            700);   // far


	// -----------------------------------------------------------
    // draw to the depth texture
	
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFramebuffer);
    gl.viewport(0, 0, depthTextureSize, depthTextureSize);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawScene( lightProjectionMatrix, lightWorldMatrix, m4.identity(), lightWorldMatrix, programInfo_color);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0); //setta tutto a nero se 0,0,0,1
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    let textureMatrix = m4.identity();
    textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
    textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
    textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));

	// -------------------------------------------------------------------
	//matrici di vista
	
	projectionMatrix = m4.perspective(settings.fov, settings.aspect, 1, 2000);

	var targetBall = [px, py, pz];
	
	camera = [px + (settings.D*Math.sin(degToRad(facing))), py+25, pz+(settings.D*Math.cos(degToRad(facing)))]; //posteriore alla macchina

	//cambiaCamera = true --> first Person
	if(cambiaCamera){
		var targetBall = [px+(Math.sin(degToRad(facing))), py, pz+(Math.cos(degToRad(facing)))];
		camera = [px+(15*Math.sin(degToRad(facing))), py+4, pz+(15*Math.cos(degToRad(facing)))];		
	}
	//permette di muoversi nella scena (ad esempio con la drag del mouse)
	if(cameraLibera){
		camera = [settings.D*2*Math.sin(settings.PHI)*Math.cos(settings.THETA),
					settings.D*2*Math.sin(settings.PHI)*Math.sin(settings.THETA),
					settings.D*2*Math.cos(settings.PHI)];
	}
	
    cameraMatrix = m4.lookAt(camera, targetBall, settings.up);

    drawScene(projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo_sun);
   
	drawWorld();
	drawStartArea();
	
}

function drawScene(	projectionMatrix, cameraMatrix, textureMatrix, lightWorldMatrix, programInfo) {

	settings.lightIntensity = controls.lightIntensity;
	settings.shadowIntensity = controls.shadowIntensity;
	settings.D = controls.D;
	settings.x_light = controls.x_light;
	settings.y_light = controls.y_light;
	settings.z_light = controls.z_light;

    const viewMatrix = m4.inverse(cameraMatrix);

	gl.useProgram(programInfo.program);

	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_bias: bias,
		u_textureMatrix: textureMatrix,
		u_projectedTexture: depthTexture,
		u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
		u_lightIntensity: settings.lightIntensity,
		u_shadowIntensity: settings.shadowIntensity,
	});
	
	drawBuildings(programInfo);
	drawBall(programInfo); //separeted from other just to can change textures without realoading everything
	drawField(programInfo);

}

//startArea and obstacles

function drawStartArea() {

	const viewMatrix = m4.inverse(cameraMatrix);
		
	let objToDraw = getObjToDraw(objectsToDraw, "startArea");
	const programInfo = objToDraw.programInfo;
	gl.useProgram(programInfo.program);
	
	let matrix_start = m4.identity();
	
	matrix_start = m4.translate(matrix_start, -75, 25, 0);
	matrix_start = m4.scale(matrix_start, 5, 5, 10);
	matrix_start = m4.xRotate(matrix_start, degToRad(90));
	matrix_start = m4.zRotate(matrix_start, degToRad(90));
	objToDraw.uniforms.u_world = matrix_start;

	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	
	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_world: matrix_start,
	});
	
	
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	

}

function drawBuildings(programInfo) {

	//soccergoal1
	var objToDraw = getObjToDraw(objectsToDraw, "soccerGoal1");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	//soccergoal2
	objToDraw = getObjToDraw(objectsToDraw, "soccerGoal2");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	//paletto1
	objToDraw = getObjToDraw(objectsToDraw, "paletto1");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	//paletto2
	objToDraw = getObjToDraw(objectsToDraw, "paletto2");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	//paletto3
	objToDraw = getObjToDraw(objectsToDraw, "paletto3");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	//low Obstalce
	objToDraw = getObjToDraw(objectsToDraw, "lowObstacle");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	//barrier
	objToDraw = getObjToDraw(objectsToDraw, "barrier");	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	//cones
	objToDraw = getObjToDraw(objectsToDraw, "cone");
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	objToDraw = getObjToDraw(objectsToDraw, "cone2");
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	objToDraw = getObjToDraw(objectsToDraw, "cone3");
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

	objToDraw = getObjToDraw(objectsToDraw, "cone4");
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
	objToDraw = getObjToDraw(objectsToDraw, "cone5");
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
	
}

function drawWorld() {

	const viewMatrix = m4.inverse(cameraMatrix);
	
	let objToDraw = getObjToDraw(objectsToDraw, "world");
	const programInfo = objToDraw.programInfo;
	gl.useProgram(programInfo.program);
	
	let matrix_world = m4.identity();
	matrix_world = m4.translate(matrix_world,0,195,0);
	matrix_world = m4.scale(matrix_world,400, 200, 265);
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	
	webglUtils.setUniforms(programInfo, {
		u_view: viewMatrix,
		u_projection: projectionMatrix,
		u_world: matrix_world,
	});
	
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);	
	
}

function drawField(programInfo) {
	
	var objToDraw = getObjToDraw(objectsToDraw, "field");

	let matrix = m4.identity();
	matrix = m4.translate(matrix,0,0,0);
	matrix = m4.scale(matrix,80,1,53);
	objToDraw.uniforms.u_world = matrix;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);

}

//ball

function drawBall(programInfo) {
	
	var objToDraw = getBallToDraw(ballToDraw, "ball");
	
	matrix_Ball = m4.identity(); 
	
	matrix_Ball = m4.translate(matrix_Ball, px, py+4, pz);
	//rotazione verso il senso di marcia della palla
	matrix_Ball = m4.yRotate(matrix_Ball, degToRad(facing));
	matrix_Ball = m4.xRotate(matrix_Ball, degToRad(virata));
	matrix_Ball = m4.zRotate(matrix_Ball, degToRad(virata));
	matrix_Ball = m4.xRotate(matrix_Ball, degToRad(mozzo));
	matrix_Ball = m4.scale(matrix_Ball, 5, 5, 5);
	objToDraw.uniforms.u_world = matrix_Ball;
	
	webglUtils.setBuffersAndAttributes(gl, programInfo, objToDraw.bufferInfo);
	webglUtils.setUniforms(programInfo, objToDraw.uniforms);
	webglUtils.drawBufferInfo(gl, objToDraw.bufferInfo);
}










