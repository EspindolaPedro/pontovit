const fs = require('fs');
const path = require('path');
const dir = __dirname;

const posts = JSON.parse(fs.readFileSync(dir + '/posts_clean.json', 'utf8'));
const categoriesRaw = fs.readFileSync(dir + '/categories.json', 'utf8');
const categories = JSON.parse(categoriesRaw.slice(categoriesRaw.indexOf('[')));
const categoryNames = Object.fromEntries(categories.map((c) => [c.id, c.name]));

const JUNK_SLUGS = new Set(['x', 'x-2']);

function decodeEntities(str) {
  return str
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#215;/g, 'x')
    .replace(/&times;/g, 'x')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&quot;/g, '"')
    .trim();
}

function cleanInlineHtml(html) {
  return decodeEntities(html)
    .replace(/\s+/g, ' ')
    .replace(/<a\s+[^>]*href="([^"]*pontovit\.com\.br[^"]*)"[^>]*>/gi, (m, href) => {
      try {
        const u = new URL(href);
        return `<a href="${u.pathname}">`;
      } catch {
        return m;
      }
    })
    .trim();
}

function parseBlocks(html) {
  const blocks = [];
  // Split on top-level block tags we care about, keep others as paragraphs.
  const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>|<p[^>]*>([\s\S]*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>|<ol[^>]*>([\s\S]*?)<\/ol>|<blockquote[^>]*>([\s\S]*?)<\/blockquote>|<figure[^>]*>([\s\S]*?)<\/figure>/gi;
  let match;
  while ((match = re.exec(html))) {
    if (match[1]) {
      const text = cleanInlineHtml(match[2]).replace(/<[^>]+>/g, '');
      if (text) blocks.push({ type: 'h' + match[1], text });
    } else if (match[3] !== undefined) {
      const inner = cleanInlineHtml(match[3]);
      const text = inner.replace(/<[^>]+>/g, '').trim();
      if (text) blocks.push({ type: 'p', html: inner });
    } else if (match[4] !== undefined || match[5] !== undefined) {
      const listHtml = match[4] !== undefined ? match[4] : match[5];
      const items = [...listHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((m) => cleanInlineHtml(m[1]).replace(/<[^>]+>/g, '').trim())
        .filter(Boolean);
      if (items.length) blocks.push({ type: 'ul', items });
    } else if (match[6]) {
      const text = cleanInlineHtml(match[6]).replace(/<[^>]+>/g, '');
      if (text) blocks.push({ type: 'quote', text });
    }
    // figure (match[7]) intentionally skipped — inline post images not localized in this pass.
  }
  return blocks;
}

function slugToImageName(slug, url) {
  const ext = (url.match(/\.(\w+)(?:\?.*)?$/) || [, 'jpg'])[1].toLowerCase();
  return `${slug}.${ext}`;
}

const result = [];
const downloads = [];

for (const p of posts) {
  if (JUNK_SLUGS.has(p.slug)) continue;
  if (decodeEntities(p.title.rendered) === 'Hacked by CoupDeGrace') continue;

  const blocks = parseBlocks(p.content.rendered || '');
  if (blocks.length === 0) continue; // skip empty/junk posts

  const media = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0];
  const sizes = media && media.media_details && media.media_details.sizes;
  // Several original/resized files were deleted server-side during the compromise, so we
  // can't know in advance which variant survives — collect every candidate URL, largest
  // first, and let the downloader try each until one actually returns 200.
  const candidates = [];
  if (media && media.source_url) candidates.push(media.source_url); // "full"
  if (sizes) {
    for (const key of ['large', 'medium_large', 'medium', 'thumbnail']) {
      if (sizes[key] && sizes[key].source_url) candidates.push(sizes[key].source_url);
    }
  }
  const imageUrl = candidates[0] || null;
  const imageFile = imageUrl ? slugToImageName(p.slug, imageUrl) : null;

  if (candidates.length && imageFile) downloads.push({ candidates, file: imageFile });

  const excerptText = decodeEntities((p.excerpt.rendered || '').replace(/<[^>]+>/g, '')).trim();
  const catNames = (p.categories || []).map((id) => categoryNames[id]).filter(Boolean);
  const category = catNames.find((c) => c !== 'Destaques') || catNames[0] || 'Sem categoria';

  result.push({
    slug: p.slug,
    title: decodeEntities(p.title.rendered),
    date: p.date.slice(0, 10),
    category,
    excerpt: excerptText || (blocks.find((b) => b.type === 'p') || {}).html?.replace(/<[^>]+>/g, '').slice(0, 160) || '',
    image: imageFile ? `/assets/blog/${imageFile}` : null,
    blocks,
  });
}

result.sort((a, b) => (a.date < b.date ? 1 : -1));

fs.writeFileSync(dir + '/blog-posts.json', JSON.stringify(result, null, 2));
fs.writeFileSync(dir + '/blog-image-downloads.json', JSON.stringify(downloads, null, 2));

console.log('Total real posts:', result.length);
console.log('Images to download:', downloads.length);
