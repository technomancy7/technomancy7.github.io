var hackables = {};
var hackables_fail = {};

(function(){
    Config.saves.isAllowed = function () {
	  return !inConversation();
    };
    Config.navigation.override = function (dest) {
	  // If $health is less-than-or-equal to 0, go to the "You Died" passage instead.
	  if (getHealth() <= 0) return "You Died";
	  
	  return false;
    };
    window.getv = function(key, defaultv = undefined){
        let v = State.getVar(`$${key}`);
        if (v == undefined || v == null) return defaultv;
        return v;
    };

    window.hasAmmo = function(name){
	  let ammod = getv("ammo", {});
	  if(ammod[name] == undefined || ammod[name] == 0) return false;
	  return true;
    };
    window.ammoCount = function(name){
	  let ammod = getv("ammo", {});
	  if(ammod[name] == undefined) return 0;
	  return ammod[name];
    };
    Macro.add('addammo', {
	  handler: function(){
		let ad = this.args[1];
		if(ad == undefined) ad = random(1, 5);
		let kr = getv("ammo", {});
		if(kr[this.args[0]] == undefined) kr[this.args[0]] = 0;
		kr[this.args[0]] += ad;
		State.setVar("$ammo", kr);
		$(this.output).wiki(`@@.fade-in-out;${ad} ${this.args[0]} ammo was added to your inventory.@@`);
	  }
    });
    Macro.add('takeammo', {
	  handler: function(){
		let kr = getv("ammo", {});
		if(kr[this.args[0]] == undefined) kr[this.args[0]] = 0;
		kr[this.args[0]] -= this.args[1];
		if(kr[this.args[0]] < 0) kr[this.args[0]] = 0;
		State.setVar("$ammo", kr);
	  }
    });
    Macro.add('ammo', {
	  handler: function(){
		let body = "";
		if(this.args[0] == true) body += "<<link 'Back to inventory'>><<inventory>><</link>>\n";
		let a = getv("ammo", {});
		for (const name of Object.keys(a)){
		    body += `${name}: ${a[name]}\n`;
		}
		Dialog.close();
		Dialog.setup(`Ammo`);
            Dialog.wiki(body);
            Dialog.open();
	  }
    });
    Macro.add('keyring', {
	  handler: function(){
		let body = "";
		if(this.args[0] == true) body += "<<link 'Back to inventory'>><<inventory>><</link>>\n";
		body += getv("keyring", []).join("\n");
		Dialog.close();
		Dialog.setup(`Keyring`);
            Dialog.wiki(body);
            Dialog.open();
	  }
    });
    window.hasKey = function(name){
	  let kr = getv("keyring", []);

	  return (kr.includes(name));
    };
    Macro.add('addkey', {
	  handler: function(){
		let kr = getv("keyring", []);
		kr.push(this.args[0]);
		State.setVar("$keyring", kr);
		$(this.output).wiki(`@@.fade-in-out;${this.args[0]} was added to your keyring.@@`);
	  }
    });
    window.inConversation = function(){ return Story.get(State.passage).tags.includes("conversation"); };
    
    window.hackableSuccess = function(id){
        let body = hackables[id];
        if(body != undefined){
            Dialog.close();
            Dialog.setup("Keypad");
            Dialog.wiki(body);
            Dialog.open();
        } 
    };
    
    window.hackableFailure = function(id){
        let body = hackables_fail[id];
        if(body != undefined){
            Dialog.close();
            Dialog.setup("Keypad");
            Dialog.wiki(body);
            Dialog.open();
        } 
    };
    
    window.validateKeypad = function(code, input){return (State.getVar(code) == input);};
    
    window.validateComputer = function(usr, usrinput, pwd, pwdinput){
        return (State.getVar(usr) == usrinput && State.getVar(pwd) == pwdinput);
    };
    
    Macro.add('defhackable', {
        tags: ['main'], handler: function(){ hackables[this.args[0]] = this.payload[0].contents; }
    });
    
    Macro.add('defhackablefailure', {
        tags: ['main'], handler: function(){ hackables_fail[this.args[0]] = this.payload[0].contents; }
    });
    
    Macro.add('infodevice', {
        tags: ['main'], handler: function(){
		let name = "Information Device";
		if(this.args.length > 0) name = this.args.full;
		let body = "";
		body += this.payload[0].contents;
		body += `\n<<button "Save to notes">><<addnote>>${this.payload[0].contents}<</addnote>><<reload>><</button>>`;
		Dialog.setup(name);
            Dialog.wiki(body);
            Dialog.open();
	  }
    });
    
    Macro.add('computer', {
	  tags: ['onpass', 'onfail'], 
        handler: function(){
            let login = this.args[0];
            let pwd = this.args[0];
		let onpass = this.payload[0].contents;
		let onfail = "<<diag 'Failed' 'Incorrect login details.'>>";
		if(this.payload[1] != undefined) onfail = this.payload[1].contents;
            let body = `
            <<textbox "$computer_login" ''>>
            <<textbox "$computer_pass" ''>>
            <<button 'Confirm'>>
            <<if validateComputer('$computer_login', '${login}', '$computer_pass', '${pwd}')>>
            ${onpass}
            <<else>>
            ${onfail}
            <</if>>
            <</button>>`;
            Dialog.setup("Keypad");
            Dialog.wiki(body);
            Dialog.open();
        }
    });
    
    Macro.add('keypad', {
	  tags: ['onpass', 'onfail'], 
        handler: function(){
            let code = this.args[0];
		let onpass = this.payload[0].contents;
		let onfail = "<<diag 'Failed' 'Incorrect login details.'>>";
		if(this.payload[1] != undefined) onfail = this.payload[1].contents;
            let body = `
            <<textbox "$keypad_result" ''>><<button 'Confirm'>>
            <<if validateKeypad('$keypad_result', '${code}')>>
            ${onpass}
            <<else>>
            ${onfail}
            <</if>>
            <</button>>`;
            Dialog.setup("Keypad");
            Dialog.wiki(body);
            Dialog.open();
        }
    });


})();
