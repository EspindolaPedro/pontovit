export type AdminIconName = "overview" | "content" | "media" | "brand" | "settings" | "access" | "plus" | "close" | "upload" | "arrow" | "trash" | "chevron";

const iconPaths: Record<AdminIconName, React.ReactNode> = {
  overview: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
  content: <><path d="M6 3.5h8l4 4V20.5H6z" /><path d="M14 3.5v4h4M9 12h6M9 16h6" /></>,
  media: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><circle cx="8.5" cy="9" r="1.2" /><path d="m5 17 4.5-4 3 2.5 2.3-2 4.2 3.5" /></>,
  brand: <><circle cx="8" cy="8" r="3" /><circle cx="16.5" cy="9" r="2.5" /><path d="M3.5 19a4.5 4.5 0 0 1 9 0M14 19a3.5 3.5 0 0 1 6.5 0" /></>,
  settings: <><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" /><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3.1 1.3v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3.1-1.3l-.1.1a1.8 1.8 0 0 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-1.3-3.1h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 1.3-3.1l-.1-.1a1.8 1.8 0 0 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3.1-1.3V1.3a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3.1 1.3l.1-.1a1.8 1.8 0 0 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 1.3 3.1h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-1.3 3Z" /></>,
  access: <><circle cx="8.5" cy="15.5" r="3.5" /><path d="m11 13 7.5-7.5M16 5h3v3M12 15.5h.01" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  upload: <><path d="M12 15.5V4M12 4 7.5 8.5M12 4l4.5 4.5" /><path d="M4.5 15.5v2.8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2.8" /></>,
  arrow: <path d="M6 12h12M13 7l5 5-5 5" />,
  trash: <><path d="M5 7h14M9.5 7V5a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 5v2" /><path d="M6.5 7 7.3 19a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9L17.5 7" /><path d="M10.3 11v6M13.7 11v6" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
};

export function AdminIcon({ name, className }: { name: AdminIconName; className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}
