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
	addOpenTabListener("#rulesets-btn", "/extension/frontend/dashboard.html");
} catch {}

// ========
// DASHBOARD
// ========

try {
	// ---
	// use random emoticon for empty ruleset list

	// list of cute emoticons
	let emoticons = [
		"(„• ᴥ •„)",
		"( ´･﹏･｀)",
		"(´-﹏-｀)",
		"(；⌣̀_⌣́)",
		"(&gt;︵&lt;)",
		"(´-_-｀)",
		"¯\\_(ツ)_/¯"
	];

	let emoticonElement = document.querySelector("#emoticon");
	let randomNum = Math.floor(Math.random() * emoticons.length);

	emoticonElement.innerHTML = emoticons[randomNum];
} catch {}