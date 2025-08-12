# JS Drum Kit (Improved)

A tiny, dependency‑free drum machine built with vanilla JavaScript. Hit **A–L** on your keyboard or **tap** the pads to play sounds. Designed to be fast, accessible, and mobile‑friendly.

## ✨ Features
- **Keyboard** input (A–L), with fast re‑triggers (`audio.currentTime = 0`).
- **Tap / Click** support for phones and tablets.
- **Enter / Space** triggers when a pad is focused (keyboard accessible).
- **Volume slider** and **Mute** toggle controlling all samples.
- **Preloaded audio** for snappy first hits.
- **Smooth pad animation** with `transitionend` cleanup on `transform`.
- **Responsive layout**, no frameworks, no build step.

## 🧩 Quick Start
1. Clone or download this repo:
   ```bash
   git clone https://github.com/<you>/js-drum-kit.git
   cd js-drum-kit
   ```
2. (Optional) Add your audio files into a `sounds/` folder. Default names used are:
   - `clap.wav`, `hihat.wav`, `kick.wav`, `openhat.wav`, `boom.wav`, `ride.wav`, `snare.wav`, `tom.wav`, `tink.wav`
3. Open `index.html` in your browser — or run a tiny static server:
   ```bash
   # Python 3
   python -m http.server 5173
   # then visit http://localhost:5173
   ```

## 🗂️ Project Structure
```
.
├── index.html
├── style.css
├── script.js
├── sounds/               
└── README.md
```

## ⌨️ Key Mapping
Default mapping uses numeric `keyCode`s for compatibility with the original JS30 project.

| Key | keyCode | Sound    |
|-----|---------|----------|
| A   | 65      | clap     |
| S   | 83      | hihat    |
| D   | 68      | kick     |
| F   | 70      | openhat  |
| G   | 71      | boom     |
| H   | 72      | ride     |
| J   | 74      | snare    |
| K   | 75      | tom      |
| L   | 76      | tink     |

> Prefer the modern API? You can switch to `KeyboardEvent.code` (e.g., `KeyA`) and update your `data-key` attributes accordingly.

## 🔧 Customizing
- **Change sounds:** replace files in `sounds/` or edit the `<audio data-key="...">` tags in `index.html` to point to your files.
- **Add a new pad:** duplicate a `.key` block in `index.html`, add a matching `<audio>` tag, and ensure both share the same `data-key` value.
- **Update animations:** tweak `.key` and `.key.playing` in `style.css` (e.g., scale, shadows, colors).

Example: add the **Q** key (keyCode **81**)
```html
<!-- In the .keys section -->
<div data-key="81" class="key" role="button" tabindex="0" aria-label="shaker (Q)">
  <kbd>Q</kbd><span class="sound">shaker</span>
</div>

<!-- And its audio tag -->
<audio data-key="81" src="sounds/shaker.wav" preload="auto"></audio>
```
No JavaScript change is needed—`script.js` looks up elements by `data-key`.

## 🧠 How It Works (script.js)
- Listens for `keydown` and **ignores `e.repeat`** to avoid stutter when holding a key.
- On press/tap, finds matching `<audio>` and `.key` via `data-key` and plays the sound.
- Calls `audio.currentTime = 0` to allow rapid re‑triggers.
- Adds `.playing` to animate the pad; removes it on `transitionend` **for `transform` only**.
- Volume & mute: sets `audio.volume` for all `<audio>` elements; `Mute` toggles `aria-pressed` and sets volume to `0`.

## 🧪 Troubleshooting
- **No sound on first press:** some browsers block autoplay; user interaction (key/tap) is required. If you still see errors, check DevTools Console.
- **Pad stays highlighted:** `removeTransition` should check `e.propertyName === "transform"`. If it uses `"transition"`, the class won’t be removed.
- **Wrong sound / no sound:** verify `data-key` matches on both the `.key` and `<audio>` elements, and that file paths are correct.
- **Safari/Codec issues:** try 16‑bit PCM WAV files or add alternate formats (like `.mp3`) if needed.

## 🚀 Deploy (GitHub Pages)
1. Commit and push to GitHub.
2. In your repo: **Settings → Pages**.
3. Select **Deploy from branch** → Branch: `main` → Folder: `/ (root)` → **Save**.
4. Your site will appear at `https://<you>.github.io/<repo>/`.

## 🙌 Credits
Inspired by the **JS30 Drum Kit** by Wes Bos. This variant adds touch support, volume/mute, and accessibility tweaks.
