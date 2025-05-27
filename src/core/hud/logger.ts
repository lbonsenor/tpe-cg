const hudElement = document.getElementById("hud")!;

export function updateHUD({
    cameraMode,
    movementSpeed,
    actions,
}: {
    cameraMode: string;
    movementSpeed: number;
    actions: string[];
}) {
    hudElement.innerText = `
Current Camera: ${cameraMode}
Movement Speed: ${movementSpeed.toFixed(2)}
${actions.length ? "\n" + actions.join("\n") : ""}
  `.trim();
}
