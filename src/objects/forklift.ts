import * as THREE from 'three';

export const forkliftGroup = new THREE.Group();

const forkliftBody = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 2, 1.5),
  new THREE.MeshStandardMaterial({ color: 0x5555ff })
);
forkliftBody.position.y = 1;
forkliftGroup.add(forkliftBody);

const wheel = new THREE.Mesh(
  new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
wheel.rotation.z = Math.PI / 2;
wheel.position.set(0.8, 0.3, 0.8);
forkliftGroup.add(wheel.clone());
wheel.position.set(-0.8, 0.3, 0.8);
forkliftGroup.add(wheel.clone());