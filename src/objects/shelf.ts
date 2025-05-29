import * as THREE from 'three';

export const shelfGroup = new THREE.Group();
const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

const rows = 2
const cols = 8

const levelSize = 2;
const levelHeight = 1.58425-0.35;

const verticalBarGeo = new THREE.BoxGeometry(0.1, levelHeight, 0.1);
const horizontalPlankGeo = new THREE.BoxGeometry(levelSize, 0.1, levelSize);

// Four vertical bars
const verticalBarPositions = [
    [-levelSize / 2, levelHeight / 2, -0.2], [levelSize / 2, levelHeight / 2, -0.2],
    [-levelSize / 2, levelHeight / 2, 0.2], [levelSize / 2, levelHeight / 2, 0.2],
]

// Planks (5 levels)
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        verticalBarPositions.forEach((pos) => {
            const verticalBar = new THREE.Mesh(verticalBarGeo, material)
            verticalBar.position.set(pos[0] + levelSize * j, pos[1] + levelHeight * i, pos[2])
            shelfGroup.add(verticalBar);
        })

        const plank = new THREE.Mesh(horizontalPlankGeo, material);
        plank.position.set(j * levelSize, i * levelHeight + 0.5, 0);
        shelfGroup.add(plank);
    }
}



