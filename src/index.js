import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';

window.THREE = THREE; // THREE.OrbitControls expects THREE to be a global object
require('three/examples/js/controls/OrbitControls');
THREE = window.THREE; // add THREE.OrbitControls to an imported object

class App extends Component {
    componentDidMount() {
        // the code inside componentDidMount is taken from
        // Three.js Creating a scene tutorial
        // https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);


        // React-related code starts
        this.mount.appendChild(renderer.domElement);
        this.controls = new THREE.OrbitControls(camera);
        // React-related code ends


        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        var animate = function() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
    }
    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);