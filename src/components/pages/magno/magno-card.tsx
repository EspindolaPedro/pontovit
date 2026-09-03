import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpRightIcon, LinkedinIcon, MailIcon, PhoneIcon, WhatsappIcon } from "@/components/shared/icons";
import { getMagnoCardUrl, getMagnoWhatsAppUrl, magnoCard } from "@/config/magno";

const initials = magnoCard.firstName[0] + magnoCard.lastName[0];

export function MagnoCard({ qrSvg }: { qrSvg: string }) {
  const cardUrl = getMagnoCardUrl();
  const cardUrlLabel = cardUrl.replace(/^https?:\/\//, "");

  return (
    <main className="pv-magno-page">
      <div className="pv-magno-card">
        <Link href="/" aria-label="PontoVit, início" className="pv-magno-brand">
          <Image src="/assets/product/pontovit-logo.png" alt="PontoVit" width={128} height={22} priority />
        </Link>

        <div className="pv-magno-avatar" aria-hidden={!!magnoCard.photo}>
          {magnoCard.photo ? <img src={magnoCard.photo} alt={magnoCard.fullName} /> : initials}
        </div>

        <h1>{magnoCard.fullName}</h1>
        <p className="pv-magno-role">
          <span>{magnoCard.role}</span> <span>· {magnoCard.company}</span>
        </p>
        <p className="pv-magno-bio">{magnoCard.bio}</p>

        <div className="pv-magno-actions">
          <a href={getMagnoWhatsAppUrl()} target="_blank" rel="noreferrer" className="pv-magno-action">
            <WhatsappIcon size={20} />
            WhatsApp
          </a>
          <a href={`tel:+${magnoCard.whatsapp}`} className="pv-magno-action">
            <PhoneIcon size={20} />
            Ligar
          </a>
          <a href={`mailto:${magnoCard.email}`} className="pv-magno-action">
            <MailIcon size={20} />
            E-mail
          </a>
          <a href={magnoCard.linkedin} target="_blank" rel="noreferrer" className="pv-magno-action">
            <LinkedinIcon size={20} />
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
          <p>Compartilhe este cartão</p>
          <span className="pv-magno-qr-frame" dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <p className="pv-magno-qr-url">{cardUrlLabel}</p>
        </div>

        <p className="pv-magno-footer">
          Um cartão <Link href="/">PontoVit</Link>
        </p>
      </div>
    </main>
  );
}
