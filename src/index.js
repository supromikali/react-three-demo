import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class App extends Component {
    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
        this.stopAnimationLoop();
        this.removeCustomSceneObjects();
        this.sceneDestroy();
    }

    sceneSetup = () => {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        this.controls = new OrbitControls(this.camera);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);
    };

    addCustomSceneObjects = () => {
        this.geometry = new THREE.BoxGeometry(2, 2, 2);
        this.material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.cube);

        this.lights = [];
        this.lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        this.lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        this.lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        this.lights[ 0 ].position.set( 0, 200, 0 );
        this.lights[ 1 ].position.set( 100, 200, 100 );
        this.lights[ 2 ].position.set( - 100, - 200, - 100 );

        this.scene.add( this.lights[ 0 ] );
        this.scene.add( this.lights[ 1 ] );
        this.scene.add( this.lights[ 2 ] );
    };

    animate = () => {
        this.frameId = requestAnimationFrame(this.animate);

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);
    };

    startAnimationLoop = () => !this.frameId && this.animate();

    stopAnimationLoop = () => {
        cancelAnimationFrame(this.frameId);
        this.frameId = null
    };

    removeCustomSceneObjects = () => {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
        this.geometry.dispose();
        this.material.dispose();
    };

    sceneDestroy = () => {
        this.mount.removeChild(this.renderer.domElement);
    };

    handleWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.render( this.scene, this.camera );
    };

    render() {
        return <div ref={ref => (this.mount = ref)} />;
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);