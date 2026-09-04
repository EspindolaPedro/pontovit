import { z } from "zod";
import {
  sanitizeEmail,
  sanitizePlainText,
  sanitizeRichText,
  sanitizeSlug,
  sanitizeUrl,
} from "../security/sanitize";

const text = (maxLength: number, minLength = 0) => z.preprocess(
  (value) => sanitizePlainText(value, maxLength),
  z.string().min(minLength),
);
const optionalText = (maxLength: number) => z.preprocess(
  (value) => value == null || value === "" ? undefined : sanitizePlainText(value, maxLength),
  z.string().optional(),
);

export const EmailSchema = z.preprocess((value) => sanitizeEmail(value), z.string().email().max(254));
export const UrlSchema = z.preprocess((value) => sanitizeUrl(value), z.string().url().max(2048));
const optionalEmail = () => z.preprocess(
  (value) => value == null || value === "" ? undefined : sanitizeEmail(value),
  z.string().email().max(254).optional(),
);
const optionalUrl = () => z.preprocess(
  (value) => value == null || value === "" ? undefined : sanitizeUrl(value),
  z.string().url().max(2048).optional(),
);

export const PostUpsertSchema = z.object({
  title: text(180, 3),
  slug: z.preprocess((value) => sanitizeSlug(value), z.string().min(3).max(160)),
  excerpt: optionalText(320),
  content: z.preprocess((value) => typeof value === "string" ? sanitizeRichText(value) : value, z.unknown()),
  categoryIds: z.array(z.string().cuid()).max(20).default([]),
  coverMediaId: z.string().cuid().optional().nullable(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  seoTitle: optionalText(180),
  seoDescription: optionalText(320),
  seoCanonical: z.preprocess((value) => value ? sanitizeUrl(value) : undefined, z.string().url().optional()),
  seoNoIndex: z.boolean().default(false),
});

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(8).max(128),
});

export const ContactSchema = z.object({
  name: text(120, 2),
  company: optionalText(160),
  email: EmailSchema,
  phone: optionalText(40),
  subject: text(120, 2),
  message: optionalText(2000),
  website: optionalText(200),
});

export const CategorySchema = z.object({
  name: text(100, 2),
  slug: z.preprocess((value) => sanitizeSlug(value), z.string().min(2).max(120)),
  description: optionalText(300),
});

export const BrandLogoSchema = z.object({
  group: z.enum(["CLIENT", "PARTNER"]),
  name: text(120, 2),
  altText: text(180, 2),
  mediaId: z.string().cuid(),
  sortOrder: z.number().int().min(0).max(9999).default(0),
  isVisible: z.boolean().default(true),
});

export const SiteSettingsSchema = z.object({
  companyName: text(120, 2),
  description: optionalText(500),
  logoMediaId: z.string().cuid().optional().nullable(),
  email: optionalEmail(),
  phone: optionalText(50),
  whatsapp: optionalText(30),
  whatsappMessage: optionalText(500),
  address: optionalText(240),
  defaultSeoTitle: optionalText(180),
  defaultSeoDescription: optionalText(320),
});

export const SocialLinkSchema = z.object({
  platform: text(40, 2),
  label: text(80, 2),
  url: UrlSchema,
  sortOrder: z.number().int().min(0).max(9999).default(0),
  isVisible: z.boolean().default(true),
});

export const CtaSettingsSchema = z.object({
  headerLabel: optionalText(80),
  heroLabel: optionalText(80),
  footerLabel: optionalText(80),
  target: optionalUrl(),
});

export const MediaUpdateSchema = z.object({
  altText: text(180, 2),
  focalPointX: z.number().min(0).max(100).default(50),
  focalPointY: z.number().min(0).max(100).default(50),
});

export const MagnoFocalPointSchema = z.object({
  focalPointX: z.number().min(0).max(100),
  focalPointY: z.number().min(0).max(100),
});

export const CodeInjectionSchema = z.object({
  name: text(100, 2),
  location: z.enum(["HEADER", "FOOTER"]),
  html: z.preprocess((value) => sanitizePlainText(value, 20000), z.string()).default(""),
  css: z.preprocess((value) => sanitizePlainText(value, 20000), z.string()).default(""),
  javascript: z.preprocess((value) => sanitizePlainText(value, 20000), z.string()).default(""),
  isEnabled: z.boolean().default(false),
});

export const UserCreateSchema = z.object({
  name: text(120, 2),
  email: EmailSchema,
  password: z.string().min(12).max(128),
  role: z.enum(["OWNER", "ADMIN", "EDITOR", "AUTHOR"]).default("AUTHOR"),
});

export const ApiKeyCreateSchema = z.object({
  name: text(100, 2),
  scopes: z.array(z.enum(["posts:read", "posts:write", "posts:delete"])).min(1).max(10),
  expiresAt: z.coerce.date().optional(),
});
