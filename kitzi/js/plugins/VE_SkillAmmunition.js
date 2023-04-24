/*
 * ==============================================================================
 * ** Victor Engine MV - Skill Ammunition
 * ------------------------------------------------------------------------------
 * VE_SkillAmmunition.js
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Skill Ammunition'] = '1.01';

var VictorEngine = VictorEngine || {};
VictorEngine.SkillAmmunition = VictorEngine.SkillAmmunition || {};

(function() {

	VictorEngine.SkillAmmunition.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.SkillAmmunition.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Skill Ammunition', 'VE - Basic Module', '1.12');
	};

	VictorEngine.SkillAmmunition.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.SkillAmmunition.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 * ==============================================================================
 * @plugindesc v1.01 - Setup skill that consume ammunition.
 * @author Victor Sant
 *
 * @param Ammunition Category
 * @desc Name displayed for the ammuntion category on menu.
 * Default: Ammunition.    Leave blank to hide the option.
 * @default Ammunition
 *
 * @param Ammunition Display
 * @desc Show Ammunition amount on the side of the cost.
 * %1 ammuntion ammount.    Leave blank for no display.
 * @default : %1
 *
 * ==============================================================================
 * @help 
 * ==============================================================================
 *
 * ==============================================================================
 *  Require Ammunition (notetag for Weapons and Skills)
 * ------------------------------------------------------------------------------
 *  <require ammunition: type X[, X...][, equiped]>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The weapon or skill requires and consumes the ammunition listed.
 *    type : item type. weapon, armor or item.
 *    X    : id of the ammunition item. You can add as many you want.
 *    equiped : the ammunition must be equiped. Opitional.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.:  <require ammunition: item 5>
 *        <require ammunition: weapon 5, 6>
 *        <require ammunition: armor 6, 7, 8, equiped>
 * ==============================================================================
 *
 * ==============================================================================
 *  Ignore Ammunition (notetag for Weapons and Skills)
 * ------------------------------------------------------------------------------
 *  <ignore ammunition: type X[, X...][, equiped]>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The weapon or skill will ignore ammunition requirements.
 *    type : item type. weapon, armor or item.
 *    X    : id of the ammunition item. You can add as many you want.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.:  <ignore ammunition: item 5>
 *        <ignore ammunition: weapon 5, 6>
 *        <ignore ammunition: armor 6, 7, 8>
 * ==============================================================================
 *
 * ==============================================================================
 *  Custom Require Ammunition (notetag for Weapons and Skills)
 * ------------------------------------------------------------------------------
 *  <custom require ammunition: type[, equiped]>
 *   result = code
 *  </custom require ammunition>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The weapon or skill requires and consumes the ammunition listed.
 *    type : item type. weapon, armor or item.
 *    equiped : the ammunition must be equiped. Opitional.
 *    code : code that will return the id of the ammunition item.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.:  <custom require ammunition: armor>
 *         if (a.actorId() === 1) {
 *             result = 5 ;
 *         } else {
 *             result = 6;
 *         }
 *        </custom require ammunition>
 * ==============================================================================
 *
 * ==============================================================================
 *  Custom Ignore Ammunition (notetag for Weapons and Skills)
 * ------------------------------------------------------------------------------
 *  <custom ignore ammunition: type>
 *   result = code
 *  </custom ignore ammunition>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The weapon or skill requires and consumes the ammunition listed.
 *    type : item type. weapon, armor or item.
 *    code : code that will return the id of the ammunition item.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.:  <custom ignore ammunition: armor>
 *         if (a.actorId() === 1) {
 *             result = 5 ;
 *         } else {
 *             result = 6;
 *         }
 *        </custom ignore ammunition>
 * ==============================================================================
 *
 * ==============================================================================
 *  Ignore All Ammunition (notetag for Weapons and Skills)
 * ------------------------------------------------------------------------------
 *  <ignore all ammunition>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The weapon or skill will ignore any ammunition requirements.
 * ==============================================================================
 *
 * ==============================================================================
 *  No Ammunition Hide (notetag for Skills)
 * ------------------------------------------------------------------------------
 *  <no ammunition hide>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The weapon or skill will ignore any ammunition requirements.
 * ==============================================================================
 *
 * ==============================================================================
 *  Ammunition (notetag for Weapons, Armors and Items)
 * ------------------------------------------------------------------------------
 *  <ammunition>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *   Hide the skill display on the Skill Window if there is no avaiable 
 *   ammunition for that skill.
 * ==============================================================================
 *
 * ==============================================================================
 * Additional Information:
 * ==============================================================================
 * 
 *  The code uses the same values as the damage formula, so you can use "a" for
 *  the user, "v[x]" for variable and "item" for the item object. The 'result'
 *  must return a numeric value.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - The Ammunition
 *  The ammunitions are created using weapons, armors or items on the database.
 *  You will need to have them available on the inventory to use the action.
 *  If the notetag includes the 'equipe' flag, then the armor or weapon must
 *  be also equiped to enable the use of the action.
 *
 *  When the actor use the action, he will consume a copy of the item on the
 *  inventory. For equiped items, if there are no copies on the inventory,
 *  the action will consume the one he have equiped.
 *
 *  By default, the 'ammunition items' are no different from normal items and are
 *  displayed on their original category on the inventory. To change that you can
 *  create a separate category on the database for the ammunitions with the 
 *  plugin paramater 'Ammunition Category'. Then add the <ammunition> tag on the
 *  items. This will make them to be displayed on the ammunition category.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - Ignore Ammunition
 *  When a weapon requires an ammunition, *all* the actor skills will require
 *  the ammunition. 
 *  If you want actions to not require ammunition you will need to add the tag
 *  <ignore ammunition> with the matching ammunition or <ignore all ammunition>
 *  the on the skill.
 *  There is no shortcut for this. You will need to use the ignore tags on every
 *  skill you don't want to consume ammunitions.
 * 
 *  For weapons, the tag <ignore ammunition> and will ignore the ammunition cost
 *  for any skill that have an mathcing ammunition. The <ignore all ammunition> 
 *  will ignore any ammunition for every skill.
 * 
 *  Notice that the matching ammunition don't need to be the one available.
 *  For example, you have a skill with the tag <require ammunition: item 2, 3>
 *  and a weapon with the tag <ignore ammunition: item 2>. Even if the only
 *  ammunition available is item 3, the weapon will ignore the cost.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  - Ammunition Costs
 *  When an action have multiple ammunition costs, only one ammunition is
 *  consumed, the costs are checked in the order they are on the required tag.
 *  For example, if you have a tag <require ammunition: item 4, 5, 6> and have
 *  all items listed, first it will consume the item 4, and only when there is no
 *  item 4 left, it will consume the item 5. This also reflect on the ammunition
 *  display. It will show only the ammount of the ammunition that will be used.
 *
 *  For equipment, the copies of the item on the inventory will be consumed
 *  before the one that you have equiped. 
 *
 * ==============================================================================
 *
 * ==============================================================================
 *  Version History:
 * ------------------------------------------------------------------------------
 *  v 1.00 - 2016.03.12 > First release.
 *  v 1.01 - 2017.05.25 > Fixed issue with equiped ammunition requirement.
 * ============================================================================== 
 */

(function() {
	
	//=============================================================================
	// Parameters
	//=============================================================================
	
	if (Imported['VE - Basic Module']) {
		var parameters = VictorEngine.getPluginParameters();
		VictorEngine.Parameters = VictorEngine.Parameters || {};
		VictorEngine.Parameters.SkillAmmunition = {};
		VictorEngine.Parameters.SkillAmmunition.AmmunitionCategory = String(parameters["Ammunition Category"]).trim();
		VictorEngine.Parameters.SkillAmmunition.AmmunitionDisplay  = String(parameters["Ammunition Display"]).trim();
	}
		
	//=============================================================================
	// VictorEngine
	//=============================================================================
	
	VictorEngine.SkillAmmunition.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.SkillAmmunition.loadNotetagsValues.call(this, data, index);
		if (this.objectSelection(index, ['skill', 'weapon'])) {
			VictorEngine.SkillAmmunition.loadNotes1(data);
		}
		if (this.objectSelection(index, ['armor'])) {
			VictorEngine.SkillAmmunition.loadNotes2(data);
		}
	};
	
	VictorEngine.SkillAmmunition.loadNotes1 = function(data) {
		data.skillAmmunition = data.skillAmmunition || {};
		data.skillAmmunition.require = data.skillAmmunition.require || {};
		data.skillAmmunition.ignore  = data.skillAmmunition.ignore  || {};
		this.processNotes(data);
	};
	
	VictorEngine.SkillAmmunition.loadNotes2 = function(data) {
		data.isAmmunition = !!data.note.match(/<ammunition>/gi);
	};
	
	VictorEngine.SkillAmmunition.processNotes = function(data, type) {
		var match;
		var part1  = '(require|ignore) ammunition[ ]*'
		var part2  = ':[ ]*(weapon|armor|item)[ ]*'
		var part3  = '(?:[ ]*,[ ]*(equiped))?[ ]*'
		var regex1 = new RegExp('<' + part1 + part2 + '((?:\\d+[ ]*,?[ ]*)+)'+ part3 + '>', 'gi');
		var regex2 = VictorEngine.getNotesValues('custom ' + part1 + part2 + part3, 'custom ' + part1);
		while (match = regex1.exec(data.note)) {
			this.processValues(match, data, false);
		};
		while (match = regex2.exec(data.note)) {
			this.processValues(match, data, true);
		};
		data.skillAmmunition.ignoreAll  = !!data.note.match(/<ignore all ammunition>/gi)
		data.skillAmmunition.noAmmoHide = !!data.note.match(/<no ammunition hide>/gi)
	};
	
	VictorEngine.SkillAmmunition.processValues = function(match, data, code) {
		var result  = {};
		var require = match[1].toLowerCase();
		result.type = match[2].toLowerCase();
		result.list = code ? [] : match[3].match(/\d+/gi).map(function(id) { 
			return Number(id)
		});
		result.code = code ? match[4].trim() : '';
		result.equiped = !!match[code ? 3 : 4];
		data.skillAmmunition[require] = result;
	};
	
	//=============================================================================
	// Game_Actor
	//=============================================================================
	
	VictorEngine.SkillAmmunition.canPaySkillCost = Game_Actor.prototype.canPaySkillCost;
	Game_Actor.prototype.canPaySkillCost = function(skill) {
		return VictorEngine.SkillAmmunition.canPaySkillCost.call(this, skill) && this.canPaySkillAmmunition(skill);
	};
	
	VictorEngine.SkillAmmunition.paySkillCost = Game_Actor.prototype.paySkillCost;
	Game_Actor.prototype.paySkillCost = function(skill) {
		VictorEngine.SkillAmmunition.paySkillCost.call(this, skill);
		this._payAmmunitionCost = skill;
	};

	VictorEngine.SkillAmmunition.performActionEnd = Game_Actor.prototype.performActionEnd;
	Game_Actor.prototype.performActionEnd = function() {
		VictorEngine.SkillAmmunition.performActionEnd.call(this)
		if (this._payAmmunitionCost) {
			this.payAmmunitionCost(this._payAmmunitionCost);
			this._payAmmunitionCost = null;
		}
	};

	Game_Actor.prototype.canPaySkillAmmunition = function(skill) {
		if (this.needsAmmunition(skill)) {
			return this.requiredAmmunition(skill) > 0;
		} else {
			return true;
		}
	};
	
	Game_Actor.prototype.needsAmmunition = function(skill) {
		var require = skill.skillAmmunition.require.list || skill.skillAmmunition.require.code;
		var ignore  = this.ignoreAmmunitionWeapon(skill);
		var weapons = this.requireAmmunitionWeapon(skill).length > 0;
		return (require && !ignore) || (!require && weapons);
	};
	
	Game_Actor.prototype.requiredAmmunition = function(skill) {
		if (!skill.skillAmmunition.require.list) {
			var weapons = this.requireAmmunitionWeapon(skill);
			return this.getRequiredAmmunition(weapons);
		} else {
			return this.getRequiredAmmunition([skill]);
		}
	};
	
	Game_Actor.prototype.requireAmmunitionWeapon = function(skill) {
		return this.weapons().filter(function(weapon) {
			return weapon && weapon.skillAmmunition.require.list && 
				!this.checkIgnoredAmmunition(weapon, skill);
		}, this);
	};
	
	Game_Actor.prototype.ignoreAmmunitionWeapon = function(skill) {
		return this.weapons().some(function(weapon) {
			return this.checkIgnoredAmmunition(skill, weapon);
		}, this);
	};
	
	Game_Actor.prototype.checkIgnoredAmmunition = function(object1, object2) {
		var result = 0;
		var item = object1;
        var a = this;
        var v = $gameVariables._data;
		var code   = object1.skillAmmunition.require.code || '';
		var list   = object1.skillAmmunition.require.list || [];
		eval(code);
		if (result) {
			list.push(result);
		}
		var result = 0;
		var item = object2;
        var a = this;
        var v = $gameVariables._data;
		var code   = object2.skillAmmunition.ignore.code || '';
		var ignore = object2.skillAmmunition.ignore.list || [];
		eval(code);
		if (result) {
			ignore.push(result);
		}
		if (object2.skillAmmunition.ignoreAll) {
			return true;
		}
		for (var i = 0; i < list.length; i++) {
			for (var j = 0; j < ignore.length; j++) {
				if (list[i] === ignore[j]) {
					return true;
				}
			};
		};
		return false;
	};
	
	Game_Actor.prototype.getRequiredAmmunition = function(items) {
		var object = this;
		return items.reduce(function(r, item) {
			return r.concat(object.getRequiredAmmunitionItemNumber(item) || []);
		}, [])[0] || 0;
	};
	
	Game_Actor.prototype.getRequiredAmmunitionItemNumber = function(item) {
		var object = this;
		var result = 0;
		var item = item;
        var a = this;
        var v = $gameVariables._data;
		var code  = item.skillAmmunition.require.code || '';
		var list  = item.skillAmmunition.require.list || [];
		var type  = item.skillAmmunition.require.type || '';
		var equip = item.skillAmmunition.require.equiped;
		eval(code);
		if (result) {
			list.push(result);
		}
		return list.reduce(function(r, id) {
			return r.concat(object.requiredAmmunitionNumber(id, type, equip) || []);
		}, [])[0];
	};
		
	Game_Actor.prototype.requiredAmmunitionNumber = function(id, type, equip) {
		var item = this.ammunitionItem(id, type);
		var result = $gameParty.numItems(item);
		var equiped = item && this.isEquipped(item);
		return (equip && equiped) ? result + 1 : (equip && !equiped) ? 0 : result;
	};

	Game_Actor.prototype.payAmmunitionCost = function(skill) {
		if (this.needsAmmunition(skill)) {
			if (!skill.skillAmmunition.require.list) {
				var weapons = this.requireAmmunitionWeapon(skill);
				this.payAmmunitionItemCost(weapons[0]);
			} else {
				this.payAmmunitionItemCost(skill);
			}
		}
	};
	
	Game_Actor.prototype.payAmmunitionItemCost = function(item) {
		var result = 0;
		var item = item;
        var a = this;
        var v = $gameVariables._data;
		var code  = item.skillAmmunition.require.code || '';
		var list  = item.skillAmmunition.require.list || [];
		var type  = item.skillAmmunition.require.type || '';
		var equip = item.skillAmmunition.require.equiped;
		eval(code);
		if (result) {
			list.push(result);
		}
		var id = list.filter(function(id) { return this.hasAmmunition(id, type, equip) }, this)[0];
		if (id) {
			var ammunition = this.ammunitionItem(id, type);
			if ($gameParty.hasItem(ammunition)) {
				$gameParty.gainItem(ammunition, -1);
			} else if (equip) {
				this.discardEquip(ammunition);
			}
		}
	};
	
	Game_Actor.prototype.hasAmmunition = function(id, type, equip) {
		var item = this.ammunitionItem(id, type);
		return (equip && this.isEquipped(item)) || (!equip && $gameParty.hasItem(item));
	};
	
	Game_Actor.prototype.ammunitionItem = function(id, type) {
		switch (type) {
		case 'weapon':
			return $dataWeapons[id];
		case 'armor':
			return $dataArmors[id];
		case 'item':
			return $dataItems[id];
		default:
			return null;
		}
	};
	
	//=============================================================================
	// Window_ItemCategory
	//=============================================================================
	
	
	VictorEngine.SkillAmmunition.maxCols = Window_ItemCategory.prototype.maxCols;
	Window_ItemCategory.prototype.maxCols = function() {
		var adjust = !!VictorEngine.Parameters.SkillAmmunition.AmmunitionCategory ? 1 : 0
		return VictorEngine.SkillAmmunition.maxCols.call(this) + adjust;
	};
	VictorEngine.SkillAmmunition.makeCommandList = Window_ItemCategory.prototype.makeCommandList;
	Window_ItemCategory.prototype.makeCommandList = function() {
		VictorEngine.SkillAmmunition.makeCommandList.call(this);
		var category = VictorEngine.Parameters.SkillAmmunition.AmmunitionCategory;
		if (category) {
			var index = 0
			for (var i = 0; i < this._list.length; i++) {
				if (this._list[i].symbol === 'keyItem') {
					index = i;
				}
			}
			var command = {name: category, symbol: 'ammunition', enabled: true, ext: null};
			if (index) {
				this._list.splice(index, 0, command);
			}
		}
	};

	//=============================================================================
	// Window_ItemCategory
	//=============================================================================
	
	VictorEngine.SkillAmmunition.includesItemList = Window_ItemList.prototype.includes;
	Window_ItemList.prototype.includes = function(item) {
		if (item && item.isAmmunition && VictorEngine.Parameters.SkillAmmunition.AmmunitionCategory) {
			return this._category === 'ammunition' ? true : false;
		} else {
			return VictorEngine.SkillAmmunition.includesItemList.call(this, item);
		}
	};
	
	//=============================================================================
	// Window_ActorCommand
	//=============================================================================
	
	VictorEngine.SkillAmmunition.drawItem = Window_ActorCommand.prototype.drawItem;
	Window_ActorCommand.prototype.drawItem = function(index) {
		VictorEngine.SkillAmmunition.drawItem.call(this, index);
		var display = VictorEngine.Parameters.SkillAmmunition.AmmunitionDisplay;
		if (display) {
			var actor = this._actor;
			var list  = this._list[index];
			var rect  = this.itemRectForText(index);
			if (list.symbol === 'attack') {
				var item = $dataSkills[actor.attackSkillId()];
			} else if (list.symbol === 'guard') {
				var item = $dataSkills[actor.guardSkillId()];
			} else if (list.symbol === 'direct skill') {
				var item = $dataSkills[list.ext];
			}
			if (item && actor.requiredAmmunition(item) && actor.canPaySkillAmmunition(item)) {
				var text = display.format(actor.requiredAmmunition(item));
				this.drawText(text, rect.x, rect.y, rect.width, 'right');
			}
		}
	};

	//=============================================================================
	// Window_SkillList
	//=============================================================================

	VictorEngine.SkillAmmunition.includesSkillList = Window_SkillList.prototype.includes;
	Window_SkillList.prototype.includes = function(item) {
		return VictorEngine.SkillAmmunition.includesSkillList.call(this, item) && this.includesAmmunition(item);
	};

	VictorEngine.SkillAmmunition.drawSkillCost = Window_SkillList.prototype.drawSkillCost;
	Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
		var display = VictorEngine.Parameters.SkillAmmunition.AmmunitionDisplay;
		if (display && this._actor.requiredAmmunition(skill) && this._actor.canPaySkillAmmunition(skill)) {
			this.drawSkillAmmunition(skill, x, y, width);
			x -= this._ammunitionWidth;
		}
		VictorEngine.SkillAmmunition.drawSkillCost.call(this, skill, x, y, width);
	};

	Window_SkillList.prototype.includesAmmunition = function(item) {
		if (this._actor && this._actor.needsAmmunition(item) && item.skillAmmunition.noAmmoHide) {
			return this._actor.requiredAmmunition(item) > 0;
		} else {
			return true;
		}
	};
	
	Window_SkillList.prototype.drawSkillAmmunition = function(skill, x, y, width) {
		var display = VictorEngine.Parameters.SkillAmmunition.AmmunitionDisplay;
		var text = display.format(this._actor.requiredAmmunition(skill));
		this.drawText(text, x, y, width, 'right');
		this._ammunitionWidth = this.textWidth(text) + 16;
	};

})();