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
