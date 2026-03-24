/**
 * Captures the demo slides and generates example.png for the README.
 * Run from the repo root: node scripts/generate-example.js
 */

const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8745;
const REPO_ROOT = path.join(__dirname, '..');

// Minimal static file server
function serve(root, port) {
  return http.createServer((req, res) => {
    const filePath = path.join(root, req.url === '/' ? '/demo/index.html' : req.url);
    const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png' };
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': types[ext] || 'text/plain' });
      res.end(data);
    });
  }).listen(port);
}

(async () => {
  console.log('Starting server...');
  const server = serve(REPO_ROOT, PORT);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1400, height: 700 });

  console.log('Loading demo...');
  await page.goto(`http://localhost:${PORT}/demo/index.html`);

  // Wait for fonts and SVG filters to settle
  await page.waitForFunction(() => document.fonts.ready);
  await page.waitForTimeout(1200);

  console.log('Capturing screenshot...');
  // Capture the full page so nothing is clipped
  const buffer = await page.screenshot({ type: 'png', fullPage: true });

  const outPath = path.join(REPO_ROOT, 'example.png');
  fs.writeFileSync(outPath, buffer);

  await browser.close();
  server.close();

  console.log(`Saved → example.png (${(buffer.length / 1024).toFixed(0)}KB)`);
})();
