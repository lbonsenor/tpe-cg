import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const forklift_model = new THREE.Group(); // This is the parent group

const loader = new GLTFLoader();
const gltfPaths = ['src/models/body.glb', 'src/models/elevator.glb', 'src/models/back_wheels.glb', 'src/models/front_wheels.glb'];

gltfPaths.forEach((path, index) => {
  loader.load(path, (gltf) => {
    const model = gltf.scene;

    // Optionally, position each model differently if needed
    model.position.x = index * 2; // spacing them for visibility
    forklift_model.add(model);
  });
});

// Now you can move/rotate/scale the whole group:
forklift_model.position.set(0, 0, 0);
forklift_model.rotation.y = Math.PI / 4;

// And also move/rotate individual models:
function rotateFirstModelY(angle: number) {
  if (forklift_model.children[0]) {
    forklift_model.children[0].rotation.y += angle;
  }
}
