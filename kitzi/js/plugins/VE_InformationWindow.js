/*
 * ==============================================================================
 * ** Victor Engine MV - Information Window
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2016.03.25 > First release.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Information Window'] = '1.00';

var VictorEngine = VictorEngine || {};
VictorEngine.InformationWindow = VictorEngine.InformationWindow || {};

(function() {

	VictorEngine.InformationWindow.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.InformationWindow.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Information Window', 'VE - Basic Module', '1.16');
	};

	VictorEngine.InformationWindow.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.InformationWindow.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 * ------------------------------------------------------------------------------
 * @plugindesc v1.00 - Displays a window on map that can show varied information.
 * @author Victor Sant
 *
 * @param Max Window Number
 * @desc Max number of windows displayed at the same time.
 * @default 5
 *
 * @param Window Position
 * @desc Position the window is displayed by default.
 * coordinate x, coordinate y
 * @default 0, 0
 *
 * @param Window Size
 * @desc Default window size.
 * width, lines
 * @default 360, 2
 *
 * @param Window Display
 * @desc Default window display values.
 * opacity, image (leave image blank for no image)
 * @default 255
 *
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------ 
 *  Plugin Commands
 * ------------------------------------------------------------------------------
 *
 *  You can use v[id] on the instead of a numeric value to get the value from 
 *  the variable with the id set. For example, v[3] will get the value from the
 *  variable id 3.
 *
 * ---------------
 *
 *  InformationWindow Id Show
 *   Shows information window.
 *     Id : window Id.
 *
 * ---------------
 *
 *  InformationWindow Id Open
 *   Shows information window, displaying the window opening animation.
 *     Id : window Id.
 *
 * ---------------
 *
 *  InformationWindow Id Hide
 *   Hides information window.
 *     Id : window Id.
 *
 * ---------------
 *
 *  InformationWindow Id Close
 *   Hides information window, displaying the window closing animation.
 *     Id : window Id.
 *
 * ---------------
 *
 *  InformationWindow Id Position: X Y
 *   Changes the information window postion.
 *     Id : window Id.
 *     X  : position X.
 *     Y  : position Y.
 *
 * ---------------
 *
 *  InformationWindow Id Size: width lines
 *   Changes the information window size.
 *     Id     : window Id.
 *     width  : window width.
 *     height : window height. (number of lines)
 *
 * ---------------
 *
 *  InformationWindow Id Image: opacity image
 *   Changes the information window display.
 *     Id      : window Id.
 *     opacity : window opacity.
 *     image   : window background image filename. (leave blank for no image)
 *
 * ---------------
 *
 *  InformationWindow Id Text: value
 *   Changes the information window text.
 *     Id    : window Id.
 *     value : text displayed. (can use escape codes)
 *
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  When using the Plugin Command 'InformationWindow id Text:' you can use 
 *  any escape code available for text that don't require timing.
 *  You can use the new ecape codes provided by the plugin 'VE - Escape Codes'.
 *
 * ---------------
 *
 *  To display text in more than one line, you will need the plugin 
 *  'VE - Escape Codes', then use the escape code \n to add a line break.
 *  For example: 'InformationWindow 1 Text: The party leader is \n \p[1]'
 *
 * ---------------
 *
 *  If using the image background, it should be placed on the pictures folder. 
 *  The image is drawn inside the window, You can set the window opacity to 0
 *  and use the image as background.
 * 
 * ------------------------------------------------------------------------------
 * Example Plugin Commands:
 * ------------------------------------------------------------------------------
 *
 *  InformationWindow 1 Position: 200 300
 *
 * ---------------
 *
 *  InformationWindow 1 Size: 300 2
 *
 * ---------------
 *
 *  InformationWindow 2 Image: 0 backgroung
 *
 * ---------------
 *
 *  InformationWindow 3 Text: Tool: \i[15]
 *
 * ---------------
 *
 *  InformationWindow 4 Text: \nmp: \fv[6]
 *   Using 'VE - Escape Codes' to display the current map name and a variable
 *   using the 'floor formart'.
 *
 * ------------------------------------------------------------------------------
 */

(function() {
	
	//=============================================================================
	// Parameters
	//=============================================================================
	
	if (Imported['VE - Basic Module']) {
		var parameters = VictorEngine.getPluginParameters();
		VictorEngine.Parameters = VictorEngine.Parameters || {};
		VictorEngine.Parameters.InformationWindow = {};
		VictorEngine.Parameters.InformationWindow.MaxNumber = Number(parameters["Max Window Number"]) || 1;
		VictorEngine.Parameters.InformationWindow.Position  = String(parameters["Window Position"]).trim();
		VictorEngine.Parameters.InformationWindow.Size      = String(parameters["Window Size"]).trim();
		VictorEngine.Parameters.InformationWindow.Display   = String(parameters["Window Display"]).trim();
	}
		
	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.InformationWindow.loadParameters = VictorEngine.loadParameters;
	VictorEngine.loadParameters = function() {
		VictorEngine.InformationWindow.loadParameters.call(this);
		VictorEngine.InformationWindow.processParameters();
	};
	
	VictorEngine.InformationWindow.processParameters = function() {
		if (this.loaded) return;
		this.loaded = true;
		var result = {x: 0, y: 0, width: 0, height: 0, opacity: 0, image: ''};
		var regex1 = new RegExp('(\\d+)[ ]*,[ ]*(\\d+)', 'gi');
		var regex2 = new RegExp('(\\d+)(?:[ ]*,[ ]*([\\S]+)?)?', 'gi');
		var value1 = VictorEngine.Parameters.InformationWindow.Position;
		var value2 = VictorEngine.Parameters.InformationWindow.Size;
		var value3 = VictorEngine.Parameters.InformationWindow.Display;
		while ((match = regex1.exec(value1)) !== null) {
			result.x = Number(match[1]);
			result.y = Number(match[2]);
		};
		while ((match = regex1.exec(value2)) !== null) {
			result.width  = Number(match[1]);
			result.height = Number(match[2]);
		};
		while ((match = regex2.exec(value3)) !== null) {
			result.opacity = Number(match[1]);
			result.image   = match[2] || '';
		};
		VictorEngine.InformationWindow.Values = result;
	};
	
	//=============================================================================
	// Game_System
	//=============================================================================
	
	VictorEngine.InformationWindow.initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		VictorEngine.InformationWindow.initialize.call(this);
		this._informationWindow = []
		var size = VictorEngine.Parameters.InformationWindow.MaxNumber
		for (var i = 0; i < size; i++) {
			var values = VictorEngine.InformationWindow.Values;
			var result = {};
			result.x = values.x
			result.x = values.x
			result.width   = values.width
			result.height  = values.height
			result.opacity = values.opacity
			result.image   = values.image
			result.text    = ''
			result.visible = false
			this._informationWindow.push(result);
		}
	};
	
	Game_System.prototype.informationWindowValues = function(index) {
		return this._informationWindow[index] ? this._informationWindow[index] : {};
	};
	
	Game_System.prototype.informationWindowText = function(index) {
		return this._informationWindow[index] ? this._informationWindow[index].text : '';
	};
	
	Game_System.prototype.informationWindowIsVisible = function(index) {
		return this._informationWindow[index] ? this._informationWindow[index].visible : false;
	};
	
	Game_System.prototype.informationWindowVisible = function(index, visible) {
		return this._informationWindow[index].visible = visible;
	};
	
	Game_System.prototype.informationWindowSetText = function(index, text) {
		this._informationWindow[index].text = text || '';
	};
	
	Game_System.prototype.informationWindowSetPosition = function(index, x, y) {
		this._informationWindow[index].x = x || 0;
		this._informationWindow[index].y = y || 0;
	};
	
	Game_System.prototype.informationWindowSetSize = function(index, width, height) {
		this._informationWindow[index].width  = width  || 0;
		this._informationWindow[index].height = height || 0;
	};
	
	Game_System.prototype.informationWindowSetImage = function(index, opacity, image) {
		this._informationWindow[index].opacity = opacity || 0;
		this._informationWindow[index].image   = image   || '';
	};

	//=============================================================================
	// Game_Map
	//=============================================================================
	
	VictorEngine.InformationWindow.refresh = Game_Map.prototype.refresh;
	Game_Map.prototype.refresh = function() {
		VictorEngine.InformationWindow.refresh.call(this);
		SceneManager._scene.refresInformationWindows();
	};

	//=============================================================================
	// Game_Interpreter
	//=============================================================================
	
	VictorEngine.InformationWindow.pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		VictorEngine.InformationWindow.pluginCommand.call(this, command, args);
		if (command.toLowerCase() === 'informationwindow') {
			var index  = Number(args[0]) - 1;
			var window = SceneManager._scene.mapInformationWindow(index);
			if (window) this.informationWindowCommand(args.clone(), window);
		}
	};
	
	Game_Interpreter.prototype.informationWindowCommand = function(args, window) {
		var index  = Number(args[0]) - 1;
		switch (args[1].toLowerCase()) {
		case 'show':
			if (!window.visible || window.isClosed()) {
				window.openness = 255;
				window.show();
				$gameSystem.informationWindowVisible(index, true);
			}
			break;
		case 'open':
			if (!window.visible || window.isClosed()) {
				window.openness = 0;
				window.show();
				window.open();
				$gameSystem.informationWindowVisible(index, true);
			}
			break;
		case 'hide':
			if (window.visible || window.isOpen()) {
				window.openness = 0;
				window.hide();
				$gameSystem.informationWindowVisible(index, false);
			}
			break;
		case 'close':
			if (window.visible || window.isOpen()) {
				window.openness = 255;
				window.close();
				$gameSystem.informationWindowVisible(index, false);
			}
			break;
		case 'position': case 'position:':
			$gameSystem.informationWindowSetPosition(index, Number(args[2]), Number(args[3]));
			window.refreshPosition();
			break;
		case 'size': case 'size:':
			$gameSystem.informationWindowSetSize(index, Number(args[2]), Number(args[3]));
			window.refreshPosition();
			break;
		case 'image': case 'image:':
			$gameSystem.informationWindowSetImage(index, Number(args[2]), args[3]);
			window.refreshPosition(index);
			break;
		case 'text': case 'text:':
			args.splice(0, 2);
			var text = args.join(' ');
			$gameSystem.informationWindowSetText(index, text);
			window.refresh(index);
			break;
		}
	};
	
	//=============================================================================
	// Scene_Map
	//=============================================================================
	
	VictorEngine.InformationWindow.createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function() {
		VictorEngine.InformationWindow.createAllWindows.call(this);
		this.createInformationWindows();
	};
	
	VictorEngine.InformationWindow.terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function() {
		this.hideInformationWindows();
		VictorEngine.InformationWindow.terminate.call(this);
	};
	
	VictorEngine.InformationWindow.startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
	Scene_Map.prototype.startEncounterEffect = function() {
		this.hideInformationWindows();
		VictorEngine.InformationWindow.startEncounterEffect.call(this);
	};

	Scene_Map.prototype.createInformationWindows = function() {
		this._mapInformationWindow = [];
		var size = VictorEngine.Parameters.InformationWindow.MaxNumber
		for (var i = 0; i < size; i++) {
			var window = new Window_MapInformation(i);
			this._mapInformationWindow.push(window);
			this.addWindow(window);
		}
	};
	
	Scene_Map.prototype.hideInformationWindows = function() {
		this._mapInformationWindow.forEach(function(window) { window.hide() });
	};
	
	Scene_Map.prototype.refresInformationWindows = function() {
		this._mapInformationWindow.forEach(function(window) { window.refresh() });
	};
	
	Scene_Map.prototype.mapInformationWindow = function(index) {
		return this._mapInformationWindow[index];
	};
	
	
})();
	
function Window_MapInformation() {
	this.initialize.apply(this, arguments);
}

Window_MapInformation.prototype = Object.create(Window_Base.prototype);
Window_MapInformation.prototype.constructor = Window_MapInformation;
	
(function () {

	Window_MapInformation.prototype.initialize = function(index) {
		this._index = index;
		var values = $gameSystem.informationWindowValues(index);
		var wx = values.x || 0;
		var wy = values.y || 0;
		var ww = values.width || 0;
		var wh = this.fittingHeight(values.height || 0) + 16;
		Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
		this.refresh();
		if ($gameSystem.informationWindowIsVisible(index)) {
			this.openness = 255;
			this.show();
		} else {
			this.openness = 0;
			this.hide();
		} 
	};

	Window_MapInformation.prototype.show = function() {
		this.refresh();
		Window_Base.prototype.show.call(this);
	};

	Window_MapInformation.prototype.open = function() {
		this.refresh();
		Window_Base.prototype.open.call(this);
	};
	
	Window_MapInformation.prototype.refresh = function() {
		this.contents.clear();
		this.drawContents();
	};
	
	Window_MapInformation.prototype.drawContents = function() {
		var values = $gameSystem.informationWindowValues(this._index);
		this.opacity = values.opacity;
		if (values.image) {
			this.bitmap = ImageManager.loadPicture(values.image);
			this.bitmap.addLoadListener(this.drawBackgroundPicture.bind(this));
		} else {
			this.drawInformation();
		}
	};
	
	Window_MapInformation.prototype.drawInformation = function() {
		var text = $gameSystem.informationWindowText(this._index);
		this.drawTextEx(text, 8, 8);
	};
	
	Window_MapInformation.prototype.drawBackgroundPicture = function() {
		var pw = this.bitmap.width;
		var ph = this.bitmap.height;
		this.contents.clear();
		this.contents.blt(this.bitmap, 0, 0, pw, ph, 0, 0);
		this.drawInformation();
	};
	
	Window_MapInformation.prototype.refreshPosition = function() {
		var values = $gameSystem.informationWindowValues(this._index);
		var wx = values.x
		var wy = values.y
		var ww = values.width
		var wh = this.fittingHeight(values.height) + 16;
		this.move(wx, wy, ww, wh);
		this.createContents();
		this.refresh();
	};
	
})();