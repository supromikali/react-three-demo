import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const style = {
    height: 500 // we can control scene size by setting container dimensions
};

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
    }

    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 9; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.mount);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.mount.appendChild(this.renderer.domElement); // mount using React ref
    };

    // Here should come custom code.
    // Code below is taken from Three.js BoxGeometry example
    // https://threejs.org/docs/#api/en/geometries/BoxGeometry
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

    startAnimationLoop = () => {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderer.render(this.scene, this.camera);

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = requestAnimationFrame(this.startAnimationLoop);
    };

    // The window.cancelAnimationFrame() method cancels an animation frame request
    // previously scheduled through a call to window.requestAnimationFrame()
    stopAnimationLoop = () => cancelAnimationFrame(this.requestID);

    handleWindowResize = () => {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        this.renderer.setSize( width, height );
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    render() {
        return <div style={style} ref={ref => (this.mount = ref)} />;
    }
}

class Container extends React.Component {
    state = {isMounted: true};

    render() {
        const {isMounted = true} = this.state;
        return (
            <>
                <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
                    {isMounted ? "Unmount" : "Mount"}
                </button>
                {isMounted && <App />}
            </>
        )
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);