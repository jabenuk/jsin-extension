document.addEventListener("DOMContentLoaded", () => {
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
