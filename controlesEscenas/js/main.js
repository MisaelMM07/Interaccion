import * as THREE from '../src/three.module.js';
import { PointerLockControls } from '../src/PointerLockControls.js'

let camera, scene, renderer, pControl
let xdir = 0, zdir = 0
let tiempoI, tiempoF, vel, delta

scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)
scene.fog = new THREE.Fog(0xffffff, 0, 500)

scene.add(new THREE.GridHelper(10000, 1000))
let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshLambertMaterial({ color: "rgb(0, 255, 255, 0.5)" })
)
let mio = new THREE.Mesh(
    new THREE.BoxGeometry(20 /*X*/, 20/*Y*/, 20/*Z*/),
    new THREE.MeshBasicMaterial({color:'red'})
)
mesh.position.z = -50
scene.add(mesh)

mio.position.z = 80
scene.add(mio)

scene.add(new THREE.HemisphereLight(0xffffff))

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 10

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

pControl = new PointerLockControls(camera, renderer.domElement)

document.getElementById('btnPlay').onclick = () => {
    pControl.lock()
}

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            xdir = -1
            break;
        case 38:
            zdir = 1
            break;
        case 39:
            xdir = 1
            break;
        case 40:
            zdir = -1
            break;
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
            xdir = 0
            break;
        case 38:
            zdir = 0
            break;
        case 39:
            xdir = 0
            break;
        case 40:
            zdir = 0
            break;
    }
})

tiempoI = Date.now()
vel = 50

animate()

function animate() {

    requestAnimationFrame(animate);

    if (pControl.isLocked === true) {
        tiempoF = Date.now()

        delta = (tiempoF - tiempoI) / 1000

        let xDis = xdir * vel * delta
        let zDis = zdir * vel * delta

        pControl.moveRight(xDis)
        pControl.moveForward(zDis)

        tiempoI = tiempoF
    }
    //Cubo azul
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    //Cubo rojo
    mio.rotation.y += 0.01;
    mio.rotation.x += 0.01;

    renderer.render(scene, camera);
}