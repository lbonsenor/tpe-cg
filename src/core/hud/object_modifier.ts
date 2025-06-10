import { createA1 } from "../../objects/figures/a1";
import { printer } from "../scene";
import * as THREE from 'three';

export type SurfaceState = {
    surfaceType: "Sweep" | "Revolution";
    surfaceOption: string;
    torsionAngle?: number;
    totalHeight: number;
};

export const state: SurfaceState = {
    surfaceType: "Sweep",
    surfaceOption: "A1",
    torsionAngle: 0,
    totalHeight: 0,
};

export function initializeHUD2() {
    const surfaceTypeEl = document.getElementById("surfaceType") as HTMLSelectElement;
    const surfaceOptionEl = document.getElementById("surfaceOption") as HTMLSelectElement;
    const torsionAngleEl = document.getElementById("torsionAngle") as HTMLInputElement;
    const totalHeightEl = document.getElementById("totalHeight") as HTMLInputElement;
    const printButtonEl = document.getElementById("printButton") as HTMLButtonElement;

    const torsionValueEl = document.getElementById("torsionValue")!;
    const heightValueEl = document.getElementById("heightValue")!;
    const optionLabel = document.getElementById("optionLabel")!;
    const torsionLabel = document.getElementById("torsionLabel")!;

    surfaceTypeEl.addEventListener("change", () => {
        state.surfaceType = surfaceTypeEl.value as "Sweep" | "Revolution";

        const options = state.surfaceType === "Sweep"
            ? ["A1", "A2", "A3", "A4"]
            : ["B1", "B2", "B3", "B4"];

        surfaceOptionEl.innerHTML = "";
        options.forEach(opt => {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            surfaceOptionEl.appendChild(option);
        });

        torsionLabel.style.display = state.surfaceType === "Sweep" ? "block" : "none";
        state.surfaceOption = options[0];
        state.torsionAngle = state.surfaceType === "Sweep" ? Number(torsionAngleEl.value) : undefined;
    });

    surfaceOptionEl.addEventListener("change", () => {
        state.surfaceOption = surfaceOptionEl.value;
    });

    torsionAngleEl.addEventListener("input", () => {
        const value = Number(torsionAngleEl.value);
        state.torsionAngle = value;
        torsionValueEl.textContent = `${value}°`;
    });

    totalHeightEl.addEventListener("input", () => {
        const value = Number(totalHeightEl.value);
        state.totalHeight = value;
        heightValueEl.textContent = value.toFixed(2);
    });

    printButtonEl.addEventListener("click", onPrint);
}


export let printedCube: THREE.Mesh | null = null;

function onPrint(){
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    printedCube = new THREE.Mesh(geometry, material);
    printedCube.position.set(0, 1.55+0.1, 0); // On top of tray
    printedCube.name = "printedCube";

    printer.add(printedCube);
    
    switch (state.surfaceOption) {
        case 'A1': createA1(); break;
        case 'B1': break;
        case 'A2': break;
        case 'B2': break;
        case 'A3': break;
        case 'B3': break;
        case 'A4': break;
        case 'B4': break;
        default:
            break;
    }
}
