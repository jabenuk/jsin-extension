document.addEventListener("DOMContentLoaded", () => {
	// ========
	// POPUP
	// ========

	try {
		// ---
		// allow for buttons that open pages in new tabs.
		//

		function addOpenTabListener(element, u) {
			// enable the usage of `element` as a button.
			// `u` is the URL that will open in a new tab when the button is clicked.
			document.querySelector(element).addEventListener("click", () => {
				chrome.tabs.create({ url: u });
				window.close();
			});
		};

		addOpenTabListener("#ghlogo", "https://github.com/jabenuk/jsin-extension");
		addOpenTabListener("#rulesets-btn", "/src/application/dashboard.html");
	} catch {}

	// ========
	// DASHBOARD
	// ========

	// the amount of emoticons possible
	// (i.e. the amount of SVG files in /resources/svg/symbol/emoticon)
	const emoticonCount = 11;

	// choose emoticon for empty ruleset list
	function chooseEmoticon(index) {
		try {
			// load from emoticons folder
			document.querySelector("#emoticon").src = `../../resources/svg/symbolic/emoticon/${index}.svg`;
		} catch {}
	}

	// use random emoticon for empty ruleset list at page load
	chooseEmoticon(Math.floor(Math.random() * emoticonCount));

	// animate the emoticon every time it changes
	try {
		let emoticonElement = document.querySelector("#emoticon");
		emoticonElement.classList.add("animated");

		setTimeout(() => {
			emoticonElement.classList.remove("animated");
		}, 200);

		// button to change emoticon to random
		document.querySelector(".corner-logo").addEventListener("click", () => {
			chooseEmoticon(Math.floor(Math.random() * emoticonCount));

			emoticonElement.classList.add("animated");
			setTimeout(() => {
				emoticonElement.classList.remove("animated");
			}, 200);
		});
	} catch {}
});
