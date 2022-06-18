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
});
