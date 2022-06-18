// Copyright 2022 Jack Bennett

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
