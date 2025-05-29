import './core/scene';
import { camera, printer, shelf } from './core/scene';
import { animate } from './core/animate';

import { setupInput } from './core/controls';
import { CameraController } from './types/camera-controller';
import { Vector3 } from 'three';
import { forklift_model } from './objects/3dforklift';

const cameraController = new CameraController(camera, {
  sceneCenter: new Vector3(0, 0, 0),
  printer: printer,
  shelf: shelf,
  forklift: forklift_model,
});

setupInput(cameraController);

// Start loop
animate(cameraController);