//Davide Greco

var objectsToDraw = [];
var ballToDraw = [];

function setBallToDraw(){
  ballToDraw = [
    {
      name: "ball",
      programInfo: programInfo_color,
      bufferInfo: bufferInfo_obj_ball,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 0.6],
        u_texture: ballTextures[0],
        u_world: m4.identity(),
      },
    },
  ];
}

function setObjsToDraw() {
  objectsToDraw = [

    {
      name: "soccerGoal1",
      bufferInfo: bufferInfo_soccerGoal,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[2],
        u_world: m4.scale(m4.yRotate(m4.translation(367, 11, 0), degToRad(180)), 10.5, 10.5, 10.5),
      },
    },
    {
      name: "soccerGoal2",
      bufferInfo: bufferInfo_soccerGoal,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[2],
        u_world: m4.scale(m4.yRotate(m4.translation(-367, 11, 0), degToRad(0)),  10.5, 10.5, 10.5),
      },
    },
    {
      name: "paletto1",
      bufferInfo: bufferInfo_obj_paletto,
      uniforms: {
        u_colorMult: [0.8, 0.8, 1, 1],
        u_texture: textures[4],
        u_world: m4.scale(
          m4.yRotate(m4.translation(170, 20 , 8), degToRad(90)),
          6,
          6,
          6
        ),
      },
    },
    {
      name: "paletto2",
      bufferInfo: bufferInfo_obj_paletto,
      uniforms: {
        u_colorMult: [0.8, 0.8, 1, 1],
        u_texture: textures[4],
        u_world: m4.scale(
          m4.yRotate(m4.translation(170, 20, -8), degToRad(90)),
          6,
          6,
          6
        ),
      },
    },
    {
      name: "paletto3",
      bufferInfo: bufferInfo_obj_paletto,
      uniforms: {
        u_colorMult: [0.8, 0.8, 1, 1],
        u_texture: textures[4],
        u_world: m4.scale(
          m4.yRotate(m4.translation(180, 20, 0), degToRad(90)),
          6,
          6,
          6
        ),
      },
    },
    {
      name: "lowObstacle",
      bufferInfo: bufferInfo_obj_lowObstacle,
      uniforms: {
        u_colorMult: [0.5, 0.5, 0.5, 0.5],
        u_texture: textures[3],
        u_world: m4.scale(
          m4.yRotate(m4.translation(195, 1, 0), degToRad(180)),
          8,
          8,
          8
        ),
      },
    },
    {
      name: "barrier",
      bufferInfo: bufferInfo_obj_barrier,
      uniforms: {
        u_colorMult: [0.8, 0.8, 1, 1],
        u_texture: textures[7],
        u_world: m4.scale(
          m4.yRotate(m4.translation(240, 5, 0), degToRad(90)),
          6,
          6,
          6
        ),
      },
    },
    {
      name: "cone",
      bufferInfo: bufferInfo_obj_cone,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[1],
        u_world: m4.scale(
          m4.xRotate(m4.translation(30, 0, 0), degToRad(0)),
          4,
          4,
          4
        ),
      },
    },
    {
      name: "cone2",
      bufferInfo: bufferInfo_obj_cone,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[1],
        u_world: m4.scale(
          m4.xRotate(m4.translation(60, 0, 0), degToRad(0)),
          4,
          4,
          4
        ),
      },
    },
    {
      name: "cone3",
      bufferInfo: bufferInfo_obj_cone,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[1],
        u_world: m4.scale(
          m4.xRotate(m4.translation(90, 0, 0), degToRad(0)),
          4,
          4,
          4
        ),
      },
    },
    {
      name: "cone4",
      bufferInfo: bufferInfo_obj_cone,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[1],
        u_world: m4.scale(
          m4.xRotate(m4.translation(120, 0, 0), degToRad(0)),
          4,
          4,
          4
        ),
      },
    },
    {
      name: "cone5",
      bufferInfo: bufferInfo_obj_cone,
      uniforms: {
        u_colorMult: [0.5, 0.5, 1, 1],
        u_texture: textures[1],
        u_world: m4.scale(
          m4.xRotate(m4.translation(150, 0, 0), degToRad(0)),
          4,
          4,
          4
        ),
      },
    },
    {
      //not affected by the light
      name: "world",
      programInfo: programInfo_world,
      bufferInfo: bufferInfo_obj,
      uniforms: {
        u_texture: textures[5],
        u_world: m4.identity(),
      },
    },
    {
			//not affected by the light
			name: "startArea",
			programInfo: programInfo_world,
			bufferInfo: bufferInfo_field,
			uniforms: {
        u_texture: textures[6],
        u_world: m4.identity(),
			},
		},
    {
      //not affected by the light
      name: "field",
      bufferInfo: bufferInfo_field,
      uniforms: {
        u_texture: textures[0],
        u_world: m4.identity(),
      },
    },
  ];
}

// ****************************************************************************************************************
// GEOMETRIES
// ****************************************************************************************************************

var bufferInfo_field;
var bufferInfo_soccerGoal,
  bufferInfo_obj_ball,
  bufferInfo_obj_cone,
  bufferInfo_obj_paletto,
  bufferInfo_obj_lowObstacle,
  bufferInfo_obj_barrier;

function setGeometries(gl) {
  // ---------------------------------------------------------------------
  //Axis
  {
    const verticesAxis = [
      0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 10,
    ];
    const colorsAxis = [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1];

    const arrays_axis = {
      position: { numComponents: 3, data: verticesAxis },
      color: { numComponents: 3, data: colorsAxis },
    };

    bufferInfo_axis = webglUtils.createBufferInfoFromArrays(gl, arrays_axis);
  }

  // ---------------------------------------------------------------------
  // plane
  {
    const S = 5;
    const H = 0;

    const textureCoords = [0, 0, 1, 0, 0, 1, 1, 1];

    const arrays_field = {
      position: {
        numComponents: 3,
        data: [-S, H, -S, S, H, -S, -S, H, S, S, H, S],
      },
      texcoord: { numComponents: 2, data: textureCoords },
      color: 	{ numComponents: 3, data: [0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7,  0.7,0.7,0.7], },
      indices: { numComponents: 3, data: [0, 2, 1, 2, 3, 1] },
      normal: { numComponents: 3, data: [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0] },
    };

    bufferInfo_field = webglUtils.createBufferInfoFromArrays(gl, arrays_field);
  }

  // ****************************************************************************************************************
  // LOAD FILE.OBJ
  // ****************************************************************************************************************

  // ---------------------------------------------------------------------
  //soccerGoal

  loadDoc("resources/data/soccerGoal.obj");

  const arrays_soccerGoal = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_soccerGoal = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_soccerGoal
  );

  // ---------------------------------------------------------------------
  // cube world

  loadDoc("resources/data/cubeInternet.obj");

  const arrays_obj = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj = webglUtils.createBufferInfoFromArrays(gl, arrays_obj);

  // ---------------------------------------------------------------------
  //ball

  loadDoc('resources/data/ball.obj');

  const arrays_obj_ball = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj_ball = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_obj_ball
  );

  // ---------------------------------------------------------------------
  //field

  loadDoc('resources/data/field.obj');

  const arrays_obj_field = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj_field = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_obj_field
  );

  //------------------------------------------------------------------------
  //cone

  loadDoc("resources/data/cone.obj");

  const arrays_obj_cone = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj_cone = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_obj_cone
  );

  //------------------------------------------------------------------------
  //barriera

  loadDoc("resources/data/barrier.obj");

  const arrays_obj_barrier = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj_barrier = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_obj_barrier
  );

  
  //------------------------------------------------------------------------
  //ostacolo basso

  loadDoc("resources/data/lowObstacle.obj");

  const arrays_obj_lowObstacle = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj_lowObstacle = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_obj_lowObstacle
  );

  
  //------------------------------------------------------------------------
  //paletto

  loadDoc("resources/data/paletto.obj");

  const arrays_obj_paletto = {
    position: { numComponents: 3, data: webglVertexData[0] },
    texcoord: { numComponents: 2, data: webglVertexData[1] },
    normal: { numComponents: 3, data: webglVertexData[2] },
  };

  bufferInfo_obj_paletto = webglUtils.createBufferInfoFromArrays(
    gl,
    arrays_obj_paletto
  );

}
