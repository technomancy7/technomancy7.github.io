function populateDsc(){
	fetch('./discords.json')
	  .then((response) => response.json())
	  .then((json) => {
		let list = document.getElementById("dsc-main");
		if(list == null) return;

		json.items.forEach((item) => {
			let slist = document.getElementById("dsc-"+item.group);
			if(slist == null) return;
			const link = document.createElement("a");
			link.href = item.url;
			link.innerText = `${item.name}: ${item.url}`
			slist.insertAdjacentHTML( 'beforeend',"<li>" + link.outerHTML+ " </li>");
		});
	  });
}

function test(input) {
	console.log(input);
}
function collapses(){
    var coll = document.getElementsByClassName("collapsible");

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function(){

	populateDsc();

    var coll = document.getElementsByClassName("collapsible");

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
            content.style.display = "none";
            } else {
            content.style.display = "block";
            }
        });
    }
});

//Get the button:


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    mybutton = document.getElementById("btt");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
