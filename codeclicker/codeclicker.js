var player = {clicks:0, cash:0, auto:0, cpu:1, farm:0, aic:0, aica:0};

player.market = {
	autocost: 50, cpucost: 100, farmcost: 300, aiccost: 500, aicacost: 1200, 
	defaultaiccost:500, defaultfarmcost: 300, defaultcpucost: 100, defaultautocost: 50, defaultaicacost: 1200}

function autoclickr(){
	if (player.auto > 0){
		for (i = 0; i < player.auto; ++i){
			compile()
		}
	}
}

setInterval("autoclickr();", 5000);

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function incrementAlgorithm(){
	invar = player.cpu
	if (player.farm > 0){invar += (player.farm*2.0)}
	if (player.aic > 0){invar *= (player.aic*1.3)}
	if (player.aica > 0){invar *= (player.aica*1.7)}
	return Math.floor(Number(invar))
}

function compile(){
	player.clicks += incrementAlgorithm();
	player.cash += incrementAlgorithm();
	
	animateCSS('.wbutton', 'bounce')

	document.getElementById("cash").innerHTML = `£${player.cash}`;
	
	if (player.clicks > 10 && document.getElementById("blockauto").style.display === "none"){
		document.getElementById("blockauto").style.display = 'block';
	}
	
	if (player.clicks > 50 && document.getElementById("blockcpu").style.display === "none"){
		document.getElementById("blockcpu").style.display = 'block';
	}
	if (player.clicks > 100 && document.getElementById("blockfarm").style.display === "none"){
		document.getElementById("blockfarm").style.display = 'block';
	}
	if (player.cash > 400 && document.getElementById("blockaic").style.display === "none"){
		document.getElementById("blockaic").style.display = 'block';
	}
	if (player.cash > 1000 && document.getElementById("blockaica").style.display === "none"){
		document.getElementById("blockaica").style.display = 'block';
	}
}

function payout(cost){
	player.cash -= Number(cost);
	document.getElementById("cash").innerHTML = `£${player.cash}`;
}

function upgrade(type){
	if (player.cash >= Number(player.market[type+'cost'])){
		//Processing transaction
		payout(player.market[type+'cost'])
		player[type] += 1;
		document.getElementById(type).innerHTML = player[type];
		player.market[type+'cost'] = player.market['default'+type+'cost']*player[type];
		document.getElementById(`cost${type}`).innerHTML = `${player.market[type+'cost']}`
		
		//Updating clickpower UI
		document.getElementById('pwr').innerHTML = `
		Compile Power: ${incrementAlgorithm()}<br>
		Auto-Compiling ${incrementAlgorithm()*player.auto} every 5s
		`;
		animateCSS('.cpwr', 'flash')
	}else{
		alert("You can't afford it.")
	}
}

function buy(obj, cost){
	if (player.cash >= Number(cost)){
		payout(cost)
		var delay = 0
		document.getElementById(obj).disabled = true;
		if (obj == "pepsi"){
			alert("You downed a pepsi and got to work!")
			for (i = 0; i < 5; ++i) {
				compile()
			}
			delay = 5000
		}
		
		setTimeout(function(){ 
			document.getElementById(obj).disabled = false;
			
		}, delay);
	}else{
		alert(`You can't afford ${obj}, you only have ${player.cash}.`)
	}
}

function help(obj){
	helpvars = {
		auto: "Automatically compiles at intervals.",
		cpu: "1.1x compile power upgrade",
		farm: "1.8x compile power upgrade",
		aic: "1.1x total compile power modifier",
		aica: "1.7x total compile power modifier"
	}
	alert(helpvars[obj])
}

