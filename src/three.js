import * as THREE from 'three';


window.THREE = THREE; // THREE.OrbitControls expects THREE to be a global object
require('three/examples/js/controls/OrbitControls');


export default {...THREE, OrbitControls: window.THREE.OrbitControls};
