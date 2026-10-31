import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#2a211c')

const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 100
)
camera.position.set(0, 4, 8)

// Renderer: draws the scene onto a canvas
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

// Lights: soft fill light plus one directional "sun"
scene.add(new THREE.AmbientLight('#ffffff', 0.6))
const keyLight = new THREE.DirectionalLight('#fff1dd', 1.2)
keyLight.position.set(5, 8, 4)
scene.add(keyLight)

// Controls: let the user orbit around the cake
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0.9, 0)
controls.enableDamping = true          // smooth, inertial movement
controls.enablePan = false             // no sliding the cake off-screen
controls.minDistance = 5
controls.maxDistance = 12
controls.maxPolarAngle = Math.PI / 2.1 // can't go under the table

// Board (thin disc)
const board = new THREE.Mesh(
  new THREE.CylinderGeometry(2.6, 2.6, 0.1, 64),
  new THREE.MeshStandardMaterial({ color: '#d9cbb8' })
)
board.position.y = 0.05
scene.add(board)

// Placeholder cake (radius 2, height 1.5), sitting on top of the board
const cake = new THREE.Mesh(
  new THREE.CylinderGeometry(2, 2, 1.5, 64),
  new THREE.MeshStandardMaterial({ color: '#efe6d8' })
)
cake.position.y = 0.1 + 0.75
scene.add(cake)

// Keep the canvas correct when the window resizes
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Render loop: runs every frame
function animate() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}
animate()