// omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	suggest([
	  {content: "color-divs", description: "Diglittize all!"}
	]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
	if(text == "color-divs") colorDivs();
});

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
    }
    return true;
});

// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
       	switch(port.name) {
			case "color-divs-port":
				colorDivs();
			break;
		}
    });
});

// send a message to the content script
var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab){
			var bgImg = chrome.extension.getURL('img/VpsNbi4.gif');
	    chrome.tabs.sendMessage(tab.id, {type: "colors-div", img: "url(" + bgImg + ")"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "diglettized!"});
	});
}


//audio stuff

var audioElement = document.createElement('audio');
 audioElement.setAttribute("preload", "auto");
 audioElement.autobuffer = true;

 var source1 = document.createElement('source');
 source1.type= 'audio/mp3';
 source1.src= 'mp3/diglettdig.mp3';
 audioElement.appendChild(source1);

 chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action == "play"){
          audioElement.load;
          audioElement.play();
      }
});
