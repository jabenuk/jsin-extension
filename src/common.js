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
