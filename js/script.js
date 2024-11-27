// Altium Viewer Slider
const altiumFrames = document.querySelectorAll('.altium-slider iframe');
let altiumIndex = 0;

document.getElementById('altium-prev').addEventListener('click', () => {
  altiumFrames[altiumIndex].classList.remove('active');
  altiumIndex = (altiumIndex - 1 + altiumFrames.length) % altiumFrames.length;
  altiumFrames[altiumIndex].classList.add('active');
});

document.getElementById('altium-next').addEventListener('click', () => {
  altiumFrames[altiumIndex].classList.remove('active');
  altiumIndex = (altiumIndex + 1) % altiumFrames.length;
  altiumFrames[altiumIndex].classList.add('active');
});

// STEP File Viewer
const viewer = document.getElementById('3d-viewer');
const models = ['models/model1.step', 'models/model2.step'];
let modelIndex = 0;

const loadStepFile = (path) => {
  // Clear existing viewer content
  while (viewer.firstChild) {
    viewer.removeChild(viewer.firstChild);
  }

  const occViewer = new OCCViewer(viewer, { background: '#ffffff' });
  occViewer.loadModel(path).catch((error) => console.error('Error loading STEP file:', error));
};

loadStepFile(models[modelIndex]);

document.getElementById('prev-model').addEventListener('click', () => {
  modelIndex = (modelIndex - 1 + models.length) % models.length;
  loadStepFile(models[modelIndex]);
});

document.getElementById('next-model').addEventListener('click', () => {
  modelIndex = (modelIndex + 1) % models.length;
  loadStepFile(models[modelIndex]);
});
