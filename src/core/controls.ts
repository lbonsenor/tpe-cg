import type { CameraController } from "../types/camera-controller";
import { forklift_model, moveElevatorDown, moveElevatorUp } from '../objects/3dforklift';

export const keys: Record<string, boolean> = {
    w: false,
    a: false,
    s: false,
    d: false,
};

export function setupInput(cameraController: CameraController) {
    // ────────────────────────Mouse Drag ────────────────────────
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();

        // ──────────────────────── Movement ────────────────────────
        if (keys.hasOwnProperty(key)) {
            keys[key] = true;
        }

        // ──────────────────────── Camera Zoom ────────────────────────
        if (key === "o") cameraController.zoom(1);
        if (key === "p") cameraController.zoom(-1);

        // ──────────────────────── Camera mode ────────────────────────
        const mode = parseInt(key);
        if (mode >= 1 && mode <= 6) {
            cameraController.switchMode(mode as 1 | 2 | 3 | 4 | 5 | 6);
        }

        // ──────────────────────── Elevator ────────────────────────
        if (key === "e") moveElevatorUp()
        if (key === "q") moveElevatorDown()
    });

    window.addEventListener("keyup", (e) => {
        const key = e.key.toLowerCase();
        if (keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    });

    // ──────────────────────── Orbital Camera ────────────────────────
    window.addEventListener("mousedown", (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging || ![1, 2, 3].includes(cameraController.mode)) return;

        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;

        cameraController.orbit(deltaX, deltaY);

        prevX = e.clientX;
        prevY = e.clientY;
    });

    // ──────────────────────── Mouse Wheel Zoom ────────────────────────
    window.addEventListener("wheel", (e) => {
        if (![1, 2, 3].includes(cameraController.mode)) return;
        cameraController.zoom(e.deltaY * 0.01);
    });
}

