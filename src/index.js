import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from 'three';


window.THREE = THREE; // THREE.OrbitControls expects THREE to be a global object
require('three/examples/js/controls/OrbitControls');
THREE = window.THREE; // add THREE.OrbitControls to an imported object


class App extends Component {
    componentDidMount() {


        // BASIC THREE.JS THINGS: SCENE, CAMERA, RENDERER
        // Three.js Creating a scene tutorial
        // https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);



        // MOUNT INSIDE OF REACT
        this.mount.appendChild(renderer.domElement); // mount a scene inside of React using a ref



        // CAMERA CONTROLS
        // https://threejs.org/docs/index.html#examples/controls/OrbitControls
        this.controls = new THREE.OrbitControls(camera);



        // ADD CUBE AND LIGHTS
        // https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
        // https://threejs.org/docs/scenes/geometry-browser.html#BoxGeometry
        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshPhongMaterial( {
            color: 0x156289,
            emissive: 0x072534,
            side: THREE.DoubleSide,
            flatShading: true
        } );
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        var lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );



        // SCALE ON RESIZE

        // Check "How can scene scale be preserved on resize?" section of Three.js FAQ
        // https://threejs.org/docs/index.html#manual/en/introduction/FAQ

        // code below is taken from Three.js fiddle
        // http://jsfiddle.net/Q4Jpu/

        // remember these initial values
        var tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
        var windowHeight = window.innerHeight;

        window.addEventListener( 'resize', onWindowResize, false );

        function onWindowResize( event ) {

            camera.aspect = window.innerWidth / window.innerHeight;

            // adjust the FOV
            camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );

            camera.updateProjectionMatrix();
            camera.lookAt( scene.position );

            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.render( scene, camera );

        }



        // ANIMATE THE SCENE
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