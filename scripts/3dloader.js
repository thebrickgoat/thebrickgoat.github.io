var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);
document.getElementById('threedContainer').appendChild(renderer.domElement);
var scrollTop = document.getElementById('threedContainer').scrolltop

var material = new THREE.MeshToonMaterial({
	color: 0x2194ce
});

var lights = [];
lights[0] = new THREE.DirectionalLight(0x117fec, 1);
lights[0].position.set(1, 0, 0);
lights[1] = new THREE.DirectionalLight(0xff8d6e, 1);
lights[1].position.set(0.75, 1, 0.25);
lights[2] = new THREE.DirectionalLight(0x117fec, 1);
lights[2].position.set(-0.75, -1, 0.25);
scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

camera.position.z = 10;
camera.position.y = 1;
camera.position.x = -3;

var particle = new THREE.Object3D();

var geometry = new THREE.TetrahedronGeometry(2, 0);
var geom = new THREE.IcosahedronGeometry(7, 1);
var geom2 = new THREE.IcosahedronGeometry(15, 1);

for (var i = 0; i < 300; i++) {
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
	mesh.position.multiplyScalar(90 + (Math.random() * 700));
	mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
	particle.add(mesh);
}

scene.add(particle);

var animate = function () {
	requestAnimationFrame(animate);
	particle.rotation.x += 0.00001;
	particle.rotation.y -= 0.00040;
	root.rotation.x += .002;
	root.rotation.y += .002;
	renderer.clear();
	renderer.render(scene, camera);

};

var loader = new THREE.GLTFLoader();
var root;

loader.load('/imgs/models/DUCK.gltf', function (gltf) {
	root = gltf.scene;
	root.rotation.x = (Math.random() * 360) * Math.PI / 180;
	root.rotation.y = (Math.random() * 360) * Math.PI / 180;
	root.rotation.z = (Math.random() * 360) * Math.PI / 180;
	scene.add(gltf.scene);
	animate();
}, undefined, function (error) {
	console.error(error);
});