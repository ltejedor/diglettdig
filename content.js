chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			//sets all div backgrounds to digletts
			var divs = document.querySelectorAll("div");
			if(divs.length === 0) {
				alert("Nothing to productivitze with digletts here human!");
			} else {
				for(var i=0; i<divs.length; i++) {
					divs[i].style.backgroundImage = message.img;
				}
			}
		break;
	}
});