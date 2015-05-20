GETTING STARTED 
include three.js tag in your HTML
``` <sript scr = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></sript>```

within your html we can start code everything in a ``<script>`` block 

create THREE elements by simplily initializing them with or without params 

#The 3-D World 

#### a Scene 
```var scene = new THREE.Scene();```

#### a Renderer

```var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );```

#### a Camera -- standard Perspective Camera (VIEW_ANGLE, ASPECT, NEAR, FAR)
 
```var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera starts at origin (0,0,0) so offset it in space 
camera.position.z = 5;
```


#### An Object or few 
```	// THREE Objects are Mesh that takes two argument, geometry & material 
	var cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// then throw it in the scene
	scene.add( cube );
```

now we can fire Render and Animate our object 
```	var render = function () {
		requestAnimationFrame( render );
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		// passing in scene and camera to render
		renderer.render(scene, camera);
	};

	render(); 
```




	