var y, a, s;
var yCSG, aCSG, sCSG;
var yPH, aPH, sPH;
var cube;
var cubeCSG;
var finalMesh;

var camera;
var meshes;
var scene;

var invisibleMaterial;

var multiMaterial;
var mat0, mat1;

var PHmat;

var tempMat;

var wireMat;

var ColorHost = function() {
    this.Cube = "#ffffff";
    this.Letters = "#0f6bff";
    this.bg = "#0f6bff";

    this.Refresh = function Refresh() {
        updateBoolean();
    };

    /* this.Guides = function toggleGuideMeshes() {
        toggleMeshVisibility();
    }; */

    this.equalizeBgColor = function equalizeBgColor() {
        this.bg = this.Letters;
    };
    this.equalizeFontColor = function() {
        this.bg = this.Cube;
    }
    this.equalizeDepths = function() {
        var median = 0;
        median += this.yDepth;
        median += this.aDepth;
        median += this.sDepth;
        median /= 3;
        this.yDepth = median;
        this.aDepth = median;
        this.sDepth = median;
    }
    this.Export = function() {
        disablePH();
        BABYLON.Tools.CreateScreenshotUsingRenderTarget(engine, camera, 4096)
    };

    this.fov = 0.1;
    this.cameraDistance = 30;

    this.Positive = false;

    this.yScale = 1;
    this.yX = 0;
    this.yY = 0.5;
    this.yZ = 0;
    this.aScale = 1;
    this.aX = -0.5;
    this.aY = 0;
    this.aZ = 0;
    this.sScale = 1;
    this.sX = 0;
    this.sY = 0;
    this.sZ = -0.5;

    this.Depth = 0;
    this.prevDepth = 0;

    this.bevelDepth = 0;

    this.yDepth = 0.000000001;
    this.yHeight = 0;
    this.aDepth = 0.000000001;
    this.aHeight = 0;
    this.sDepth = 0.000000001;
    this.sHeight = 0;

    this.Guides = true;
};
var colorHost = new ColorHost();
const PI = Math.PI;

var radiusWatcher;

window.onload = function() {

    var gui = new dat.GUI();
    gui.add(colorHost, "Refresh");
    gui.addColor(colorHost, "Cube");
    gui.addColor(colorHost, "Letters");
    /* gui.addColor(colorHost, "bg"); */
    /* gui.add(colorHost, "fov").step(0.01).min(0.01).max(3); */
    /* radiusWatcher = gui.add(colorHost, "cameraDistance").min(0.1).max(30); */

    gui.add(colorHost, "Guides");
    /* gui.add(colorHost, "equalizeBgColor");
    gui.add(colorHost, "equalizeFontColor"); */
    /* gui.add(this.colorHost, "equalizeDepths") */
    gui.add(colorHost, "Positive");


    /* gui.add(colorHost, "yScale", .2, 1.5); */
    /* gui.add(colorHost, "yX"); */
    /*  gui.add(colorHost, "yDepth", 0.0000001, 1.0);
    gui.add(colorHost, "yHeight", 0, 1);
    gui.add(colorHost, "aDepth", 0.0000001, 1.0);
    gui.add(colorHost, "aHeight", 0, 1);
    gui.add(colorHost, "sDepth", 0.0000001, 1.0);
    gui.add(colorHost, "sHeight", 0, 1); */
    gui.add(colorHost, "Depth", 0, 1);

    /* gui.add(colorHost, "yY"); */
    /* gui.add(colorHost, "yZ"); */
    /* gui.add(colorHost, "aScale", .2, 1.5); */
    /* gui.add(colorHost, "aX"); */
    /* gui.add(colorHost, "aY"); */
    /* gui.add(colorHost, "aZ"); */
    /* gui.add(colorHost, "sScale", .2, 1.5); */
    /* gui.add(colorHost, "sX"); */
    /* gui.add(colorHost, "sY"); */
    /* gui.add(colorHost, "sZ"); */
    /* gui.add(colorHost, "bevelDepth", 0, .3); */
    gui.add(this.colorHost, "Export");

    /* radiusWatcher.onChange(function(v) {
        camera.radius = colorHost.cameraDistance;
    }); */
};

var engine;

window.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera(
        "camera", -1.4,
        1.2,
        10,
        new BABYLON.Vector3(0, 5, -10),
        scene
    );

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    camera.lowerAlphaLimit = Math.PI + Math.PI / 16;
    camera.upperAlphaLimit = Math.PI + Math.PI / 16 + Math.PI / 3;
    camera.lowerBetaLimit = Math.PI / 12;
    camera.upperBetaLimit = Math.PI - Math.PI / 1.9;


    camera.wheelPrecision = 50;

    BABYLON.SceneLoader.ImportMesh(
        "",
        "./",
        "yas_letters_Export.babylon",
        scene,
        function(newMeshes) {
            meshes = newMeshes;
            y = newMeshes[1];
            y.position.y = 0.5;
            y.rotation.x = PI / 2;
            y.rotation.y = PI / 2;
            y.material = multiMaterial;
            y.visibility = 0;

            a = newMeshes[0];
            a.position.x = -0.5;
            a.rotation.y = PI / 2;
            a.material = y.material;
            a.visibility = 0;

            s = newMeshes[2];
            s.position.z = -0.5;
            s.material = y.material;
            s.visibility = 0;

            cube.visibility = 0;

            /* s.posiition. */
            /* s.rotation.y = ; */
            /* cube.material = a.material; */
            tempMat = a.material;
            cube.material = tempMat;
            yCSG = BABYLON.CSG.FromMesh(y);
            aCSG = BABYLON.CSG.FromMesh(a);
            sCSG = BABYLON.CSG.FromMesh(s);

            /* y.material = wireMat;
            a.material = wireMat;
            s.material = wireMat; */
            /* sCSG = BABYLON.CSG.FromMesh(meshes[1]); */

        }
    );
    BABYLON.SceneLoader.ImportMesh(
        "",
        "./",
        "yas_letters_Export_2.babylon",
        scene,
        function(newMeshes) {
            meshes = newMeshes;
            yPH = newMeshes[1];
            yPH.position.y = 0.5;
            yPH.rotation.x = PI / 2;
            yPH.rotation.y = PI / 2;
            yPH.material = PHmat;

            aPH = newMeshes[0];
            aPH.position.x = -0.5;
            aPH.rotation.y = PI / 2;
            aPH.material = PHmat;

            sPH = newMeshes[2];
            sPH.position.z = -0.5;
            sPH.material = PHmat;

            /*  yPH.visibility = 0;
             aPH.visibility = 0;
             sPH.visibility = 0; */

            cubePH = newMeshes[3];
            /* cubePH.visibility = 0; */

            /* s.posiition. */
            /* s.rotation.y = ; */
            /* cube.material = a.material; */
            /*  tempMat = a.material;
             cube.material = tempMat;
             yCSG = BABYLON.CSG.FromMesh(y);
             aCSG = BABYLON.CSG.FromMesh(a);
             sCSG = BABYLON.CSG.FromMesh(s);

             y.material = wireMat;
             a.material = wireMat;
             s.material = wireMat; */
            /* sCSG = BABYLON.CSG.FromMesh(meshes[1]); */
            updateBoolean();

        }
    );

    var createScene = function() {

        var light = new BABYLON.HemisphericLight(
            "light1",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );

        invisibleMaterial = new BABYLON.StandardMaterial("invisible", scene);
        invisibleMaterial.alpha = 0;

        mat0 = new BABYLON.StandardMaterial("mat0", scene);
        mat0.diffuseColor = new BABYLON.Color3(0, 0, 0);
        mat0.specularColor = new BABYLON.Color3(0, 0, 0);
        mat1 = new BABYLON.StandardMaterial("mat1", scene);
        mat1.diffuseColor = new BABYLON.Color3(0, 0, 0);
        mat1.specularColor = new BABYLON.Color3(0, 0, 0)
        cubMat = new BABYLON.StandardMaterial("cubMat", scene);
        cubMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
        cubMat.specularColor = new BABYLON.Color3(0, 0, 0);
        multiMaterial = new BABYLON.MultiMaterial("multi", scene);
        multiMaterial.subMaterials.push(mat0);
        multiMaterial.subMaterials.push(mat1);
        multiMaterial.subMaterials.push(mat0);
        multiMaterial.subMaterials.push(mat1);
        multiMaterial.subMaterials.push(mat0);
        multiMaterial.subMaterials.push(mat1);
        multiMaterial.subMaterials.push(mat0);
        multiMaterial.subMaterials.push(mat1);

        cube = BABYLON.MeshBuilder.CreateBox("cube", {});
        cube.material = cubMat;

        cubeCSG = BABYLON.CSG.FromMesh(cube);
        camera.target = cube;


        wireMat = new BABYLON.StandardMaterial("wireMat", scene);
        wireMat.wireframe = true;

        PHmat = new BABYLON.StandardMaterial("PHmat", scene);

        bevel = BABYLON.MeshBuilder.CreateBox("cube", {});
        bevel.material = wireMat;
        bevel.position.x = -.6;
        bevel.position.y = 1;
        bevel.rotation.z = Math.PI / 4;
        bevel.visibility = 0;


        for (var i = 0; i < scene.materials.length; i++) {
            var mat = scene.materials[i];
            /* var cube = new BABYLON */
        }

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

    scene = createScene();

    //scene.debugLayer.show();
    scene.onPointerDown = function castRay() {
        /* var ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);

        var hit = scene.pickWithRay(ray);

        if (hit.pickedMesh) {
            console.log(hit.pickedMesh.name);
        } */
    }

    engine.runRenderLoop(function() {
        scene.render();
        update();
    });

    window.addEventListener("resize", function() {
        engine.resize();
    });
});


function update() {
    var heightPercent = (engine.getRenderHeight() * 100) / 1920;

    document.getElementById("background").style.backgroundColor = colorHost.bg;
    var color = colorHost.bg;
    color = pSBC(-.2, color);
    /* console.log(color); */
    document.getElementById("renderCanvas").style.borderColor = color;

    colorHost.bg = colorHost.Letters;

    try {

        if (colorHost.prevDepth != colorHost.Depth) {
            colorHost.yDepth = colorHost.Depth * .7;
            colorHost.aDepth = colorHost.Depth * .7;
            colorHost.sDepth = colorHost.Depth * .7;
        }

        scale = new BABYLON.Vector3(.94, .94, .94);
        y.scaling = scale;
        y.position.x = -0.1 + colorHost.yHeight * .1;
        y.position.y = 0.475 - (colorHost.yDepth * 2 - 1) * .1;
        y.position.z = 0;

        yPH.scaling = scale;
        yPH.position.x = -0.1 + colorHost.yHeight * .1;
        yPH.position.y = 0.475 - (colorHost.yDepth * 2 - 1) * .1;
        yPH.position.z = 0;

        a.scaling = scale;
        a.position.x = -0.475 + (colorHost.aDepth * 2 - 1) * .1;
        a.position.y = 0 - colorHost.aHeight * .1;
        a.position.z = colorHost.aZ;

        aPH.scaling = scale;
        aPH.position.x = -0.475 + (colorHost.aDepth * 2 - 1) * .1;
        aPH.position.y = 0 - colorHost.aHeight * .1;
        aPH.position.z = colorHost.aZ;

        s.scaling = scale;
        s.position.x = colorHost.sX;
        s.position.y = 0 - colorHost.sHeight * .1
        s.position.z = -0.475 + (colorHost.sDepth * 2 - 1) * .1;

        sPH.scaling = scale;
        sPH.position.x = colorHost.sX;
        sPH.position.y = 0 - colorHost.sHeight * .1
        sPH.position.z = -0.475 + (colorHost.sDepth * 2 - 1) * .1;

        bevel.position.y = 1.2 - colorHost.bevelDepth;

        camera.fov = colorHost.fov;

        yCSG.position = y.position;
        yCSG.rotation = y.rotation;

        aCSG.position = a.position;
        aCSG.rotation = a.rotation;

        sCSG.position = s.position;
        sCSG.rotation = s.rotation;

        cubeCSG.position = cube.position;
        cubeCSG.rotation = cube.rotation;

        multiMaterial.subMaterials[0].emissiveColor = BABYLON.Color3.FromHexString(
            colorHost.Cube
        );
        multiMaterial.subMaterials[1].emissiveColor = BABYLON.Color3.FromHexString(
            colorHost.Letters
        );
        scene.clearColor = BABYLON.Color3.FromHexString(colorHost.bg);

        colorHost.prevDepth = colorHost.Depth;

        if (colorHost.Guides) {
            activatePH();
        } else {
            disablePH();
        }
    } catch (e) {
        console.log(e);
    }
}

function toDeg(radians) {
    return radians * 57.2958;
}

function toRad(degrees) {
    return degrees * 0.0174533;
}

var newMesh;

function updateBoolean() {
    if (newMesh != undefined) {
        newMesh.dispose();
    }

    cubeCSG = BABYLON.CSG.FromMesh(cube);
    /* cubeCSG.material = multiMaterial; */

    var tempCSG;
    /* tempCSG = yCSG.union(aCSG);
    tempCSG = tempCSG.union(sCSG);
    cubeCSG = cubeCSG.subtract(tempCSG); */


    yCSG = BABYLON.CSG.FromMesh(y);
    aCSG = BABYLON.CSG.FromMesh(a);
    sCSG = BABYLON.CSG.FromMesh(s);

    if (colorHost.Positive) {
        cubeCSG = cubeCSG.union(yCSG);
        cubeCSG = cubeCSG.union(aCSG);
        cubeCSG = cubeCSG.union(sCSG);


    } else {
        /* bevel.material = mat0;
        const bevelCSG = BABYLON.CSG.FromMesh(bevel); */
        cubeCSG = cubeCSG.subtract(yCSG);
        cubeCSG = cubeCSG.subtract(aCSG);
        cubeCSG = cubeCSG.subtract(sCSG);
        /* cubeCSG = cubeCSG.subtract(bevelCSG); */
    }
    newMesh = cubeCSG.toMesh("newcube", multiMaterial, scene, true);
    newMesh.material = tempMat;
    console.log("bool done");

    if (cube.visibility == 1) {
        toggleMeshVisibility();
    }
    disablePH();

    bevel.material = wireMat;
}

function activatePH() {
    yPH.visibility = 1;
    aPH.visibility = 1;
    sPH.visibility = 1;

    cubePH.visibility = 1;
}

function disablePH() {
    yPH.visibility = 0;
    aPH.visibility = 0;
    sPH.visibility = 0;

    cubePH.visibility = 0;
}



function toggleMeshVisibility() {

    if (cubePH.visibility == 0) {
        /* y.visibility = 0;
        a.visibility = 0;
        s.visibility = 0; */
        activatePH();

        cube.visibility = 0;
        bevel.visibility = 0;
    } else {
        /*  y.visibility = 1;
         a.visibility = 1;
         s.visibility = 1; */
        disablePH();

        /* cube.visibility = 1; */
        bevel.visibility = 0;
    }
}

const RGB_Linear_Shade = (p, c) => {
    var i = parseInt,
        r = Math.round,
        [a, b, c, d] = c.split(","),
        P = p < 0,
        t = P ? 0 : 255 * p,
        P = P ? 1 + p : 1 - p;
    return "rgb" + (d ? "a(" : "(") + r(i(a[3] == "a" ? a.slice(5) : a.slice(4)) * P + t) + "," + r(i(b) * P + t) + "," + r(i(c) * P + t) + (d ? "," + d : ")");
}