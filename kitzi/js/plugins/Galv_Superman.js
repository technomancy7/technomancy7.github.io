//-----------------------------------------------------------------------------
//  Galv's Superman Ability
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_Superman.js
//-----------------------------------------------------------------------------
//  2017-01-15 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_Superman = true;

var Galv = Galv || {};                  // Galv's main object
Galv.SUPER = Galv.SUPER || {};          // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Allow the player to fly like superman at the press of a button
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param Flight Speed
 * @desc How fast the player moves when flying. Can be changed during the game.
 * @default 5
 *
 * @param Use Followers
 * @desc true or false if you use followers in your game or not
 * @default true
 *
 * @param Key
 * @desc See help file for available keys.
 * @default c
 *
 * @param Fly Charset Ext
 * @desc Text that displays at the end of the default characterset to use for flying
 * @default _fly
 *
 * @help
 *   Galv's Superman Ability
 * ----------------------------------------------------------------------------
 * This plugin enables the player and followers to take off and land like
 * superman at the push of a button. The player will be able to land wherever
 * the default airship is able to land.
 *
 * The current version of this has only a few settings (below) but I may
 * expand on this later.
 * 
 * ----------------------------------------------------------------------------
 *  SCRIPT CALLS
 * ----------------------------------------------------------------------------
 *
 *    Galv.SUPER.fly(status);  // status can be true or false
 *                             // true enables flight button, false disables it
 *
 *    Galv.SUPER.takeoff();    // force player to start flying
 *
 *    Galv.SUPER.land();       // force player to land if flying
 *
 *
 * For use in CONDITIONAL BRANCH script:
 *
 *    $gamePlayer._isFlying    // returns true if character is flying
 *
 *    $gameSystem.disableFly   // returns true if flight is disabled
 *
 * ----------------------------------------------------------------------------
 *  FLIGHT KEY
 * ----------------------------------------------------------------------------
 * This plugin mostly uses default RPGMaker MV controls for the flight key
 * setup. It also allows use of other keyboard keys but whatever key you
 * choose, I advise you to test it isn't conflicting with another control.
 * ----------------------------------------------------------------------------
 * Possible keys to use for "Key" setting:
 *  tab
 *  enter                // Not recommended as key already used
 *  shift                // Not recommended as key already used
 *  ctrl
 *  alt
 *  space                // Not recommended as key already used
 *  0-9
 *  a-z                  // Q,W,Z,X are not recommended as they are used
 *  semi-colon
 *  comma
 *  period
 *  single quote
 *  pageup
 *  pagedown
 *
 * Use one of the below key codes instead for compatibility with gamepads
 *  ok       //      A
 *  cancel   //      B
 *  shift    //      X
 *  menu     //      Y
 *  pageup   //      LB
 *  pagedown //      RB
 *  up       //      D-pad up
 *  down     //      D-pad down
 *  left     //      D-pad left
 *  right    //      D-pad right
 *
 *
 * ----------------------------------------------------------------------------
 *  FLYING CHARACTERSET
 * ----------------------------------------------------------------------------
 * When flying, the plugin will change your characterset to use a new one with
 * the same name with the Fly Charset Ext on the end.
 * eg. "Actor1.png" would use "Actor1_fly.png" if _fly is the Fly Charset Ext.
 *
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.SUPER.fSpeed = Number(PluginManager.parameters('Galv_Superman')["Flight Speed"]);
Galv.SUPER.followers = PluginManager.parameters('Galv_Superman')["Use Followers"].toLowerCase() == 'true' ? true : false;
Galv.SUPER.key = PluginManager.parameters('Galv_Superman')["Key"].toLowerCase();
Galv.SUPER.charset = PluginManager.parameters('Galv_Superman')["Fly Charset Ext"]

Galv.SUPER.txt_ids = {
"tab":9,"enter":13,"shift":16,"ctrl":17,"alt":18,"space":32,"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,
"7":55,"8":56,"9":57,"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,
"n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90,"semi-colon":186,
"comma":188,"period":190,"single quote":222,
};

Input.keyMapper[Galv.SUPER.txt_ids[Galv.SUPER.key]] = 'fly';

Galv.SUPER.takeoff = function(id) {
	if (!id) {
		$gamePlayer.startFlying();
	//} else {
		//$gameMap.event(id).startFlying(); // for if I implement flying events
	}
};

Galv.SUPER.land = function(id) {
	if (!id) {
		$gamePlayer.startLanding();
	//} else {
		//$gameMap.event(id)._flyingDown = true; // for if I implement flying events
	}
};

Galv.SUPER.fly = function(status) {
	$gameSystem.disableFly = !status;
};


//-----------------------------------------------------------------------------
//  GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.SUPER.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.SUPER.Game_System_initialize.call(this);
	this._flightSpeed = Galv.SUPER.fSpeed;
	this.disableFly = false;
};


//-----------------------------------------------------------------------------
//  GAME CHARACTERBASE
//-----------------------------------------------------------------------------

Galv.SUPER.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	Galv.SUPER.Game_CharacterBase_initMembers.call(this);
	this._altitude = 0;
};

Game_CharacterBase.prototype.maxAltitude = function() {
    return 48;
};

Game_CharacterBase.prototype.isLowestAlt = function() {
    return this._altitude <= 0;
};

Game_CharacterBase.prototype.isHighestAlt = function() {
    return this._altitude >= this.maxAltitude();
};

Game_CharacterBase.prototype.shadowX = function() {
    return this.screenX();
};

Game_CharacterBase.prototype.shadowY = function() {
    return this.screenY() + this._altitude;
};

Game_CharacterBase.prototype.shadowOpacity = function() {
    return 255 * this._altitude / this.maxAltitude();
};

Game_CharacterBase.prototype.hasFlyShadow = function() {
	return false;
};


//-----------------------------------------------------------------------------
//  GAME Follower
//-----------------------------------------------------------------------------

Galv.SUPER.Game_Follower_update = Game_Follower.prototype.update;
Game_Follower.prototype.update = function() {
	Galv.SUPER.Game_Follower_update.call(this);
	this._altitude = $gamePlayer._altitude;
	this.setPriorityType($gamePlayer._priorityType);
};

Galv.SUPER.Game_Follower_screenY = Game_Follower.prototype.screenY;
Game_Follower.prototype.screenY = function() {
	return Galv.SUPER.Game_Follower_screenY.call(this) - this._altitude;
};

Game_Follower.prototype.hasFlyShadow = function() {
	return Galv.SUPER.followers;
};


//-----------------------------------------------------------------------------
//  GAME PLAYER
//-----------------------------------------------------------------------------

Galv.SUPER.Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
	Galv.SUPER.Game_Player_initMembers.call(this);
	this._storedForFly = null;
};

Galv.SUPER.Game_Player_screenY = Game_Player.prototype.screenY;
Game_Player.prototype.screenY = function() {
	return Galv.SUPER.Game_Player_screenY.call(this) - this._altitude;
};

Game_Player.prototype.hasFlyShadow = function() {
	return true;
};

Galv.SUPER.Game_Player_updateVehicle = Game_Player.prototype.updateVehicle;
Game_Player.prototype.updateVehicle = function() {
	Galv.SUPER.Game_Player_updateVehicle.call(this);
	this.updateFlying();
};

Game_Player.prototype.updateFlying = function() {
	if (this.isFlying()) {
		if (this._flyingUp) {
			this.updateFlyingUp();
		} else if (this._flyingDown) {
			this.updateFlyingDown();
		//} else {
			//this.updateNormalFlying();
		}
	}
};

Game_Player.prototype.isFlying = function() {
	return this._isFlying;
};

Game_Player.prototype.updateFlyingUp = function() {
	this._flyingDown = false;
	if (!this.isHighestAlt()) {
		this._altitude++;
	} else {
		this._flyingUp = false;
	}
};

Game_Player.prototype.updateFlyingDown = function() {
	this._flyingUp = false;
	if (!this.isLowestAlt()) {
		this._altitude--;
	} else {
		this.stopFlying();
	}
};

Game_Player.prototype.storePreFlyData = function() {
	if (this._storedForFly) return;
	this._storedForFly = {
		stepAnime: Boolean(this._stepAnime),
		moveSpeed: Number(this._moveSpeed),
		priority: Number(this._priorityType),
	}
};

Game_Player.prototype.restorePreFlyData = function() {
	if (!this._storedForFly) return;

	this.setStepAnime(Boolean(this._storedForFly.stepAnime));
	this.setMoveSpeed(Number(this._storedForFly.moveSpeed));
	this.setPriorityType(Number(this._storedForFly.priority));
	this._characterName = this._characterName.replace(Galv.SUPER.charset, '');
	
	if (Galv.SUPER.followers) {
		$gamePlayer._followers.forEach(function(follower) {
			if (follower._characterName) return follower._characterName = follower._characterName.replace(Galv.SUPER.charset, '');
		}, this);
	}
	this._storedForFly = null;
};

Game_Player.prototype.startFlying = function() {
	if (this.isNormal() && !this._isFlying) {
		this._through = true;
		this.storePreFlyData();
		this._isFlying = true;
		this._flyingUp = true;
		this.setMoveSpeed($gameSystem._flightSpeed);
		this.setStepAnime(true);
		this.setPriorityType(2);
	
		//$gameSystem.saveWalkingBgm();
		this._characterName = this._characterName + Galv.SUPER.charset;
		
		if (Galv.SUPER.followers) {
			$gamePlayer._followers.forEach(function(follower) {
				if (follower._characterName) return follower._characterName = follower._characterName + Galv.SUPER.charset;
			}, this);
		}
	}
};

Game_Player.prototype.startLanding = function() {
	if (this.isNormal() && this._isFlying && this.isLandingOk()) {
		this._through = false;
		this._flyingUp = false;
		this._flyingDown = true;
		if (Galv.SUPER.followers) this.gatherFollowers();
	}
};

Game_Player.prototype.stopFlying = function() {
	this._isFlying = false;
	this._flyingUp = false;
	this._flyingDown = false;
	this.restorePreFlyData();
	//$gameSystem.replayWalkingBgm();
};

Game_Player.prototype.isLandingOk = function() {
	if (!$gameMap.isAirshipLandOk(this.x, this.y)) {
		return false;
	}
	if ($gameMap.eventsXy(this.x, this.y).length > 0) {
		return false;
	}
	return true;
};

Game_Player.prototype.updateNormalFlying = function() {
	// any updating during flying here.
};


Galv.SUPER.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
	if (this.canMove() && Input.isTriggered('fly') && !this.isJumping()) {
		if (this.isNormal && !$gameSystem.disableFly) this.doFlightChange();
	};
	Galv.SUPER.Game_Player_moveByInput.call(this);
};

Game_Player.prototype.doFlightChange = function() {
	if (this._isFlying) {
		this.startLanding();
	} else {
		this.startFlying();
	}
};


//-----------------------------------------------------------------------------
//  GAME EVENT
//-----------------------------------------------------------------------------

Game_Event.prototype.hasFlyShadow = function() {
	return this.event().meta.flyShadow;
};


//-----------------------------------------------------------------------------
//  SPRITE CHARACTER
//-----------------------------------------------------------------------------

Galv.SUPER.Sprite_Character_setCharacter = Sprite_Character.prototype.setCharacter;
Sprite_Character.prototype.setCharacter = function(character) {
	Galv.SUPER.Sprite_Character_setCharacter.call(this, character);
	if (this._character && this._character.hasFlyShadow()) {
		this.createFlyShadow(); // create shadow sprite
	}
};

Sprite_Character.prototype.createFlyShadow = function() {
	if (this._flyShadowSprite) {
		this.removeChild(this._flyShadowSprite);
		this._flyShadowSprite = null;
	}
	
	this._flyShadowSprite = new Sprite_FlyShadow(this._character);
	this.addChild(this._flyShadowSprite);
};


//-----------------------------------------------------------------------------
//  SPRITE FLYSHADOW
//-----------------------------------------------------------------------------

function Sprite_FlyShadow() {
    this.initialize.apply(this, arguments);
}

Sprite_FlyShadow.prototype = Object.create(Sprite_Base.prototype);
Sprite_FlyShadow.prototype.constructor = Sprite_FlyShadow;

Sprite_FlyShadow.prototype.initialize = function(character) {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
    this.setCharacter(character);
};

Sprite_FlyShadow.prototype.initMembers = function() {
	this.bitmap = ImageManager.loadSystem('Shadow1');
    this.anchor.x = 0.5;
    this.anchor.y = 1;
};

Sprite_FlyShadow.prototype.setCharacter = function(character) {
    this._character = character;
};

Sprite_FlyShadow.prototype.update = function() {
	Sprite_Base.prototype.update.call(this);
	this.y = this._character._altitude;
	this.opacity = !this._character._characterName ? 0 : this._character.shadowOpacity();
};

})();