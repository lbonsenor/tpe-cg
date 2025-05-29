import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const forklift_model = new THREE.Group(); // This is the parent group

const back_wheel_height = 0.59577
const front_wheel_height = 0.779341
const elevator_height = 1.58425

const loader = new GLTFLoader();
const gltfPaths = ['src/models/body.glb', 'src/models/elevator.glb', 'src/models/back_wheels.glb', 'src/models/front_wheels.glb'];
const gltfPos = [[0,front_wheel_height/4,0], [0,elevator_height/2,1], [0,back_wheel_height/2,-1.25], [0,front_wheel_height/2,0.25]]

gltfPaths.forEach((path, index) => {
  loader.load(path, (gltf) => {
    const model = gltf.scene;

    // Optionally, position each model differently if needed
    model.position.x = gltfPos[index][0];
    model.position.y = gltfPos[index][1];
    model.position.z = gltfPos[index][2];
    forklift_model.add(model);
  });
});

// Now you can move/rotate/scale the whole group:
forklift_model.position.set(0, 0, 0);
forklift_model.rotation.y = Math.PI;

// And also move/rotate individual models:
export function rotateFirstModelY(angle: number) {
  if (forklift_model.children[0]) {
    forklift_model.children[0].rotation.y += angle;
  }
}

export function moveElevatorUp(){
  forklift_model.children[0].position.y += forklift_model.children[0].position.y < 2.5 ? 0.1 : 0;
}

export function moveElevatorDown(){
  forklift_model.children[0].position.y -= forklift_model.children[0].position.y > elevator_height/2 ? 0.1 : 0;
}
