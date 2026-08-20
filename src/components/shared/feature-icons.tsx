type FeatureIconProps = { size?: number; className?: string };
function FeatureIcon({ children, size = 22, className }: FeatureIconProps & { children: React.ReactNode }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>;
}
export const CalendarIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 9h18M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"/></FeatureIcon>;
export const ApprovalIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/></FeatureIcon>;
export const CompanyIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><path d="M3 21h18M5 21V5h9v16M14 9h5v12M8 8h2M8 12h2M8 16h2M17 13h.01M17 17h.01"/></FeatureIcon>;
export const UsersIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.5V20"/></FeatureIcon>;
export const ChartIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><path d="M4 19V5M4 19h17M8 15v-3M12 15V8M16 15v-6M20 15v-3"/></FeatureIcon>;
export const NetworkIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m10.5 7-4 8M13.5 7l4 8M7.5 18h9"/></FeatureIcon>;
export const DeviceIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><rect x="3" y="4" width="13" height="11" rx="1.5"/><path d="M7 20h5M9 15v5M19 8h2v11h-6V8h4M17 6h3"/></FeatureIcon>;
export const LayersIcon = (p: FeatureIconProps) => <FeatureIcon {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></FeatureIcon>;
