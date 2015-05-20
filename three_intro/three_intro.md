GETTING STARTED 

include cdn three.js tag in index.html

``` <sript scr = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></sript>```

we can code everything in a ``<script>`` block inside index.html

create THREE elements by initializing them with or without params 

#The 3-D World 

#### a Scene 
```var scene = new THREE.Scene();```

#### a Renderer

	WebGL Web Graphics Library is standard for most HTML5 canvas purpose

```var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );```

#### a Camera 
standard Perspective Camera (VIEW_ANGLE, ASPECT, NEAR, FAR)
 
```
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	// camera starts at origin (0,0,0) so offset it in space 
	camera.position.z = 5;
```


#### An Object or few 

	 THREE Objects are Mesh that takes two argument, geometry & material 
	 this is where you can import external files, models built in obj can be converted to JSON objects through a python convert that comes with three
```
	var cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// then throw it in the scene
	scene.add( cube );
```

now we can fire Render and Animate our object 
```	var render = function () {
		// AnimationFrame is specific to three.js 
		requestAnimationFrame( render );
		// here we're setting the cube in rotation, you can adjust the speed 
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		// passing in scene and camera to render
		renderer.render(scene, camera);
	};
	// calling render 
	render(); 
```




	