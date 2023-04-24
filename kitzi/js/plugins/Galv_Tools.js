//-----------------------------------------------------------------------------
//  Galv's Tools
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_Tools.js
//-----------------------------------------------------------------------------
//  2019-11-10 - Version 1.3 - fixed numbers not updating on item gain
//  2017-04-22 - Version 1.2 - added help documentation to refresh hud
//  2017-04-12 - Version 1.1 - added more plugin settings to change icon size,
//                           - initial zoom, font size. Added item number to 
//                           - tools that have more than 1 in inventory.
//                           - added ability to use pictures for icons
//  2016-11-20 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_Tools = true;

var Galv = Galv || {};                  // Galv's main object
Galv.TOOLS = Galv.TOOLS || {};          // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.3) Swap between and use tools when a button is pressed on the map.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param HUD Image
 * @desc Name of the image located in /img/system/ to use for the HUD
 * @default toolhud
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param HUD XY
 * @desc The x,y position of the tool hud.
 * @default 710,520
 *
 * @param HUD Icon XY
 * @desc The x,y position of the tool icon relative to the hud's x,y.
 * @default 50,50
 *
 * @param Icon Size
 * @desc The width and height that the tool icon/image will display at.
 * width,height
 * @default 32,32
 *
 * @param Initial Zoom
 * @desc When swapping tools the icon starts zoomed in this much. 1 = 100%, 2 = 200% etc.
 * @default 2
 *
 * @param Number Size
 * @desc The font size for the item number display over tools with more than 1 item
 * @default 18
 *
 * @param Switch Left
 * @desc Button to switch tool left
 * Default: pagedown (which is L on gamepad)
 * @default pagedown
 *
 * @param Switch Right
 * @desc Button to switch tool right
 * Default: pageup (which is R on gamepad)
 * @default pageup
 *
 * @param Use Tool
 * @desc Button to use the selected tool
 * Default: alt (no gamepad button)
 * @default alt
 *
 * @param Gamepad Dash Button
 * @desc Make the gamepad cancel button dash and the previous dash button becomes use tool. true or false
 * @default true
 *
 * @help
 *   Galv's Tools
 * ----------------------------------------------------------------------------
 * This plugin creates a tool system, where the player can cycle between items
 * that are designated as tools and press a button to use the tool that is
 * selected on the screen.
 * The basis behind this plugin is to allow players to event what happens when
 * a tool is used, giving the player script calls to use to assist them with
 * tool functionality. Each tool activates a common event to control this.
 *
 *
 * ----------------------------------------------------------------------------
 *  NOTE TAGS for ITEMS
 * ----------------------------------------------------------------------------
 *
 *    <tool:x>      // where x is the COMMON EVENT id that is run on tool use
 *
 *    <toolimg:x>   // where x is an image from /img/pictures/ to use for the
 *                  // tool instead of the tool's icon for the HUD
 *
 * ----------------------------------------------------------------------------
 *  NOTE TAGS for EVENTS
 * ----------------------------------------------------------------------------
 *
 *    <label:x>     // events can have any tag in them which can be accessed
 *                  // by the tool's common event to determine functionality.
 *                  // the label can be anything and different for each event
 *
 * ----------------------------------------------------------------------------
 *  COMMENTS for EVENT PAGES
 * ----------------------------------------------------------------------------
 *
 *    <stopTool>  // disables tools on event with this comment on active page
 *                // eg. use if you change to an empty page to remove an event
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT for CONDITIONAL BRANCH
 * ----------------------------------------------------------------------------
 *
 *    Galv.TOOLS.frontEvent('label')  // detects if an event has a <label> note
 *                                    // on the tile in front of the player
 *
 *    Galv.TOOLS.frontEvent('label',x) // detects if label's x value was set
 *                                     // eg <label:x>
 *
 *    Galv.TOOLS.underEvent('label')  // same as above but same tile as player
 *    Galv.TOOLS.underEvent('label',x)  // same as above but same tile again
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT for event SCRIPT calls
 * ----------------------------------------------------------------------------
 *
 *    $gameSystem.toolBtnDisabled = status   // status can be true or false
 *                                           // to disable/enable tool hud
 *
 *    Galv.TOOLS.equipTool(id);    // manually equip tool item to player.
 *                                 // this won't do anything if the player
 *                                 // does not actually have the tool item
 *
 *    Galv.TOOLS.event   // AFTER one of the above conditional branch script
 *                       // is used, it stores the event object found in this
 *                       // object variable. This can be used with a little
 *                       // javascript knowledge (see demo for examples and
 *                       // also some below)
 *
 *    Galv.TOOLS.event._eventId   // the event Id of event tool is used on
 *                                // can be used in Control Variables script
 *
 *    Galv.TOOLS.event.erase()    // erase the event
 *
 *    Galv.TOOLS.event._animationId = x;  // play animation on tool event
 *
 *    Galv.TOOLS.needRefresh = true;  // Force tool hud to refresh (if you
 *                                    // reduce tool number for example)
 *
 * I recommend asking or searching forums for more scripts you can use on an
 * event object.
 *
 * ----------------------------------------------------------------------------  
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

var txt = PluginManager.parameters('Galv_Tools')["HUD XY"].split(',');
Galv.TOOLS.hudXY = [Number(txt[0]),Number(txt[1])];

txt = PluginManager.parameters('Galv_Tools')["HUD Icon XY"].split(',');
Galv.TOOLS.hudIconXY = [Number(txt[0]),Number(txt[1])];

txt = PluginManager.parameters('Galv_Tools')["Icon Size"].split(',');
Galv.TOOLS.hudIconWH = [Number(txt[0]),Number(txt[1])];

Galv.TOOLS.needRefresh = false;

Galv.TOOLS.hudImg = PluginManager.parameters('Galv_Tools')["HUD Image"];
Galv.TOOLS.zoom = Number(PluginManager.parameters('Galv_Tools')["Initial Zoom"]);
Galv.TOOLS.numSize = Number(PluginManager.parameters('Galv_Tools')["Number Size"]);

Galv.TOOLS.btnLeft = PluginManager.parameters('Galv_Tools')["Switch Left"];
Galv.TOOLS.btnRight = PluginManager.parameters('Galv_Tools')["Switch Right"];
Galv.TOOLS.btnTool = PluginManager.parameters('Galv_Tools')["Use Tool"];

Galv.TOOLS.overwriteDash = PluginManager.parameters('Galv_Tools')["Gamepad Dash Button"].toLowerCase() === 'true' ? true : false;

Galv.TOOLS.event = null;

Galv.TOOLS.updateToolList = function() {
	this.makeToolList();
	if (!$gameSystem._tools.list.contains($gameSystem._tools.selected)) {
		$gameSystem._tools.selected = -1; // unselect tool if player loses tool
	}
};

Galv.TOOLS.makeToolList = function() {
	$gameSystem._tools.list = [];
    var list = $gameParty.items();
	for (var id in list) {
		if (this.includes(list[id])) {
			$gameSystem._tools.list.push(list[id].id);
		}
	}
};

Galv.TOOLS.index = function() {
	return $gameSystem._tools.list.indexOf($gameSystem._tools.selected);
};

Galv.TOOLS.includes = function(item) {
	return DataManager.isItem(item) && item.meta.tool;
	return false;
};

Galv.TOOLS.shiftTool = function(dir) {
	if ($gameSystem._tools.list.length === 0) return;

	var index = Galv.TOOLS.index();
	var count = $gameSystem._tools.list.length;
	if (dir > 0) {
		// left
		index = index <= 0 ? count - 1 : index - 1;
	} else if (dir < 0) {
		// right
		index = index >= count - 1 ? 0 : index + 1;
	}
	$gameSystem._tools.selected = $gameSystem._tools.list[index];
};

Galv.TOOLS.equipTool = function(iId) {
	if ($gameSystem._tools.list.contains(iId)) $gameSystem._tools.selected = iId;
};

Galv.TOOLS.frontEvent = function(tag,value) {
	var direction = $gamePlayer.direction();
	var x1 = $gamePlayer.x;
	var y1 = $gamePlayer.y;
	var x2 = $gameMap.roundXWithDirection(x1, direction);
	var y2 = $gameMap.roundYWithDirection(y1, direction);
	return Galv.TOOLS.getEvent(x2,y2,tag,value);
};

Galv.TOOLS.underEvent = function(tag,value) {
	var direction = $gamePlayer.direction();
	var x1 = $gamePlayer.x;
	var y1 = $gamePlayer.y;
	return Galv.TOOLS.getEvent(x1,y1,tag,value);
};

Galv.TOOLS.getEvent = function(x,y,tag,value) {
	Galv.TOOLS.event = null;
	var tagId = 0;
	$gameMap.eventsXy(x, y).forEach(function(event) {
		var tId = event.event().meta[tag];
		if (!event._erased && !Galv.TOOLS.isToolBlocked(event) && (tId || !tag)) {
			if (!value || (value && value == tId)) {
				tagId = Number(tId);
				Galv.TOOLS.event = event;
			}
		}
	});
	return tagId;
};

Galv.TOOLS.isToolBlocked = function(event) {
	var blocked = false;
	if (event.page()) {
		var listCount = event.page().list.length;
		
		for (var i = 0; i < listCount; i++) {
			if (event.page().list[i].code === 108) {
				var tag = event.page().list[i].parameters[0].match(/<stopTool>/i);
				if (tag) {
					blocked = true;
					break;
				}
			}
		}
	}
	return blocked;
};

if (Imported.Galv_SimpleCrops) {
	Galv.TOOLS.Galv_CROPS_plant = Galv.CROPS.plant;
	Galv.CROPS.plant = function(eventId,itemId,daysVar) {
		Galv.TOOLS.Galv_CROPS_plant.call(this,eventId,itemId,daysVar);
		Galv.TOOLS.needRefresh = true;
	};
};



// Change Items

Galv.TOOLS.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    Galv.TOOLS.Game_Party_gainItem.call(this,item, amount, includeEquip);
	Galv.TOOLS.needRefresh = true;
};



//-----------------------------------------------------------------------------
//  INPUT
//-----------------------------------------------------------------------------

// Make alt key work
Input.keyMapper[18] = 'alt';

if (Galv.TOOLS.overwriteDash) {
	Input.gamepadMapper[2] = Galv.TOOLS.btnTool; // change X button to use tools
	
	// Overwrite so cancel button is also dash button
	Game_Player.prototype.isDashButtonPressed = function() {
		var shift = Input.isPressed('shift') || Input.isPressed('cancel');
		if (ConfigManager.alwaysDash) {
			return !shift;
		} else {
			return shift;
		}
	};
};


//-----------------------------------------------------------------------------
//  SCENE BOOT
//-----------------------------------------------------------------------------

Galv.TOOLS.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
	Galv.TOOLS.Scene_Boot_loadSystemImages.call(this);
	ImageManager.loadSystem(Galv.TOOLS.hudImg);
};


//-----------------------------------------------------------------------------
//  GAME PLAYER
//-----------------------------------------------------------------------------

Galv.TOOLS.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	if (this.canUseTool()) {
		if (Input.isTriggered(Galv.TOOLS.btnTool)) this.useTool();
		if (Input.isTriggered(Galv.TOOLS.btnLeft)) Galv.TOOLS.shiftTool(-1);
		if (Input.isTriggered(Galv.TOOLS.btnRight)) Galv.TOOLS.shiftTool(1);
	}
	Galv.TOOLS.Game_Player_moveByInput.call(this);
};

Game_Player.prototype.canUseTool = function() {
	return !$gameMap.isEventRunning() && !$gameSystem.toolBtnDisabled && this.isNormal() && this.canMove() && !this.isJumping();
};

Game_Player.prototype.useTool = function() {
	Galv.TOOLS.tempEvent = null;
	var toolId = $gameSystem._tools.selected;
	if (toolId <= 0) return;
	//Galv.TOOLS.eventFront(); // set front event
	//Galv.TOOLS.eventUnder(); // set under event
	var cId = $dataItems[toolId].meta.tool;
	if (cId) $gameTemp.reserveCommonEvent(cId);
};


//-----------------------------------------------------------------------------
//  GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.TOOLS.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.TOOLS.Game_System_initialize.call(this);
	this._tools = {selected:0,list:[]};
};


//-----------------------------------------------------------------------------
//  SCENE MAP
//-----------------------------------------------------------------------------

Galv.TOOLS.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	Galv.TOOLS.Scene_Map_start.call(this);
	Galv.TOOLS.updateToolList();
};


//-----------------------------------------------------------------------------
//  GAME MAP
//-----------------------------------------------------------------------------

Galv.TOOLS.Game_Map_refresh = Game_Map.prototype.refresh;
Game_Map.prototype.refresh = function() {
	Galv.TOOLS.Game_Map_refresh.call(this);
	Galv.TOOLS.updateToolList();
};


//-----------------------------------------------------------------------------
//  SPRITESET MAP
//-----------------------------------------------------------------------------

Galv.TOOLS.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
	Galv.TOOLS.Spriteset_Map_createLowerLayer.call(this);
	this.createToolHud();
};

Spriteset_Map.prototype.createToolHud = function() {
	this._toolHud = new Sprite_ToolHud();
	this.addChild(this._toolHud);
};


})();



//-----------------------------------------------------------------------------
//  SPRITE TOOL HUD
//-----------------------------------------------------------------------------

function Sprite_ToolHud() {
    this.initialize.apply(this, arguments);
}

Sprite_ToolHud.prototype = Object.create(Sprite_Base.prototype);
Sprite_ToolHud.prototype.constructor = Sprite_ToolHud;

Sprite_ToolHud.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.setBitmap();
	this.createIconSprite();
};

Sprite_ToolHud.prototype.setBitmap = function() {
	this.x = Galv.TOOLS.hudXY[0];
	this.y = Galv.TOOLS.hudXY[1];
	this.bitmap = ImageManager.loadSystem(Galv.TOOLS.hudImg);
};

Sprite_ToolHud.prototype.createIconSprite = function() {
	this._icon = new Sprite_ToolHudIcon();
	this.addChild(this._icon);
};

Sprite_ToolHud.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	this.updateVisible();
};

Sprite_ToolHud.prototype.updateVisible = function() {
	this.opacity = $gameSystem.toolBtnDisabled ? 0 : 255;
};


//-----------------------------------------------------------------------------
// SpriteToolHudIcon
//-----------------------------------------------------------------------------

function Sprite_ToolHudIcon() {
    this.initialize.apply(this, arguments);
}

Sprite_ToolHudIcon.prototype = Object.create(Sprite.prototype);
Sprite_ToolHudIcon.prototype.constructor = Sprite_ToolHudIcon;

Sprite_ToolHudIcon.prototype.initialize = function(type) {
    Sprite.prototype.initialize.call(this);
	this._iconIndex = 0;
	this._toolId = null;
	this.anchor.y = 0.5;
	this.anchor.x = 0.5;
	this.updateGraphic();
};

Sprite_ToolHudIcon.prototype.updateGraphic = function() {
	if (this._toolId != $gameSystem._tools.selected || Galv.TOOLS.needRefresh) {
		
		var item = $dataItems[$gameSystem._tools.selected];
		this._iconIndex = item ? item.iconIndex : 0;
		
		// init positioning
		this.x = Galv.TOOLS.hudIconXY[0];
		this.y = Galv.TOOLS.hudIconXY[1];
		this.scale.x = Galv.TOOLS.needRefresh ? 1 : Galv.TOOLS.zoom;
		this.scale.y = Galv.TOOLS.needRefresh ? 1 : Galv.TOOLS.zoom;

		// create bitmap
		var imgReady = false
		if (item && item.meta.toolimg) {
			// if item has <toolimg:x> note tag
			var bitmap = ImageManager.loadPicture(item.meta.toolimg);
			
			if (bitmap.isReady()) { // for caching image issue. Cache before drawing it
				this.bitmap = bitmap;
				imgReady = true;
			}

		} else if (this._iconIndex) {
			// if using icon
			var pw = Window_Base._iconWidth;
			var ph = Window_Base._iconHeight;
			var tw = Galv.TOOLS.hudIconWH[0];
			var th = Galv.TOOLS.hudIconWH[1];
			var sx = this._iconIndex % 16 * pw;
			var sy = Math.floor(this._iconIndex / 16) * ph;
			this.bitmap = new Bitmap(tw,th);
			var bitmap = ImageManager.loadSystem('IconSet');
			this.bitmap.blt(bitmap, sx, sy, pw, ph, 0, 0, tw, th);
			imgReady = true;
		} else {
			this.bitmap = new Bitmap(pw,ph);
			imgReady = true;
		}
		
		if (imgReady) { // draw rest if bitmap exists (to stop caching issues)
			// draw item number
			var itemNumber = $gameParty.numItems(item);
			this.bitmap.fontSize = Galv.TOOLS.numSize;
			var th = this.bitmap.height;
			var tw = this.bitmap.width;
			var textY = th - this.bitmap.fontSize - 5;
			if (itemNumber && itemNumber > 1) this.bitmap.drawText(itemNumber, 0, textY, tw - 5, Galv.TOOLS.numSize, 'right');
			
			this._toolId = $gameSystem._tools.selected;
			Galv.TOOLS.needRefresh = false;
		};
	}
};

Sprite_ToolHudIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
	this.updateGraphic();
	this.updateScale();
};

Sprite_ToolHudIcon.prototype.updateScale = function() {
	
	if (this.scale.x > 1) {
		this.scale.x = Math.max(this.scale.x - 0.1,1);
		this.scale.y = Math.max(this.scale.y - 0.1,1);
	} else if (this.scale.x < 1) {
		this.scale.x = Math.min(this.scale.x + 0.1,1);
		this.scale.y = Math.min(this.scale.y + 0.1,1);
	} else {
		
	}
};