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

// prompt the user if they want to delete the ruleset at key
function deleteRulesetPrompt(key) {
	// display modal
	document.querySelector("#delete-prompt").classList.remove("closing");
	document.querySelector("#delete-prompt").style.display = "flex";

	// add functionality to modal cancel button
    document.querySelector("#delete-prompt .cancelbtn").replaceWith(document.querySelector("#delete-prompt .cancelbtn").cloneNode(true));
	document.querySelector("#delete-prompt .cancelbtn").addEventListener("click", () => {
		document.querySelector("#delete-prompt").classList.add("closing");
		// wait for the fade-out animation (initiated above) to complete
		setTimeout(() => {
			document.querySelector("#delete-prompt").style.display = "none";
		}, 100);
	});

	// add appropriate functionality to modal continue button
    document.querySelector("#delete-prompt .continuebtn").replaceWith(document.querySelector("#delete-prompt .continuebtn").cloneNode(true));
	document.querySelector("#delete-prompt .continuebtn").addEventListener("click", () => {
		document.querySelector("#delete-prompt").classList.add("closing");
		// wait for the fade-out animation (initiated above) to complete
		setTimeout(() => {
			document.querySelector("#delete-prompt").style.display = "none";
		}, 100);

		// sometimes an error is thrown and I don't know why, but it doesn't cause any harm, so let's just ignore it
		try {
			// get index of ruleset in the list items array
			let index = rulesetListItems.map((val) => { return val.key }).indexOf(key);
			// delete this ruleset permanently
			rulesetListItems[index].destroyPermanent();
		} catch {}
	});
}

editRulesetPrompt()

function editRulesetPrompt(key) {
	browser.storage.sync.get(key).then((rs_str) => {
        var ruleset = JSON.parse(rs_str[key]);
        var rulesetListItemIndex = rulesetListItems.map((val) => { return val.key }).indexOf(key);

        // edit prompt
        let modal = document.querySelector("#edit-prompt");

        // duplicate of the ruleset that will be applied on save or discarded on quit
        let workingBuffer = ruleset;

        // function to switch tab
        // 'tab' is the name of the tab to switch to
        function switchTab(tab) {
            // deselect all other tab buttons
            Array.from(modal.querySelector(".modal-tabs").children).forEach((t) => {
                if (tab !== t.classList[0]) {
                    t.classList.remove("current");
                } else {
                    t.classList.add("current");
                }
            });

            // hide all other tabs
            Array.from(modal.querySelectorAll(".edit-tab")).forEach((t) => {
                if (t !== modal.querySelector(`#tab-${tab.replace("tab", "")}`)) {
                    t.style.display = "none";
                } else {
                    t.style.removeProperty("display");
                }
            });

            // add appropriate class to the modal content element
            Array.from(modal.querySelector(".modal-content").classList).forEach((c) => {
                modal.querySelector(".modal-content").classList.add(tab.replace("tab", ""));
                if (c !== tab.replace("tab", "") && c !== "modal-content") {
                    modal.querySelector(".modal-content").classList.remove(c);
                }
            });

            if (tab === "sourcetab") {
                // simulate a scroll every time the flask comes into view to eliminate a visual bug
                flask.elTextarea.dispatchEvent(new MouseEvent("scroll"));
            }
        }

        // make tab buttons work
        Array.from(modal.querySelector(".modal-tabs").children).forEach((tab) => {
            tab.addEventListener("click", () => {
                switchTab(tab.classList[0]);
            });
        });

        // go to the general tab by default
        switchTab("generaltab");

        // display modal
        document.querySelector("#edit-prompt").classList.remove("closing"); // disable closing animation
        document.querySelector("#edit-prompt").style.display = "flex";

        // initialise content

        //
        // GENERAL TAB:
        //

        // set key display appropriately
        modal.querySelector("#tab-general #keydisplay").innerHTML = `ruleset key: ${key}`;

        // get name
        modal.querySelector("#tab-general #name textarea").value = ruleset.name;

        // get enabled status
        if (ruleset.enabled) {
            modal.querySelector("#tab-general #status").classList.add("enabled");
            modal.querySelector("#tab-general #status").classList.remove("disabled");
            modal.querySelector("#tab-general #status div").innerHTML = "ENABLED";
        } else {
            modal.querySelector("#tab-general #status").classList.add("disabled");
            modal.querySelector("#tab-general #status").classList.remove("enabled");
            modal.querySelector("#tab-general #status div").innerHTML = "DISABLED";
        }

        // disable textarea newlines where necessary
        modal.querySelector("#tab-general #name textarea").replaceWith(modal.querySelector("#tab-general #name textarea").cloneNode(true));
        modal.querySelector("#tab-general #name textarea").addEventListener("keydown", (e) => {
            // enter is pressed
            if (e.keyCode === 13) {
                // suppress default behaviour
                e.preventDefault();
            }
        });

        //
        // SOURCE TAB:
        //

        // update flask contents
        updateFlaskContent(key);

        //
        // URL TAB:
        //

        // disable textarea newlines where necessary
        modal.querySelector("#tab-url #entry textarea").replaceWith(modal.querySelector("#tab-url #entry textarea").cloneNode(true));
        modal.querySelector("#tab-url #entry textarea").addEventListener("keydown", (e) => {
            // enter is pressed
            if (e.keyCode === 13) {
                // suppress default behaviour
                e.preventDefault();
            }
        });

        // get URL
        modal.querySelector("#tab-url #entry textarea").value = ruleset.url;

        // adding more button functionality...

        //
        // GENERAL TAB:
        //

        // add functionality to the ENABLED/DISABLED button in the general tab
        // (first removing all old event listeners from the div)
        modal.querySelector("#tab-general #status div").replaceWith(modal.querySelector("#tab-general #status div").cloneNode(true));
        modal.querySelector("#tab-general #status div").addEventListener("click", () => {
            // this immediately updates the ruleset rather than being put into a buffer
            // we just directly modify the ruleset to achieve this
            rulesetListItems[rulesetListItemIndex].enabled = !rulesetListItems[rulesetListItemIndex].enabled;

            // re-run this code so that the button's appearance is updated.
            if (rulesetListItems[rulesetListItemIndex].enabled) {
                modal.querySelector("#tab-general #status").classList.add("enabled");
                modal.querySelector("#tab-general #status").classList.remove("disabled");
                modal.querySelector("#tab-general #status div").innerHTML = "ENABLED";
            } else {
                modal.querySelector("#tab-general #status").classList.add("disabled");
                modal.querySelector("#tab-general #status").classList.remove("enabled");
                modal.querySelector("#tab-general #status div").innerHTML = "DISABLED";
            }
        });

        //
        // NON-TABS:
        //

        // add functionality to the cancel button (do nothing and exit)
        modal.querySelector(".quitbtn").replaceWith(modal.querySelector(".quitbtn").cloneNode(true));
        modal.querySelector(".quitbtn").addEventListener("click", () => {
            document.querySelector("#edit-prompt").classList.add("closing");
            // wait for the fade-out animation (initiated above) to complete
            setTimeout(() => {
                document.querySelector("#edit-prompt").style.display = "none";
            }, 100);
        });

        // add functionality to the save button
        modal.querySelector(".savebtn").replaceWith(modal.querySelector(".savebtn").cloneNode(true));
        modal.querySelector(".savebtn").addEventListener("click", () => {
            // if there were any changes that weren't explicitly saved with a button (like name and URL), save them to workingBuffer now
            workingBuffer.name = modal.querySelector("#tab-general #name textarea").value;
            workingBuffer.url = modal.querySelector("#tab-url #entry textarea").value;

            // also, as the enabled status of the ruleset was directly modified, we must also apply this to workingBuffer or else the change
            // will be overwritten:
            workingBuffer.enabled = rulesetListItems[rulesetListItemIndex].enabled;

            // save the source code if it was updated
            workingBuffer.src = flask.getCode();

            // save the workingBuffer ruleset into the actual ruleset in synced storage
            var keypair = {};
            keypair[key] = JSON.stringify(workingBuffer);

            browser.storage.sync.set(keypair).then(() => {}, (error) => {
                console.error(`failed to save changes to ruleset. See more information below...\n\n`, error);
            });

            // update the ruleset list item
            rulesetListItems[rulesetListItemIndex].refresh();

            document.querySelector("#edit-prompt").classList.add("closing");
            // wait for the fade-out animation (initiated above) to complete
            setTimeout(() => {
                document.querySelector("#edit-prompt").style.display = "none";
            }, 100);
        });
    }, (error) => {
        console.error(`failed to get ruleset. See more information below...\n\n${error}`);
    });
}
