import './style.css';
import * as THREE from 'three';
import Tableau from './Tableau.js';

const instanceTableau = new Tableau(200, 100);
const { tableau, minValue, maxValue } = instanceTableau;

console.log(minValue);
console.log(maxValue);
console.table(tableau);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = instanceTableau.getPoints();


const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.LineSegments( geometry, material );
scene.add(line);

// camera.position.z = 5;

const animate = function () {
    requestAnimationFrame( animate );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();