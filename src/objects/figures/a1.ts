import * as THREE from 'three';

// M 0 0 H 5 V -1 Q 4 -2 2 -2 Q 1.644 -1.993 2 -2.22 Q 4.623 -4.326 1.939 -6.785 Q 1.658 -7.023 2 -7 Q 4 -7 5 -8 V -9 H 0
export function createA1() {
    let points = [
        new THREE.Vector2(1.5, 0.5),
        new THREE.Vector2(1.5, 0),
        new THREE.Vector2(1.1, 1),
    ]

    // 1. Define a 2D Bézier curve (in the X-Y plane)
    const curve = new THREE.QuadraticBezierCurve(
        new THREE.Vector2(1.5, 0.5),   // start point
        new THREE.Vector2(1.5, 0.7),  // control point 1
        new THREE.Vector2(1.1, 1),  // end point
    );

    points.push(...curve.getPoints(20));

    // 3. Create LatheGeometry from the points
    const latheGeometry = new THREE.LatheGeometry(points);

    // 4. Create a material
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, side: THREE.DoubleSide });

    // 5. Create the mesh
    const latheMesh = new THREE.Mesh(latheGeometry, material);
}