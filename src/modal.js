// disable textarea newlines where necessary
document.querySelector("#tab-general #name textarea").addEventListener("keydown", (e) => {
    // enter is pressed
    if (e.keyCode === 13) {
        // suppress default behaviour
        e.preventDefault();
    }
})
