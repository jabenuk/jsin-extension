function loadScriptIntoCurrentWebpage(contents) {
	const executing = browser.tabs.executeScript({
		code: contents,
		allFrames: true
	});
	executing.then(()=>{}, ()=>{});
}