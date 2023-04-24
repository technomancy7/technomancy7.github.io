/*:
-------------------------------------------------------------------------
@title Toggle-able States
@author Hime --> HimeWorks (http://himeworks.com)
@date Dec 2, 2015
@filename HIME_ToggleableStates.js
@url http://himeworks.com/2015/11/toggle-able-states/

If you enjoy my work, consider supporting me on Patreon!

https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

Main Website: http://himeworks.com
Facebook: https://www.facebook.com/himeworkscom/
Twitter: https://twitter.com/HimeWorks
Youtube: https://www.youtube.com/c/HimeWorks
Tumblr: http://himeworks.tumblr.com/
-------------------------------------------------------------------------
@plugindesc If you try to add the state and the state is already added,
it will be removed instead.
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://www.youtube.com/watch?v=PESDHBV5V4A

Do you have a state that can be removed when you apply the same state?

For example, you use a state that adds a poison state, but when you
apply the same poison state, it will cancel out the existing poison state.

This plugin allows you to create toggleable states. When the state is added,
one of two things can happen

1. If the state does not exist, then it will be added
2. If the state exists, then it will be removed

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Dec 2, 2015
  - fixed bug where test did not return a value
Dec 1, 2015 
  - skills that add toggle-able states can be used even if state is added
Nov 17, 2015
  - initial release

== Usage ==

To specify that a state can be toggled, in your database go to the
states tab, find the state you want, and then write in its note-box

  <toggleable state>

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.ToggleableStates = 1;
TH.ToggleableStates = TH.ToggleableStates || {};

(function ($) {

  $.Regex = /<toggleable[-_ ]state>/i
  
  $.isToggleableState = function(stateId) {
    var state = $dataStates[stateId];
    if (state.isToggleable === undefined) {
      state.isToggleable = false;
      var res = $.Regex.exec(state.note);
      if (res) {
        state.isToggleable = true;
      }    
    }
    return state.isToggleable;
  }
  
  var TH_ToggleableStates_GameBattler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function(stateId) {
    if ($.isToggleableState(stateId) && this.isStateAffected(stateId)) {
      this.removeState(stateId);
    }
    else {
      TH_ToggleableStates_GameBattler_addState.call(this, stateId);
    }
  };
  
  /* Toggleable states need to be usable even if state is already added */
  var TH_ToggleableStates_Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
  Game_Action.prototype.testItemEffect = function(target, effect) {
    if (effect.code === Game_Action.EFFECT_ADD_STATE || effect.code === Game_Action.EFFECT_REMOVE_STATE) {
      console.log(effect.dataId);
      if ($.isToggleableState(effect.dataId)) {
        return true;
      }
    }
    return TH_ToggleableStates_Game_Action_testItemEffect.call(this, target, effect);
  };
})(TH.ToggleableStates);