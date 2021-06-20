import './style.css';
import * as THREE from 'three';
import Tableau from './Tableau.js';
import { floorPowerOfTwo } from 'three/src/math/MathUtils';

const MAX_POINTS = 200;
const instanceTableau = new Tableau(MAX_POINTS, 50);
let { tableau, minValue, maxValue } = instanceTableau;

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

const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });


// instanceTableau.tri();
// console.table(tableau);
const points = instanceTableau.getPoints();


const geometry = new THREE.BufferGeometry().setFromPoints(points);
let drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);

const line = new THREE.LineSegments( geometry, material );
scene.add(line);
// insertionSort(tableau);
 
let linesDessine = createAndAddLine(tableau);
linesDessine.forEach(element => {
    scene.add(element);
});
// var point1 = new Vector3(0, -50, 0);
// var point2 = new Vector3(50, 50, 0);

// var array = [point1, point2];
// var geometryTest = new THREE.BufferGeometry().setFromPoints(array);
// var materialTest = new THREE.LineBasicMaterial({ color: 0xff0000 });
// console.table(tableau);


// var testLine = new THREE.LineSegments(geometryTest, materialTest);

// scene.add(testLine);
// camera.position.z = 5;
// console.log(triPerso(tableau,linesDessine));
const animate = function () {
    requestAnimationFrame(animate);
    triPerso(tableau,linesDessine);
    // linesDessine[100].position.x += 0.05;

    // console.log(triPerso(linesDessine));
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    
    
    // if (drawCount === 0) {
    //     line.geometry.attributes.position.needsUpdate = false;
    //     line.geometry.setDrawRange(0, MAX_POINTS * 2);
        
    // } else {
    //     drawCount = (drawCount + 1) % (MAX_POINTS * 2);
    //     line.geometry.setDrawRange(0, drawCount);
    //     line.rotation.x += 0.01;
    //     line.rotation.y += 0.01;
    // }

    // test(linesDessine[100]);
    // linesDessine[100].position.x += 0.05;
    renderer.render( scene, camera );
};

function createAndAddLine(tableau) {
    let xOffset = -100;
    let point1;
    let point2;
    let lines = [];
    let materialTest = new THREE.LineBasicMaterial({ color: 0xff0000 });
    for (let i = 0; i < tableau.length; i++) {
        point1 = new THREE.Vector3(xOffset, 0, 0);
        point2 = new THREE.Vector3(xOffset, tableau[i], 0);

        lines.push(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([point1, point2]), materialTest));
        xOffset += 1;
    }
    return lines;
};


function getMinIndex(tableau, start) {
    let min = Infinity;
    let minIndex;
    for (let i = start; i < tableau.length; i++) {
        if (tab[i] < min) {
            min = tableau[i];
            minIndex = i;
        }
    }
    return minIndex;
}

function test(line) {
    line.position.x += 0.05;
}

function swap(tabValue, tabDessin, index_1, index_2) {
    let temp = tabValue[index_1];
    let temp_2 = tabDessin[index_1];

    tabValue[index_1] = tabValue[index_2];
    tabValue[index_2] = temp;

    tabDessin[index_1].position.x = tabDessin[index_2].position.x;
    tabDessin[index_2].position.x = temp_2.position.x;
}

function triPerso(tableau, linesDessine) {
    // let min = tab[0];
    let minIndex = 0;

    let point1_x = 0;
    
    let point2_x = 0;
    for (let y = 0; y < tableau.length; y++) {
        point1_x = tableau[y].position.x;
        minIndex = getMinIndex(tableau, y);

        let temp = tableau[minIndex];
        let temp_2 = linesDessine[minIndex];
    
        tableau[minIndex] = tableau[y];
        tableau[y] = temp;
    
        linesDessine[minIndex].position.x = linesDessine[y].position.x;
        linesDessine[y].position.x = temp_2.position.x;
    }
}

animate();