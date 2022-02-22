document.getElementById("rulesets-btn").addEventListener("click", () => {
	browser.tabs.create({
		url: "/extension/dashboard.html"
	});
	window.close();
})