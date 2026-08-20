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
export const PhoneIcon = (props: IconProps) => <Icon {...props}><path d="M6 3h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2C10 20 4 14 4 5a2 2 0 0 1 2-2Z"/></Icon>;
export const MapPinIcon = (props: IconProps) => <Icon {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></Icon>;
export const MinusIcon = (props: IconProps) => <Icon {...props}><path d="M5 12h14"/></Icon>;
export const InstagramIcon = (props: IconProps) => <Icon {...props}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></Icon>;
export const LinkedinIcon = (props: IconProps) => <Icon {...props}><path d="M6 9v9M6 6.5v.01M10 18v-5a3 3 0 0 1 6 0v5M10 10v8" /></Icon>;
export const YoutubeIcon = (props: IconProps) => <Icon {...props}><path d="M20.5 7.2a2.4 2.4 0 0 0-1.7-1.7C17.3 5 12 5 12 5s-5.3 0-6.8.5a2.4 2.4 0 0 0-1.7 1.7C3 8.7 3 12 3 12s0 3.3.5 4.8a2.4 2.4 0 0 0 1.7 1.7C6.7 19 12 19 12 19s5.3 0 6.8-.5a2.4 2.4 0 0 0 1.7-1.7C21 15.3 21 12 21 12s0-3.3-.5-4.8Z" /><path d="m10 9 5 3-5 3V9Z" /></Icon>;
export const FacebookIcon = (props: IconProps) => <Icon {...props}><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.8v8" /></Icon>;
