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

// list of cute emoticons
const emoticons = [
	"(„• ᴥ •„)",
	"( ´･﹏･｀)",
	"(´-﹏-｀)",
	"(；⌣̀_⌣́)",
	"(&gt;︵&lt;)",
	"(´-_-｀)",
	"¯\\_(ツ)_/¯",
	"(o_O)",
	"ヽ(•́ᴥ•̀)ノ",
	"(´･_･`)／",
	"(っ^ᴥ^)っ",
];

// choose emoticon for empty ruleset list
function chooseEmoticon(index) {
	try {
		document.querySelector("#emoticon").innerHTML = emoticons[index];
	} catch {}
}

// use random emoticon for empty ruleset list at page load
chooseEmoticon(Math.floor(Math.random() * emoticons.length));

// animate the emoticon every time it changes
try {
	let emoticonElement = document.querySelector("#emoticon");
	emoticonElement.classList.add("animated");

	setTimeout(() => {
		emoticonElement.classList.remove("animated");
	}, 200);
	
	// button to change emoticon to random
	document.querySelector(".corner-logo").addEventListener("click", () => {
		chooseEmoticon(Math.floor(Math.random() * emoticons.length));
		
		emoticonElement.classList.add("animated");
		setTimeout(() => {
			emoticonElement.classList.remove("animated");
		}, 200);
	});
} catch {}