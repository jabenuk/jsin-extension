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

// function to add tab-opening functionality to buttons which is normally limited by extensions
function addOpenTabListener(element, u) {
    // enable the usage of `element` as a button.
    // `u` is the URL that will open in a new tab when the button is clicked.
    document.querySelector(element).addEventListener("click", () => {
        chrome.tabs.create({ url: u });
        window.close();
    });
};

document.addEventListener("DOMContentLoaded", () => {
    // allow for buttons that open pages in new tabs.
    addOpenTabListener("#ghlogo", "https://github.com/jabenuk/jsin-extension");
    addOpenTabListener("#rulesets-btn", "/frontend/dashboard.html");

    var textarea = document.getElementById("test_jscode");
    var injectBtn = document.getElementById("test_injectbtn");

    browser.tabs.query({ active: true }).then((tab) => {
        // URL of the tab
        // we use this as the key for the extension storage for each page
        let url = tab[0].url;

        // get storage at the key of the current URL
        browser.storage.sync.get(url).then((value) => {
            // if the extension storage was recieved, print a log message
            clientLog(`extension storage recieved`);

            if (value[url] != undefined) {
                textarea.value = value[url];
            } else {
                textarea.value = "";
            }
        }, (error) => {
            clientError(`failed to retrieve data from synced storage`, error);
        });

        injectBtn.addEventListener("click", () => {
            // initial run of the script
            browser.tabs.executeScript({ code: textarea.value }).then(() => {
                // console.log instead of clientLog, as it is not necessary to print to the client-side.
                console.log(`script was executed successfully at URL ${url}`);
            }, (error) => {
                clientError(`failed to execute script`, error);
            });

            // save the script to a key of the current URL
            var keypair = {};
            keypair[url] = textarea.value;

            // save this script to extension storage
            browser.storage.sync.set(keypair).then(() => {
                clientLog(`saved script contents to synced extension storage`);
                window.close();
            }, (error) => {
                clientError(`failed to save script to synced storage`, error);
                window.close();
            });
        });
    });
});
