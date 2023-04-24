//=============================================================================
// Focused Sound Effects
// Jay_FocusedSoundEffects.js
// Version 1.1
//=============================================================================

var Imported = Imported || {};
Imported.Jay_FocusedSoundEffects = true;

var Jay = Jay || {};
Jay.FocusedSoundEffects = Jay.FocusedSoundEffects || {};

//=============================================================================
 /*:
 * @plugindesc Play back sound effects coming from a specific spot on the map.
 *
 * @author Jason R. Godding
 *
 * @help This plugin allows you to play sound effects that originate from a specific
 * spot on the map. Not recommended for in-battle use.
 *
 * Just call this plugin command:
 *
 * PlayFocusedSE nameOfSEFile [parameter] [parameter]...
 *
 * The following parameters work:
 *
 * x=19
 * Defines the map's X-coordinate of the sound effect's origin.
 *
 * y=59
 * Defines the map's Y-coordinate of the sound effect's origin.
 *
 * event=13
 * event=DrippyFaucetEvent
 * Give the event ID or the event's name and the sound effect will originate
 * from the location of the event. (If you use the name, it can't contain
 * spaces.)
 * If you do not supply the event or the coordinates, then the location of
 * the current event will be presumed to be the sound source (unless the
 * current event is a common event, in which case the plugin's features will
 * not work without an event or coordinates provided.)
 *
 * pitch=20
 * Sets the pitch of the sound effect; default is 100.
 *
 * pan=40
 * Sets the pan of the sound effect. 
 * If not set, then it will determine the pan value based on its position on
 * the screen (with it being -100 or 100 if it's offscreen to the left or
 * right.) Setting the pan manually completely overrides this behavior.
 * Only the X-coordinate of the event matters for the pan value.
 *
 * volume=75
 * The base volume for the sound effect; default is 100.
 *
 * fadeDistance=8
 * When set, if the player is within the defined distance from the sound's
 * source, it will play at the defined base volume (or volume 100 if it wasn't
 * defined.) If not set, it will play at the base volume no matter what.
 *
 * fadeRate=20
 * As a percentage, how fast does the sound fade away?
 * So if it's 20, then if you're one step outside the fadeDistance range, the
 * sound effect will play at 80% volume (20% of the volume faded away.)
 * If you're two steps away, it will play at 64% volume (80% of 80%.)
 * Default is 100, which means the sound effect simply won't play outside
 * the fadeDistance range; I recommend you change this if you are using
 * fadeDistance.
 *
 * Example:
 * PlayFocusedSE Frog event=Lillypad volume=80 fadeDistance=5 fadeRate=10
 *
 * With this example, when the player is within 5 tiles of the lillypad, the
 * "Frog" SE will play at 80 volume. At 6 tiles away, it will be 72%, at 
 * 7 it will be 64.8%, etc.
 *
 * To use this in a custom move route, use the following Script:
 *
 * this.playFocusedSE("nameOfSEFile parameter=X parameter=Y...");
 *
 * Filling in the parameters the same way as the above. So for the frog example:
 *
 * this.playFocusedSE("Frog volume=80 fadeDistance=5 fadeRate=10");
 *
 * There is a "Pro" version of this plugin in HeroicJay's itch.io shop now!
 * It allows Focused BGS effects, and changes the volume and pan settings of
 * Focused effects on the fly as you or attached events move! (In this version,
 * all effects will keep the same pan and volume settings they had at the moment
 * they start playing.)
 *
 * ====================================
 *
 * Version 1.1 - Fixed minor bug for events having the wrong pan volume when
 *  too close to the edge of the screen if the player has the same X-coordinate.
 *
 * Version 1.0 - First version.
 *
 * ==== LEGAL STUFF ====
 * 
 * This plugin is free for non-commercial and commercial use, but please credit
 * Jason R. Godding if you use it. Thank you.
 * © Jason R. Godding, 2019-2020
 * 
 */

// Attaches the "PlayFocusedSE" command to the interpreter.
Jay.FocusedSoundEffects.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	if (command === 'PlayFocusedSE') {
        var eventId = this.eventId();
        if (eventId > 0) {
            AudioManager.playFocusedSE($gameMap.event(eventId).x,
                $gameMap.event(eventId).y, args);
        }
        else{
            AudioManager.playFocusedSE(-1, -1, args);
        }
	}
	Jay.FocusedSoundEffects.pluginCommand.call(this, command, args);
}

// Plays a focused sound effect.
AudioManager.playFocusedSE = function(xCoord, yCoord, args) {
    var autoPan = true;
    var pan = 0;
    var fadeDistance = 99999;
    var fadeRate = 100;
    var baseVolume = 100;
    var pitch = 100;
    
    if (!args[0]) {
        throw ("PlayFocusedSE command needs a sound effect to play.");
    }
    
    var seName = args[0];
    
    for (var i=1; i<args.length; i++) {
        var arg = args[i];
        if (arg.match(/pitch=(\d*)/gi)) {
            pitch = parseInt(RegExp.$1);
        }
        else if (arg.match(/volume=(\d*)/gi)) {
            baseVolume = parseInt(RegExp.$1);
        }
        else if (arg.match(/pan=(\d*)/gi)) {
            pan = parseInt(RegExp.$1);
            autoPan = false;
        }
        else if (arg.match(/event=(\d+)/gi)) {
            var eventNo = parseInt(RegExp.$1);
            if (!$gameMap.event(eventNo)) {
                throw ("Can't find event " + eventNo + ".");
            }
            xCoord = $gameMap.event(eventNo).x;
            yCoord = $gameMap.event(eventNo).y;
        }
        else if (arg.match(/event=(.*)/gi)) {
            var eventName = RegExp.$1;
            var candidateEvents = $gameMap.events().filter(function(event) {
                return event.event().name === eventName;
            });
            if (candidateEvents.length === 0) {
                throw ("Can't find event " + eventName + ".");
            }
            xCoord = candidateEvents[0].x;
            yCoord = candidateEvents[0].y;
        }
        else if (arg.match(/fadeDistance=(\d*)/gi)) {
            fadeDistance = parseInt(RegExp.$1);
        }
        else if (arg.match(/fadeRate=(\d*)(?:%)?/gi)) {
            fadeRate = Number(RegExp.$1);
            if (fadeRate > 100) {
                fadeRate = 100;
            }
        }
        else if (arg.match(/x=(\d*)/gi)) {
            xCoord = parseInt(RegExp.$1);
        }
        else if (arg.match(/y=(\d*)/gi)) {
            yCoord = parseInt(RegExp.$1);
        }
    }
    
    if (autoPan && xCoord >= 0 && yCoord >= 0) {
        pan = AudioManager.getAutoPan(xCoord);
    }
    
    var volume = baseVolume;
    
    if (fadeRate > 0 && xCoord >= 0 && yCoord >= 0) {
        var xDistance = Math.abs($gamePlayer.x - xCoord);
        var yDistance = Math.abs($gamePlayer.y - yCoord);
        var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance) - fadeDistance;
        if (distance > 0) {
            volume = AudioManager.getFadedVolume(distance, volume, fadeRate);
        }
    }
    
    var se = {
		name: seName,
		volume: volume,
		pitch: pitch,
		pan: pan
    }
    
    AudioManager.playSe(se);
}

// Calculates the pan value based on the locations of the player and the sound source.
AudioManager.getAutoPan = function(xCoord) {
    var playerX = $gamePlayer.x;
    
    var screenSize = Graphics.width;
    var tileSize = 48;
    var screenTileWidth = screenSize / tileSize;
    var maxTileWidth = $gameMap.width();
    
    // If the player is too close to the edge of the map, assume they're actually
    // half the screen length from it, since that's what the player will witness.
    if (playerX < screenTileWidth/2 - 1) {
        playerX = screenTileWidth/2 - 1;
    }
    if (playerX > maxTileWidth - screenTileWidth/2 - 1) {
        playerX = maxTileWidth - screenTileWidth/2 - 1;
    }
    
    if (xCoord < playerX - screenTileWidth/2) {
        return -100;
    }
    if (xCoord > playerX + screenTileWidth/2) {
        return 100;
    }
    
    if (maxTileWidth > screenTileWidth) {
        return (xCoord - playerX)/screenTileWidth * 200;
    }
    else {
        return (xCoord + .5)/maxTileWidth * 200 - 100;
    }
}

// Calculates the sound volume after fading from distance.
AudioManager.getFadedVolume = function(distance, volume, fadeRate) {
    return volume * (Math.pow((100 - fadeRate)/100, distance));
}

// Game_Character version for easy access in movement commands.
Game_Character.prototype.playFocusedSE = function(command) {
    args = command.split(' ');
    AudioManager.playFocusedSE(this.x, this.y, args);
}
