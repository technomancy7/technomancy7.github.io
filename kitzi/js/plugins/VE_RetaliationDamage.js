/*
 * ==============================================================================
 * ** Victor Engine MV - Retaliation Damage
 * ------------------------------------------------------------------------------
 * Version History:
 *  v 1.00 - 2015.12.07 > First release.
 *  v 1.01 - 2015.12.21 > Compatibility with Basic Module 1.04.
 *  v 1.02 - 2016.03.18 > Improved counter attack timing.
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Retaliation Damage'] = '1.02';

var VictorEngine = VictorEngine || {};
VictorEngine.RetaliationDamage = VictorEngine.RetaliationDamage || {};

(function() {

	VictorEngine.RetaliationDamage.loadDatabase = DataManager.loadDatabase;
	DataManager.loadDatabase = function() {
		VictorEngine.RetaliationDamage.loadDatabase.call(this);
		PluginManager.requiredPlugin.call(PluginManager, 'VE - Retaliation Damage', 'VE - Basic Module', '1.15');
	};

	VictorEngine.RetaliationDamage.requiredPlugin = PluginManager.requiredPlugin;
	PluginManager.requiredPlugin = function(name, required, version) {
		if (!VictorEngine.BasicModule) {
			var msg = 'The plugin ' + name + ' requires the plugin ' + required;
			msg += ' v' + version + ' or higher installed to work properly.';
			msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
			throw new Error(msg);
		} else {
			VictorEngine.RetaliationDamage.requiredPlugin.call(this, name, required, version)
		};
	};
	
})();

/*:
 *------------------------------------------------------------------------------ 
 * @plugindesc v1.02 - Actions deals damage even when countered or relfected.
 * @author Victor Sant
 *
 * @param Damage on Counter
 * @desc All actions deals damage even when successfully countered.
 * true - ON	false - OFF
 * @default true
 *
 * @param Damage on Reflect
 * @desc All actions deals damage even when successfully reflected.
 * true - ON	false - OFF
 * @default false
 *
 * ------------------------------------------------------------------------------
 * @help 
 * ------------------------------------------------------------------------------
 * Actors, Classes, Skills, Items, Enemies, Weapons, Armors and States Notetags:
 * ------------------------------------------------------------------------------
 *
 *  <damage on counter>
 *  Objects with this tag will deal damage even when sucessfully countered.
 *
 * ---------------
 *
 *  <damage on reflect>
 *  Objects with this tag will deal damage even when sucessfully reflected.
 *
 * ------------------------------------------------------------------------------
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  If the object with the tag is a item or skill, it will only affect the 
 *  action itself. If the object is anything else, will have effect on all 
 *  actions of the battler assosciated with the object.
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
		VictorEngine.Parameters.RetaliationDamage = {};
		VictorEngine.Parameters.RetaliationDamage.DamageOnCounter = eval(parameters["Damage on Counter"]);
		VictorEngine.Parameters.RetaliationDamage.DamageOnReflect = eval(parameters["Damage on Reflect"]);
	};
	
	//=============================================================================
	// VictorEngine
	//=============================================================================

	VictorEngine.RetaliationDamage.loadNotetagsValues = VictorEngine.loadNotetagsValues;
	VictorEngine.loadNotetagsValues = function(data, index) {
		VictorEngine.RetaliationDamage.loadNotetagsValues.call(this, data, index);
		var list = ['actor', 'class', 'enemy', 'weapon', 'armor', 'state', 'skills'];
		if (this.objectSelection(index, list)) VictorEngine.RetaliationDamage.loadNotes(data);
	};

	VictorEngine.RetaliationDamage.loadNotes = function(data) {
		var regex1 = new RegExp('<damage on counter>', 'gi');
		var regex2 = new RegExp('<damage on reflect>', 'gi');
		data.damageOnCounter = !!data.note.match(regex1);
		data.damageOnReflect = !!data.note.match(regex2);
	};

	//=============================================================================
	// BattleManager
	//=============================================================================
	
	VictorEngine.RetaliationDamage.invokeAction = BattleManager.invokeAction;
	BattleManager.invokeAction = function(subject, target) {
		this._noCounterOnSubstitute = false;
		if (this.checkDamgeOnCounter(subject, target)) {
			this.invokeNormalAction(subject, target);
			this.invokeRetaliation(subject, target);
		} else {
			VictorEngine.RetaliationDamage.invokeAction.call(this, subject, target);
		}
	};

	VictorEngine.RetaliationDamage.applySubstitute = BattleManager.applySubstitute;
	BattleManager.applySubstitute = function(target) {
		var substitute = VictorEngine.RetaliationDamage.applySubstitute.call(this, target);
		this._noCounterOnSubstitute = target !== substitute;
		return substitute;
	};

	BattleManager.invokeRetaliation = function(subject, target) {
		if (target.canMove() && !this._noCounterOnSubstitute) {
			if (Math.random() < this._action.itemCnt(target)) {
				this.invokeCounterAttack(subject, target);
			} else if (Math.random() < this._action.itemMrf(target)) {
				this.invokeMagicReflection(subject, target);
			}
		}
	};
		
	BattleManager.checkDamgeOnCounter = function(subject, target) {
		var onCounter = VictorEngine.Parameters.RetaliationDamage.DamageOnCounter;
		var onReflect = VictorEngine.Parameters.RetaliationDamage.DamageOnReflect;
		if (onCounter && onReflect) return true;
		if (this._action.item().damageOnCounter) return true;
		if (this._action.item().damageOnReflect) return true;
		if (this.getDamgeOnReflect(subject)) return true;
		if (this.getDamgeOnCounter(subject)) return true;
		if (onCounter && !onReflect && this._action.itemMrf(target) === 0) return true;
		if (onReflect && !onCounter && this._action.itemCnt(target) === 0) return true;
		return false;
	};

	BattleManager.getDamgeOnCounter = function(subject) {
		return subject.traitObjects().some(function(data) {
			return data.damageOnCounter;
		}, this);
	};
	
	BattleManager.getDamgeOnReflect = function(subject) {
		return subject.traitObjects().some(function(data) {
			return data.damageOnReflect;
		}, this);
	};
	
})(); 