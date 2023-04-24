/*
 * ==============================================================================
 * ** Victor Engine MV - Battler Graphic Setup
 * ------------------------------------------------------------------------------
 * VE_BattlerGraphicSetup.js
 * ==============================================================================
 */

var Imported = Imported || {};
Imported['VE - Battler Graphic Setup'] = '1.09';

var VictorEngine = VictorEngine || {};
VictorEngine.BattlerGraphicSetup = VictorEngine.BattlerGraphicSetup || {};

(function() {

    VictorEngine.BattlerGraphicSetup.loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        VictorEngine.BattlerGraphicSetup.loadDatabase.call(this);
        PluginManager.requiredPlugin.call(PluginManager, 'VE - Battler Graphic Setup', 'VE - Basic Module', '1.21');
        PluginManager.requiredPlugin.call(PluginManager, 'VE - Battler Graphic Setup', 'VE - Battle Advantage');
        PluginManager.requiredPlugin.call(PluginManager, 'VE - Battler Graphic Setup', 'VE - State Graphics');
    };

    VictorEngine.BattlerGraphicSetup.requiredPlugin = PluginManager.requiredPlugin;
    PluginManager.requiredPlugin = function(name, required, version) {
        if (!VictorEngine.BasicModule) {
            var msg = 'The plugin ' + name + ' requires the plugin ' + required;
            msg += ' v' + version + ' or higher installed to work properly.';
            msg += ' Go to http://victorenginescripts.wordpress.com/ to download the plugin.';
            throw new Error(msg);
        } else {
            VictorEngine.BattlerGraphicSetup.requiredPlugin.call(this, name, required, version)
        };
    };

})();

/*:
 * ==============================================================================
 * @plugindesc v1.09 - Use different models for battler graphics.
 * @author Victor Sant
 *
 * @param Actor Sprite Mode
 * @desc The default sprite mode for actors.
 * Animated, Static or Charset (details on the plugin help)
 * @default Animated
 *
 * @param Enemy Sprite Mode
 * @desc The default sprite mode for enemies.
 * Animated, Static or Charset (details on the plugin help)
 * @default Static
 *
 * @param Enemy Graphic Sufix
 * @desc Adds a sufix for enemies battler filename.
 * (leave blank for no sufix, details on the plugin help)
 * @default 
 *
 * @param Mirror Animations
 * @desc Mirror skill animation if the user is facing right.
 * true - ON    fase - OFF
 * @default true
 *
 * @param Animated Enemy State
 * @desc Mirror skill animation if the user is facing right.
 * Default: icon   (icon or overlay, leave blank for no display)
 * @default icon
 *
 * @param == Custom Frames ==
 * @default ==============================
 *
 * @param Actor Frame Setup
 * @desc Frame pattern setup for actors.
 * Leave empty for default. (details on the plugin help)
 * @default @@
 *
 * @param Enemy Frame Setup 
 * @desc Frame pattern setup for enemies.
 * Leave empty for default. (details on the plugin help)
 * @default @@
 *
 * @param == Motion Setup ==
 * @default ==============================
 *
 * @param Idle Motion Setup
 * @desc Idle motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 1, loop: true, speed: 12
 *
 * @param Walk Motion Setup
 * @desc Walk motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 2, loop: true, speed: 12
 *
 * @param Wait Motion Setup
 * @desc Wait motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 2, loop: true, speed: 12
 *
 * @param Chant Motion Setup
 * @desc Chant motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 3, loop: true, speed: 12
 *
 * @param Guard Motion Setup
 * @desc Guard motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 4, loop: true, speed: 12
 *
 * @param Damage Motion Setup
 * @desc Damage motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 5, loop: false, speed: 12
 *
 * @param Evade Motion Setup
 * @desc Evade motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 6, loop: true, speed: 12
 *
 * @param Thrust Motion Setup
 * @desc Thrust motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 7, loop: false, speed: 12
 *
 * @param Swing Motion Setup
 * @desc Swing motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 8, loop: false, speed: 12
 *
 * @param Missile Motion Setup
 * @desc Missile motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 9, loop: false, speed: 12
 *
 * @param Skill Motion Setup
 * @desc Skill motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 10, loop: false, speed: 12
 *
 * @param Spell Motion Setup
 * @desc Spell motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 11, loop: false, speed: 12
 *
 * @param Item Motion Setup
 * @desc Item motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 12, loop: false, speed: 12
 *
 * @param Escape Motion Setup
 * @desc Escape motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 13, loop: true, speed: 12
 *
 * @param Return Motion Setup
 * @desc Return motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 13, loop: true, speed: 12
 *
 * @param Victory Motion Setup
 * @desc Victory motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 14, loop: true, speed: 12
 *
 * @param Dying Motion Setup
 * @desc Dying motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 15, loop: true, speed: 12
 *
 * @param Abnormal Motion Setup
 * @desc Abnormal motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 16, loop: true, speed: 12
 *
 * @param Sleep Motion Setup
 * @desc Sleep motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 17, loop: true, speed: 12
 *
 * @param Dead Motion Setup
 * @desc Dead motion setting. (details on the plugin help)
 * Leave empty to use the default setup.
 * @default index: 18, loop: true, speed: 12
 *
 * ==============================================================================
 * @help 
 * ==============================================================================
 *  Notetags:
 * ==============================================================================
 *
 * ==============================================================================
 *                 IMPORTANT!  IMPORTANT!  IMPORTANT!  IMPORTANT    
 *  The brackets on the notetags setups are there to represent that the value is 
 *  optional, do not added the brackets itself on the setup.
 * ==============================================================================
 *
 * ==============================================================================
 *  Sprite Motion (notetag for Actors and Enemies)
 * ------------------------------------------------------------------------------
 *  <sprite motion: 'filename'>
 *   idle:     index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   walk:     index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   wait:     index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   chant:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   guard:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   damage:   index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   evade:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   thrust:   index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   swing:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   missile:  index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   skill:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   spell:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   item:     index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   escape:   index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   return:   index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   victory:  index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   dying:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   abnormal: index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   sleep:    index: X, loop: X, speed: X[, frames: X][, direction: X]
 *   dead:     index: X, loop: X, speed: X[, frames: X][, direction: X]
 *  </sprite motion>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  This tag allows you to setup a different motion setting for the battler
 *  when using an specific filename. This setting applies only when the battler
 *  filename matches the 'filename' on this setup. As such you can add different
 *  setups for different graphics. If the names doesn't match the default motion
 *  setup will be used. This tag is valid for battlers using the 'Animated' and
 *  'Charset' modes (see bellow).
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  - Filename
 *  The filename of the battler what will use this setup. The setting will be
 *  applied only when the battler graphic filename matches the file. The
 *  filename must be always inside quotations.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  - Motions
 *  Inside the tag you must list the motions that will be changed. A motion that
 *  won't have it's values changed don't need to be added. Each motion can have 
 *  5 values: index, loop, speed, frames and direction.
 *    index: X     : the motion Index. Numeric. (see bellow for details)
 *    loop: X      : repeat motion continuously. (see bellow for details)
 *    speed: X     : frame update frenquency. Numeric. (see bellow for details)
 *    frames: X    : number of frames. Numeric. (see bellow for details)
 *    direction: X : valid only for the 'Charset Mode' (see bellow). Use the
 *                   charset direction for the motion instead of facing the
 *                   opponents.
 *
 *  The motion index is the pose used for the motion. It's based on the grid of 
 *  the battler graphic. Must be a numeric value starting from 1. 
 *  This is not valid for the 'Charset Mode'.
 *
 *  The loop defines how the battler motion will behave when it ends. It can
 *  be one of three values: true, false or once.
 *    true  : the motion will repeat continuously.
 *    false : the motion will not repeat, changing to an idle motion at the end.
 *    once  : the motion will not repeat, keeping the display of the last frame.
 *
 *  The motion speed is the frequency the motion frame is updated, higher values
 *  makes it slower. 
 * ==============================================================================
 * 
 * ==============================================================================
 *  Damaged Charset (notetag for Actors and Enemies)
 * ------------------------------------------------------------------------------
 *  <damaged charset: 'filename', index, direction>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  This notetag is valid only if the battler is using the charset mode (see 
 *  bellow for details). This will set a 'damaged' pose for when the battler
 *  is under a state with the 'dead' or 'sleep' motions. If this setup is not
 *  set, it will display the charset according to the motion setup. (wich
 *  does not include a way to display them fallen)
 *    filename  : filename of the charset. Must be always inside quotations.
 *    index     : index of the charset on the character sheet. (0-7)
 *    direction : direction of charset. Must be down, left, right or up.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Ex.: <damaged charset: 'Damage1', 0, down>  // Harold
 *       <damaged charset: 'Damage1', 1, up>    // Therese
 *       <damaged charset: 'Damage1', 5, up>    // Marsha
 *       <damaged charset: 'Damage1', 3, right> // Lucius
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  The damaged poses charset generally comes with various characters at each
 *  sheet, each in one direction. The examples above shows the damaged charset
 *  for each of the default characters.
 * ==============================================================================
 * 
 * ==============================================================================
 *  Hide Shadows (notetag for Actors and Enemies)
 * ------------------------------------------------------------------------------
 *  <hide shadows>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Hide the shadow graphic display for 'Animated Mode' and 'Charset mode'
 *  (see bellow) battler graphics.
 * ==============================================================================
 * 
 * ==============================================================================
 *  Charset Index (notetag for Enemies)
 * ------------------------------------------------------------------------------
 *  <charset index: X>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Setup the index of the charset battler when using the Charset Mode.
 *    x : charset index
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Ex.: <charset index: 1>
 *       <charset index: 3>
 * ==============================================================================
 * 
 * ==============================================================================
 *  Enemy Weapons (notetag for Enemies)
 * ------------------------------------------------------------------------------
 *  <enemy weapons: X[, X]>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Setup a weapon for the enemy to be displayed with the attack motions.
 *  valid only if the battler is using the Animated Mode or Charset Mode.
 *    x : weapon Id.
 *  You can add a second weapon Id for dual wield.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Ex.: <enemy weapons: 2>
 *       <enemy weapons: 4, 12>
 * ==============================================================================
 * 
 * ==============================================================================
 *  Attack Animation (notetag for Enemies)
 * ------------------------------------------------------------------------------
 *  <attack animation: X>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Setup an attack animation for the enemy to be displayed if it don't have
 *  weapons.
 *    x : animation Id.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Ex.: <attack animation: 1>
 *       <attack animation: 15>
 * ==============================================================================
 * 
 * ==============================================================================
 *  Motion Speed (notetag for States)
 * ------------------------------------------------------------------------------
 *  <motion speed: X>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Changes the update frequency for idle motions. This doesn't affect motions
 *  that aren't idle, such as the attack motions. This can be used to create
 *  states such as 'slow' or 'haste'. The speed is multiplied by this value. 
 *  Using a value between 0 and 1 will make it faster, and using a value above
 *  1 will make it slower. For example a value of 0.5 will double the speed.
 *    x : frequency change. Numeric. Can be decimal.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  Ex.: <motion speed: 0.5>
 *       <motion speed: 1.5>
 * ==============================================================================
 * 
 * ==============================================================================
 *  State Motion (notetag for States)
 * ------------------------------------------------------------------------------
 *  <state motion: setup>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  This motion will be used as idle motion for the battler while it is
 *  affected by the state.
 *  The setup should follow this pattern:
 *  index: X, priority: X, loop: X, speed: X[, frames: X][, direction: X]
 *   index: X     : the motion Index. Numeric. (see bellow for details)
 *   priority X   : wich idle motion have higher priority over. Numeric.
 *   loop: X      : repeat motion continuously. (see bellow for details)
 *   speed: X     : motion update frenquency. Numeric. (see bellow for details)
 *   frames: X    : number of frames. Numeric. (see bellow for details)
 *   direction: X : valid only for the 'Charset Mode' (see bellow). Use the
 *                  charset direction for the motion instead of facing the
 *                  opponents.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: <state motion: index: 4, priority: 10, loop: true>
 *       <state motion: index: 12, priority: 5, loop: true, speed: 8>
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  The motion index is the pose used for the motion. It's based on the grid of 
 *  the battler graphic. Must be a numeric value starting from 1. 
 *  This is not valid for the 'Charset Mode'.
 *
 *  The loop defines how the battler motion will behave when it ends. It can
 *  be one of three values: true, false or once.
 *    true  : the motion will repeat continuously.
 *    false : the motion will not repeat, changing to an idle motion at the end.
 *    once  : the motion will not repeat, keeping the display of the last frame.
 *
 *  The motion speed is the frequency the motion frame is updated, higher values
 *  makes it slower. 
 *  
 *  The priority decides wich motions this state motion will have higher priority
 *  over. The priority must be a value between 0 and 3.
 *   0 : the motion will replace the 'idle' and 'wait' motions.
 *   1 : the motion will replace the 'abdnormal' and 'dying' motions.
 *   2 : the motion will replace the 'guard' and 'chant' motions.
 *   3 : the motion will replace the 'sleep' and 'victory' motions.
 *  For example, if the motion priority is 1, even if the battler is dying
 *  the state motion will be displayed. But if the battler start casting a spell
 *  then the chanting pose will be displayed.
 * ==============================================================================
 * 
 * ==============================================================================
 *  Plugin Commands
 * ------------------------------------------------------------------------------
 *
 *  You can use v[id] on the instead of a numeric value to get the value from 
 *  the variable with the id set. For example, v[3] will get the value from the
 *  variable id 3.
 *
 * ------------------------------------------------------------------------------
 *  ChangeDamagedCharset actor filename index direction
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Changes the damaged charset for the actor battlerwhen using the chasert
 *  mode (see bellow).
 *    actor     : actor Id.
 *    filename  : filename of the charset. Must be always inside quotations.
 *    index     : index of the charset on the character sheet. (0-7)
 *    direction : direction of charset. Must be down, left, right or up.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Ex.: ChangeDamagedCharset 1 Damage1 0 down   // Harold
 *       ChangeDamagedCharset 2 Damage1 1 up     // Therese
 *       ChangeDamagedCharset 3 Damage1 5 up     // Marsha
 * ==============================================================================
 * 
 * ==============================================================================
 * Additional Information:
 * ------------------------------------------------------------------------------
 * 
 *  - The Battlers Modes
 *  There are 3 possible modes for the battlers: static, animated and charset.
 *    static   : the mode used by default by monsters.
 *    animated : the mode used by default by [SV] actors.
 *    charset  : uses a map charset instead of a battler graphic.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Setting the Battler Mode
 *  There are two ways to setup the battler modes: on the Plugin Parameters 
 *  ('Actor Sprite Mode' and 'Enemy Sprite Modeand') and with a prefix on the
 *  battler graphic filename.
 *  Since setup is made by the Plugin Parameters and the prefixes, it can be 
 *  applied to actors and enemies alike. So you can have animated enemies and 
 *  static actors, for example.
 *
 *  The Plugin Parameters set the default mode for the battlers of actors and 
 *  enemies. Any battler that don't have a prefix, will be automatically from
 *  the default mode set on the Plugin Parameters.
 *
 *  To have a battler to use a different mode from the default, you need to
 *  assign a prefix to the battler filename. The prefixes are:
 *    $ : for static battlers. 
 *    % : for animated battlers.
 *    ! : for charset battlers.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Static Mode
 *  Battlers on the 'static mode' don't have any type of animation and can't
 *  use any type of custom model. If the default mode for the battler is not
 *  'static', you need to add the prefix '$' to it's filename.
 *    Ex.: $Bat
 *         $Slime
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Animated Mode
 *  Battlers with the animated mode follows the default RPG Maker [SV] actors
 *  model and motion settings. If the default mode for the battler is not
 *  'animated', you need to add the prefix '%' to it's filename.
 *    Ex.: %Actor1_1
 *         %Package1_1
 *  You can assign a custom model rather than use the default model for
 *  [SV] actors, see bellow for details.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Charset Mode
 *  Battlers with the charset mode will use map charset as their battler graphic.
 *  If the default mode for the battler is not 'charset', you need to add the
 *  prefix '!' to it's filename.
 *    Ex.: !Actor1
 *         !Monster
 *  When assigned to enemies, it will use the current graphic as battler (the
 *  charset graphic must be on the 'enemies' or 'sv_enemies' folder) and it will
 *  *ALWAYS* use the charset on the index 0.
 *  When assigned to actors, the battler will use the current actor charset
 *  graphic and not use the battler graphic (for actors, consider the battler
 *  graphic just a 'flag')
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Actor Frame Setup and Enemy Frame Setup.
 *  Battlers with the 'animated mode' can use a model different from the 
 *  default RPG Maker MV model for [SV] actors. You can set default values
 *  on the Plugin Paramers 'Actor Frame Setup' and 'Enemy Frame Setup' or assign
 *  it individually for the battler graphic by adding a specific sufix.
 *
 *  The setup Plugin Parameter setup is done adding the following values:
 *  frames, motions, columns, adjust, weapons
 *    frames  : number of frame of each motion. Numeric.
 *    motions : number of motions available. Use a number divisible by the number
 *              of colmuns to avoid graphics glitchs. Numeric.
 *    columns : number of colmuns the motions will be split. Numeric.
 *    adjust  : y axis postion adjust. Numeric.
 *    weapon  : display weapons montions. true or false.
 *
 *  For example, the default RPG Maker MV model for [SV] actors is:
 *    3, 18, 3, 0, true
 *    - each motion has 3 frames.
 *    - the graphic has 18 motions.
 *    - the motions are divided on 13.
 *    - no position adjust.
 *    - the weapon motion is displayed.
 *
 *  You can make individual setup for each file by adding a sufix with the
 *  follwing values (don't use whitespaces on this setup):
 *  [frames,motions,columns,adjust,weapons]
 *
 *  For example, the default RPG Maker MV model for [SV] actors is:
 *    Actor1_1[3,18,3,0,true]
 *    
 *  This is a setup to use the 'Holder' battler model:
 *    Holder[4,14,1,0,false]
 *    - each motion has 4 frames.
 *    - the graphic has 14 motions.
 *    - there is only one column
 *    - no position adjust.
 *    - the weapon motion is not displayed.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Motion Setup
 *  On the Plugin Parameters you can setup the default value for each motion.
 *  Each motion can have 5 values: index, loop, speed, frames and direction.
 *     index: X     : the motion Index. Numeric. (see bellow for details)
 *     loop: X      : repeat motion continuously. (see bellow for details)
 *     speed: X     : frame update frenquency. Numeric. (see bellow for details)
 *     frames: X    : number of frames. Numeric. (see bellow for details)
 *     direction: X : Use the charset direction for the motion instead of facing
 *                    the opponents. Only for the 'Charset Mode'. 
 *
 *  The motion index is the pose used for the motion. It's based on the grid of 
 *  the battler graphic. Must be a numeric value starting from 1. 
 *  This is not valid for the 'Charset Mode'.
 *
 *  The loop defines how the battler motion will behave when it ends. It can
 *  be one of three values: true, false or once.
 *    true  : the motion will repeat continuously.
 *    false : the motion will not repeat, changing to an idle motion at the end.
 *    once  : the motion will not repeat, keeping the display of the last frame.
 *
 *  The motion speed is the frequency the motion frame is updated, higher values
 *  makes it slower. 
 *
 *  The motion frames is how many frames that motion will have. You can set a
 *  motion with less frames that the max number of frames. For example, an idle
 *  pose with a single frame. If not set, the frame number will be the same
 *  as the max frames for the battler.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Graphics and Folders
 *  The folder for each graphic do not change. Enemy graphics should be still
 *  placed on the 'img/enemies/' folder (if the sideview mode is OFF) or on the
 *  'img/sv_enemies' (if the sideview mode is ON). Actors graphics should be
 *  placed always on the folder 'img/sv_actors'
 *
 *  Static graphics should be facing right, while animated graphics should be
 *  facing left, no matter if they are meant for actors or enemies. The plugin
 *  will fix their directions accordinally.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  - Enemy Graphic Sufix
 *  To make the enemy graphics placement on the database troops easier when using
 *  big sprites, you can setup a sufix for enemy graphics. By doing this you will
 *  need two different sprites for each enemy: one without the sufix and another
 *  with the sufix. The graphic without the sufix is the one that you will set on
 *  the database, the one witht the sufix will be the one displayed in-game.
 *  
 *  For example, if you set the parameter 'Enemy Graphic Sufix' to '[battle]' and
 *  have a battler named 'Slime' you will need two files.
 *    One named 'Slime'
 *    One named 'Slime[battle]'
 *  The file named 'Slime' can be a static battler, that you can use to place
 *  the enemy on the troops in the database. The file named 'Slime_battle' can
 *  be animated with several frames, this will be displayed only in-game.
 *
 *  The graphic sufix should be placed *after* the Frame setup sufix.
 *    Wrong: 'Slime[battle][4,14,1,0,false]'
 *    Right: 'Slime[4,14,1,0,false][battle]'
 *
 *  When used together with the plugin 'VE - State Graphics' the state graphic
 *  sufix should be placed after all the graphic setup sufixes.
 *    Wrong: 'Slime[state][4,14,1,0,false][battle]'
 *    Right: 'Slime[4,14,1,0,false][battle][state]'       
 *
 *  If not using sufixes, you migth have issues to position enemies on the troops
 *  at the databse.
 *
 *  The sufix setup works only for the 'animated mode', the charset and static
 *  modes ignores this setup.
 *
 * ==============================================================================
 * 
 * ==============================================================================
 *  Example Sprite Motions:
 * ------------------------------------------------------------------------------
 *
 *  <sprite motion: '%Holder[4,14,1,0,false]'>
 *   idle:     index: 1,  loop: true,  speed: 12
 *   walk:     index: 9,  loop: true,  speed: 12
 *   wait:     index: 1,  loop: true,  speed: 12
 *   chant:    index: 1,  loop: true,  speed: 12
 *   guard:    index: 2,  loop: true,  speed: 12
 *   damage:   index: 4,  loop: false, speed: 12
 *   evade:    index: 2,  loop: true,  speed: 12
 *   thrust:   index: 5,  loop: false, speed: 6
 *   swing:    index: 5,  loop: false, speed: 6
 *   missile:  index: 5,  loop: false, speed: 6
 *   skill:    index: 5,  loop: false, speed: 6
 *   spell:    index: 8,  loop: false, speed: 12
 *   item:     index: 6,  loop: false, speed: 12
 *   escape:   index: 10, loop: true,  speed: 12
 *   return:   index: 10, loop: true,  speed: 12
 *   victory:  index: 11, loop: false, speed: 12
 *   dying:    index: 3,  loop: true,  speed: 12
 *   abnormal: index: 3,  loop: true,  speed: 12
 *   sleep:    index: 13, loop: true,  speed: 12
 *   dead:     index: 13, loop: true,  speed: 12
 *  </sprite motion>
 *  Motion setup for a battler named '%Holder[4,14,1,0,false]'. This battler use a
 *  custom model with 4 frames, 14 poses, 1 column, no adjust and no weapons.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  <sprite motion: '!Actor1'>
 *   idle:     loop: false, speed: 6
 *   walk:     loop: true,  speed: 6
 *   wait:     loop: false, speed: 6
 *   chant:    loop: true,  speed: 12
 *   guard:    loop: true,  speed: 12
 *   damage:   loop: false, speed: 6
 *   evade:    loop: false, speed: 6
 *   thrust:   loop: false, speed: 12
 *   swing:    loop: false, speed: 12
 *   missile:  loop: false, speed: 12
 *   skill:    loop: false, speed: 12
 *   spell:    loop: false, speed: 6
 *   item:     loop: false, speed: 6
 *   escape:   loop: true,  speed: 6
 *   return:   loop: true,  speed: 9
 *   victory:  loop: true,  speed: 12, direction: down
 *   dying:    loop: true,  speed: 6
 *   abnormal: loop: true,  speed: 6
 *   sleep:    loop: false, speed: 6,  direction: up
 *   dead:     loop: false, speed: 6,  direction: up
 *  </sprite motion>
 *  Motion setup for a battler named '!Actor1'. This battler have the prefix '!'
 *  wich means this is a charset battler. If this battlers is assigned to an
 *  actor, it will use the actor map charset instead of the graphic assigned.
 *
 * ==============================================================================
 *
 * ==============================================================================
 *  Compatibility:
 * ------------------------------------------------------------------------------
 *  To be used together with this plugin, the following plugins must be placed
 *  bellow this plugin:
 *    VE - Battle Advantage
 *    VE - State Graphics
 * ==============================================================================
 * 
 * ==============================================================================
 *  Version History:
 * ------------------------------------------------------------------------------
 *  v 1.00 - 2016.02.26 > First release.
 *  v 1.01 - 2016.02.29 > Minor bug fixes.
 *  v 1.02 - 2016.03.12 > Added individual motion frame setup.
 *                      > Fixed issue with wrong frame display.
 *  v 1.03 - 2016.03.15 > Added plugin parameter to mirror animations.
 *  v 1.04 - 2016.03.23 > Added <attack animation> tag for enemies.
 *  v 1.05 - 2016.03.29 > Fixed issues with 'Actor Frame Setup'.
 *  v 1.06 - 2016.04.01 > Added new looping mode.
 *  v 1.07 - 2016.04.22 > Fixed issue with dead motion.
 *  v 1.08 - 2016.05.10 > Fixed issue with sprite Y offset.
 *  v 1.09 - 2016.05.31 > Compatibility with Battle Motions.
 *                      > Added enemy gtaphic sufix.
 * ==============================================================================
 */

(function() {

    //=============================================================================
    // Parameters
    //=============================================================================

    if (Imported['VE - Basic Module']) {
        var parameters = VictorEngine.getPluginParameters();
        VictorEngine.Parameters = VictorEngine.Parameters || {};
        VictorEngine.Parameters.BattlerGraphicSetup = {};
        VictorEngine.Parameters.BattlerGraphicSetup.ActorFrames = String(parameters["Actor Frame Setup"]).trim();
        VictorEngine.Parameters.BattlerGraphicSetup.EnemyFrames = String(parameters["Enemy Frame Setup"]).trim();
        VictorEngine.Parameters.BattlerGraphicSetup.ActorSprite = String(parameters["Actor Sprite Mode"]).trim();
        VictorEngine.Parameters.BattlerGraphicSetup.EnemySprite = String(parameters["Enemy Sprite Mode"]).trim();
        VictorEngine.Parameters.BattlerGraphicSetup.EnemySufix = String(parameters["Enemy Graphic Sufix"]).trim();
        VictorEngine.Parameters.BattlerGraphicSetup.EnemyState = String(parameters["Animated Enemy State"]).trim();
        VictorEngine.Parameters.BattlerGraphicSetup.MirrorAnim = eval(parameters["Mirror Animations"]);
        VictorEngine.Parameters.BattlerGraphicSetup.MotionSetup = parameters;
    }

    //=============================================================================
    // VictorEngine
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.loadParameters = VictorEngine.loadParameters;
    VictorEngine.loadParameters = function() {
        VictorEngine.BattlerGraphicSetup.loadParameters.call(this);
        VictorEngine.BattlerGraphicSetup.processParameters();
    };

    VictorEngine.BattlerGraphicSetup.loadNotetagsValues = VictorEngine.loadNotetagsValues;
    VictorEngine.loadNotetagsValues = function(data, index) {
        VictorEngine.BattlerGraphicSetup.loadNotetagsValues.call(this, data, index);
        if (this.objectSelection(index, ['actor', 'enemy'])) {
            VictorEngine.BattlerGraphicSetup.loadNotes1(data);
        }
        if (this.objectSelection(index, ['state'])) {
            VictorEngine.BattlerGraphicSetup.loadNotes2(data);
        }
    };

    VictorEngine.BattlerGraphicSetup.processParameters = function() {
        if (!this.loaded) {
            this.loaded = true;
            var parameters = VictorEngine.Parameters.BattlerGraphicSetup;
            this.processFramesSetup(parameters.ActorFrames, 'actorFrames');
            this.processFramesSetup(parameters.EnemyFrames, 'enemyFrames');
            this.processMotionSetup();
            this.processSpritesMode();
        }
    };

    VictorEngine.BattlerGraphicSetup.loadNotes1 = function(data) {
        data.spriteMotion = data.spriteMotion || {};
        data.stateMotion = data.stateMotion || {};
        data.enemyWeapons = data.enemyWeapons || [];
        this.processNotes1(data);
    };

    VictorEngine.BattlerGraphicSetup.loadNotes2 = function(data) {
        data.stateMotion = data.stateMotion || {};
        this.processNotes2(data);
    };

    VictorEngine.BattlerGraphicSetup.processFramesSetup = function(setup, type) {
        var match;
        var result;
        var part1 = '(\\d+)[ ]*,[ ]*(\\d+)[ ]*,[ ]*';
        var part2 = '(\\d+)(?:[ ]*,[ ]*([+-]?\\d+))?(?:[ ]*,[ ]*(true|false))?';
        var regex = new RegExp(part1 + part2, 'gi');
        while (match = regex.exec(setup)) {
            result = {};
            result.frames = Number(match[1]) || 1;
            result.poses = Number(match[2]) || 1;
            result.columns = Number(match[3]) || 1;
            result.adjust = Number(match[4]) || 0;
            result.weapon = match[5] && match[5].toLowerCase() === 'true';
        };
        VictorEngine.BattlerGraphicSetup[type] = result;
    };

    VictorEngine.BattlerGraphicSetup.processMotionSetup = function() {
        var motions = Object.keys(Sprite_Actor.MOTIONS).concat('idle', 'return');
        motions.forEach(function(motion) {
            this.setupMotion(motion)
        }, this);
    };

    VictorEngine.BattlerGraphicSetup.setupMotion = function(motion) {
        var name = VictorEngine.captalizeText(String(motion)) + ' Motion Setup';
        var setup = VictorEngine.Parameters.BattlerGraphicSetup.MotionSetup[name].trim();
        var result = this.processMotionValues(setup, {});
        if ((result.index || result.index === 0) && (result.loop || result.loop === 0)) {
            Sprite_Actor.MOTIONS[motion] = result;
        } else if (!Sprite_Actor.MOTIONS[motion] && motion === 'return') {
            Sprite_Actor.MOTIONS[motion] = Sprite_Actor.MOTIONS.escape;
        } else if (!Sprite_Actor.MOTIONS[motion]) {
            Sprite_Actor.MOTIONS[motion] = Sprite_Actor.MOTIONS.walk;
        }
    };

    VictorEngine.BattlerGraphicSetup.processSpritesMode = function() {
        this.actorSprite = VictorEngine.Parameters.BattlerGraphicSetup.ActorSprite.toLowerCase();
        this.enemySprite = VictorEngine.Parameters.BattlerGraphicSetup.EnemySprite.toLowerCase();
        if (!['animated', 'charset', 'static'].contains(this.actorSprite)) {
            this.actorSprite = 'animated';
        }
        if (!['animated', 'charset', 'static'].contains(this.actorSprite)) {
            this.enemySprite = 'static';
        }
    };

    VictorEngine.BattlerGraphicSetup.processNotes1 = function(data) {
        var match;
        var part1 = "('[^\']+'|\"[^\"]+\")";
        var part2 = '[ ]*,[ ]*(\\d+)[ ]*,[ ]*(down|left|right|up)'
        var regex1 = VictorEngine.getNotesValues('sprite motion[ ]*:[ ]*' + part1, 'sprite motion');
        var regex2 = new RegExp('<damaged charset[ ]*:[ ]*' + part1 + part2 + '[ ]*>', 'gi');
        var regex3 = new RegExp('<enemy weapons[ ]*:[ ]*((?:\\d+[ ]*,?[ ]*)+)[ ]*>', 'gi');
        var regex4 = new RegExp('<attack animation[ ]*:[ ]*(\\d+)[ ]*>', 'gi');
        var regex5 = new RegExp('<charset index[ ]*:[ ]*(\\d+)[ ]*>', 'gi');
        var regex6 = new RegExp('<hide shadows>', 'gi');
        while (match = regex1.exec(data.note)) {
            this.processValues(data.spriteMotion, match);
        };
        while (match = regex2.exec(data.note)) {
            this.processDamaged(data.stateMotion, match);
        };
        while (match = regex3.exec(data.note)) {
            this.processWeapons(data.enemyWeapons, match);
        };
        while (match = regex4.exec(data.note)) {
            data.attackAnimation = Number(match[1]);
        };
        while (match = regex5.exec(data.note)) {
            data.charsetIndex = Number(match[1]);
        };
        data.hideBattlerShadow = !!regex6.exec(data.note)
    };

    VictorEngine.BattlerGraphicSetup.processValues = function(data, match) {
        result = {};
        var value;
        var regex = new RegExp('(\\w+)[ ]*:((?:[ ]*\\w+[ ]*:[ ]*\\w+[ ]*,?)*)', 'gi');
        while (value = regex.exec(match[2])) {
            result[value[1]] = this.processMotionValues(value[2].trim(), {});
        };
        data[match[1].slice(1, -1)] = result;
    };

    VictorEngine.BattlerGraphicSetup.processNotes2 = function(data) {
        var match;
        var regex1 = new RegExp('<state motion[ ]*:((?:[ ]*\\w+[ ]*:[ ]*\\w+[ ]*,?){1,4})', 'gi');
        var regex2 = new RegExp('<motion speed[ ]*:[ ]*([.\\d]+)[ ]*>', 'gi')
        while (match = regex1.exec(data.note)) {
            var result = {
                index: 0,
                loop: 'true',
                speed: 12,
                priority: 0
            };
            data.stateMotion.motion = this.processMotionValues(match[1].trim(), result);
        };
        while (match = regex2.exec(data.note)) {
            data.stateMotion.motionSpeed = Number(match[1]);
        };
    };

    VictorEngine.BattlerGraphicSetup.processMotionValues = function(match, result) {
        var value;
        var regex1 = new RegExp('index[ ]*:[ ]*(\\d+)', 'gi');
        var regex2 = new RegExp('loop[ ]*:[ ]*(true|false|once)', 'gi');
        var regex3 = new RegExp('speed[ ]*:[ ]*(\\d+)', 'gi');
        var regex4 = new RegExp('frames[ ]*:[ ]*(\\d+)', 'gi');
        var regex5 = new RegExp('direction[ ]*:[ ]*(down|left|right|up)', 'gi');
        var regex6 = new RegExp('priority[ ]*:[ ]*(\\d+)', 'gi');
        while (value = regex1.exec(match)) {
            result.index = Number(value[1]) - 1;
        };
        while (value = regex2.exec(match)) {
            result.loop = value[1].toLowerCase();
        };
        while (value = regex3.exec(match)) {
            result.speed = Number(value[1]) || 1;
        };
        while (value = regex4.exec(match)) {
            result.frames = Number(value[1]);
        };
        while (value = regex5.exec(match)) {
            result.direction = value[1].toLowerCase();
        };
        while (value = regex6.exec(match)) {
            result.priority = Number(value[1]);
        };
        return result;
    };

    VictorEngine.BattlerGraphicSetup.processDamaged = function(data, match) {
        var result = {}
        result.name = match[1].slice(1, -1);
        result.index = Number(match[2]);
        result.direction = String(match[3]);
        data.downedCharset = result;
    };

    VictorEngine.BattlerGraphicSetup.processWeapons = function(data, match) {
        match[1].match(/\d+/gi).forEach(function(id) {
            data.push(Number(id))
        });
    };

    //=============================================================================
    // ImageManager
    //=============================================================================

    ImageManager.isAnimatedBattler = function(filename) {
        var sign = filename.match(/^[\!\$\%]+/);
        return sign && sign[0].contains('%');
    };

    ImageManager.isStaticBattler = function(filename) {
        var sign = filename.match(/^[\!\$\%]+/);
        return sign && sign[0].contains('$');
    };

    ImageManager.isCharsetBattler = function(filename) {
        var sign = filename.match(/^[\!\$\%]+/);
        return sign && sign[0].contains('!');
    };

    ImageManager.isCustomBattler = function(filename, type) {
        var result = !!filename.match(/\[\d+,\d+,\d+(?:,\d+)?(?:,true|,false)?\]/i);
        return result || VictorEngine.BattlerGraphicSetup[type + 'Frames'];
    };

    ImageManager.battlerFrameSetup = function(filename, type) {
        var match;
        var result;
        var regex = new RegExp('\\[(\\d+),(\\d+),(\\d+)(?:,([+-]?\\d+))?(?:,(true|false))?\\]', 'gi');
        while (match = regex.exec(filename)) {
            result = {};
            result.frames = Number(match[1]) || 1;
            result.poses = Number(match[2]) || 1;
            result.columns = Number(match[3]) || 1;
            result.adjust = Number(match[4]) || 0;
            result.weapon = match[5] && match[5].toLowerCase() === 'true';
        };
        return result || VictorEngine.BattlerGraphicSetup[type + 'Frames'];
    };

    //=============================================================================
    // BattleManager
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function() {
        VictorEngine.BattlerGraphicSetup.startTurn.call(this);
        $gameTroop.aliveMembers().forEach(function(member) {
            if (member.battleSprite()) {
                member.battleSprite().refreshMotion();
            }
        })
    };

    BattleManager.isGuardAction = function(subject) {
        return this._action && this._subject === subject && this._action.isGuard() && !this.isInputting();
    };

    //=============================================================================
    // Game_BattlerBase
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function(stateId) {
        VictorEngine.BattlerGraphicSetup.eraseState.call(this, stateId);
        this.requestMotionRefresh();
    };

    VictorEngine.BattlerGraphicSetup.addNewState = Game_BattlerBase.prototype.addNewState;
    Game_BattlerBase.prototype.addNewState = function(stateId) {
        VictorEngine.BattlerGraphicSetup.addNewState.call(this, stateId)
        this.requestMotionRefresh();
    };

    //=============================================================================
    // Game_Battler
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.isGuardWaiting = Game_Battler.prototype.isGuardWaiting;
    Game_Battler.prototype.isGuardWaiting = function() {
        var result = VictorEngine.BattlerGraphicSetup.isGuardWaiting.call(this);
        return result || BattleManager.isGuardAction(this);
    };

    VictorEngine.BattlerGraphicSetup.isActing = Game_Battler.prototype.isActing;
    Game_Battler.prototype.isActing = function() {
        return VictorEngine.BattlerGraphicSetup.isActing.call(this) && !this.isGuardReady();
    };

    Game_Battler.prototype.victoryMotion = function() {
        return this._victoryMotion;
    };

    Game_Battler.prototype.clearVictoryMotion = function() {
        this._victoryMotion = false;
    };

    Game_Battler.prototype.isCharsetBattler = function() {
        return this.battleSprite() && this.battleSprite().isCharsetBattler();
    };

    Game_Battler.prototype.downedCharacterName = function() {
        return this._downedCharset.name || '';
    };

    Game_Battler.prototype.downedCharacterIndex = function() {
        return this._downedCharset.index || 0;
    };

    Game_Battler.prototype.downedDirection = function() {
        return this._downedCharset.direction || '';
    };

    Game_Battler.prototype.stateMotionSpeed = function() {
        return this.states().map(function(state) {
            return state.stateMotion.motionSpeed || 0;
        }).sort(function(a, b) {
            return b - a
        })[0] || 1;
    };

    Game_Battler.prototype.battler = function() {
        return this.battleSprite();
    };

    Game_Battler.prototype.stateMotion = function(motionType) {
        return this.getStateMotions().filter(function(motion) {
            return this.isStatePriority(motion, motionType);
        }, this).sort(function(a, b) {
            return b.priority - a.priority
        })[0]
    };

    Game_Battler.prototype.getStateMotions = function() {
        return this.states().reduce(function(r, state) {
            return r.concat(state.stateMotion.motion || []);
        }, []);
    };

    Game_Battler.prototype.isStatePriority = function(motion, type) {
        var motions = this.idleMotions();
        var index = Math.floor(motions.indexOf(type) / 2)
        return motions.contains(type) && index <= (motion.priority || 0);
    };

    Game_Battler.prototype.isDone = function() {
        return this._actionState === 'done';
    };

    Game_Battler.prototype.isIdle = function() {
        return (this.isAlive() && !this.isGuardReady() && (this.isInputting() || this.isActing() ||
            this.isUndecidedMotion() || this.isDone()));
    };

    Game_Battler.prototype.isGuardReady = function() {
        return this.isGuard() || this.isGuardWaiting();
    };

    Game_Battler.prototype.isUndecidedMotion = function() {
        return (this.isUndecided() && !(this.stateMotionIndex() || this.isChanting() ||
            this.isGuard() || this.isGuardWaiting() || this.isDying()));
    };

    Game_Battler.prototype.spriteType = function() {
        var name = this.battlerOriginalName();
        var type = this.isActor() ? 'actor' : 'enemy';
        if (ImageManager.isCharsetBattler(name)) {
            return 'charset'
        } else if (ImageManager.isStaticBattler(name)) {
            return 'static'
        } else if (ImageManager.isAnimatedBattler(name)) {
            return 'animated'
        } else if (VictorEngine.BattlerGraphicSetup[type + 'Sprite'] === 'charset') {
            return 'charset'
        } else if (VictorEngine.BattlerGraphicSetup[type + 'Sprite'] === 'static') {
            return 'static'
        } else if (VictorEngine.BattlerGraphicSetup[type + 'Sprite'] === 'animated') {
            return 'animated'
        } else {
            return this.isActor() ? 'animated' : 'static';
        }
    };

    //=============================================================================
    // Game_Actor
    //=============================================================================

    /* Overwritten function */
    Game_Actor.prototype.startAnimation = function(animationId, mirror, delay) {
        Game_Battler.prototype.startAnimation.call(this, animationId, mirror, delay);
    };

    /* Overwritten function */
    Game_Actor.prototype.performVictory = function() {
        if (Imported['VE - Battle Motions']) {
            Game_Battler.prototype.performVictory.call(this);
        } else {
            if (this.canMove()) {
                this._victoryMotion = true;
                this.battleSprite().refreshVictoryMotion();
            }
        }
    };

    VictorEngine.BattlerGraphicSetup.setupGameActor = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        VictorEngine.BattlerGraphicSetup.setupGameActor.call(this, actorId);
        this._downedCharset = this.actor().stateMotion.downedCharset || {};
    };

    VictorEngine.BattlerGraphicSetup.performActionStartGameActor = Game_Actor.prototype.performActionStart;
    Game_Actor.prototype.performActionStart = function(action) {
        if (this.isStaticBattler()) {
            Game_Battler.prototype.performActionStart.call(this, action);
            if (!Imported['VE - Battle Motions']) {
                this.requestEffect('whiten');
            }
        } else {
            VictorEngine.BattlerGraphicSetup.performActionStartGameActor.call(this, action);
        }
    };

    VictorEngine.BattlerGraphicSetup.performActionGameActor = Game_Actor.prototype.performAction;
    Game_Actor.prototype.performAction = function(action) {
        if (this.isStaticBattler()) {
            Game_Battler.prototype.performAction.call(this, action);
        } else {
            VictorEngine.BattlerGraphicSetup.performActionGameActor.call(this, action);
        }
    };

    VictorEngine.BattlerGraphicSetup.performActionEndGameActor = Game_Actor.prototype.performActionEnd;
    Game_Actor.prototype.performActionEnd = function() {
        if (this.isStaticBattler()) {
            Game_Battler.prototype.performActionEnd.call(this);
        } else {
            VictorEngine.BattlerGraphicSetup.performActionEndGameActor.call(this);
        }
    };

    VictorEngine.BattlerGraphicSetup.performDamageGameActor = Game_Actor.prototype.performDamage;
    Game_Actor.prototype.performDamage = function() {
        if (this.isStaticBattler()) {
            this.performActorDamage()
        } else {
            VictorEngine.BattlerGraphicSetup.performDamageGameActor.call(this);
        }
    };

    VictorEngine.BattlerGraphicSetup.performCollapseGameActor = Game_Actor.prototype.performCollapse;
    Game_Actor.prototype.performCollapse = function() {
        if (this.isStaticBattler()) {
            this.performActorCollapse();
        } else {
            VictorEngine.BattlerGraphicSetup.performCollapseGameActor.call(this);
        }
    };

    Game_Actor.prototype.performActorDamage = function() {
        Game_Battler.prototype.performDamage.call(this);
        SoundManager.playActorDamage();
        if (this.isSpriteVisible()) {
            this.requestEffect('blink');
        }
    };

    Game_Actor.prototype.performActorCollapse = function() {
        Game_Battler.prototype.performCollapse.call(this);
        if ($gameParty.inBattle()) {
            this.requestEffect('collapse');
            SoundManager.playActorCollapse();
        }
    };

    Game_Actor.prototype.spriteMotion = function() {
        return this.actor().spriteMotion;
    };

    Game_Actor.prototype.hideBattlerShadow = function() {
        return this.actor().hideBattlerShadow;
    };

    Game_Actor.prototype.battlerOriginalName = function() {
        return this.battlerName();
    };

    //=============================================================================
    // Game_Enemy
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.setupGameEnemy = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function(enemyId, x, y) {
        VictorEngine.BattlerGraphicSetup.setupGameEnemy.call(this, enemyId, x, y);
        this._downedCharset = this.enemy().stateMotion.downedCharset || {};
    };

    VictorEngine.BattlerGraphicSetup.battlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function() {
        var name = this.battlerOriginalName();
        if (this.spriteType() === 'animated') {
            var sufix = VictorEngine.Parameters.BattlerGraphicSetup.EnemySufix;
            return name + sufix;
        } else {
            return name
        }
    };

    Game_Enemy.prototype.battlerOriginalName = function() {
        return VictorEngine.BattlerGraphicSetup.battlerName.call(this);
    };

    VictorEngine.BattlerGraphicSetup.performActionStartGameEnemy = Game_Enemy.prototype.performActionStart;
    Game_Enemy.prototype.performActionStart = function(action) {
        if (this.isAnimatedBattler()) {
            Game_Battler.prototype.performActionStart.call(this, action);
        } else {
            VictorEngine.BattlerGraphicSetup.performActionStartGameEnemy.call(this, action);
        }
    };

    VictorEngine.BattlerGraphicSetup.performActionGameEnemy = Game_Enemy.prototype.performAction;
    Game_Enemy.prototype.performAction = function(action) {
        if (this.isAnimatedBattler()) {
            this.performEnemyAction(action);
        } else {
            VictorEngine.BattlerGraphicSetup.performActionGameEnemy.call(this, action);
        }
    };

    VictorEngine.BattlerGraphicSetup.performActionEndGameEnemy = Game_Enemy.prototype.performActionEnd;
    Game_Enemy.prototype.performActionEnd = function() {
        if (this.isAnimatedBattler()) {
            Game_Battler.prototype.performActionEnd.call(this);
        } else {
            VictorEngine.BattlerGraphicSetup.performActionEndGameEnemy.call(this);
        }
    };

    VictorEngine.BattlerGraphicSetup.performDamageGameEnemy = Game_Enemy.prototype.performDamage;
    Game_Enemy.prototype.performDamage = function() {
        if (this.isAnimatedBattler()) {
            this.performEnemyDamage();
        } else {
            VictorEngine.BattlerGraphicSetup.performDamageGameEnemy.call(this);
        }
    };

    VictorEngine.BattlerGraphicSetup.performEvasionGameEnemy = Game_Enemy.prototype.performEvasion;
    Game_Enemy.prototype.performEvasion = function() {
        if (this.isAnimatedBattler()) {
            this.performEnemyEvasion();
        } else {
            VictorEngine.BattlerGraphicSetup.performEvasionGameEnemy.call(this);
        }
    };

    VictorEngine.BattlerGraphicSetup.performMagicEvasionGameEnemy = Game_Enemy.prototype.performMagicEvasion;
    Game_Enemy.prototype.performMagicEvasion = function() {
        if (this.isAnimatedBattler()) {
            this.performEnemyMagicEvasion();
        } else {
            VictorEngine.BattlerGraphicSetup.performMagicEvasionGameEnemy.call(this);
        }
    };

    Game_Enemy.prototype.performVictory = function() {
        Game_Battler.prototype.performVictory.call(this);
    };

    Game_Enemy.prototype.attackAnimationId1 = function() {
        if (this.hasNoWeapons()) {
            return this.bareHandsAnimationId();
        } else {
            var weapons = this.weapons();
            return weapons[0] ? weapons[0].animationId : 0;
        }
    };
    Game_Enemy.prototype.attackAnimationId2 = function() {
        var weapons = this.weapons();
        return weapons[1] ? weapons[1].animationId : 0;
    };

    Game_Enemy.prototype.hasNoWeapons = function() {
        return this.weapons().length === 0;
    };

    Game_Enemy.prototype.bareHandsAnimationId = function() {
        return this.enemy().attackAnimation || 0;
    };

    Game_Enemy.prototype.equips = function() {
        return this.weapons();
    };

    Game_Enemy.prototype.weapons = function() {
        var weapons = this.enemy().enemyWeapons || [];
        return weapons.map(function(id) {
            return $dataWeapons[id];
        });
    };

    Game_Enemy.prototype.hasAttackAnimation = function() {
        return !!this.bareHandsAnimationId() || !this.hasNoWeapons();
    };

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
    };

    Game_Enemy.prototype.performEnemyAction = function(action) {
        Game_Battler.prototype.performAction.call(this, action);
        if (action.isAttack()) {
            this.performAttack();
        } else if (action.isGuard()) {
            this.requestMotion('guard');
        } else if (action.isMagicSkill()) {
            this.requestMotion('spell');
        } else if (action.isSkill()) {
            this.requestMotion('skill');
        } else if (action.isItem()) {
            this.requestMotion('item');
        }
    };

    Game_Enemy.prototype.performEnemyDamage = function() {
        Game_Battler.prototype.performDamage.call(this);
        this.requestMotion('damage');
        SoundManager.playEnemyDamage();
    };

    Game_Enemy.prototype.performEnemyEvasion = function() {
        Game_Battler.prototype.performEvasion.call(this);
        this.requestMotion('evade');
    };

    Game_Enemy.prototype.performEnemyMagicEvasion = function() {
        Game_Battler.prototype.performMagicEvasion.call(this);
        this.requestMotion('evade');
    };

    Game_Enemy.prototype.spriteMotion = function() {
        return this.enemy().spriteMotion;
    };

    Game_Enemy.prototype.hideBattlerShadow = function() {
        return this.enemy().hideBattlerShadow;
    };

    Game_Enemy.prototype.characterIndex = function() {
        return this.enemy().charsetIndex || 0;
    };

    Game_Enemy.prototype.isIdle = function() {
        return Game_Battler.prototype.isIdle.call(this) || this.isEnemyInput();
    };

    Game_Enemy.prototype.isEnemyInput = function() {
        return BattleManager.isInputting() && !(this.stateMotionIndex() || this.isDying());
    };

    //=============================================================================
    // Game_Interpreter
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        VictorEngine.BattlerGraphicSetup.pluginCommand.call(this, command, args);
        if (command.toLowerCase() === 'changedamagedcharset') {
            var v = $gameVariables._data;
            var actor = $gameActors.actor(Number(eval(args[0])) || 0);
            var name = String(args[1]) || '';
            var index = Number(eval(args[2]) - 1) || 0;
            var direction = String(args[3]) || '';
            if (actor) {
                actor._downedCharset = {
                    name: name,
                    index: index,
                    direction: direction
                };
            }
        }
    };

    //=============================================================================
    // Sprite_Battler
    //=============================================================================

    Sprite_Battler.prototype.isCharsetBattler = function() {
        return false;
    };

    Sprite_Battler.prototype.isEmptyBitmap = function() {
        return !this.bitmap || (this.bitmap.width <= 1 && !this.bitmap.height <= 1);
    };

    Sprite_Battler.prototype.refreshMotion = function() {};

    Sprite_Battler.prototype.startEntryMotion = function() {
        if (Imported['VE - Battle Motions']) {
            this.processEntryMotion();
        } else {
            if (this._battler && this._battler.canMove()) {
                this.startMotion('walk');
                this.startMove(0, 0, 30);
            } else if (!this.isMoving()) {
                this.refreshMotion();
                this.startMove(0, 0, 0);
            }
        }
    };

    Sprite_Battler.prototype.updateSpriteType = function() {
        var name = this._battler.battlerOriginalName()
        if (this._spriteTypeName !== name) {
            this._spriteTypeName = name;
            this._spriteType = this._battler.spriteType();
        }
    };

    Sprite_Battler.prototype.isDisabledMotion = function() {
        var motion = this._motion;
        return motion === this.getMotions('dead') || motion === this.getMotions('sleep');
    };

    Sprite_Battler.prototype.setupEffect = function() {
        if (this._appeared && this._battler.isEffectRequested()) {
            this.startEffect(this._battler.effectType());
            this._battler.clearEffect();
        }
        if (!this._appeared && this._battler.isAlive()) {
            this.startEffect('appear');
        } else if (this._appeared && this._battler.isHidden()) {
            this.startEffect('disappear');
        }
    };

    Sprite_Battler.prototype.startEffect = function(effectType) {
        this._effectType = effectType;
        switch (this._effectType) {
            case 'appear':
                this.startAppear();
                break;
            case 'disappear':
                this.startDisappear();
                break;
            case 'whiten':
                this.startWhiten();
                break;
            case 'blink':
                this.startBlink();
                break;
            case 'collapse':
                this.startCollapse();
                break;
            case 'bossCollapse':
                this.startBossCollapse();
                break;
            case 'instantCollapse':
                this.startInstantCollapse();
                break;
        }
        this.revertToNormal();
    };

    Sprite_Battler.prototype.startAppear = function() {
        this._effectDuration = 16;
        this._appeared = true;
    };

    Sprite_Battler.prototype.startDisappear = function() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    Sprite_Battler.prototype.startWhiten = function() {
        this._effectDuration = 16;
    };

    Sprite_Battler.prototype.startBlink = function() {
        this._effectDuration = 20;
    };

    Sprite_Battler.prototype.startCollapse = function() {
        this._effectDuration = 32;
        this._appeared = false;
    };

    Sprite_Battler.prototype.startBossCollapse = function() {
        this._effectDuration = this._mainSprite.bitmap.height;
        this._appeared = false;
    };

    Sprite_Battler.prototype.startInstantCollapse = function() {
        this._effectDuration = 16;
        this._appeared = false;
    };

    Sprite_Battler.prototype.updateEffect = function() {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            switch (this._effectType) {
                case 'whiten':
                    this.updateWhiten();
                    break;
                case 'blink':
                    this.updateBlink();
                    break;
                case 'appear':
                    this.updateAppear();
                    break;
                case 'disappear':
                    this.updateDisappear();
                    break;
                case 'collapse':
                    this.updateCollapse();
                    break;
                case 'bossCollapse':
                    this.updateBossCollapse();
                    break;
                case 'instantCollapse':
                    this.updateInstantCollapse();
                    break;
            }
            if (this._effectDuration === 0) {
                this._effectType = null;
            }
        }
    };

    Sprite_Battler.prototype.isEffecting = function() {
        return !!this._effectType;
    };

    Sprite_Battler.prototype.revertToNormal = function() {
        this._shake = 0;
        this._mainSprite.blendMode = 0;
        this._mainSprite.opacity = 255;
        this._mainSprite.setBlendColor([0, 0, 0, 0]);
    };

    Sprite_Battler.prototype.updateWhiten = function() {
        var alpha = 128 - (16 - this._effectDuration) * 10;
        this._mainSprite.setBlendColor([255, 255, 255, alpha]);
    };

    Sprite_Battler.prototype.updateBlink = function() {
        this._mainSprite.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
    };

    Sprite_Battler.prototype.updateAppear = function() {
        this._mainSprite.opacity = (16 - this._effectDuration) * 16;
    };

    Sprite_Battler.prototype.updateDisappear = function() {
        this._mainSprite.opacity = 256 - (32 - this._effectDuration) * 10;
    };

    Sprite_Battler.prototype.updateCollapse = function() {
        this._mainSprite.blendMode = Graphics.BLEND_ADD;
        this._mainSprite.setBlendColor([255, 128, 128, 128]);
        this._mainSprite.opacity *= this._effectDuration / (this._effectDuration + 1);
    };

    Sprite_Battler.prototype.updateBossCollapse = function() {
        this._shake = this._effectDuration % 2 * 4 - 2;
        this._mainSprite.blendMode = Graphics.BLEND_ADD;
        this._mainSprite.opacity *= this._effectDuration / (this._effectDuration + 1);
        this._mainSprite.setBlendColor([255, 255, 255, 255 - this._mainSprite.opacity]);
        if (this._effectDuration % 20 === 19) {
            SoundManager.playBossCollapse2();
        }
    };

    Sprite_Battler.prototype.updateInstantCollapse = function() {
        this._mainSprite.opacity = 0;
    };

    Sprite_Battler.prototype.moveToStartPosition = function() {
        if (!this.isMoving() && $gameSystem.isSideView() && !this.noEntryMove()) {
            var move = (this._battler && this._battler.isFacingRight()) ? -300 : 300
            this.startMove(move, 0, 0);
        }
    };

    Sprite_Battler.prototype.stepForward = function() {
        if (this.inHomePosition() && $gameSystem.isSideView()) {
            var move = (this._battler && this._battler.isFacingRight()) ? 48 : -48
            this.startMotion('walk');
            this.startMove(move, 0, 12);
        }
    };

    Sprite_Battler.prototype.stepBack = function() {
        this.startMotion('return');
        this.startMove(0, 0, 12);
    };

    Sprite_Battler.prototype.retreat = function() {
        if ($gameSystem.isSideView()) {
            var move = (this._battler && this._battler.isFacingRight()) ? -300 : 300
            this.startMove(move, 0, 30);
        }
    };

    Sprite_Battler.prototype.startMotion = function(motionType) {
        var newMotion = this.getMotions(motionType, true);
        var oldMotion = this._motion || {};
        if (oldMotion !== newMotion || this._playMotion) {
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = oldMotion.index !== newMotion.index ? 0 : this._pattern;
            this._playMotion = !newMotion.loop || newMotion.loop === 'false';
        }
    };

    Sprite_Battler.prototype.getMotions = function(motionType, state) {
        var motions = this._battler.spriteMotion();
        var name = this._battler.battlerOriginalName();
        if (state && this._battler.stateMotion(motionType)) {
            var motion = this._battler.stateMotion(motionType) || {};
        } else if (motions && motions[name] && motions[name][motionType]) {
            var motion = motions[name][motionType] || {};
        } else {
            var motion = Sprite_Actor.MOTIONS[motionType] || {};
        }
        motion.name = motionType;
        return motion;
    };

    Sprite_Battler.prototype.updateSpriteFrame = function() {
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var frame = this._frameSetup;
            var effect = this._effectType === 'bossCollapse';
            var setup = frame || {
                adjust: 0,
                poses: 18,
                columns: 3,
                frames: 3
            };
            var index = this._motion ? this._motion.index : 0;
            var pattern = frame ? this._pattern : this._pattern < 3 ? this._pattern : 1;
            var ad = setup.adjust;
            var pc = setup.poses / setup.columns
            var cw = bitmap.width / (setup.columns * setup.frames);
            var ch = bitmap.height / pc;
            var cx = Math.floor(index / pc) * setup.frames + pattern;
            var cy = index % Math.floor(pc);
            var cd = ch + ad
            var fh = effect ? cd * this._effectDuration / cd : cd
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, fh);
            this._mainSprite.anchor.y = (1 - ad / fh) || 1;
            if (this.isEmptyBitmap() && cw && ch) {
                this.bitmap = new Bitmap(cw, ch + ad);
            }
        }
    };

    Sprite_Battler.prototype.isGuardMotion = function() {
        return this._motion && this._motion.name === 'guard';
    };

    //=============================================================================
    // Sprite_Actor
    //=============================================================================

    /* Overwritten function */
    Sprite_Actor.prototype.moveToStartPosition = function() {
        Sprite_Battler.prototype.moveToStartPosition.call(this);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.stepForward = function() {
        Sprite_Battler.prototype.stepForward.call(this);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.stepBack = function() {
        Sprite_Battler.prototype.stepBack.call(this);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.retreat = function() {
        Sprite_Battler.prototype.retreat.call(this);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.startMotion = function(motionType) {
        Sprite_Battler.prototype.startMotion.call(this, motionType);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.startEntryMotion = function() {
        Sprite_Battler.prototype.startEntryMotion.call(this);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.onMoveEnd = function() {
        Sprite_Battler.prototype.onMoveEnd.call(this);
        this.refreshMotion();
    };

    /* Overwritten function */
    Sprite_Actor.prototype.updateFrame = function() {
        this.updateBattlerDirection();
        this.updateSpriteFrame();
        Sprite_Battler.prototype.updateFrame.call(this);
    };

    /* Overwritten function */
    Sprite_Actor.prototype.updateMotionCount = function() {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            var max = this._frameSetup ? this._frameSetup.frames : 4;
            var frames = Math.min(this._motion.frames, max) || max;
            var pattern = this._frameSetup ? frames : frames - 1;
            if (this._motion.loop === 'true' && !this._playMotion) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._motion.loop === 'once' && !this._playMotion) {
                if (this._pattern < frames - 1) {
                    this._pattern = this._pattern + 1;
                }
            } else if (this._playMotion && this._pattern < pattern - 1) {
                this._pattern++;
            } else {
                this._playMotion = false;
                this._pattern = 0;
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    VictorEngine.BattlerGraphicSetup.initMembersSpriteActor = Sprite_Actor.prototype.initMembers;
    Sprite_Actor.prototype.initMembers = function() {
        VictorEngine.BattlerGraphicSetup.initMembersSpriteActor.call(this);
        this._spriteType = 'animated';
    };

    VictorEngine.BattlerGraphicSetup.updateBitmapSpriteActor = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function() {
        VictorEngine.BattlerGraphicSetup.updateBitmapSpriteActor.call(this);
        this.updateSpriteType();
        this.updateBitmapSetup();
    };

    VictorEngine.BattlerGraphicSetup.setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        if (this._frameSetup && !this._frameSetup.weapon && this._actor.isWeaponAnimationRequested()) {
            this._actor.clearWeaponAnimation();
        }
        VictorEngine.BattlerGraphicSetup.setupWeaponAnimation.call(this)
    };

    VictorEngine.BattlerGraphicSetup.updateShadow = Sprite_Actor.prototype.updateShadow;
    Sprite_Actor.prototype.updateShadow = function() {
        VictorEngine.BattlerGraphicSetup.updateShadow.call(this);
        this._shadowSprite.visible = !!this._actor && !this._actor.hideBattlerShadow();
    };

    VictorEngine.BattlerGraphicSetup.refreshMotion = Sprite_Actor.prototype.refreshMotion;
    Sprite_Actor.prototype.refreshMotion = function() {
        var battler = this._actor;
        if (!this.isMoving() && !this._playMotion) {
            if (battler.victoryMotion()) {
                this.startMotion('victory');
            } else if (battler && battler.isIdle()) {
                this.startMotion('idle');
            } else {
                VictorEngine.BattlerGraphicSetup.refreshMotion.call(this);
            }
        }
    };

    VictorEngine.BattlerGraphicSetup.motionSpeed = Sprite_Actor.prototype.motionSpeed;
    Sprite_Actor.prototype.motionSpeed = function() {
        var motion = this._motion || {};
        var result = motion.speed || VictorEngine.BattlerGraphicSetup.motionSpeed.call(this)
        return result * (this._playMotion ? 1 : this._actor.stateMotionSpeed());
    };

    Sprite_Actor.prototype.updateBitmapSetup = function() {
        var name = this._actor.battlerOriginalName();
        if (this._frameSetupName !== name) {
            this._frameSetupName = name;
            this.bitmap = ImageManager.loadEmptyBitmap();
            var isCustom = !!ImageManager.isCustomBattler(name, 'actor');
            this._frameSetup = isCustom ? ImageManager.battlerFrameSetup(name, 'actor') : null;
            this._mainSprite.bitmap.addLoadListener(this.updateFrame.bind(this));
        }
    };

    Sprite_Actor.prototype.refreshVictoryMotion = function() {
        if (this.inHomePosition()) {
            this.refreshMotion();
        }
    };

    Sprite_Actor.prototype.spriteTypeChanged = function() {
        return this._spriteType !== 'animated';
    };

    Sprite_Actor.prototype.isMotion = function() {
        return this._motion && (!this._motion.loop || this._motion.loop === 'false');
    };

    //=============================================================================
    // Sprite_Enemy
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.initMembersSpriteEnemy = Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers = function() {
        VictorEngine.BattlerGraphicSetup.initMembersSpriteEnemy.call(this);
        this._spriteType = 'static';
    };

    VictorEngine.BattlerGraphicSetup.updateBitmapSpriteEnemy = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        VictorEngine.BattlerGraphicSetup.updateBitmapSpriteEnemy.call(this);
        this.updateSpriteType();
    };

    VictorEngine.BattlerGraphicSetup.updateFrameSpriteEnemy = Sprite_Enemy.prototype.updateFrame;
    Sprite_Enemy.prototype.updateFrame = function() {
        this.updateBattlerDirection();
        VictorEngine.BattlerGraphicSetup.updateFrameSpriteEnemy.call(this);
    };

    Sprite_Enemy.prototype.spriteTypeChanged = function() {
        return this._spriteType !== 'static';
    };

    //=============================================================================
    // Spriteset_Battle
    //=============================================================================

    /* Overwritten function */
    Spriteset_Battle.prototype.createEnemies = function() {
        var enemies = $gameTroop.members();
        var sprites = [];
        for (var i = 0; i < enemies.length; i++) {
            sprites[i] = this.setupEnemySprite(enemies[i]);
        }
        sprites.sort(this.compareEnemySprite.bind(this));
        for (var j = 0; j < sprites.length; j++) {
            this._battleField.addChild(sprites[j]);
        }
        this._enemySprites = sprites;
    };

    /* Overwritten function */
    Spriteset_Battle.prototype.createActors = function() {
        var members = $gameParty.battleMembers();
        this._actorSprites = [];
        for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
            this._actorSprites[i] = this.setupActorSprite(members[i]);
            this._battleField.addChild(this._actorSprites[i]);
        }
    };

    /* Overwritten function */
    Spriteset_Battle.prototype.updateActors = function() {
        for (var i = 0; i < this._actorSprites.length; i++) {
            this.updateActorSprite(i)
        }
        for (var i = 0; i < this._enemySprites.length; i++) {
            this.updateEnemySprite(i)
        }
    };

    Spriteset_Battle.prototype.setupActorSprite = function(battler) {
        var type;
        if (this.isAnimatedBattler(battler)) {
            type = 'animated';
        }
        if (this.isStaticBattler(battler)) {
            type = 'static';
        }
        if (this.isCharsetBattler(battler)) {
            type = 'charset';
        }
        switch (type || VictorEngine.BattlerGraphicSetup.actorSprite) {
            case 'static':
                return new Sprite_StaticActor(battler);
            case 'charset':
                return new Sprite_CharsetActor(battler);
            default:
                return new Sprite_Actor(battler);
        };
    };

    Spriteset_Battle.prototype.setupEnemySprite = function(battler) {
        var type;
        if (this.isAnimatedBattler(battler)) {
            type = 'animated';
        }
        if (this.isStaticBattler(battler)) {
            type = 'static';
        }
        if (this.isCharsetBattler(battler)) {
            type = 'charset';
        }
        switch (type || VictorEngine.BattlerGraphicSetup.enemySprite) {
            case 'charset':
                return new Sprite_CharsetEnemy(battler);
            case 'animated':
                return new Sprite_AnimatedEnemy(battler);
            default:
                return new Sprite_Enemy(battler);
        };
    };

    Spriteset_Battle.prototype.updateActorSprite = function(i) {
        this._actorSprites[i].setBattler($gameParty.battleMembers()[i]);
        if (this._actorSprites[i].spriteTypeChanged()) {
            this.updateActorSpriteType(i);
        }
    };

    Spriteset_Battle.prototype.updateEnemySprite = function(i) {
        if (this._enemySprites[i].spriteTypeChanged()) {
            this.updateEnemySpriteType(i);
        }
    };

    Spriteset_Battle.prototype.updateActorSpriteType = function(i) {
        var actor = this._actorSprites[i]._battler;
        var index = this._battleField.children.indexOf(this._actorSprites[i])
        this._battleField.removeChild(this._actorSprites[i])
        this._actorSprites[i] = this.setupActorSprite(actor);
        this._actorSprites[i].update()
        this._battleField.addChildAt(this._actorSprites[i], index)
    };

    Spriteset_Battle.prototype.updateEnemySpriteType = function(i) {
        var enemy = this._enemySprites[i]._battler;
        var index = this._battleField.children.indexOf(this._enemySprites[i])
        this._battleField.removeChild(this._enemySprites[i])
        this._enemySprites[i] = this.setupEnemySprite(enemy);
        this._enemySprites[i].update()
        this._battleField.addChildAt(this._enemySprites[i], index)
    };

    Spriteset_Battle.prototype.isCharsetBattler = function(battler, type) {
        return ImageManager.isCharsetBattler(battler ? battler.battlerName() : '', type)
    };

    Spriteset_Battle.prototype.isStaticBattler = function(battler, type) {
        return ImageManager.isStaticBattler(battler ? battler.battlerName() : '', type)
    };

    Spriteset_Battle.prototype.isAnimatedBattler = function(battler, type) {
        return ImageManager.isAnimatedBattler(battler ? battler.battlerName() : '', type)
    };

    //=============================================================================
    // Window_BattleLog
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.showAnimation = Window_BattleLog.prototype.showAnimation;
    Window_BattleLog.prototype.showAnimation = function(subject, targets, animationId) {
        this._animationSubject = subject;
        VictorEngine.BattlerGraphicSetup.showAnimation.call(this, subject, targets, animationId);
    };

    VictorEngine.BattlerGraphicSetup.showAttackAnimation = Window_BattleLog.prototype.showAttackAnimation;
    Window_BattleLog.prototype.showAttackAnimation = function(subject, targets) {
        this._animationSubject = subject;
        VictorEngine.BattlerGraphicSetup.showAttackAnimation.call(this, subject, targets);
    };

    VictorEngine.BattlerGraphicSetup.showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
    Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
        if (subject.isEnemy() && subject.hasAttackAnimation()) {
            this.showActorAttackAnimation(subject, targets)
        } else {
            VictorEngine.BattlerGraphicSetup.showEnemyAttackAnimation.call(this, subject, targets);
        }
    };

    VictorEngine.BattlerGraphicSetup.showNormalAnimation = Window_BattleLog.prototype.showNormalAnimation;
    Window_BattleLog.prototype.showNormalAnimation = function(targets, animationId, mirror) {
        if (this._animationSubject && this._animationSubject.isFacingRight() &&
            VictorEngine.Parameters.BattlerGraphicSetup.MirrorAnim) {
            mirror = !mirror;
        };
        VictorEngine.BattlerGraphicSetup.showNormalAnimation.call(this, targets, animationId, mirror);
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================

    VictorEngine.BattlerGraphicSetup.terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        VictorEngine.BattlerGraphicSetup.terminate.call(this);
        $gameParty.battleMembers().forEach(function(member) {
            member.clearVictoryMotion();
        })
    };

})();

//=============================================================================
// Sprite_StaticActor
//=============================================================================

function Sprite_StaticActor() {
    this.initialize.apply(this, arguments);
}

Sprite_StaticActor.prototype = Object.create(Sprite_Actor.prototype);
Sprite_StaticActor.prototype.constructor = Sprite_StaticActor;

(function() {

    Sprite_StaticActor.prototype.initialize = function(battler) {
        Sprite_Actor.prototype.initialize.call(this, battler);
    };

    Sprite_StaticActor.prototype.initMembers = function() {
        Sprite_Actor.prototype.initMembers.call(this);
        this._appeared = true;
        this._effectType = null;
        this._effectDuration = 0;
        this._shake = 0;
        this._spriteType = 'static';
    };

    Sprite_StaticActor.prototype.createStateSprite = function() {
        this._stateSprite = new Sprite_StateIcon();
        this.addChild(this._stateSprite);
    };

    Sprite_StaticActor.prototype.update = function() {
        Sprite_Battler.prototype.update.call(this);
        if (this._actor) {
            this.updateEffect();
            this.updateStateSprite();
        }
    };

    Sprite_StaticActor.prototype.updateBitmap = function() {
        Sprite_Actor.prototype.updateBitmap.call(this);
        var bitmap = this._mainSprite.bitmap
        this.bitmap = new Bitmap(bitmap.height, bitmap.width);
    };

    Sprite_StaticActor.prototype.updateSpriteFrame = function() {
        var frame = this._mainSprite.bitmap.height;
        if (this._effectType === 'bossCollapse') {
            frame = this._effectDuration;
        }
        this.setFrame(0, 0, this._mainSprite.width, frame);
    };

    Sprite_StaticActor.prototype.updatePosition = function() {
        Sprite_Actor.prototype.updatePosition.call(this);
        this.x += this._shake;
    };

    Sprite_StaticActor.prototype.updateStateSprite = function() {
        this._stateSprite.y = -Math.round((this._mainSprite.bitmap.height + 40) * 0.9);
        if (this._stateSprite.y < 20 - this.y) {
            this._stateSprite.y = 20 - this.y;
        }
    };

    Sprite_StaticActor.prototype.updateBattlerDirection = function() {
        Sprite_Enemy.prototype.updateBattlerDirection.call(this);
    };

    Sprite_StaticActor.prototype.updateShadow = function() {
        this._shadowSprite.visible = false;
    };

    Sprite_StaticActor.prototype.spriteTypeChanged = function() {
        return this._spriteType !== 'static';
    };

    Sprite_StaticActor.prototype.isStaticBattler = function() {
        return true;
    };

    Sprite_StaticActor.prototype.isAnimatedBattler = function() {
        return false;
    };

    Sprite_StaticActor.prototype.isMotion = function() {
        return false;
    };

    Sprite_StaticActor.prototype.moveToStartPosition = function() {};

    Sprite_StaticActor.prototype.stepForward = function() {};

    Sprite_Battler.prototype.setMirror = function(value) {};

})();

//=============================================================================
// Sprite_CharsetActor
//=============================================================================

function Sprite_CharsetActor() {
    this.initialize.apply(this, arguments);
}

Sprite_CharsetActor.prototype = Object.create(Sprite_Actor.prototype);
Sprite_CharsetActor.prototype.constructor = Sprite_CharsetActor;

(function() {

    Sprite_CharsetActor.prototype.initMembers = function() {
        Sprite_Actor.prototype.initMembers.call(this);
        this._spriteType = 'charset';
    };

    Sprite_CharsetActor.prototype.updateBitmap = function() {
        Sprite_Battler.prototype.updateBitmap.call(this)
        var battler = this._actor;
        var name = this.characterName();
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadCharacter(name);
            this._mainSprite.bitmap.addLoadListener(this.updateFrame.bind(this))
            this._mainSprite._isBigCharacter = ImageManager.isBigCharacter(name);
            this.bitmap = ImageManager.loadEmptyBitmap();
        }
        this.updateSpriteType();
    };

    Sprite_CharsetActor.prototype.updateFrame = function() {
        this.updateCharacter();
        Sprite_Actor.prototype.updateFrame.call(this);
    };

    Sprite_CharsetActor.prototype.updateSpriteFrame = function() {
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var pw = this.patternWidth();
            var ph = this.patternHeight();
            var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
            var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
            this._mainSprite.setFrame(sx, sy, pw, ph);
            if (this.isEmptyBitmap() && pw && ph) this.bitmap = new Bitmap(pw, ph);
        }
    };

    Sprite_CharsetActor.prototype.updatePosition = function() {
        this._mainSprite.y = (this.isDisabledCharset()) ? 8 : 0;
        Sprite_Actor.prototype.updatePosition.call(this);
    };

    Sprite_CharsetActor.prototype.refreshMotion = function() {
        Sprite_Actor.prototype.refreshMotion.call(this);
        if (this._character) {
            this._character.straighten();
            this._pattern = this._character._pattern;
        }
    };

    Sprite_CharsetActor.prototype.updateMotionCount = function() {
        if (this._motion && this._character && ++this._motionCount >= this.motionSpeed()) {
            var max = this._character.maxPattern();
            var frames = Math.min(this._motion.frames, max) || max;
            if (this._motion.loop === 'true' && !this._playMotion) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._motion.loop === 'once' && !this._playMotion) {
                if (this._pattern < frames - 1) {
                    this._pattern = this._pattern + 1;
                }
            } else if (this._playMotion && this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this._playMotion = false;
                this._character.straighten()
                this._pattern = this._character._pattern;
            }
            this._motionCount = 0;
        }
    };

    Sprite_CharsetActor.prototype.updateCharacter = function() {
        this._character = this._character || new Game_Character();
        this._character.setImage(this.characterName(), this.characterIndex())
        this._character.setDirection(this.characterDirection())
        this._character.setPattern(this._pattern)
        this._mainSprite._character = this._character;
    };

    Sprite_CharsetActor.prototype.characterName = function() {
        if (this.isDisabledCharset()) {
            return this._actor.downedCharacterName();
        } else if (this._actor) {
            return this._actor.characterName();
        } else {
            return '';
        }
    };

    Sprite_CharsetActor.prototype.characterIndex = function() {
        if (this.isDisabledCharset()) {
            return this._actor.downedCharacterIndex();
        } else if (this._actor) {
            return this._actor.characterIndex();
        } else {
            return 0;
        }
    };

    Sprite_CharsetActor.prototype.characterDirection = function() {
        if (this.isDisabledCharset()) {
            return this.motionDirection(this._actor.downedDirection());
        } else if (this._motion && this._motion.direction) {
            return this.motionDirection(this._motion.direction);
        } else if (this._actor && this._actor.isFacingDown()) {
            return this.motionDirection('down');
        } else if (this._actor && this._actor.isFacingLeft()) {
            return this.motionDirection('left');
        } else if (this._actor && this._actor.isFacingRight()) {
            return this.motionDirection('right');
        } else if (this._actor && this._actor.isFacingUp()) {
            return this.motionDirection('up');
        } else {
            return 0;
        }
    };

    Sprite_CharsetActor.prototype.motionDirection = function(direction) {
        switch (direction.toLowerCase()) {
            case 'down':
                return 2;
            case 'left':
                return this.scale.x < 0 ? 6 : 4;
            case 'right':
                return this.scale.x < 0 ? 4 : 6;
            case 'up':
                return 8;
            default:
                return 0;
        }
    };

    Sprite_CharsetActor.prototype.characterBlockX = function() {
        return Sprite_Character.prototype.characterBlockX.call(this._mainSprite);
    };

    Sprite_CharsetActor.prototype.characterBlockY = function() {
        return Sprite_Character.prototype.characterBlockY.call(this._mainSprite);
    };

    Sprite_CharsetActor.prototype.characterPatternX = function() {
        return Sprite_Character.prototype.characterPatternX.call(this._mainSprite);
    };

    Sprite_CharsetActor.prototype.characterPatternY = function() {
        return Sprite_Character.prototype.characterPatternY.call(this._mainSprite);
    };

    Sprite_CharsetActor.prototype.patternWidth = function() {
        return Sprite_Character.prototype.patternWidth.call(this._mainSprite);
    };

    Sprite_CharsetActor.prototype.patternHeight = function() {
        return Sprite_Character.prototype.patternHeight.call(this._mainSprite);
    };

    Sprite_CharsetActor.prototype.spriteTypeChanged = function() {
        return this._spriteType !== 'charset';
    };

    Sprite_CharsetActor.prototype.isCharsetBattler = function() {
        return true;
    };

    Sprite_CharsetActor.prototype.isDisabledCharset = function() {
        return this._actor && this.isDisabledMotion() && !!this._actor.downedCharacterName();
    };

    Sprite_CharsetActor.prototype.startMotion = function(motionType) {
        Sprite_Actor.prototype.startMotion.call(this, motionType);
        if (this._playMotion && motionType === 'damage') {
            this.damageMove();
        }
    };

    Sprite_CharsetActor.prototype.damageMove = function() {
        var move = (this._actor.isFacingRight()) ? -8 : 8;
        this.startMove(move, 0, 0);
        this.startMove(0, 0, 6);
    };

})();

//=============================================================================
// Sprite_AnimatedEnemy
//=============================================================================

function Sprite_AnimatedEnemy() {
    this.initialize.apply(this, arguments);
}

Sprite_AnimatedEnemy.prototype = Object.create(Sprite_Enemy.prototype);
Sprite_AnimatedEnemy.prototype.constructor = Sprite_AnimatedEnemy;

(function() {

    Sprite_AnimatedEnemy.prototype.initMembers = function() {
        Sprite_Enemy.prototype.initMembers.call(this);
        this._motion = null;
        this._motionCount = 0;
        this._pattern = 0;
        this.createShadowSprite();
        this.createWeaponSprite();
        this.createMainSprite();
        this.createStateSprite();
        this._spriteType = 'animated';
    };

    Sprite_AnimatedEnemy.prototype.createMainSprite = function() {
        this._lowerPictureContainer = new Sprite();
        this._upperPictureContainer = new Sprite();
        this._mainSprite = new Sprite_Base();
        this._mainSprite.anchor.x = 0.5;
        this._mainSprite.anchor.y = 1;
        this._effectTarget = this._mainSprite;
        this.addChild(this._lowerPictureContainer);
        this.addChild(this._mainSprite);
        this.addChild(this._upperPictureContainer);
    };

    Sprite_AnimatedEnemy.prototype.createShadowSprite = function() {
        this._shadowSprite = new Sprite();
        this._shadowSprite.bitmap = ImageManager.loadSystem('Shadow2');
        this._shadowSprite.anchor.x = 0.5;
        this._shadowSprite.anchor.y = 0.5;
        this._shadowSprite.y = -2;
        this.addChild(this._shadowSprite);
    };

    Sprite_AnimatedEnemy.prototype.createWeaponSprite = function() {
        this._weaponSprite = new Sprite_Weapon();
        this.addChild(this._weaponSprite);
    };

    Sprite_AnimatedEnemy.prototype.createStateSprite = function() {
        var mode = VictorEngine.Parameters.BattlerGraphicSetup.EnemyState;
        this._stateIconSprite = new Sprite_StateIcon();
        this._stateSprite = new Sprite_StateOverlay();
        switch (mode.toLowerCase()) {
            case 'icon':
                this.addChild(this._stateIconSprite);
                break;
            case 'overlay':
                this.addChild(this._stateSprite);
                break;
        }
    };

    Sprite_AnimatedEnemy.prototype.setBattler = function(battler) {
        var changed = (battler !== this._enemy)
        Sprite_Enemy.prototype.setBattler.call(this, battler);
        if (changed) {
            this.startEntryMotion();
            this._stateSprite.setup(battler);
        };
    };

    Sprite_AnimatedEnemy.prototype.update = function() {
        Sprite_Enemy.prototype.update.call(this);
        this.updateShadow();
        if (this._enemy) {
            this.updateMotion();
        };
    };

    Sprite_AnimatedEnemy.prototype.updateShadow = function() {
        this._shadowSprite.visible = !!this._enemy && !this._enemy.hideBattlerShadow();
        this._shadowSprite.opacity = Math.floor(255 * this._mainSprite.opacity / 255);
    };

    Sprite_AnimatedEnemy.prototype.updateMain = function() {
        Sprite_Battler.prototype.updateMain.call(this);
        if (this._enemy.isSpriteVisible() && !this.isMoving()) {
            this.updateTargetPosition();
        }
    };

    Sprite_AnimatedEnemy.prototype.setupMotion = function() {
        if (this._enemy.isMotionRequested()) {
            this.startMotion(this._enemy.motionType());
            this._enemy.clearMotion();
        }
    };

    Sprite_AnimatedEnemy.prototype.setupWeaponAnimation = function() {
        if (this._enemy.isWeaponAnimationRequested()) {
            if (!this._frameSetup || this._frameSetup.weapon) {
                this._weaponSprite.setup(this._enemy.weaponImageId());
            }
            this._enemy.clearWeaponAnimation();
        }
    };

    Sprite_AnimatedEnemy.prototype.updateTargetPosition = function() {
        if (Imported['VE - Battle Motions']) {
            Sprite_Battler.prototype.updateTargetPosition.call(this);
        } else {
            if (this._enemy.isInputting() || this._enemy.isActing()) {
                this.stepForward();
            } else if (!this.inHomePosition()) {
                this.stepBack();
            }
        }
    };

    Sprite_AnimatedEnemy.prototype.updateBitmap = function() {
        Sprite_Enemy.prototype.updateBitmap.call(this);
        this.updateSpriteType();
        this.updateBitmapSetup();
    };

    Sprite_AnimatedEnemy.prototype.loadBitmap = function(name, hue) {
        if ($gameSystem.isSideView()) {
            this._mainSprite.bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            this._mainSprite.bitmap = ImageManager.loadEnemy(name, hue);
        }
        this.bitmap = ImageManager.loadEmptyBitmap();
    };

    Sprite_AnimatedEnemy.prototype.updateFrame = function() {
        this.updateBattlerDirection();
        this.updateSpriteFrame();
        Sprite_Battler.prototype.updateFrame.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateMove = function() {
        var bitmap = this._mainSprite.bitmap;
        if (!bitmap || bitmap.isReady()) {
            Sprite_Battler.prototype.updateMove.call(this);
        }
    };

    Sprite_AnimatedEnemy.prototype.updateMotion = function() {
        this.setupMotion();
        this.setupWeaponAnimation();
        if (this._enemy.isMotionRefreshRequested()) {
            this.refreshMotion();
            this._enemy.clearMotion();
        }
        this.updateMotionCount();
    };

    Sprite_AnimatedEnemy.prototype.updateMotionCount = function() {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            var max = this._frameSetup ? this._frameSetup.frames : 4;
            var frames = Math.min(this._motion.frames, max) || max;
            var pattern = this._frameSetup ? frames : frames - 1;
            if (this._motion.loop === 'true' && !this._playMotion) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._motion.loop === 'once' && !this._playMotion) {
                if (this._pattern < frames - 1) {
                    this._pattern = this._pattern + 1;
                }
            } else if (this._playMotion && this._pattern < pattern - 1) {
                this._pattern++;
            } else {
                this._playMotion = false;
                this._pattern = 0;
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    Sprite_AnimatedEnemy.prototype.motionSpeed = function() {
        var motion = this._motion || {};
        var result = motion.speed || 12;
        return result * (this._playMotion ? 1 : this._enemy.stateMotionSpeed());
    };

    Sprite_AnimatedEnemy.prototype.refreshMotion = function() {
        var enemy = this._enemy;
        if (enemy && !this.isMoving() && !this._playMotion) {
            var stateMotion = enemy.stateMotionIndex();
            if (enemy.victoryMotion()) {
                this.startMotion('victory');
            } else if (enemy.isIdle()) {
                this.startMotion('idle');
            } else if (stateMotion === 3) {
                this.startMotion('dead');
            } else if (stateMotion === 2) {
                this.startMotion('sleep');
            } else if (enemy.isChanting()) {
                this.startMotion('chant');
            } else if (enemy.isGuard()) {
                this.startMotion('guard');
            } else if (stateMotion === 1) {
                this.startMotion('abnormal');
            } else if (enemy.isDying()) {
                this.startMotion('dying');
            } else {
                this.startMotion('wait');
            }
        }
    };

    Sprite_AnimatedEnemy.prototype.startEntryMotion = function() {
        Sprite_Battler.prototype.startEntryMotion.call(this);
    };

    Sprite_AnimatedEnemy.prototype.onMoveEnd = function() {
        Sprite_Battler.prototype.onMoveEnd.call(this);
        this.refreshMotion();
    };

    Sprite_AnimatedEnemy.prototype.updateBitmapSetup = function() {
        var name = this._enemy.battlerOriginalName();
        if (this._frameSetupName !== name) {
            this._frameSetupName = name;
            var isCustom = !!ImageManager.isCustomBattler(name, 'enemy');
            this._frameSetup = isCustom ? ImageManager.battlerFrameSetup(name, 'enemy') : null;
            this._mainSprite.bitmap.addLoadListener(this.updateFrame.bind(this));
        }
    };

    Sprite_AnimatedEnemy.prototype.center = function() {
        var x = this._mainSprite._frame.width / 2 || 0;
        var y = this._mainSprite._frame.height / 2 || 0;
        return {
            x: x,
            y: y
        };
    };

    Sprite_AnimatedEnemy.prototype.spriteTypeChanged = function() {
        return this._spriteType !== 'animated';
    };

    Sprite_AnimatedEnemy.prototype.isAnimatedBattler = function() {
        return true;
    };

    Sprite_AnimatedEnemy.prototype.isStaticBattler = function() {
        return false;
    };

    Sprite_AnimatedEnemy.prototype.isMotion = function() {
        return this._motion && (!this._motion.loop || this._motion.loop === 'false');
    };

    Sprite_AnimatedEnemy.prototype.revertToNormal = function() {
        Sprite_Battler.prototype.revertToNormal.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateWhiten = function() {
        Sprite_Battler.prototype.updateWhiten.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateBlink = function() {
        Sprite_Battler.prototype.updateBlink.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateAppear = function() {
        Sprite_Battler.prototype.updateAppear.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateDisappear = function() {
        Sprite_Battler.prototype.updateDisappear.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateCollapse = function() {
        Sprite_Battler.prototype.updateCollapse.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateBossCollapse = function() {
        Sprite_Battler.prototype.updateBossCollapse.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateInstantCollapse = function() {
        Sprite_Battler.prototype.updateInstantCollapse.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateBattlerDirection = function() {
        Sprite_Actor.prototype.updateBattlerDirection.call(this);
    };

    Sprite_AnimatedEnemy.prototype.updateStateSprite = function() {};

})();

//=============================================================================
// Sprite_CharsetEnemy
//=============================================================================

function Sprite_CharsetEnemy() {
    this.initialize.apply(this, arguments);
}

Sprite_CharsetEnemy.prototype = Object.create(Sprite_AnimatedEnemy.prototype);
Sprite_CharsetEnemy.prototype.constructor = Sprite_CharsetEnemy;

(function() {

    Sprite_CharsetEnemy.prototype.initMembers = function() {
        Sprite_AnimatedEnemy.prototype.initMembers.call(this);
        this._spriteType = 'charset';
    };

    Sprite_CharsetEnemy.prototype.loadBitmap = function(name, hue) {
        if ($gameSystem.isSideView()) {
            this._mainSprite.bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            this._mainSprite.bitmap = ImageManager.loadEnemy(name, hue);
        }
        this._mainSprite.bitmap.addLoadListener(this.updateFrame.bind(this))
        this._mainSprite._isBigCharacter = ImageManager.isBigCharacter(name);
        this.bitmap = ImageManager.loadEmptyBitmap();
    };

    Sprite_CharsetEnemy.prototype.updateFrame = function() {
        this.updateCharacter();
        this.updateBattlerDirection();
        this.updateSpriteFrame();
        Sprite_Battler.prototype.updateFrame.call(this);
    };

    Sprite_CharsetEnemy.prototype.updateSpriteFrame = function() {
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var pw = this.patternWidth();
            var ph = this.patternHeight();
            var sx = (this.characterBlockX() + this.characterPatternX()) * pw;
            var sy = (this.characterBlockY() + this.characterPatternY()) * ph;
            this._mainSprite.setFrame(sx, sy, pw, ph);
            if (this.isEmptyBitmap() && pw && ph) {
                this.bitmap = new Bitmap(pw, ph);
            }
        }
    };

    Sprite_CharsetEnemy.prototype.updatePosition = function() {
        this._mainSprite.y = (this.isDisabledCharset()) ? 8 : 0;
        Sprite_AnimatedEnemy.prototype.updatePosition.call(this);
    };

    Sprite_CharsetEnemy.prototype.refreshMotion = function() {
        Sprite_AnimatedEnemy.prototype.refreshMotion.call(this);
        if (this._character) {
            this._character.straighten();
            this._pattern = this._character._pattern;
        }
    };

    Sprite_CharsetEnemy.prototype.updateMotionCount = function() {
        if (this._motion && this._character && ++this._motionCount >= this.motionSpeed()) {
            var max = this._character.maxPattern();
            var frames = Math.min(this._motion.frames, max) || max;
            if (this._motion.loop && !this._playMotion) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._motion.loop === 'once' && !this._playMotion) {
                if (this._pattern < frames - 1) {
                    this._pattern = this._pattern + 1;
                }
            } else if (this._playMotion && this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this._playMotion = false;
                this._character.straighten()
                this._pattern = this._character._pattern;
            }
            this._motionCount = 0;
        }
    };

    Sprite_CharsetEnemy.prototype.updateCharacter = function() {
        this._character = this._character || new Game_Character();
        this._character.setImage(this.characterName(), this.characterIndex())
        this._character.setDirection(this.characterDirection())
        this._character.setPattern(this._pattern)
        this._mainSprite._character = this._character;
    };

    Sprite_CharsetEnemy.prototype.characterName = function() {
        if (this.isDisabledCharset()) {
            return this._enemy.downedCharacterName();
        } else if (this._enemy) {
            return this._enemy.battlerOriginalName();
        } else {
            return '';
        }
    };

    Sprite_CharsetEnemy.prototype.characterIndex = function() {
        if (this.isDisabledCharset()) {
            return this._enemy.downedCharacterIndex();
        } else if (this._enemy) {
            return this._enemy.characterIndex();
        } else {
            return 0;
        }
    };

    Sprite_CharsetEnemy.prototype.characterDirection = function() {
        if (this.isDisabledCharset()) {
            return this.motionDirection(this._enemy.downedDirection());
        } else if (this._motion && this._motion.direction) {
            return this.motionDirection(this._motion.direction);
        } else if (this._enemy && this._enemy.isFacingDown()) {
            return this.motionDirection('down');
        } else if (this._enemy && this._enemy.isFacingLeft()) {
            return this.motionDirection('left');
        } else if (this._enemy && this._enemy.isFacingRight()) {
            return this.motionDirection('right');
        } else if (this._enemy && this._enemy.isFacingUp()) {
            return this.motionDirection('up');
        } else {
            return 0;
        }
    };

    Sprite_CharsetEnemy.prototype.motionDirection = function(direction) {
        switch (direction.toLowerCase()) {
            case 'down':
                return 2;
            case 'left':
                return this.scale.x < 0 ? 6 : 4;
            case 'right':
                return this.scale.x < 0 ? 4 : 6;
            case 'up':
                return 8;
            default:
                return 0;
        }
    };

    Sprite_CharsetEnemy.prototype.characterBlockX = function() {
        return Sprite_Character.prototype.characterBlockX.call(this._mainSprite);
    };

    Sprite_CharsetEnemy.prototype.characterBlockY = function() {
        return Sprite_Character.prototype.characterBlockY.call(this._mainSprite);
    };

    Sprite_CharsetEnemy.prototype.characterPatternX = function() {
        return Sprite_Character.prototype.characterPatternX.call(this._mainSprite);
    };

    Sprite_CharsetEnemy.prototype.characterPatternY = function() {
        return Sprite_Character.prototype.characterPatternY.call(this._mainSprite);
    };

    Sprite_CharsetEnemy.prototype.patternWidth = function() {
        return Sprite_Character.prototype.patternWidth.call(this._mainSprite);
    };

    Sprite_CharsetEnemy.prototype.patternHeight = function() {
        return Sprite_Character.prototype.patternHeight.call(this._mainSprite);
    };

    Sprite_CharsetEnemy.prototype.spriteTypeChanged = function() {
        return this._spriteType !== 'charset';
    };

    Sprite_CharsetEnemy.prototype.isCharsetBattler = function() {
        return true;
    };

    Sprite_CharsetEnemy.prototype.isDisabledCharset = function() {
        return this._enemy && this.isDisabledMotion() && !!this._enemy.downedCharacterName();
    };

    Sprite_CharsetEnemy.prototype.startMotion = function(motionType) {
        Sprite_AnimatedEnemy.prototype.startMotion.call(this, motionType);
        if (this._playMotion && motionType === 'damage') {
            this.damageMove();
        }
    };

    Sprite_CharsetEnemy.prototype.damageMove = function() {
        var move = (this._enemy.isFacingRight()) ? -8 : 8
        this.startMove(move, 0, 0);
        this.startMove(0, 0, 6);
    };

})();