import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
const cube = new THREE.Mesh( geometry, material )
scene.add( cube )

camera.position.z = 2

const handleWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}
window.addEventListener('resize', handleWindowResize, false)

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
// gui.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)
const cubeFolder = gui.addFolder('Cube')
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)

function animate() {
  requestAnimationFrame( animate )

  // Could be commented:
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update()
	renderer.render( scene, camera )
  stats.update()
}
animate()
