import * as THREE from 'three';
import { scene, renderer, clock } from './scene';
import { forkliftGroup } from '../objects/forklift';
import { keys } from './controls';
import { updateHUD } from './hud/logger';
import type { CameraController } from '../types/camera-controller';

const moveSpeed = 5;
const rotateSpeed = 2;

export function animate(cameraController: CameraController) {
    requestAnimationFrame(() => animate(cameraController));

    const delta = clock.getDelta();

    // ──────────────────────── Movement ────────────────────────
    const dir = new THREE.Vector3(0, 0, -1).applyEuler(forkliftGroup.rotation);

    if (keys.a) forkliftGroup.rotation.y += rotateSpeed * delta;
    if (keys.d) forkliftGroup.rotation.y -= rotateSpeed * delta;
    if (keys.w) forkliftGroup.position.addScaledVector(dir, moveSpeed * delta);
    if (keys.s) forkliftGroup.position.addScaledVector(dir, -moveSpeed * delta);


    // ──────────────────────── Camera ────────────────────────
    cameraController.update(forkliftGroup);

    // ──────────────────────── HUD Update ────────────────────────
    const actions: string[] = [];
    if (keys.w) actions[0] = 'Moving Forward';
    if (keys.s) actions[0] = 'Moving Backward';
    if (keys.a) actions[1] = 'Rotating Left';
    if (keys.d) actions[1] = 'Rotating Right';

    updateHUD({
        cameraMode: cameraController.getModeName(),
        movementSpeed: moveSpeed,
        actions,
    });

    // ──────────────────────── Render ────────────────────────
    renderer.render(scene, cameraController.camera);
}
