type IconProps = { size?: number; className?: string };

function Icon({ children, size = 20, className }: IconProps & { children: React.ReactNode }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>;
}

export const ArrowUpRightIcon = (props: IconProps) => <Icon {...props}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>;
export const ArrowDownIcon = (props: IconProps) => <Icon {...props}><path d="M12 5v14" /><path d="m18 13-6 6-6-6" /></Icon>;
export const CircleDotIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" fill="currentColor" /></Icon>;
export const CheckIcon = (props: IconProps) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
export const MenuIcon = (props: IconProps) => <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>;
export const CloseIcon = (props: IconProps) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
export const ArrowRightIcon = (props: IconProps) => <Icon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></Icon>;
export const ArrowLeftIcon = (props: IconProps) => <Icon {...props}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></Icon>;
export const XIcon = (props: IconProps) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
export const QuoteIcon = (props: IconProps) => <Icon {...props}><path d="M9 11H5a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-4a6 6 0 0 0-6-6M22 11h-4a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h1a3 3 0 0 0 3-3v-4a6 6 0 0 0-6-6"/></Icon>;
export const MailIcon = (props: IconProps) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></Icon>;
export const PhoneIcon = (props: IconProps) => <Icon {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></Icon>;
export const MapPinIcon = (props: IconProps) => <Icon {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></Icon>;
export const MinusIcon = (props: IconProps) => <Icon {...props}><path d="M5 12h14"/></Icon>;
export const InstagramIcon = (props: IconProps) => <Icon {...props}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Icon>;
export const LinkedinIcon = (props: IconProps) => <Icon {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="2.8" r="1.6" /></Icon>;
export const YoutubeIcon = (props: IconProps) => <Icon {...props}><path d="M20.5 7.2a2.4 2.4 0 0 0-1.7-1.7C17.3 5 12 5 12 5s-5.3 0-6.8.5a2.4 2.4 0 0 0-1.7 1.7C3 8.7 3 12 3 12s0 3.3.5 4.8a2.4 2.4 0 0 0 1.7 1.7C6.7 19 12 19 12 19s5.3 0 6.8-.5a2.4 2.4 0 0 0 1.7-1.7C21 15.3 21 12 21 12s0-3.3-.5-4.8Z" /><path d="m10 9 5 3-5 3V9Z" /></Icon>;
export const FacebookIcon = (props: IconProps) => <Icon {...props}><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.8v8" /></Icon>;
export const WhatsappIcon = ({ size = 20, className }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M16.001 3C9.101 3 3.5 8.601 3.5 15.5c0 2.401.671 4.646 1.833 6.557L3 29l7.126-2.278a12.44 12.44 0 0 0 5.875 1.478h.005c6.9 0 12.499-5.599 12.499-12.5S22.901 3 16.001 3Zm0 22.8h-.004a10.28 10.28 0 0 1-5.24-1.435l-.376-.223-3.891 1.243 1.267-3.797-.245-.39A10.27 10.27 0 0 1 5.7 15.5c0-5.68 4.622-10.3 10.303-10.3 2.752 0 5.34 1.073 7.286 3.02a10.23 10.23 0 0 1 3.014 7.284c0 5.68-4.622 10.296-10.302 10.296Zm5.653-7.71c-.31-.155-1.831-.904-2.115-1.008-.284-.104-.49-.155-.697.155-.207.31-.8 1.008-.982 1.215-.181.207-.362.233-.672.078-.31-.155-1.309-.483-2.494-1.539-.922-.822-1.544-1.837-1.725-2.147-.181-.31-.02-.478.136-.632.14-.14.31-.362.465-.543.155-.181.207-.31.31-.517.104-.207.052-.388-.026-.543-.078-.155-.697-1.68-.955-2.301-.252-.604-.508-.522-.697-.532-.181-.008-.388-.01-.595-.01a1.14 1.14 0 0 0-.827.388c-.284.31-1.085 1.06-1.085 2.585 0 1.526 1.111 3.001 1.266 3.208.155.207 2.188 3.34 5.302 4.685.74.32 1.317.511 1.767.653.743.236 1.419.203 1.953.123.596-.089 1.831-.749 2.09-1.472.259-.723.259-1.343.181-1.472-.078-.129-.284-.207-.594-.362Z" />
  </svg>
);
export const ChevronRightIcon = (props: IconProps) => <Icon {...props}><path d="m9 6 6 6-6 6" /></Icon>;
export const GlobeIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z" /></Icon>;
export const DocumentIcon = (props: IconProps) => <Icon {...props}><path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v4h4M8.5 12.5h7M8.5 16h5" /></Icon>;
export const UserIcon = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></Icon>;
