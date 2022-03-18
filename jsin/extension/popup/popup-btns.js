function addOpenTabListener(element, u) {
	document.querySelector(element).addEventListener("click", () => {
		chrome.tabs.create({ url: u });
		window.close();
	});
};

addOpenTabListener("#ghlogo", "https://github.com/jabenuk/jsin-extension");
addOpenTabListener("#rulesets-btn", "/extension/dashboard.html");