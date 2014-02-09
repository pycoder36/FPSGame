window.SceneRenderer = WrapClass({
    
    threeScene: false,

    _IMAGES_DIRECTORY: "textures/",

    _program: false,
    _renderer: false,

    init: function (program)
    {
        this._program = program;

        this.setupListeners();
        this.setupScene();

    },

    tick: function (timeElapsed)
    {
        this._renderer.render(this.threeScene, this._program.camera.threeCamera);
    },

    setupListeners: function()
    {
        Events.add('resize', this.resized.bind(this));
    },

    setupScene: function ()
    {
        this.threeScene = new THREE.Scene();

        this.setupRenderer();

        this.setupFloor();
        this.setupSkybox();
    },

    setupRenderer: function ()
    {
        this._renderer = new THREE.WebGLRenderer({ antialias: true });
        this._renderer.setSize(this._program.screen.width, this._program.screen.height);
        this._program.rootElement.appendChild(this._renderer.domElement);
    },

    setupFloor: function()
    {
        var floorTexture = new THREE.ImageUtils.loadTexture(this._IMAGES_DIRECTORY + 'checkerboard.jpg');
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(10, 10);
        var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
        var floorGeometry = new THREE.PlaneGeometry(2000, 2000, 200, 200);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = 0;
        floor.rotation.x = Math.PI / 2;
        this.threeScene.add(floor);
    },

    setupSkybox: function()
    {
        var imagesDir = this._IMAGES_DIRECTORY;
        var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"].map(function (tex) { return imagesDir + "dawnmountain-" + tex + ".png"; });
        var materialArray = directions.map(function (textureN) { return new THREE.MeshBasicMaterial({ "map": THREE.ImageUtils.loadTexture(textureN), "side": THREE.BackSide }); });
        var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
        var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
        var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
        this.threeScene.add(skyBox);
    },

    resized: function()
    {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
    }

});