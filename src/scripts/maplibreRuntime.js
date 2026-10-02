// maplibre-gl ships as a UMD bundle with no ESM entry point. Its UMD wrapper
// only assigns `window.maplibregl` when loaded as a plain <script> with no
// module/CommonJS system present; a bundler always provides one, so that
// branch never runs here and the global is never set -- `import maplibregl
// from 'maplibre-gl'` uses the bundler's own CJS interop (mapping the
// UMD's `module.exports` to this default import) instead of depending on
// that global, which is what actually works in a production Rollup build
// rather than only by accident in dev's unbundled module serving.
import maplibregl from 'maplibre-gl';

export default maplibregl;
