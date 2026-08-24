export const siteConfig = {
  name: "PontoVit",
  url: "https://www.pontovit.com.br",
  email: "contato@pontovit.com.br",
  whatsapp: "5551992998338",
  whatsappMessage:
    "Olá! Conheci a PontoVit pelo site e gostaria de entender como a plataforma pode ajudar na gestão de escalas da minha empresa.",
  description:
    "Organize escalas, jornadas e equipes com mais eficiência. Conheça a PontoVit e simplifique a gestão operacional da sua empresa.",
  socialLinks: {
    instagram: "https://www.instagram.com/pontovit.escalas?igsi=MXVkY3RnaWYyNmN6Zw==",
    linkedin: "https://www.linkedin.com/company/pontovitescalas/",
    facebook: "https://www.facebook.com/share/199FJiyf2U/",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/quem-somos/" },
  { label: "Produto", href: "/escalas-de-trabalho/" },
  { label: "Parceiros", href: "/parceiros/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contato", href: "/contato-antigo/" },
] as const;
