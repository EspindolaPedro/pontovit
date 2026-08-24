import sanitizeHtml from "sanitize-html";

const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export function sanitizePlainText(value: unknown, maxLength = 5000) {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARACTERS, "").trim().slice(0, maxLength);
}

export function sanitizeEmail(value: unknown) {
  return sanitizePlainText(value, 254).toLowerCase();
}

export function sanitizeSlug(value: unknown) {
  return sanitizePlainText(value, 160)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function sanitizeUrl(value: unknown) {
  const url = sanitizePlainText(value, 2048);
  if (!url) return "";

  try {
    const parsed = new URL(url);
    if (!["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol)) return "";
    return parsed.toString();
  } catch {
    return "";
  }
}

export function sanitizeRichText(value: unknown) {
  if (typeof value !== "string") return "";

  return sanitizeHtml(value, {
    allowedTags: ["p", "br", "h2", "h3", "h4", "strong", "em", "ul", "ol", "li", "blockquote", "a", "img"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    disallowedTagsMode: "discard",
    transformTags: {
      a: (_tagName, attribs) => ({
        tagName: "a",
        attribs: {
          href: sanitizeUrl(attribs.href) || "#",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      img: (_tagName, attribs) => ({
        tagName: "img",
        attribs: {
          src: sanitizeUrl(attribs.src) || "",
          alt: sanitizePlainText(attribs.alt, 250),
        },
      }),
    },
  });
}

export function sanitizeContentDocument(value: unknown): unknown {
  if (typeof value === "string") return sanitizeRichText(value);
  if (Array.isArray(value)) return value.map(sanitizeContentDocument);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [sanitizePlainText(key, 80), sanitizeContentDocument(child)]),
    );
  }
  return value;
}
