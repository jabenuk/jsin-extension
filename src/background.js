browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        // get info about updated tab
        browser.tabs.get(tabId).then((tabInfo) => {
            // retrieve contents from sync storage
            browser.storage.sync.get(null).then((rs_str) => {
                // iterate through rulesets
                Object.values(rs_str).map(v => JSON.parse(v)).forEach((ruleset) => {
                    // return if source is empty
                    if (ruleset.src.length == 0 || ruleset.src == undefined) {
                        return;
                    }
                    // return if ruleset is disabled
                    if (!ruleset.enabled) {
                        return;
                    }
                    // return if not a good URL to inject on
                    if (tabInfo.url.includes("extension://") || tabInfo.url.includes("about:") || tabInfo.url.includes("chrome://")) {
                        return;
                    }

                    // check if the ruleset's URL selector includes this tab's URL
                    if (new RegExp(ruleset.url.replace(/([.?+^$[\]\\(){}|\/-])/g, "\\$1").replace(/\*/g, '.*')).test(tabInfo.url)) {
                        // execute the script saved for the tab
                        browser.tabs.executeScript({ code: ruleset.src }).then(() => {
                            console.log(`ruleset '${ruleset.name}' was executed successfully at URL ${tabInfo.url}`);
                        }, (error) => {
                            browser.tabs.executeScript({ code: `console.error("[jSin] failed to execute script. More information below...\\n\\n${error}");` });
                            console.error(`failed to execute script. More information below...\n\n${error}`);
                        });
                        
                        browser.tabs.executeScript({ code: `console.log("Injected JavaScript with jSin");` });
                    }
                })
            });
        });
    }
});
