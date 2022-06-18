function clientError(brief, promiseErr) {
    // show error on client side
    browser.tabs.executeScript({ code: `console.error("[jSin] ${brief}. More information below...\\n\\n${promiseErr}");` });

    // show error on internal extension side
    console.error(`${brief}. More information below...\n\n${promiseErr}`);
}

function clientLog(desc) {
    // show message on client side
    browser.tabs.executeScript({ code: `console.log("[jSin] ${desc}");` });

    // show message on internal extension side
    console.log(`${desc}`);
}
