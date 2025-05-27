import * as THREE from 'three';

export function createShelf(): THREE.Group {
    const shelfGroup = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

    const verticalBarGeo = new THREE.BoxGeometry(0.1, 8, 0.1);
    const horizontalPlankGeo = new THREE.BoxGeometry(2, 0.1, 0.4);

    // Four vertical bars
    const positions = [
        [-1, 4, -0.2], [1, 4, -0.2],
        [-1, 4, 0.2], [1, 4, 0.2],
    ];
    positions.forEach(([x, y, z]) => {
        const bar = new THREE.Mesh(verticalBarGeo, material);
        bar.position.set(x, y, z);
        shelfGroup.add(bar);
    });

    // Planks (5 levels)
    for (let i = 0; i < 5; i++) {
        const plank = new THREE.Mesh(horizontalPlankGeo, material);
        plank.position.set(0, i * 2 + 0.5, 0);
        shelfGroup.add(plank);
    }

    return shelfGroup;
}
