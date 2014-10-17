//FileStart:default.js 
var container;
 var camera, scene, renderer;
  var showWidth = window.innerWidth;
  var showHeight =  window.innerHeight;
 var cross;
 
 init();
 animate();
 
 function init() {
 
 	//camera = new THREE.PerspectiveCamera(60, showWidth / showHeight, 0.01, 1e10);
 	camera = new LeiaCamera(60, showWidth / showHeight, 0.01, 1e10);//3
 	var lenghScale = 2;
 	camera.position.x = 0.0 * lenghScale;
 	camera.position.y = 0.15 * lenghScale;
 	camera.position.z = 0.001 * lenghScale;
 	camera.up.set(0, 1, 0);
 	scene = new THREE.Scene();
 	scene.add( camera );
 
 	// light
 
 	var dirLight = new THREE.DirectionalLight( 0xffffff );
 	dirLight.position.set( 200, 200, 1000 ).normalize();
 
 	camera.add( dirLight );
 	camera.add(dirLight.target);
 	camera.lookAt(scene.position);
 
 	var material = new THREE.MeshLambertMaterial( { color:0xffffff, side: THREE.DoubleSide } );
 
 	var loader = new THREE.VTKLoader();
 	loader.addEventListener( 'load', function ( event ) {
 		var geometry = event.content;
 		var mesh = new THREE.Mesh( geometry, material );
 		mesh.position.setY( - 0.128 );
 		scene.add( mesh );
 
 	} );
 	loader.load( "https://holodevuserresource.s3.amazonaws.com/bunny.vtk" );
 	// renderer
 	//renderer = new THREE.WebGLRenderer({ antialias: false });
 	renderer = new LeiaWebGLRenderer({ 
 	  antialias: true,
 	  renderMode: _renderMode,
 	  camPanelVisible: _camPanelVisible,
 	  gyroPanelVisible: _gyroPanelVisible,
 	  camFov: _camFov, 
 	  devicePixelRatio: 1 });//1
 	renderer.Leia_setSize(showWidth, showHeight);//2
 	container = document.createElement( 'div' );
 	document.body.appendChild( container );
 	container.appendChild( renderer.domElement );
 }
 
 function animate() {
 	requestAnimationFrame( animate );
 renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render( scene, camera );//4
 }
 //FileEnd
