import { ContactPage } from "@/components/pages/contact/contact-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contato",
  "Fale com a PontoVit e descubra como um sistema de gestão de escalas pode organizar jornadas, turnos, folgas e equipes.",
  "/contato-antigo/",
);
export default function ContactRoute() { return <ContactPage />; }
