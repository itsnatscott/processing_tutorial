##What is PaperScript

PaperScript is the plain old JavaScript that you are used to, with added support of mathematical operators (+ - * / %) for Point and Size objects. PaperScript code is automatically executed in its own scope that without polluting with the global scope still has access to all the global browser objects and functions, such as document or window.

By default, the Paper.js library only exports one object into the global scope: the paper object. It contains all the classes and objects that the library defines. When working with PaperScript, the user does not need to care about this though, because inside PaperScript code, through the use of clever scoping, all of paper's objects and functions seem global.

PaperScript also offers automatic creation of Project, View and mouse Tool objects, and simplifies the installation of event handlers for these.

###Script Configuration

PaperScript code is loaded just like any other JavaScript using the `<script>` tag, except for the type being set to `"text/paperscript"` or `"text/x-paperscript"` . The code can either be an external file (`src="URL"`), or inlined. In this example, we will use the cdn link for paper.js.

```html
<!DOCTYPE html>
<html>
<head>
<!-- Load the Paper.js library -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.22/paper-full.min.js"></script>
<!-- Define inlined PaperScript associate it with myCanvas -->
<script type="text/paperscript" canvas="myCanvas">
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

Paperscript will go inside the "myCanvas" script tag
```html
<!DOCTYPE html>
<html>
<head>
<!-- Load the Paper.js library -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.22/paper-full.min.js"></script>
<!-- Define inlined PaperScript associate it with myCanvas -->
<script type="text/paperscript" canvas="myCanvas">
	// Create a Paper.js Path to draw a line into it:
	var path = new Path();
	// Give the stroke a color
	path.strokeColor = 'black';
	var start = new Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note the plus operator on Point objects.
	// PaperScript does that for us, and much more!
	path.lineTo(start + [ 100, -50 ]);
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
``` 

###Canvas Configuration
`resize="true"`: Makes the canvas object as high and wide as the Browser window and resizes it whenever the user resizes the window. When the window is resized, the size of your global.view is also automatically adjusted. 

There's a bug with their latest version, so for now we need to paste this css style into our html so the canvas would apply to the entire browser:

```html
<style type="text/css">
html,
body {
    margin: 0;
    overflow: hidden;
    height: 100%;
}

/* Scale canvas with resize attribute to full size */
canvas[resize] {
    width: 100%;
    height: 100%;
}
</style>
```

Your code can respond to any resizing of the window by creating a `onResize` function handler. For example, let's say you create a circle shaped path at the center of the view, and you want it to be centered after resizing. Let's draw a circle at the center of the page.

```html
<!-- Create a circle shaped path with its center at the center of the view and a radius of 30: -->
var path = new Path.Circle({
	center: view.center,
	radius: 30,
	strokeColor: 'black'
});
function onResize(event) {
	<!-- Whenever the window is resized, recenter the path: -->
	path.position = view.center;
}
```

