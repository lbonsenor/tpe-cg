import * as THREE from 'three';

export function createPrinter(): THREE.Group {
    const printerGroup = new THREE.Group();

    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x777777 });
    const trayMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });

    // Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(2, 0.3, 1.5), baseMaterial);
    base.position.y = 0.15;
    printerGroup.add(base);

    // Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.2), bodyMaterial);
    body.position.y = 0.9;
    printerGroup.add(body);

    // Tray (top)
    const tray = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 1), trayMaterial);
    tray.position.y = 1.5;
    printerGroup.add(tray);

    return printerGroup;
}
