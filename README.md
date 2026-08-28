# Motion Graph Sketchpad

Sketch numeric and colour property motion before committing to code or a full timeline editor.

The tool is for web and game creators. Add up to eight properties, place keyframes, preview easing, then export CSS, Web Animations code, or JSON.

Live site: <https://motion-graph-sketchpad.sociobot.in>

## Try the isolated demo

Open <https://motion-graph-sketchpad.sociobot.in/?demo=1>. It loads the “Lantern drift” sample with four animated properties. Demo edits use memory only and disappear when you leave.

Use **Reset demo** to restore the sample. Use **Open my real sketch** to leave the demo.

## Run locally

Requirements: Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open `http://localhost:5173/?demo=1` for the sample or `/` for a real sketch.

## Test and build

```sh
npm test
npm run build
```

The exact production build command is `npm run build`. It writes the static site to `dist/`, with `dist/index.html` at the root.

Run one public claim by its tag:

```sh
npm test -- --grep @claim:three-exports
```

Claim definitions and sandbox steps are in [`.factory/claims.json`](.factory/claims.json). The demo contract is in [`.factory/demo.md`](.factory/demo.md).

## Controls

- Drag a keyframe left or right to change its time.
- Focus a keyframe and press Left or Right Arrow for a 50 ms step.
- Hold Shift while pressing an arrow key for a 250 ms step.
- Choose an easing name in the selected keyframe panel.
- Import a JSON sketch or download CSS, Web Animations, and JSON files.

## Data and offline use

Real sketches use one localStorage key: `motion-graph-sketchpad:sketch:v1`. Demo mode does not read or write that key. After one online visit, the browser stores the files needed to reopen the app offline.

The app has no accounts. During the demo, it connects only to this website. See the [privacy page](https://motion-graph-sketchpad.sociobot.in/privacy).

## Deployment

Deploy the contents of `dist/` as a static site. `staticwebapp.config.json` includes history fallback, the custom 404 response, security headers, and cache-safe asset handling. Infrastructure, DNS, and billing stay outside this repository.

## License

MIT. See [LICENSE](LICENSE).
