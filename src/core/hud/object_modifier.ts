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
}
