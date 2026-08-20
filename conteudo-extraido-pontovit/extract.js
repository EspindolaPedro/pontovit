const fs = require('fs');
const path = require('path');

const base = __dirname;
const rawDir = path.join(base, 'raw');
const pages = fs.readdirSync(rawDir).filter(f => f.endsWith('.html'));

for (const file of pages) {
  const name = file.replace(/\.html$/, '');
  let html = fs.readFileSync(path.join(rawDir, file), 'utf8');

  // Remove known malicious injection blocks (active site compromise, not real content)
  html = html.replace(/<!DOCTYPE html><html><head><title>WP Repair<\/title>[\s\S]*?<\/html>/gi, '');
  html = html.replace(/<!DOCTYPE html><html><head><title>WP System<\/title>[\s\S]*?<\/html>/gi, '');

  // Links
  const hrefMatches = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  const links = [...new Set(hrefMatches)]
    .filter(h => !h.startsWith('#'))
    .filter(h => !/\/(8139a966932a|58c534bd93ee)\/?$/.test(h)) // paginas de defacement do invasor
    .sort();

  // YouTube links (href, src, iframe, plain text)
  const ytRegex = /(?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)[\w-]+[^"'\s]*|youtu\.be\/[\w-]+[^"'\s]*)/gi;
  const ytLinks = [...new Set((html.match(ytRegex) || []))].sort();

  // Visible text
  let text = html;
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<!--[\s\S]*?-->/g, '');
  text = text.replace(/<(h[1-6]|p|div|section|li|br|tr|title)[^>]*>/gi, '\n');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#215;/g, 'x')
    .replace(/&times;/g, 'x')
    .replace(/&hellip;/g, '...')
    .replace(/&quot;/g, '"');
  const lines = text.split('\n')
    .map(l => l.replace(/\s+/g, ' ').trim())
    .filter(l => l.length > 0)
    .filter(l => !/hacked by coupdegrace/i.test(l));

  const pageDir = path.join(base, 'paginas', name);
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, 'textos.txt'), lines.join('\n'), 'utf8');
  fs.writeFileSync(path.join(pageDir, 'links.txt'), links.join('\n'), 'utf8');
  fs.writeFileSync(path.join(pageDir, 'youtube.txt'), ytLinks.length ? ytLinks.join('\n') : '(nenhum link de YouTube encontrado nesta pagina)', 'utf8');

  console.log(`${name}: ${lines.length} linhas de texto, ${links.length} links, ${ytLinks.length} links de YouTube`);
}
