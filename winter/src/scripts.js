/*(function () {
    $(document).on('keyup', function (ev) {
        if (ev.key === 'Enter') {
					if (State.getVar("$acmd") != "") {
          	  Wikifier.wikifyEval('<<include "commandparser">>');
			 		} else {
			 			Wikifier.wikifyEval("<<dialog 'aOS CMD'>><<include 'commandinput'>><</dialog>>");
					}
        }
			  if (ev.key === 'Escape') {
					Dialog.close()
        }
    });
}());*/

// If flag exists then return value, else return false
window.Flag = function (Fnam) {
	if (State.variables.Flags == undefined) {
		State.variables.Flags = {};
	} else if (State.variables.Flags[Fnam.toLowerCase()] !== undefined) {
		return State.variables.Flags[Fnam.toLowerCase()];
	};
	return false;
};

window.reloadPassage = function () {
	var prev = passage();
	return Wikifier.wikifyEval('<<goto [['+prev+']]>>');
};

window.goBack = function () {
	var prev = previous();
	return Wikifier.wikifyEval('<<goto [['+prev+']]>>');
};

Macro.add('percent', {
		handler: function(){
			var res = ((100 * this.args[0]) / this.args[1]);
			var res = res+"%";
			jQuery(this.output).wiki(res);
			return res;
		}
});
	
Config.saves.isAllowed = function () {
	return tags().contains("savable");
};


