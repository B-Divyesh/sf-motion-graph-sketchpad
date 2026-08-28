# Demo sandbox

- URL: `https://motion-graph-sketchpad.sociobot.in/?demo=1` (also `/demo`; local: `http://127.0.0.1:4173/?demo=1`). Opening either URL enters the isolated sample directly.
- Sample: “Lantern drift,” a 2.4 second sketch with Drift X, Lift, Scale, and Glow colour properties.
- Reset: choose **Reset demo** in the persistent amber banner.
- Exit: choose **Open my real sketch**. Demo changes are discarded.
- Storage: demo mode is memory-only. It never reads or writes the real `motion-graph-sketchpad:sketch:v1` localStorage key.
- Offline verification: visit `/demo`, wait for the service worker, reload once, set the browser context offline, then reload `/demo`.
