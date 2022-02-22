function addOpenTabListener(element, u) {
	document.querySelector(element).addEventListener("click", () => {
		chrome.tabs.create({ url: u });
		window.close();
	});
};

addOpenTabListener("#rulesets-btn", "/extension/dashboard.html");
addOpenTabListener("#ghlogo", "https://github.com/jabenuk/jsin-extension");