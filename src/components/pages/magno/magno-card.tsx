import Link from "next/link";
import { CompanyIcon } from "@/components/shared/feature-icons";
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, CircleDotIcon, LinkedinIcon, MailIcon, PhoneIcon, WhatsappIcon } from "@/components/shared/icons";
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
                <CircleDotIcon size={8} />
                {magnoCard.role}
              </span>
              <span className="pv-magno-company">
                <CompanyIcon size={14} />
                {magnoCard.company}
              </span>
            </div>
            <p className="pv-magno-bio">{magnoCard.bio}</p>

            <div className="pv-magno-actions">
              <a href={getMagnoWhatsAppUrl()} target="_blank" rel="noreferrer" className="pv-magno-action">
                <span className="pv-magno-action-icon">
                  <WhatsappIcon size={19} />
                </span>
                WhatsApp
              </a>
              <a href={`tel:+${magnoCard.whatsapp}`} className="pv-magno-action">
                <span className="pv-magno-action-icon">
                  <PhoneIcon size={19} />
                </span>
                Ligar
              </a>
              <a href={`mailto:${magnoCard.email}`} className="pv-magno-action">
                <span className="pv-magno-action-icon">
                  <MailIcon size={19} />
                </span>
                E-mail
              </a>
              <a href={magnoCard.linkedin} target="_blank" rel="noreferrer" className="pv-magno-action">
                <span className="pv-magno-action-icon">
                  <LinkedinIcon size={19} />
                </span>
                LinkedIn
              </a>
            </div>

            <a href="/magno/vcard" download="magno-bais-pontovit.vcf" className="pv-magno-save">
              <ArrowDownIcon size={17} />
              Salvar meu contato
            </a>

            <div className="pv-magno-links">
              <Link href="/escalas-de-trabalho">
                Conheça nossos serviços
                <ArrowUpRightIcon size={16} />
              </Link>
              <Link href="/">
                Site da PontoVit
                <ArrowUpRightIcon size={16} />
              </Link>
            </div>

            <div className="pv-magno-qr">
              <p className="pv-magno-qr-label">Compartilhe este cartão</p>
              <div className="pv-magno-qr-panel">
                <span className="pv-magno-qr-frame" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              </div>
              <p className="pv-magno-qr-url">{cardUrlLabel}</p>
            </div>
          </div>
        </div>

        <p className="pv-magno-footer">
          Um cartão <Link href="/">PontoVit</Link>
        </p>
      </div>
    </main>
  );
}
