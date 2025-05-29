import * as THREE from 'three';

export function createA1(){
    // 1. Define a 2D Bézier curve (in the X-Y plane)
    const curve = new THREE.CubicBezierCurve(
    new THREE.Vector2(0, 0),   // start point
    new THREE.Vector2(5, 10),  // control point 1
    new THREE.Vector2(5, 20),  // control point 2
    new THREE.Vector2(0, 30)   // end point
    );

    // 2. Sample points along the curve
    const points = curve.getPoints(30); // More points = smoother surface

    // 3. Create LatheGeometry from the points
    const latheGeometry = new THREE.LatheGeometry(points);

    // 4. Create a material
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, side: THREE.DoubleSide });

    // 5. Create the mesh
    const latheMesh = new THREE.Mesh(latheGeometry, material);
}