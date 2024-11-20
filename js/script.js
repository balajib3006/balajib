// Initialize Three.js Viewer
const container = document.getElementById('3d-viewer');
const width = container.offsetWidth;
const height = container.offsetHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

let currentModel;
const loader = new THREE.GLTFLoader();

const loadModel = (modelPath) => {
  // Remove the current model
  if (currentModel) {
    scene.remove(currentModel);
  }

  // Load the new model
  loader.load(
    modelPath,
    (gltf) => {
      currentModel = gltf.scene;
      scene.add(currentModel);
    },
    undefined,
    (error) => {
      console.error('Error loading the model:', error);
    }
  );
};

// Default camera position
camera.position.z = 5;

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

// Load the first model by default
const firstModel = document.querySelector('.slider img.active').dataset.model;
loadModel(firstModel);

// Slider functionality
const sliderImages = document.querySelectorAll('.slider img');
sliderImages.forEach((img) => {
  img.addEventListener('click', (e) => {
    // Update active class
    sliderImages.forEach((img) => img.classList.remove('active'));
    e.target.classList.add('active');

    // Load the selected model
    const modelPath = e.target.dataset.model;
    loadModel(modelPath);
  });
});
