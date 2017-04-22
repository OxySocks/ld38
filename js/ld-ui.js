(function(LD) {
    (function(UI) {
        var uiContainer;
        var backgroundGraphics;

        var currencyText;
        var technologyText;
        var foodText;
        var waterText;
        var electricityText;

        var houseButton;
        var shopButton;
        var farmButton;
        var industryButton;

        var roadButton;
        var pipeButton;
        var powerCableButton;
        
        UI.initialize = function initializeUI(width, height) {
            uiContainer = new PIXI.Container();
            uiContainer.width = width;
            uiContainer.height = height;

            backgroundGraphics = new PIXI.Graphics();
            backgroundGraphics.beginFill(0x999999);
            backgroundGraphics.drawRect(0, 0, width, height);

            uiContainer.addChild(backgroundGraphics);

            // Currencies & values 
            currencyText = createSidebarValue(uiContainer, 10, 10, 160, 32, 'img/money_icon.png');
            technologyText = createSidebarValue(uiContainer, 10, 50, 160, 32, 'img/money_icon.png');
            foodText = createSidebarValue(uiContainer, 10, 90, 160, 32, 'img/money_icon.png');
            waterText = createSidebarValue(uiContainer, 10, 130, 160, 32, 'img/money_icon.png');
            electricityText = createSidebarValue(uiContainer, 10, 170, 160, 32, 'img/energy_icon.png');

            // Buildings
            var buildingsText = new PIXI.Text('BUILDINGS', { fontSize: 20, fill : 0x000000 }); 
            buildingsText.x = 35;
            buildingsText.y = 200;

            houseButton = createSidebarTile(uiContainer, 18, 230, 'house', 'img/house.png');
            farmButton = createSidebarTile(uiContainer, 98, 230, 'farm', 'img/farmland.png');
            industryButton = createSidebarTile(uiContainer, 18, 310, 'industry', 'img/industry.png');
            shopButton = createSidebarTile(uiContainer, 98, 310, 'shop', 'img/shop.png');

            uiContainer.addChild(buildingsText);

            // Transport
            var transportText = new PIXI.Text('TRANSPORT', { fontSize: 20, fill : 0x000000 }); 
            transportText.x = 30;
            transportText.y = 400;

            roadButton = createSidebarTile(uiContainer, 18, 430, 'road', 'img/road.png');
            pipeButton = createSidebarTile(uiContainer, 98, 430, 'pipe', 'img/road.png');
            powerCableButton = createSidebarTile(uiContainer, 18, 510, 'powercable', 'img/road.png');

            uiContainer.addChild(transportText);

            return uiContainer;
        }

        function createSidebarValue(container, x, y, width, height, icon) {
            var valueBackground = new PIXI.Graphics();
            valueBackground.beginFill(0x333333);
            valueBackground.drawRect(x, y, width, height);

            var valueIcon = PIXI.Sprite.fromImage(icon);
            valueIcon.x = x
            valueIcon.y = y;

            var valueText = new PIXI.Text(0, { fontSize: 20, fill : 0xFFFFFF});
            valueText.x = x + 40;
            valueText.y = y + 4;

            container.addChild(valueBackground);
            container.addChild(valueIcon);
            container.addChild(valueText);

            return valueText;
        }

        function createSidebarTile(container, x, y, id, icon) {
            var tileButton = PIXI.Sprite.fromImage(icon);
            tileButton.interactive = true;
            tileButton.buttonMode = true;
            tileButton.on('pointerup', function() { LD.setActiveTile(id, tileButton.texture); })

            tileButton.x = x;
            tileButton.y = y;

            container.addChild(tileButton);

            return tileButton;
        }

        UI.setCurrency = function setCurrency(value) {
            currencyText.text = value;
        }

        UI.setTechnology = function setTechnology(value) {
            technologyText.text = value;
        }

        UI.setFood = function setFood(value) {
            foodText.text = value;
        }

        UI.setWater = function setWater(value) {
            waterText.text = value;
        }

        UI.setElectricity = function setElectricity(value) {
            electricityText.text = value;
        }
    }(window.LD.UI = window.LD.UI || {}));
}(window.LD = window.LD || {}));