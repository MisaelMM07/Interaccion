let camera, scene, renderer;
let mesh;
const AMOUNT = 4;

//init();
//animate();

//function init() {

    const ASPECT_RATIO = window.innerWidth / window.innerHeight;

    const WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio;
    const HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio;

    const cameras = [];

    for (let y = 0; y < AMOUNT; y++) {

        for (let x = 0; x < AMOUNT; x++) {

            const subcamera = new THREE.PerspectiveCamera(35, ASPECT_RATIO, 0.1, 10);
            subcamera.viewport = new THREE.Vector4(Math.floor(x * WIDTH), Math.floor(y * HEIGHT), Math.ceil(WIDTH), Math.ceil(HEIGHT));
            subcamera.position.x = (x / AMOUNT) - 0.5;
            subcamera.position.y = 0.5 - (y / AMOUNT);
            subcamera.position.z = 1.5;
            subcamera.position.multiplyScalar(2);
            subcamera.lookAt(0, 0, 0);
            subcamera.updateMatrixWorld();
            cameras.push(subcamera);

        }

    }

    camera = new THREE.ArrayCamera(cameras);
    camera.position.z = 3;

    scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0x222244));

    const light = new THREE.DirectionalLight();
    light.position.set(0.5, 0.5, 1);
    light.castShadow = true;
    light.shadow.camera.zoom = 5; // tighter shadow map
    scene.add(light);

    const geometryBackground = new THREE.PlaneGeometry(100, 100);
    const materialBackground = new THREE.MeshPhongMaterial({ color: '#EE4A4A' });

    const background = new THREE.Mesh(geometryBackground, materialBackground);
    background.receiveShadow = true;
    background.position.set(0, 0, - 1);
    scene.add(background);

    const geometryCylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: '#25A8FF' });

    mesh = new THREE.Mesh(geometryCylinder, materialCylinder);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize);

//}Fin de init
animate();
function onWindowResize() {

    const ASPECT_RATIO = window.innerWidth / window.innerHeight;
    const WIDTH = (window.innerWidth / AMOUNT) * window.devicePixelRatio;
    const HEIGHT = (window.innerHeight / AMOUNT) * window.devicePixelRatio;

    camera.aspect = ASPECT_RATIO;
    camera.updateProjectionMatrix();

    for (let y = 0; y < AMOUNT; y++) {
        for (let x = 0; x < AMOUNT; x++) {
            const subcamera = camera.cameras[AMOUNT * y + x];

            subcamera.viewport.set(
                Math.floor(x * WIDTH),
                Math.floor(y * HEIGHT),
                Math.ceil(WIDTH),
                Math.ceil(HEIGHT));

            subcamera.aspect = ASPECT_RATIO;
            subcamera.updateProjectionMatrix();
        }
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    mesh.rotation.x += 0.005;
    mesh.rotation.z += 0.01;renderer.render(scene, camera);
    requestAnimationFrame(animate);
}