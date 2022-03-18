<img src="/jsin/resources/favicon/128x128.png" align=left>

# jSin: your average JavaScript injector

jSin is a simple, work-in-progress, free-and-open-source JavaScript injector extension. It aims to be as simple and minimal as possible.

If you want a built-in text editor, use another extension instead - any other ones will be better than what I could make anyway. Unless someone else who knows what they're doing wants to contribute and add a text editor page (which I would welcome), that idea will not be implemented. Besides, I recommend you use [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/) instead.

## Installation as an unpacked extension

jSin is not on any web stores yet as its development is far from complete; however, you can still download and use the extension locally. This process differs from browser to browser.

### On Firefox

  1. Clone this repo with `git clone https://github.com/jabenuk/jsin-extension.git`.
  2. In Firefox, go to the URL `about:debugging`.
  3. In the *This Firefox* page, click *Load Temporary Add-on* and select [manifest.json](/jsin/manifest.json).
  4. The extension has been added and can now be used as normal.\*

\*Unpacked extensions are immediately unloaded when Firefox is closed, so you will unfortunately have to do this every time you open Firefox.

### On Google Chrome

  1. Clone this repo with `git clone https://github.com/jabenuk/jsin-extension.git`.
  2. In Chrome (or Chromium), go to the URL `chrome://extensions`.
  3. If not already enabled, enable *'Developer mode'* by clicking the slider in the top-right.
  4. Click *Load unpacked* and select the [jsin](/jsin) directory.
  5. The extension has been added and can now be used as normal.

### On another browser

Most browsers are either Chromium-based or Firefox-based, so just follow the appropriate instructions above. jSin should work, although it **has not been tested** on browsers other than Firefox and Chromium. Popular Chromium-based browsers include Google Chrome, Brave, Microsoft Edge, and Opera. Popular Firefox-based browsers include Firefox and Tor\*\*.

\*\*Although you really shouldn't install any extensions on Tor.
