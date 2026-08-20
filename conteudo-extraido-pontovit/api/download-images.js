const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = __dirname;
const dest = path.join(dir, '..', '..', 'public', 'assets', 'blog');
const downloads = JSON.parse(fs.readFileSync(dir + '/blog-image-downloads.json', 'utf8'));

function fetchOnce(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        resolve(null);
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', () => resolve(null));
  });
}

(async () => {
  let ok = 0, fail = 0;
  for (const d of downloads) {
    let buf = null;
    for (const url of d.candidates) {
      buf = await fetchOnce(url);
      if (buf) break;
    }
    if (buf) {
      fs.writeFileSync(path.join(dest, d.file), buf);
      ok++;
    } else {
      fail++;
      console.log('FAILED ALL CANDIDATES:', d.file);
    }
  }
  console.log(`OK: ${ok}  FAIL: ${fail}`);
})();
