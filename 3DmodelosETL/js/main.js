import * as THREE from '../src/three.module.js';

import Stats from '../src/stats.module.js';

import { STLLoader } from '../src/STLLoader.js';

let container, stats;

let camera, cameraTarget, scene, renderer;

init();
animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 35);
    camera.position.set(10, 1, 10);

    cameraTarget = new THREE.Vector3(5, 1, 0);//Camara

    scene = new THREE.Scene();
    scene.background = new THREE.Color('yellowgreen');
    scene.fog = new THREE.Fog('indianred', 2, 15);

    // Ground

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshPhongMaterial({ color: 'white', specular: 'grey' })
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = - 0.5;
    scene.add(plane);

    plane.receiveShadow = true;


    // ASCII file

    const loader = new STLLoader();
    loader.load('../src/preview.stl', function (geometry) {

        const material = new THREE.MeshPhongMaterial({ color: 'red', specular: 'blue', shininess: 200 });
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(5, 0.2, 0.12);
        mesh.rotation.set(4.7, 0, -2);//Rotar mono
        mesh.scale.set(0.1, 0.1, 0.1);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });


    /* Binary files

    const material = new THREE.MeshPhongMaterial({ color: 0xAAAAAA, specular: 0x111111, shininess: 200 });

    loader.load('./models/stl/binary/pr2_head_pan.stl', function (geometry) {

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, - 0.37, - 0.6);
        mesh.rotation.set(- Math.PI / 2, 0, 0);
        mesh.scale.set(2, 2, 2);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });

    loader.load('./models/stl/binary/pr2_head_tilt.stl', function (geometry) {

        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0.136, - 0.37, - 0.6);
        mesh.rotation.set(- Math.PI / 2, 0.3, 0);
        mesh.scale.set(2, 2, 2);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });*/

    /* Colored binary STL
    loader.load('./models/stl/binary/colored.stl', function (geometry) {

        let meshMaterial = material;

        if (geometry.hasColors) {

            meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: true });

        }

        const mesh = new THREE.Mesh(geometry, meshMaterial);

        mesh.position.set(0.5, 0.2, 0);
        mesh.rotation.set(- Math.PI / 2, Math.PI / 2, 0);
        mesh.scale.set(0.3, 0.3, 0.3);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        scene.add(mesh);

    });*/


    // Lights

    scene.add(new THREE.HemisphereLight('red', 'cyan'));

    addShadowedLight(1, 1, 1, 0xffffff, 1.35);
    addShadowedLight(0.5, 1, - 1, 'red', 1);
    // renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    container.appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize);

}

function addShadowedLight(x, y, z, color, intensity) {

    const directionalLight = new THREE.DirectionalLight(color, intensity);
    directionalLight.position.set(x, y, z);
    scene.add(directionalLight);

    directionalLight.castShadow = true;

    const d = 1;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 4;

    directionalLight.shadow.bias = - 0.002;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    const timer = Date.now() * 0.0005;

    camera.position.x = Math.cos(timer) * 3;
    camera.position.z = Math.sin(timer) * 3;

    camera.lookAt(cameraTarget);

    renderer.render(scene, camera);

}