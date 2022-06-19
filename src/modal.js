var modals = document.querySelectorAll(".modal")

modals.forEach((modal) => {
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.classList.add("closing");
            // wait for the fade-out animation (initiated above) to complete
            setTimeout(() => {
                modal.style.display = "none";
            }, 100);
        }
    });
});
