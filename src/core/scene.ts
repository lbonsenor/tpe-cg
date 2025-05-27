import * as THREE from 'three';
import { createShelf } from '../objects/shelf';
import { createPrinter } from '../objects/printer';
import { forkliftGroup } from '../objects/forklift';

export const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({ canvas });
export const clock = new THREE.Clock();
export const forklift = forkliftGroup
export const shelf = createShelf();
export const printer = createPrinter();
const light = new THREE.DirectionalLight(0xffffff, 1);
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0xbababa })
);

shelf.position.set(-5, 0, 0); // Position it to the side
printer.position.set(5, 0, 0); // Opposite side
light.position.set(5, 10, 7.5);
ground.rotation.x = -Math.PI / 2;

scene.add(forkliftGroup);
scene.add(shelf);
scene.add(printer);
scene.add(light);
scene.add(ground);

renderer.setSize(window.innerWidth, window.innerHeight);