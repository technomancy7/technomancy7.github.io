//=============================================================================
// TAA_EventOffset.js
// Author: taaspider
//=============================================================================

var TAA = TAA || {};
TAA.eo = {};
TAA.eo.Version = "1.0.3";
TAA.eo.PluginName = "TAA_EventOffset";
TAA.eo.alias = {};

/*:
 * @target MV MZ
 * 
 * @plugindesc [1.0.3] Event Position Offset
 * @author T. A. A. (taaspider)
 * @url http://taaspider.itch.io/ 
 * 
 * @help
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Any plugins developed by taaspider are free for use for both commercial and 
 * noncommercial RPG Maker games, unless specified otherwise. Just remember to
 * credit "Taaspider".
 * 
 * Redistribution of parts or the whole of taaspider plugins is forbidden, unless
 * it comes from the official website: http://taaspider.itch.io. You are allowed 
 * to edit and change the plugin code for your own use, but you're definitely not 
 * allowed to sell or reuse any part of the code as your own. Although not 
 * required to use my plugins, a free copy of your game would be nice!
 * 
 * If you enjoy my work, consider offering a donation when downloading my plugins, 
 * or offering a monthly pledge to my Patreon account. It would be of great help!
 * Also, follow me on facebook to get firsthand news on my activities!
 *  Facebook: https://www.facebook.com/taaspider 
 *  Patreon: https://www.patreon.com/taaspider
 * 
 * =============================================================================
 * Introduction
 * =============================================================================
 * 
 * WARNING: This plugin requires RPG Maker MV 1.5.0 or above! Please make sure 
 * your RPG Maker MV software is up to date before using this plugin.
 * You don't need any specific version if you're using MZ.
 * 
 * -----------------------------------------------------------------------------
 * 
 * This is a simple utility plugin that allows you to have more control over the
 * event position in a tile, so that it can have a perfect placement in the scene.
 * For example, it can be used to place the event a few pixels up and make it fit
 * better like it is sitting on a chair, or a few pixels to the right, to hide 
 * behind a tree or an ornamental plant.
 * 
 * =============================================================================
 * Instructions
 * =============================================================================
 * 
 * The plugin has no parameters and all usage is done through event notes or
 * comment tags. It's important to know that comment tags have precedence over
 * note tags. That means that if you setup an event page with a different offset
 * value then its note field, whenever that page becomes active it will overwrite
 * the note settings.
 * 
 * Both tagging methods use the same syntax:
 *      <TAA_EO: x={op}{n}; y={op}{m}>
 *      <TAA_EO: x={op}{n}.{w}; y={op}{m}.{k}>
 * 
 * {op} can be replaced by one of the following operands: + (sum), - (subtraction),
 * * (multiplication), / (division). You can also omit it entirely, which means the
 * exact coordinate will be used.
 * 
 * {n} and {m} are integers, while {w} and {k} are used for precision placement 
 * inside the tile itself. If {w} and {k} is omitted or set as zero, it would 
 * represent the tile center coordinates, while any value greater than zero (along
 * an operand, like + or -) would describe coordinates inside the same tile.
 * 
 * Let's say, for example, that you want the event to be placed above its central
 * coordinates, but halfway from the tile upper border:
 *      <TAA_EO: y=-0.5>
 * or even make it also halfway from the tile left border:
 *      <TAA_EO: x=-0.5; y=-0.5>
 * 
 * You can also replace any of the numeric parameters ({m}, {n}, {w} or {k}) with
 * a variable value. To do that, use the tag v[{var num}]. For example, to use
 * variables one and two to fine tune the event position, considering that their
 * value hold the event position inside the tile:
 *      <TAA_EO: x=-0.v[1]; y=-0.v[2]>
 * 
 * In another example, the event can also be moved to coordinates specified by the
 * same said variables, without the use of operands:
 *      <TAA_EO: x=v[1]; y=v[2]>
 * 
 * Or even use four variables to control every aspect of the event's position:
 *      <TAA_EO: x=v[1].v[2]; y=v[3].v[4]>
 * 
 * If using variables, keep in mind that values must be positive and it is more 
 * limited. For example, setting a variable to 1, 10 or 100 and using it as your
 * decimal value (the value after the dot) will provide the same result: in either
 * case it will translate to .1. I might consider changing this behavior in the
 * future if the need arises.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.0.0:
 *  - Initial release
 * Version 1.0.1:
 *  - Fixed an issue which would crash the game if using a "Erase Event" command
 * Version 1.0.2:
 *  - Fixed an issue that would cause game crash if none of the event pages conditions
 *    are met (for example, have an event with a single page to load only when switch 1
 *    is ON. If it is OFF, the game would crash);
 * Version 1.0.3:
 *  - Fixed an issue that could cause offsetted events to have no collision with
 *    characters;
 * 
 * ============================================================================
 * End of Help
 * ============================================================================
 */

//=============================================================================
// Game_Event
//=============================================================================

TAA.eo.alias.Game_Event = TAA.eo.alias.Game_Event || {};
TAA.eo.alias.Game_Event.initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId){
    TAA.eo.alias.Game_Event.initialize.call(this, mapId, eventId);
    this._originalX = this._x;
    this._originalY = this._y;
    if(this._pageIndex >= 0) {
        this.offsetByNote();
        this.offsetByComments();
    }
    this._initialized = true;
};

Game_Event.prototype.offsetByNote = function(){
    var note = this.event().note;
    if(note.match(/<TAA[_ ]EO:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*;?(?:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*)?>/gi)){
        var x = new String(this.x);
        var y = new String(this.y);
        if(['x', 'X'].contains(RegExp.$1)) x = RegExp.$2;
        else if(['x', 'X'].contains(RegExp.$3)) x = RegExp.$4;
        if(['y', 'Y'].contains(RegExp.$1)) y = RegExp.$2;
        else if(['y', 'Y'].contains(RegExp.$3)) y = RegExp.$4;
        this.offsetMath(x, y);
    }
};

Game_Event.prototype.offsetByComments = function(){
    var pageList = this.list();
    var tagFound = false;
    var i = 0;
    while(i < pageList.length && !tagFound){
        var page = pageList[i];
        if(page.code === 108 || page.code === 408){
            if(page.parameters[0].match(/<TAA[_ ]EO:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*;?(?:\s*(x|y)=\s*([\+\-\*\/]?(?:[0-9]+|v\[[0-9]+\])[\.]?(?:[0-9]*|v\[[0-9]+\]))\s*)?>/gi)){
                var x = new String(this.x);
                var y = new String(this.y);
                if(['x', 'X'].contains(RegExp.$1)) x = RegExp.$2;
                else if(['x', 'X'].contains(RegExp.$3)) x = RegExp.$4;
                if(['y', 'Y'].contains(RegExp.$1)) y = RegExp.$2;
                else if(['y', 'Y'].contains(RegExp.$3)) y = RegExp.$4;
                this.offsetMath(x, y);
                tagFound = true;
            }
        }
        i++;
    }
};

Game_Event.prototype.offsetMath = function(x, y){
    var newX = 0;
    var newY = 0;
    this._x = this._originalX;
    this._y = this._originalY;
    if(x === undefined || x === "")
        newX = this.x;
    else if(x.match(/([\+\-\*\/]?)([0-9]+|v\[[0-9]+\])[\.]?([0-9]*|v\[[0-9]+\])?/)){
        var op = RegExp.$1;
        var num1 = RegExp.$2;
        var num2 = RegExp.$3;
        var defaultValue = (op !== undefined && op !== "") ? 0 : this.x;
        num1 = this.getOffsetFromVariable(num1, defaultValue);
        num2 = this.getOffsetFromVariable(num2, "0");
        if(op === undefined || op === "") newX = eval(num1 + "." + num2);
        else newX = eval("this.x " + op + " " + num1 + "." + num2);
    }
    else {
        newX = x;
    }
    if(y === undefined || y === "")
        newY = this.y;
    else if(y.match(/([\+\-\*\/]?)([0-9]+|v\[[0-9]+\])[\.]?([0-9]*|v\[[0-9]+\])?/)){
        var op = RegExp.$1;
        var num1 = RegExp.$2;
        var num2 = RegExp.$3;
        var defaultValue = (op !== undefined && op !== "") ? 0 : this.y;
        num1 = this.getOffsetFromVariable(num1, defaultValue);
        num2 = this.getOffsetFromVariable(num2, "0");
        if(op === undefined || op === "") newY = eval(num1 + "." + num2);
        else newY = eval("this.y " + op + " " + num1 + "." + num2);
    }
    else {
        newY = y;
    }
    this._x = (!isNaN(newX) && newX >= 0) ? newX : this._x;
    this._y = (!isNaN(newY) && newY >= 0) ? newY : this._y;
};

Game_Event.prototype.getOffsetFromVariable = function(num, defaultValue){
    if(num !== undefined && num.match(/v\[([0-9]+)\]/i)){
        var varNum = parseInt(RegExp.$1);
        if(isNaN(varNum)) num = defaultValue;
        else num = $gameVariables.value(varNum);
    }
    return (isNaN(num)) ? defaultValue : num;
};

TAA.eo.alias.Game_Event.setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function(){
    TAA.eo.alias.Game_Event.setupPage.call(this);
    if(this._pageIndex >= 0 && this._initialized) this.offsetByComments();
};

TAA.eo.alias.Game_Event.pos = Game_Event.prototype.pos;
Game_Event.prototype.pos = function(x, y) {
    return (this._originalX === x && this._originalY === y) || TAA.eo.alias.Game_Event.pos.call(this, x, y);
};