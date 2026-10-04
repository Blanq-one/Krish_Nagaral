// Copy dist/index.html to dist/404.html so GitHub Pages serves the SPA
// for deep links (e.g. /Krish_Nagaral/project/13) on refresh.
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
console.log('SPA fallback: dist/404.html created');
