/*:
-------------------------------------------------------------------------
@title Sideview Actor Enemy Weapons
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Dec 7, 2015
@filename HIME_SideviewActorEnemyWeapons.js
@url http://himeworks.com/2015/11/sideview-enemy-actors/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.2 - This is an add-on for Sideview Actor Enemies that allows
you to display enemy weapons and enemy weapon animations.
@help 
-------------------------------------------------------------------------------
== Description ==

This is an add-on for Sideview Actor Enemies that allows you to
display enemy weapons and enemy weapon animations.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.1 Dec 7, 2015
  * display plugin loading error
1.0 Nov 21, 2015
  * initial release

== Required ==

* Sideview Actor Enemies
  http://himeworks.com/2015/11/sideview-enemy-actors/
  
* Enemy Equips
  http://himeworks.com/2015/11/enemy-equips/

== Usage ==

Plug and play.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.SideviewActorEnemyWeapons = 1;
TH.SideviewActorEnemyWeapons = TH.SideviewActorEnemyWeapons || {};

(function ($) {
  
  var TH_PluginManager_checkErrors = PluginManager.checkErrors;
  PluginManager.checkErrors = function() {
    if (!Imported["EnemyEquips"]) {
      throw new Error("Sideview Actor Enemy Weapons requires 'Enemy Equips' plugin to be installed above");
    }
    if (!Imported["SideviewActorEnemies"]) {
      throw new Error("Sideview Actor Enemy Weapons requires 'Sideview Actor Enemies' plugin to be installed above");
    }
    TH_PluginManager_checkErrors.call(this);
  };
  
  /* Copied from Game_Actor */
  Game_Enemy.prototype.performAttack = function() {
    var weapons = this.weapons();
    var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
      if (attackMotion.type === 0) {
          this.requestMotion('thrust');
      } else if (attackMotion.type === 1) {
          this.requestMotion('swing');
      } else if (attackMotion.type === 2) {
          this.requestMotion('missile');
      }
      this.startWeaponAnimation(attackMotion.weaponImageId);
    }
  }
  
  /* Copied from Game_Actor */
  var TH_GameEnemy_performDamage = Game_Enemy.prototype.performDamage;
  Game_Enemy.prototype.performDamage = function() {
    if (this.useSVActorSprite()) {
      Game_Actor.prototype.performDamage.call(this);
    }
    else {
      TH_GameEnemy_performDamage.call(this);
    }
  };
  
  var TH_WindowBattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
  Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
    if (subject.useSVActorSprite()) {
      this.showActorAttackAnimation(subject, targets);
    }
    else {
      TH_WindowBattleLog_showEnemyAttackAnimation.call(this, subject, targets);
    }
  };
})(TH.SideviewActorEnemyWeapons);