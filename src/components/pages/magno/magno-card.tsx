import { CalendarIcon } from "@/components/shared/feature-icons";
import { ChevronRightIcon, DocumentIcon, GlobeIcon, MailIcon, PhoneIcon, WhatsappIcon } from "@/components/shared/icons";
import { getMagnoCardUrl, getMagnoWhatsAppUrl, magnoCard } from "@/config/magno";
import { MagnoShareButton } from "./magno-share-button";

const initials = magnoCard.firstName[0] + magnoCard.lastName[0];

type MagnoCardProps = {
  qrSvg: string;
  photoUrl?: string | null;
  focalPointX?: number;
  focalPointY?: number;
};

export function MagnoCard({ qrSvg, photoUrl, focalPointX = 50, focalPointY = 50 }: MagnoCardProps) {
  const cardUrl = getMagnoCardUrl();

  return (
    <main className="pv-magno-page">
      <div className="pv-magno-wrap">
        <div className="pv-magno-card">
          <div className="pv-magno-avatar-wrap">
            <div className="pv-magno-avatar" aria-hidden={!!photoUrl}>
              {photoUrl ? (
                <img src={photoUrl} alt={magnoCard.fullName} style={{ objectPosition: `${focalPointX}% ${focalPointY}%` }} />
              ) : (
                initials
              )}
            </div>
          </div>

          <h1>{magnoCard.fullName}</h1>
          <p className="pv-magno-role-line">
            <span className="pv-magno-role">{magnoCard.role}</span>
            <span className="pv-magno-role-sep">|</span>
            <span className="pv-magno-company">{magnoCard.company}</span>
          </p>

          <p className="pv-magno-positioning">{magnoCard.positioningStatement}</p>

          <div className="pv-magno-qr">
            <div className="pv-magno-qr-panel">
              <span className="pv-magno-qr-frame" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              <span className="pv-magno-qr-badge" aria-hidden="true">
                <img src="/assets/product/pontovit-mark.png" alt="" />
              </span>
            </div>
          </div>

          <a href={getMagnoWhatsAppUrl()} target="_blank" rel="noreferrer" className="pv-magno-cta-primary">
            <WhatsappIcon size={19} />
            Falar pelo WhatsApp
            <ChevronRightIcon size={17} />
          </a>

          <div className="pv-magno-secondary-row">
            <a href={`tel:+${magnoCard.whatsapp}`} className="pv-magno-cta-secondary">
              <PhoneIcon size={17} />
              Ligar
            </a>
            <a href={`mailto:${magnoCard.email}`} className="pv-magno-cta-secondary">
              <MailIcon size={17} />
              E-mail
            </a>
          </div>

          <hr className="pv-magno-divider" />

          <div className="pv-magno-brand-block">
            <img className="pv-magno-brand-logo" src="/assets/product/pontovit-logo.png" alt="PontoVit" />
            <p className="pv-magno-brand-tagline">{magnoCard.institutionalTagline}</p>
          </div>

          <a href="/" className="pv-magno-cta-primary">
            <GlobeIcon size={19} />
            Acesse o site da PontoVit
            <ChevronRightIcon size={17} />
          </a>

          <a href={magnoCard.presentationUrl} target="_blank" rel="noreferrer" className="pv-magno-cta-light">
            <span className="pv-magno-cta-light-icon">
              <DocumentIcon size={16} />
            </span>
            Veja nossa apresentação
            <ChevronRightIcon size={16} className="pv-magno-cta-light-chevron" />
          </a>

          <a href={getMagnoWhatsAppUrl(magnoCard.demoWhatsappMessage)} target="_blank" rel="noreferrer" className="pv-magno-cta-outline">
            <CalendarIcon size={18} />
            Agende uma demonstração
            <ChevronRightIcon size={17} />
          </a>

          <MagnoShareButton url={cardUrl} title={`${magnoCard.fullName} · ${magnoCard.role}`} />

          <p className="pv-magno-footer-signature">{magnoCard.footerSignature}</p>
          <span className="pv-magno-footer-rule" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
