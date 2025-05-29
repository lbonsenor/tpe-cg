import * as THREE from 'three';
import { createShelf } from '../objects/shelf';
import { createPrinter } from '../objects/printer';
import { forklift_model } from '../objects/3dforklift';

export const canvas = document.querySelector('#webgl') as HTMLCanvasElement;
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({ canvas });
export const clock = new THREE.Clock();
export const forklift = forklift_model;
export const shelf = createShelf();
export const printer = createPrinter();
const light = new THREE.DirectionalLight(0xffffff, 1);
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x106160 })
);
export const forklift3d = forklift_model

shelf.position.set(-5, 0, 0); 
printer.position.set(5, 0, 0); 
light.position.set(5, 10, 7.5);
ground.rotation.x = -Math.PI / 2;

scene.add(shelf);
scene.add(printer);
scene.add(light);
scene.add(ground);
scene.add(forklift3d);

renderer.setSize(window.innerWidth, window.innerHeight);