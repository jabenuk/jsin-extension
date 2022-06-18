document.addEventListener("DOMContentLoaded", () => {
	// the amount of emoticons possible
	// (i.e. the amount of SVG files in /resources/svg/symbol/emoticon)
	const emoticonCount = 11;

	// choose emoticon for empty ruleset list
	function chooseEmoticon(index) {
		// load from emoticons folder
		document.querySelector("#emoticon").src = `../../resources/svg/symbolic/emoticon/${index}.svg`;
	}

	// use random emoticon for empty ruleset list at page load
	chooseEmoticon(Math.floor(Math.random() * emoticonCount));

	// animate the emoticon every time it changes
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
});
