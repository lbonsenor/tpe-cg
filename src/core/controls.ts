import type { CameraController } from "../types/camera-controller";

export const keys: Record<string, boolean> = {
    w: false,
    a: false,
    s: false,
    d: false,
};

export function setupInput(cameraController: CameraController) {
    // State for mouse drag
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();

        // Movement keys
        if (keys.hasOwnProperty(key)) {
            keys[key] = true;
        }

        // Camera zoom keys
        if (key === "o") cameraController.zoom(1);
        if (key === "p") cameraController.zoom(-1);

        // Camera mode switch
        const mode = parseInt(key);
        if (mode >= 1 && mode <= 6) {
            cameraController.switchMode(mode as 1 | 2 | 3 | 4 | 5 | 6);
        }
    });

    window.addEventListener("keyup", (e) => {
        const key = e.key.toLowerCase();
        if (keys.hasOwnProperty(key)) {
            keys[key] = false;
        }
    });

    // Mouse drag for orbital camera
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

    // Mouse wheel zoom
    window.addEventListener("wheel", (e) => {
        if (![1, 2, 3].includes(cameraController.mode)) return;
        cameraController.zoom(e.deltaY * 0.01);
    });
}
