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

// function to switch to empty-rulesets layout
function emptyRulesetsLayout() {
	document.querySelector(".rulesets").classList.add("empty");
	document.querySelector(".corner-logo").classList.remove("no-action");

	document.querySelector(".corner-logo").title = "Click me for +* kaomoji +*"

	// use random emoticon for empty ruleset list at page load
	randomiseEmoticon();
	// button to change emoticon to random
	document.querySelector(".corner-logo").addEventListener("click", () => {
		randomiseEmoticon();
	});
}

// function to switch to existing-rulesets layout
function existingRulesetsLayout() {
	// there should only be one .rulesets element
	document.querySelector(".rulesets").classList.remove("empty");
	document.querySelector(".corner-logo").classList.add("no-action");
}

// choose emoticon for empty ruleset list
function chooseEmoticon(index) {
	let emoticonElement = document.querySelector("#emoticon");

	// load from emoticons folder
	emoticonElement.src = `/resources/svg/symbolic/emoticon/${index}.svg`;

	// animate emoticon after being changed
	emoticonElement.classList.add("animated");
	setTimeout(() => {
		emoticonElement.classList.remove("animated");
	}, 200);
}

// function to pick a random emoticon (for empty-rulesets layout)
function randomiseEmoticon() {
	// the amount of emoticons possible
	// (i.e. the amount of SVG files in /resources/svg/symbol/emoticon)
	const emoticonCount = 11;

	chooseEmoticon(Math.floor(Math.random() * emoticonCount));
}

document.addEventListener("DOMContentLoaded", () => {
	// get buttons to add rulesets
	document.querySelectorAll(".create-ruleset-button").forEach((button) => {
		// add click event listener
		button.addEventListener("click", () => {
			console.log("ruleset created");
		});
	});

	// get any rulesets that have been added
	browser.storage.sync.get(null).then((rulesets) => {
		// set the layout according to the amount of items in sync storage
		browser.storage.sync.getBytesInUse(null).then((bytesUsed) => {
			if (bytesUsed <= 0) {
				emptyRulesetsLayout();
			} else {
				existingRulesetsLayout();
			}
		}, (error) => {
			console.error(`failed to get the size taken by synced storage. See more information below...\n\n${error}`);
		});

		// add a list item for each existing ruleset
		for (const [key, value] of Object.entries(rulesets)) {
			addRulesetListItem(key);
		}
	}, (error) => {
		console.error(`failed to get existing rulesets. See more information below...\n\n${error}`);
	});
});
