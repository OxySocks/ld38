(function(LD) {
    var app = null;
    var gameworkContainer;
    var uiContainer;
    var statusBarContainer;
    var backgroundFilter;

    var eventListeners = {};

    var currency = 0;
    var technology = 0;
    var food = 0;
    var water = 0;
    var electricity = 0;

    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }

    LD.initialize = function initialize() {
        app = new PIXI.Application(1280, 720, {backgroundColor : 0x9FD4E3});

        gameworkContainer = document.getElementById('canvas-container');
		gameworkContainer.appendChild(app.view);
        
        uiContainer = LD.UI.initialize(180, 720);
        uiContainer.x = 1100;

        statusBarContainer = LD.UI.StatusBar.initialize(200, 200);
        statusBarContainer.x = 900;

        LD.UI.toggleLayerButtonClicked = toggleLayerButtonClicked();

        var gridContainer = LD.Grid.initialize(13, 11, 11, 9, 64, 64);

        LD.addEventListener('keyup_esc', function(event) {
            LD.UI.StatusBar.clearActiveBuilding();
            LD.setActiveTile(null, null);
        });

        app.stage.addChild(gridContainer);
        app.stage.addChild(uiContainer);
        app.stage.addChild(statusBarContainer);

        LD.Input.Keyboard.initialize();

        app.ticker.add(LD.update);
    }

    LD.activeTile = {id: null, texture: null};

    LD.setActiveTile = function setActiveTile(id, texture) {
        LD.activeTile = {id: id, texture: texture};
    }

    LD.update = function update(delta) {
        setCurrency(10);
        setTechnology(20);
        setFood(30);
        setWater(40);
        setElectricity(50);
        setWork(60);
        setPeople(70);
    }

    LD.addEventListener = function addEventListener(eventName, eventHandler) {
        if (!eventListeners.hasOwnProperty(eventName)) { 
            eventListeners[eventName] = [];
        }

        eventListeners[eventName].push(eventHandler);
    }

    LD.notify = function notify(eventName, event) {
        if (!eventListeners.hasOwnProperty(eventName)) { 
            return; 
        }

        for (var i = 0; i < eventListeners[eventName].length; i++) {
            eventListeners[eventName][i](event);
        }
    }

    function setCurrency(value) {
        currency = value;
        LD.UI.setCurrency(value);
    }

    function setTechnology(value) {
        technology = value;
        LD.UI.setTechnology(value);
    }

    function setFood(value) {
        food = value;
        LD.UI.setFood(value);
    }

    function setWater(value) {
        water = value;
        LD.UI.setWater(value);
    }

    function setElectricity(value) {
        electricity = value;
        LD.UI.setElectricity(value);
    }

    function setWork(value) {
        work = value;
        LD.UI.setWork(value);
    }

    function setPeople(value) {
        people = value;
        LD.UI.setPeople(value);
    }

    function toggleLayerButtonClicked(){
        var mustSwitchToUnderground = true;

        return function(){
            if(mustSwitchToUnderground) {
                LD.Grid.switchToUnderground(app.stage);
            }
            else {
                LD.Grid.switchToSurface(app.stage);
            }

            mustSwitchToUnderground = !mustSwitchToUnderground;
        }
    };
}(window.LD = window.LD || {}));