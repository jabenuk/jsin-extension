<img src="jsin/resources/svg/brand/jsin.svg" align=left>

# jSin: your average JavaScript injector

jSin (or JSIN; **J**ava**S**cript **IN**jector) is a simple, work-in-progress, free-and-open-source JavaScript injector extension. It aims to be as simple and minimal as possible.

If you want a built-in text editor, use another extension instead - any other ones will be better than what I could make anyway. Unless someone else who knows what they're doing wants to contribute and add a text editor page (which I would welcome), that idea will not be implemented. Besides, I recommend you use [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/) instead.

## jSin will not be published on the Chrome Web Store

To publish extensions to the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions), you need to register as a "Chrome Web Store Developer". This requires developers to be of a certain age (probably 18), which is fine. However, I would need to give Google **actual ID** in order to 'verify' my age. **See the problem?** I am not, and will *never*, give Google information that personal. It's simply a major, and *blatant*, breach of privacy.

![image](https://user-images.githubusercontent.com/57215724/162618882-3444cc15-f4f0-4d17-b85f-a0cff5b30d5f.png)

Unfortunately, this means that Chrome users (which I understand is a lot of people) are going to have to install the extension **unpacked.** More on that [below](#on-google-chrome).

| The Firefox equivalent does not seem to need this information, so the extension will hopefully be put on there when it is in a somewhat complete state. |
| - |

## Installation as an unpacked extension

jSin is not on **any** web stores yet as its development is far from complete; however, you can still download and use the extension locally. This process differs from browser to browser.

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
