import * as THREE from "three"

type CameraMode = 1 | 2 | 3 | 4 | 5 | 6;

interface CameraTargets {
    sceneCenter: THREE.Vector3;
    printer: THREE.Object3D;
    shelf: THREE.Object3D;
    forklift: THREE.Object3D;
}

export class CameraController {
    camera: THREE.PerspectiveCamera;
    mode: CameraMode = 1;

    // Orbital controls parameters
    spherical = new THREE.Spherical(10, Math.PI / 4, Math.PI / 4); // radius, phi, theta
    target = new THREE.Vector3();

    // Zoom limits
    minRadius = 5;
    maxRadius = 50;

    targets: CameraTargets;

    constructor(camera: THREE.PerspectiveCamera, targets: CameraTargets) {
        this.camera = camera;
        this.targets = targets;
        this.updateTarget();
    }

    switchMode(mode: CameraMode) {
        this.mode = mode;
        this.updateTarget();

        // Reset spherical radius to default zoom on orbital cameras
        if (this.mode >= 1 && this.mode <= 3) {
            this.spherical.radius = 10;
        }
    }

    updateTarget() {
        switch (this.mode) {
            case 1: this.target.copy(this.targets.sceneCenter); break;
            case 2: this.target.copy(this.targets.printer.position); break;
            case 3: this.target.copy(this.targets.shelf.position); break;
            case 4: /* driver camera target is forward */ break;
            case 5: /* rear tracking */ break;
            case 6: /* side tracking */ break;
        }
    }

    // Call this each frame to update the camera position and orientation
    update(elevatorGroup: THREE.Object3D) {
        switch (this.mode) {
            case 1:
            case 2:
            case 3:
                this.updateOrbital();
                break;
            case 4:
                this.updateDriverCamera(elevatorGroup);
                break;
            case 5:
                this.updateRearTrackingCamera(elevatorGroup);
                break;
            case 6:
                this.updateSideTrackingCamera(elevatorGroup);
                break;
        }
    }

    private updateOrbital() {
        // Convert spherical to cartesian coords, add to target position
        const pos = new THREE.Vector3().setFromSpherical(this.spherical).add(this.target);
        this.camera.position.copy(pos);
        this.camera.lookAt(this.target);
    }

    private updateDriverCamera(elevator: THREE.Object3D) {
        // Position slightly inside elevator looking forward
        const forward = new THREE.Vector3(0, 0, -1).applyEuler(elevator.rotation);
        const pos = elevator.position.clone().add(new THREE.Vector3(0, 1.5, 0)); // approx driver eye height
        this.camera.position.copy(pos);
        this.camera.lookAt(pos.clone().add(forward));
    }

    private updateRearTrackingCamera(elevator: THREE.Object3D) {
        const backward = new THREE.Vector3(0, 0, 1).applyEuler(elevator.rotation);
        const pos = elevator.position.clone().add(backward.multiplyScalar(5)).add(new THREE.Vector3(0, 2, 0));
        this.camera.position.lerp(pos, 0.1);
        this.camera.lookAt(elevator.position);
    }

    private updateSideTrackingCamera(elevator: THREE.Object3D) {
        const side = new THREE.Vector3(1, 0, 0).applyEuler(elevator.rotation);
        const pos = elevator.position.clone().add(side.multiplyScalar(5)).add(new THREE.Vector3(0, 2, 0));
        this.camera.position.lerp(pos, 0.1);
        this.camera.lookAt(elevator.position);
    }

    // Methods to control orbit by mouse drag (deltaX, deltaY in pixels)
    orbit(deltaX: number, deltaY: number) {
        // Sensitivity constants
        const ROTATE_SPEED = 0.005;
        this.spherical.theta -= deltaX * ROTATE_SPEED;
        this.spherical.phi -= deltaY * ROTATE_SPEED;

        // Clamp phi so camera stays above/below target
        const EPS = 0.01;
        this.spherical.phi = THREE.MathUtils.clamp(this.spherical.phi, EPS, Math.PI - EPS);
    }

    zoom(delta: number) {
        this.spherical.radius += delta;
        this.spherical.radius = THREE.MathUtils.clamp(this.spherical.radius, this.minRadius, this.maxRadius);
    }

    getModeName(): string {
        return {
            1: 'Orbital - Scene',
            2: 'Orbital - Printer',
            3: 'Orbital - Shelf',
            4: 'Driver View',
            5: 'Rear Follow',
            6: 'Side Follow',
        }[this.mode] ?? 'Unknown';
    }
}