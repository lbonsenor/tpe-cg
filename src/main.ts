import './core/scene';
import { camera, printer, scene, shelf } from './core/scene';
import { forkliftGroup } from './objects/forklift';
import { animate } from './core/animate';

import { setupInput } from './core/controls';
import { CameraController } from './types/camera-controller';
import { Vector3 } from 'three';

const cameraController = new CameraController(camera, {
  sceneCenter: new Vector3(0, 0, 0),
  printer: printer,
  shelf: shelf,
  forklift: forkliftGroup,
});

setupInput(cameraController);

// Start loop
animate(cameraController);