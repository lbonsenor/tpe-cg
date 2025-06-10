import * as THREE from 'three';
import { state } from '../../core/hud/object_modifier';

function createMeshesFromA(points: THREE.Vector2[]) {
    const latheGeometry = new THREE.LatheGeometry(points, 64); // 64 = smoothness
    const latheMaterial = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
    });
    const latheMesh = new THREE.Mesh(latheGeometry, latheMaterial);

    latheMesh.scale.set(0.3, 0.3 * state.totalHeight, 0.3);

    return [latheMesh, latheMaterial];
}