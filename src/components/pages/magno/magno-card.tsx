import Link from "next/link";
import { CompanyIcon } from "@/components/shared/feature-icons";
import { ArrowDownIcon, CheckIcon, ChevronRightIcon, DocumentIcon, GlobeIcon, LinkedinIcon, MailIcon, PhoneIcon, UserIcon, WhatsappIcon } from "@/components/shared/icons";
import { getMagnoCardUrl, getMagnoWhatsAppUrl, magnoCard } from "@/config/magno";

const initials = magnoCard.firstName[0] + magnoCard.lastName[0];

export function MagnoCard({ qrSvg }: { qrSvg: string }) {
  const cardUrl = getMagnoCardUrl();
  const cardUrlLabel = cardUrl.replace(/^https?:\/\//, "");

  return (
    <main className="pv-magno-page">
      <span className="pv-magno-orb pv-magno-orb-1" aria-hidden="true" />
      <span className="pv-magno-orb pv-magno-orb-2" aria-hidden="true" />
      <span className="pv-magno-orb pv-magno-orb-3" aria-hidden="true" />

      <div className="pv-magno-wrap">
        <div className="pv-magno-card">
          <div className="pv-magno-cover">
            <span className="pv-magno-cover-orb" aria-hidden="true" />
            <Link href="/" aria-label="PontoVit, início" className="pv-magno-brand-chip">
              <img src="/assets/product/pontovit-mark.png" alt="" />
            </Link>
            <svg className="pv-magno-cover-wave" viewBox="0 0 420 44" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 30 C 90 6, 180 44, 210 30 C 250 12, 340 44, 420 16 V44 H0 Z" fill="var(--pv-white)" />
            </svg>
          </div>

          <div className="pv-magno-avatar-wrap">
            <div className="pv-magno-avatar" aria-hidden={!!magnoCard.photo}>
              {magnoCard.photo ? <img src={magnoCard.photo} alt={magnoCard.fullName} /> : initials}
            </div>
            <span className="pv-magno-avatar-badge" aria-hidden="true">
              <CheckIcon size={11} />
            </span>
          </div>

          <div className="pv-magno-body">
            <h1>{magnoCard.fullName}</h1>
            <div className="pv-magno-meta">
              <span className="pv-magno-role-pill">
                <UserIcon size={13} />
                {magnoCard.role}
              </span>
              <span className="pv-magno-company-pill">
                <CompanyIcon size={13} />
                {magnoCard.company}
              </span>
            </div>
            <p className="pv-magno-bio">{magnoCard.bio}</p>

            <div className="pv-magno-actions">
              <a href={getMagnoWhatsAppUrl()} target="_blank" rel="noreferrer" className="pv-magno-action">
                <WhatsappIcon size={28} />
                WhatsApp
              </a>
              <a href={`tel:+${magnoCard.whatsapp}`} className="pv-magno-action">
                <PhoneIcon size={28} />
                Ligar
              </a>
              <a href={`mailto:${magnoCard.email}`} className="pv-magno-action">
                <MailIcon size={28} />
                E-mail
              </a>
              <a href={magnoCard.linkedin} target="_blank" rel="noreferrer" className="pv-magno-action">
                <LinkedinIcon size={28} />
                LinkedIn
              </a>
            </div>

            <a href="/magno/vcard" download="magno-bais-pontovit.vcf" className="pv-magno-save">
              <ArrowDownIcon size={17} />
              Salvar meu contato
            </a>

            <div className="pv-magno-links">
              <Link href="/escalas-de-trabalho">
                <span className="pv-magno-links-icon">
                  <DocumentIcon size={17} />
                </span>
                Conheça nossos serviços
                <ChevronRightIcon size={18} className="pv-magno-links-chevron" />
              </Link>
              <Link href="/">
                <span className="pv-magno-links-icon">
                  <GlobeIcon size={17} />
                </span>
                Site da PontoVit
                <ChevronRightIcon size={18} className="pv-magno-links-chevron" />
              </Link>
            </div>

            <div className="pv-magno-qr">
              <p className="pv-magno-qr-label">Compartilhe este cartão</p>
              <div className="pv-magno-qr-panel">
                <span className="pv-magno-qr-frame" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              </div>
              <p className="pv-magno-qr-url">
                <GlobeIcon size={14} />
                {cardUrlLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
