var y, a, s;
var yCSG, aCSG, sCSG;

window.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("renderCanvas");
  var engine = new BABYLON.Engine(canvas, true);
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.ArcRotateCamera(
    "camera",
    -1.85,
    1.2,
    10,
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  BABYLON.SceneLoader.ImportMesh(
    "",
    "./",
    "yas_letters_export.babylon",
    scene,
    function (newMeshes) {
      y = newMeshes[2];
      a = newMeshes[0];
      s = newMeshes[1];
      camera.target = a;
      yCSG = BABYLON.CSG.FromMesh(y);
      aCSG = BABYLON.CSG.FromMesh(a);
      sCSG = BABYLON.CSG.FromMesh(s);
    }
  );

  var createScene = function () {
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    /* var sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { segments: 16, diameter: 2 },
      scene
    );
    sphere.position.y = 1; */
    /* var ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { height: 6, width: 6, subdivision: 2 },
      scene
    ); */

    /* var Loaded = false;
    while (!Loaded) {
      if (y != null && s != null && a != null) {
        
        loaded = true;
      }
    } */

    return scene;
  };

  var scene = createScene();

  engine.runRenderLoop(function () {
    scene.render();
    update();
  });

  window.addEventListener("resize", function () {
    engine.resize();
  });
});

function update(){
  yCSG.position = y.position;
  yCSG.rotation = y.rotation;
}

function toDeg(radians){
  return radians*57.2958;
}

function toRad(degrees){
  return degrees*0.0174533;
}
