/*:
 * @plugindesc v1.04 Creates a minimap based on either supplied pictures or generated from terrain tags.
 * <Iavra Minimap Core>
 * @author Iavra
 *
 * @param Switch
 * @desc Optional switch, that needs to be set to ON for the map to be active.
 * @default
 *
 * @param Notetag
 * @desc Notetag used to mark maps, events and actors that should show up on the minimap.
 * @default minimap
 *
 * @param Frame
 * @desc X, Y, width and height of the minimap. Negative coordinates start at the right/bottom of the screen.
 * @default 10, 10, 200, 200
 *
 * @param Tile Size
 * @desc Size of a single tile on generated maps. Odd numbers might lead to graphical glitches. Minimum: 2
 * @default 10
 *
 * @param Terrain Colors
 * @desc Comma-separated list of <terrainTag>:<color> pairs. Colors are specified in hex format.
 * @default 0:#FFF
 *
 * @param Background Color
 * @desc Color to be used for the minimap background, in hex format.
 * @default #FFF
 *
 * @param Background Opacity
 * @desc Opacity to be used for the minimap background. 0 is fully transparent, 1 is solid.
 * @default 0.3
 *
 * @help
 * To enable the minimap for a specific map, put this tag inside the map's notebox (configurable):
 *
 * <minimap>
 *
 * The plugin will then automatically create a minimap from terrain tags, using the colors provided via the plugin
 * parameter "Terrain Colors". If you want to use a custom map, instead, modify the tag like this:
 *
 * <minimap img:path/to/my/Image.png>
 *
 * The given image will be loaded and automatically scaled to fit the tile size specified in "Tile Size", so please
 * make sure it has the right dimensions or you might experience graphical glitches.
 *
 * To display the player icon on the map, put the following tag inside the notebox of an actor:
 *
 * <minimap 1>
 *
 * This will cause the icon #1 to be displayed on the minimap, as long as that actor is the current leading player.
 * Different icons can be specified for each actor, so the minimap always shows the correct one.
 *
 * To display an event on the map, put the following tag inside a comment:
 *
 * <minimap 2>
 *
 * As long as that page is active, the icon #2 will be shown at that event's position. This can be used to create
 * marker events displaying PoIs or the current quest target.
 *
 * The following script calls can be used to modify the map. Please note, that parameter changes are all temporary,
 * unless another plugin stores them in a persistent manner:
 *
 * IAVRA.MINIMAP.refresh();         Refreshes the map image loaded or created for the current map.
 * IAVRA.MINIMAP.move(x, y);        Repositions the map. Negative values are counted from the right/bottom edge.
 * IAVRA.MINIMAP.resize(w, h);      Resizes the map. If needed, it's repositioned to fit against the screen edge.
 * IAVRA.MINIMAP.x = value;         Repositions the map. Negative values are counted from the right edge.
 * IAVRA.MINIMAP.y = value;         Repositions the map. Negative values are counted from the bottom edge.
 * IAVRA.MINIMAP.width = value;     Resizes the map, updating its position if needed.
 * IAVRA.MINIMAP.height = value;    Resized the map, updating its position if needed.
 * IAVRA.MINIMAP.center = value;    Treates the given character as the new center of the minimap.
 * IAVRA.MINIMAP.zoom = value;      Changes the zoom level (doesn't effect icons, only the map itself).
 * IAVRA.MINIMAP.opacity = value;   Changes the overall opacity of the map. A value of 0 or lower will disable it.
 */

(function($, undefined) {
    "use strict";

    /**
     * Basic helper function to extend objects. Mainly used for inheritance and other prototype-related operations.
     */
    $._extend || ($._extend = function(b, e) { for(var k in e) { b[k] = e[k]; } return b; });

    /**
     * Reading plugin parameters.
     */
    var _params = $plugins.filter(function(p) { return p.description.contains('<Iavra Minimap Core>'); })[0].parameters;
    var _param_switch = _params['Switch']|0;
    var _param_notetag = _params['Notetag'];
    var _param_frame = (_params['Frame'] + ',,,').split(/\s*,\s*/).map(function(n) { return parseInt(n) || 0; });
    var _param_tileSize = Math.max(_params['Tile Size']|0, 2);
    var _param_bgColor = (/(#(?:[A-F0-9]{6}|[A-F0-9]{3}))/i.exec(_params['Background Color']) || [])[1];
    var _param_bgOpacity = (parseFloat(_params['Background Opacity']) || 0).clamp(0, 1);
    var _param_colors = _params['Terrain Colors'].split(/\s*,\s*/).reduce(function(m, $) {
        if(/^(\d+)\s*:\s*(#(?:[A-F0-9]{6}|[A-F0-9]{3}))$/i.exec($)) { m[RegExp.$1|0] = RegExp.$2 } return m;
    }, {});

    /**
     * Regexes used to parse notetags.
     */
    var _regex_map = new RegExp('<' + _param_notetag + '(?:[ ]+img:[ ]*(.+?))?>');
    var _regex_char = new RegExp('<' + _param_notetag + '[ ]+(\\d+)>');

    /**
     * Frame used to contain the minimap, consisting of x and y coordinate, width and height.
     */
    var _frame = {x: 0, y: 0, w: 0, h: 0};

    /**
     * Offset used to center the map. Gets updated during each update cycle.
     */
    var _offset = {x: 0, y: 0};

    /**
     * Setting this to true will cause the minimap to reload all data.
     */
    var _refresh = false;

    /**
     * Caches map images, so they don't have to be reloaded or recreated all the time.
     */
    var _mapCache = [];

    /**
     * Caches the icon ids used by the map to visualize the player and events.
     */
    var _iconCache = [];

    /**
     * The character used to center the map on, usually $gamePlayer.
     */
    var _center;

    /**
     * Zoom used for the map. Might cause graphical glitches with picture maps.
     */
    var _zoom = 1.0;

    /**
     * Opacity of the minimap as a whole. Setting this to 0 will effectively disable the plugin.
     */
    var _opacity = 1.0;

    /**
     * Recalculates the boundaries of the frame by treating negative x/y coordinates as counting from the right/bottom.
     */
    var calculateFrame = function(x, y, w, h) {
        _frame.w = w; _frame.h = h;
        _frame.x = x < 0 ? SceneManager._boxWidth - w + x : x;
        _frame.y = y < 0 ? SceneManager._boxHeight - h + y : y;
        _refresh = true;
    };
    calculateFrame(_param_frame[0], _param_frame[1], _param_frame[2], _param_frame[3]);

    /**
     * Sets up the map image used by the given map id. Depending on the notetag present (if any), this might either be
     * a loaded image or a generated map based on the terrain tags.
     */
    var setupMap = function(mapId) {
        if(!_regex_map.exec($dataMap.note)) { _mapCache[mapId] = null; return; }
        _mapCache[mapId] = RegExp.$1 ? createMapFromImage(RegExp.$1) : createMapFromTiles();
        _refresh = true;
    };

    /**
     * Loads a map image and scales it to fit the minimap.
     */
    var createMapFromImage = function(img) {
        var s = _param_tileSize, w = $gameMap.width() * s, h = $gameMap.height() * s, map = new Bitmap(w, h);
        var bmp = Bitmap.load(img);
        bmp.addLoadListener(function() { map.blt(bmp, 0, 0, bmp.width, bmp.height, 0, 0, w, h); });
        return map;
    };

    /**
     * Creates a map image based on the terrain tags present.
     */
    var createMapFromTiles = function() {
        var c, s = _param_tileSize, w = $gameMap.width(), h = $gameMap.height(), map = new Bitmap(w * s, h * s);
        for(var x = 0; x < w; ++x) { for(var y = 0; y < h; ++y) {
            if(c = _param_colors[$gameMap.terrainTag(x, y)]) { map.fillRect(x * s, y * s, s, s, c); }
        }}
        return map;
    };

    /**
     * Parses the comments on an event's active page or the notebox of the leading actor and stores the contained icon
     * index in the iconcache, so it can be grabbed by the minimap.
     */
    var setupCharacter = function(char) {
        var id = char._eventId|0, oldIcon = _iconCache[id], icon;
        if(id) {
            if(!char.page()) { icon = null; } else {
                for(var i = 0, l = char.list(), note = '', cmd, max = l.length; i < max; ++i) {
                    if((cmd = l[i]) && (cmd.code === 108 || cmd.code === 408)) { note += cmd.parameters[0]; }
                }
                icon = (_regex_char.exec(note) || [])[1]|0;
            }
        } else { icon = (_regex_char.exec($gameParty.leader().actor().note) || [])[1]|0; }
        if(oldIcon !== (_iconCache[id] = icon)) { _refresh = true; }
    };

    //=============================================================================
    // IAVRA.MINIMAP
    //=============================================================================

    $.MINIMAP = {
        Container: function() { this.initialize(); },
        SpriteMap: function() { this.initialize(); },
        SpritePoi: function(char) { this.initialize(char); },

        /**
         * Reloads the map image or recreates the generated one used for the current map.
         */
        refresh: function() { setupMap($gameMap.mapId()); },

        /**
         * Moves the minimap to the specified position.
         */
        move: function(x, y) { calculateFrame(parseInt(x) || 0, parseInt(y) || 0, _frame.w, _frame.h); },

        /**
         * Resizes the minimap, updating its position, if needed.
         */
        resize: function(w, h) { calculateFrame(_frame.x, _frame.y, w|0, h|0); }
    };

    /**
     * Defining properties, that can be used at runtime or by a menu plugin to alter the minimap.
     */
    Object.defineProperties($.MINIMAP, {
        x: {
            get: function() { return _frame.x; },
            set: function(value) { calculateFrame(parseInt(value) || 0, _frame.y, _frame.w, _frame.h); }
        },
        y: {
            get: function() { return _frame.y; },
            set: function(value) { calculateFrame(_frame.x, parseInt(value) || 0, _frame.w, _frame.h); }
        },
        width: {
            get: function() { return _frame.w; },
            set: function(value) { calculateFrame(_frame.x, _frame.y, value|0, _frame.h); }
        },
        height: {
            get: function() { return _frame.h; },
            set: function(value) { calculateFrame(_frame.x, _frame.y, _frame.w, value|0); }
        },
        center: {
            get: function() { return _center; },
            set: function(value) { _center = value || $gamePlayer; }
        },
        zoom: {
            get: function() { return _zoom; },
            set: function(value) { _zoom = Math.max(parseFloat(value) || 0, 0.1); }
        },
        opacity: {
            get: function() { return _opacity; },
            set: function(value) { _opacity = (parseFloat(value) || 0).clamp(0, 1); }
        }
    });

    //=============================================================================
    // IAVRA.MINIMAP.Container
    //=============================================================================

    $.MINIMAP.Container.prototype = $._extend(Object.create(Sprite.prototype), {

        /**
         * Initializes the map, creating a bunch of children and triggering a refresh to setup all parts.
         */
        initialize: function() {
            Sprite.prototype.initialize.call(this);
            this.mask = this.addChild(new PIXI.Graphics().beginFill());
            this.addChild(this._spriteMap = new $.MINIMAP.SpriteMap());
            for(var i = 0, e = $gameMap.events(), ev; ev = e[i++]; ) { this.addChild(new $.MINIMAP.SpritePoi(ev)); }
            this.addChild(new $.MINIMAP.SpritePoi($gamePlayer));
            _center = $gamePlayer;
            _refresh = true;
        },

        /**
         * Signals, whether the minimap is currently active. If not, it's hidden and not being updated.
         */
        active: function() {
            if(!this._spriteMap.bitmap) { return false; }
            if(_param_switch && !$gameSwitches.value(_param_switch)) { return false; }
            if((this.alpha = _opacity) <= 0) { return false; }
            return true;
        },

        /**
         * Updates all parts and causes them to refresh, if needed. If the minimap isn't active, this is skipped.
         */
        update: function() {
            if(_refresh) { this.refresh(); }
            if(this.active()) { this.visible = true; } else { this.visible = false; return; }
            this.updateOffset(_center._realX, _center._realY);
            for(var i = 1, max = this.children.length; i < max; ++i) { this.children[i].update(); }
        },

        /**
         * Calculates the current offset depending on the given center x and y coordinate.
         */
        updateOffset: function(x, y) {
            _offset.x = this.width / 2 - x * _param_tileSize * _zoom;
            _offset.y = this.height / 2 - y * _param_tileSize * _zoom;
        },

        /**
         * Causes all parts to refresh, reloading the data used to display the minimap.
         */
        refresh: function() {
            this.refreshFrame(_frame);
            for(var i = 1, max = this.children.length; i < max; ++i) { this.children[i].refresh(); }
            _refresh = false;
        },

        /**
         * Checks, whether the map's frame data has been updated, repositioning and resizing the map accordingly.
         */
        refreshFrame: function(f) {
            if(this.x !== f.x || this.y !== f.y || this.width !== f.w || this.height !== f.h) {
                this.move(f.x, f.y);
                this.mask.clear().drawRect(0, 0, f.w, f.h);
                this.bitmap = new Bitmap(f.w, f.h);
                this.bitmap.paintOpacity = _param_bgOpacity * 255;
                if(_param_bgColor && _param_bgOpacity > 0) { this.bitmap.fillAll(_param_bgColor); }
            }
        }

    });

    //=============================================================================
    // IAVRA.MINIMAP.SpriteMap
    //=============================================================================

    $.MINIMAP.SpriteMap.prototype = $._extend(Object.create(Sprite.prototype), {

        /**
         * Creates the minimap image used for the current map, if it isn't already present in the cache.
         */
        initialize: function() {
            Sprite.prototype.initialize.call(this);
            if(_mapCache[$gameMap.mapId()] === undefined) { setupMap($gameMap.mapId()); }
        },

        /**
         * Repositions the map image according to the offset.
         */
        update: function() {
            this.scale.x = this.scale.y = _zoom;
            this.move(_offset.x - _param_tileSize * _zoom / 2, _offset.y - _param_tileSize  * _zoom / 2);
        },

        /**
         * Reloads the map image.
         */
        refresh: function() {
            this.bitmap = _mapCache[$gameMap.mapId()];
        }

    });

    //=============================================================================
    // IAVRA.MINIMAP.SpritePoi
    //=============================================================================

    $.MINIMAP.SpritePoi.prototype = $._extend(Object.create(Sprite.prototype), {

        /**
         * Initializes the character data to be used for this PoI.
         */
        initialize: function(char) {
            Sprite.prototype.initialize.call(this, ImageManager.loadSystem('IconSet'));
            this.setFrame(0, 0, Window_Base._iconWidth, Window_Base._iconHeight);
            setupCharacter(this._char = char);
        },

        /**
         * Repositions the icon according to the offset.
         */
        update: function() {
            this.x = _offset.x - this.width / 2 + this._char._realX * _param_tileSize * _zoom;
            this.y = _offset.y - this.height / 2 + this._char._realY * _param_tileSize * _zoom;
        },

        /**
         * Checks, which icon to be used for the PoI and moves the image frame accordingly.
         */
        refresh: function() {
            var icon = _iconCache[this._char._eventId|0], w = this.width, h = this.height;
            this.setFrame(icon % 16 * w, Math.floor(icon / 16) * h, w, h);
        }

    });

    //=============================================================================
    // Scene_Map
    //=============================================================================

    /**
     * The minimap is displayed below the window layer, but above all map data.
     */
    var _sceneMap_createWindowLayer = Scene_Map.prototype.createWindowLayer;
    Scene_Map.prototype.createWindowLayer = function() {
        this.addChild(new $.MINIMAP.Container());
        _sceneMap_createWindowLayer.call(this);
    };

    //=============================================================================
    // Game_Player
    //=============================================================================

    /**
     * On refreshing $gamePlayer, check which icon to be displayed for it.
     */
    var _gamePlayer_refresh = Game_Player.prototype.refresh;
    Game_Player.prototype.refresh = function() {
        _gamePlayer_refresh.call(this);
        setupCharacter(this);
    };

    //=============================================================================
    // Game_Event
    //=============================================================================

    /**
     * On refreshing an event, check which icon to be displayed for it.
     */
    var _gameEvent_refresh = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        _gameEvent_refresh.call(this);
        setupCharacter(this);
    };

})(this.IAVRA || (this.IAVRA = {}));