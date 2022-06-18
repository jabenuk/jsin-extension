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

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        // get info about the updated tab
        browser.tabs.get(tabId).then((tabInfo) => {
            // retrieve all contents from synced extension storage
            browser.storage.sync.get(null).then((value) => {
                // if the script saved to the updated tab is not empty...
                if (value[tabInfo.url] != undefined) {
                    // execute the script saved to the updated tab
                    browser.tabs.executeScript({ code: value[tabInfo.url] }).then(() => {
                        // console.log instead of clientLog, as it is not necessary to print to the client-side.
                        console.log(`script was executed successfully at URL ${url}`);
                    }, (error) => {
                        browser.tabs.executeScript({ code: `console.error("[jSin] failed to execute script. More information below...\\n\\n${error}");` });
                        console.error(`failed to execute script. More information below...\n\n${error}`);
                    });
                }
            }, (error) => {
                browser.tabs.executeScript({ code: `console.error("[jSin] failed to retrieve data from synced storage. More information below...\\n\\n${error}");` });
                console.error(`failed to retrieve data from synced storage. More information below...\n\n${error}`);
            });
        }, (error) => {
            browser.tabs.executeScript({ code: `console.error("[jSin] failed to get tab info. More information below...\\n\\n${error}");` });
            console.error(`failed to get tab info. More information below...\n\n${error}`);
        });
    }
});
