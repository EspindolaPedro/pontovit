const fs = require('fs');
const dir = __dirname;

function loadJson(file) {
  let raw = fs.readFileSync(dir + '/' + file, 'utf8');
  const start = raw.indexOf('[');
  raw = raw.slice(start);
  return JSON.parse(raw);
}

const pages = loadJson('pages.json');
const posts = loadJson('posts.json');

console.log('=== PAGES ===');
for (const p of pages) {
  console.log(p.id, p.slug, '|', p.title.rendered);
}

console.log('\n=== POSTS (' + posts.length + ') ===');
for (const p of posts) {
  const media = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0];
  console.log(p.id, p.slug, '|', p.date, '|', p.title.rendered, media ? '| IMG: ' + media.source_url : '| NO IMAGE');
}

fs.writeFileSync(dir + '/pages_clean.json', JSON.stringify(pages, null, 2));
fs.writeFileSync(dir + '/posts_clean.json', JSON.stringify(posts, null, 2));
