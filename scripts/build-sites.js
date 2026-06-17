import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = process.cwd();
const publicFiles = [
  'index.html',
  'src/styles.css',
  'src/main.js',
  'src/icons.js',
  'src/utils/calculator.js',
  'src/utils/formatters.js',
  'src/components/InputsCalculator.js',
  'src/components/SummaryCards.js',
  'src/components/ResultsTable.js',
  'src/components/DynamicMessage.js',
  'src/components/Charts.js',
  'public/screenshot.jpeg',
];

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const dist = join(root, 'dist');
const publicRoot = join(dist, 'server', 'public');
const serverRoot = join(dist, 'server');
const openaiRoot = join(dist, '.openai');

await rm(dist, { recursive: true, force: true });
await mkdir(publicRoot, { recursive: true });
await mkdir(openaiRoot, { recursive: true });

const assets = {};

for (const file of publicFiles) {
  const source = join(root, file);
  const content = await readFile(source);
  const route = file === 'index.html' ? '/' : `/${file}`;
  const mimeType = mimeTypes[extname(file)] ?? 'application/octet-stream';
  assets[route] = {
    body: content.toString('base64'),
    mimeType,
  };
  await mkdir(join(publicRoot, file, '..'), { recursive: true });
  await writeFile(join(publicRoot, file), content);
}

const workerSource = `const assets = ${JSON.stringify(assets, null, 2)};

function responseFor(pathname) {
  const normalized = pathname.endsWith('/') ? '/' : pathname;
  const asset = assets[normalized] || assets['/'];
  const bytes = Uint8Array.from(atob(asset.body), (char) => char.charCodeAt(0));

  return new Response(bytes, {
    headers: {
      'content-type': asset.mimeType,
      'cache-control': normalized === '/' ? 'no-cache' : 'public, max-age=31536000, immutable',
    },
  });
}

export default {
  fetch(request) {
    const url = new URL(request.url);
    return responseFor(url.pathname);
  },
};
`;

await writeFile(join(serverRoot, 'index.js'), workerSource);
await writeFile(
  join(openaiRoot, 'hosting.json'),
  await readFile(join(root, '.openai', 'hosting.json')),
);
