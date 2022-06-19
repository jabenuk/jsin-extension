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

// this function does not create a list item - that must be done when the
// dashboard page is loaded.
function addRuleset(name, url, src, createListItem=true) {
    // ruleset object
    var ruleset = {
        // specified name, url, and src
        name: name,
        url: url,
        src: src,
        // enabled by default
        enabled: true
    };

    // random key instead of using name or url as multiple rulesets can have
    // the same name or URL
    var key = Math.random().toString(36).slice(2, 10);

    var keypair = {};
    keypair[key] = JSON.stringify(ruleset);

    // save this ruleset to synced extension storage
    browser.storage.sync.set(keypair).then(() => {
        console.log("saved a new ruleset to synced extension storage");
    }, (error) => {
        console.error(`failed to save ruleset to synced extension storage. See more information below...\n\n`, error);
    });

    // create graphical list item if desired
    if (createListItem) {
        addRulesetListItem(key);

        // run this in case this is the first ruleset
        existingRulesetsLayout();
    }
}

// wrapper/handle to a HTML element representing a ruleset.
class RulesetListItem {
    #name;
    #url;
    #src;
    #enabled;
    #element;

    // key is common with the ruleset stored in synced extension storage
    #key;

    constructor(key) {
        this.#key = key;

        browser.storage.sync.get(key).then((ruleset) => {
            let rs = JSON.parse(ruleset[key]);
            this.#name = rs.name;
            this.#url = rs.url;
            this.#src = rs.src;

            // create element
            this.#element = document.createElement("li");
            this.#element.classList.add("ruleset");

            // populate element with buttons
            {
                // edit (pencil) button
                let edit = document.createElement("li");
                edit.classList.add("material-symbols-outlined");
                edit.id = "edit";
                edit.title = "Edit this ruleset's properties";
                edit.innerHTML = "edit";

                // delete (rubbish bin) button
                let del = document.createElement("li");
                del.classList.add("material-symbols-outlined");
                del.id = "delete";
                del.title = "Delete this ruleset";
                del.innerHTML = "delete";

                // status (glowing icon) button
                let status = document.createElement("li");
                status.id = "status";

                // append these buttons into an unordered list
                let tools = document.createElement("ul");
                tools.appendChild(edit);
                tools.appendChild(del);
                tools.appendChild(status);

                // append this to the element
                this.#element.appendChild(tools);
            }

            browser.storage.sync.get(key).then((ruleset) => {
                let rs = JSON.parse(ruleset[key]);
                // use setter to change layout based on the 'enabled' argument
                this.enabled = rs.enabled;
            }, (error) => {
                console.error(`failed to get ruleset. See more information below...\n\n${error}`);
            });

            // add name and URL text to the element
            {
                // name
                let name = document.createElement("span");
                name.id = "name";
                name.innerHTML = this.#name;
                name.title = this.#name;

                // URL
                let url = document.createElement("span");
                url.id = "url";
                url.title = this.#url;

                // link inside the URL span
                let url_anchor = document.createElement("a");
                url_anchor.innerHTML = this.#url;
                url_anchor.href = this.#url;
                url.appendChild(url_anchor);

                // add these elements to an 'identifier' section
                let identifier = document.createElement("section");
                identifier.id = "identifier";
                identifier.appendChild(name);
                identifier.appendChild(document.createElement("br")); // line break
                identifier.appendChild(url);

                // append this to the element
                this.#element.appendChild(identifier);
            }

            // append element to the list of rulesets in the correct place based on index.
            document.querySelector(".rulesets > ul").appendChild(this.#element);
            // document.querySelector(".rulesets > ul").insertBefore(this.#element, document.querySelector(".rulesets > ul").children[index + 1]);

            // add functionality to the buttons
            {
                // add a status toggle feature to the status button
                this.#element.querySelector("ul > #status").addEventListener("click", () => {
                    this.enabled = !this.enabled;
                });
            }
        }, (error) => {
            console.error(`failed to get ruleset. See more information below...\n\n${error}`);
        });
    }

    // delete the HTML element that this class handles, and remove this object from the array of ruleset list items
    destroy() {
        this.#element.remove();
        rulesetListItems.splice(rulesetListItems.indexOf(this), 1);
    }

    // destroy the HTML element and also remove the ruleset from synced extension storage
    destroyPermanent() {
        browser.storage.sync.remove(this.#key).then(() => {
            this.destroy();

            // check if there are now no rulesets; if there is none left, change the layout back to empty-rulesets mode
            browser.storage.sync.get(null).then((items) => {
                if (Object.keys(items).length == 0) {
                    emptyRulesetsLayout();
                }
            }, (error) => {
                console.error(`failed to get rulesets. See more information below...\n\n${error}`);
            });

        }, (error) => {
            console.error(`failed to remove ruleset from synced extension storage. See more information below...\n\n`, error);
        })
    }

    // update the sync storage ruleset based on the contents (e.g. name, url, etc) of this ruleset list item.
    updateSyncRuleset() {
        var newRuleset = {
            name: this.#name,
            url: this.#url,
            src: this.#src,
            enabled: this.#enabled
        };

        var keypair = {};
        keypair[this.#key] = JSON.stringify(newRuleset);

        // save this ruleset to synced extension storage
        browser.storage.sync.set(keypair).then(() => {}, (error) => {
            console.error(`failed to update ruleset in synced extension storage. See more information below...\n\n`, error);
        });
    }

    get name() {
        return this.#name;
    }
    set name(val) {
        this.#name = val;

        this.#element.querySelector("#identifier > #name").innerHTML = val;
        this.#element.querySelector("#identifier > #name").title = val;

        this.updateSyncRuleset();
    }

    get url() {
        return this.#url;
    }
    set url(val) {
        this.#url = val;

        this.#element.querySelector("#identifier > #url > a").href = val;
        this.#element.querySelector("#identifier > #url > a").innerHTML = val;
        this.#element.querySelector("#identifier > #url > a").title = val;

        this.updateSyncRuleset();
    }

    get src() {
        return this.#src;
    }
    set src(val) {
        this.#src = val;

        this.updateSyncRuleset();
    }

    get enabled() {
        return this.#enabled;
    }
    set enabled(val) {
        this.#enabled = val;

        // update status element (glowing icon)
        if (val) {
            this.#element.querySelector("ul > #status").classList.add("enabled");
            this.#element.querySelector("ul > #status").classList.remove("disabled");
            this.#element.querySelector("ul > #status").title = "This ruleset is currently enabled, click to disable.";
        } else {
            this.#element.querySelector("ul > #status").classList.add("disabled");
            this.#element.querySelector("ul > #status").classList.remove("enabled");
            this.#element.querySelector("ul > #status").title = "This ruleset is currently disabled, click to enable.";
        }

        this.updateSyncRuleset();
    }

    get element() {
        return this.#element;
    }

    get key() {
        return this.#key;
    }
}

var rulesetListItems = [];

// function to create a graphical representation of a ruleset
function addRulesetListItem(key) {
    rulesetListItems.push(new RulesetListItem(key));
}

// refresh the list of ruleset lists
function refreshRulesetList() {
	browser.storage.sync.get(null).then((rulesets) => {
        // clear existing ruleset items
        for (let i = 0; i <= rulesetListItems.length; i++) {
            rulesetListItems[0].destroy();
        }

		// add a list item for each existing ruleset
        for (const [key, value] of Object.entries(rulesets)) {
            let rs = JSON.parse(value);
            addRulesetListItem(rs.name, rs.url, rs.src, rs.enabled, key);
        }
    }, (error) => {
		console.error(`failed to get existing rulesets. See more information below...\n\n${error}`);
    });
}
