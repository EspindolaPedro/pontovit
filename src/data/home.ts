import type { ComponentType } from "react";
import { ApprovalIcon, CalendarIcon, ChartIcon, CompanyIcon, DeviceIcon, LayersIcon, NetworkIcon, UsersIcon } from "@/components/shared/feature-icons";

type IconComponent = ComponentType<{ size?: number; className?: string }>;

export const platformFeatures = [
  { title: "Gestão de escalas", description: "Monte e organize escalas conforme as necessidades da operação.", icon: CalendarIcon },
  { title: "Fluxo de aprovação", description: "Trabalhe com fases de montagem, análise, autorização e impressão.", icon: ApprovalIcon },
  { title: "Multiempresa", description: "Gerencie diferentes empresas, unidades e estruturas.", icon: CompanyIcon },
  { title: "Multiusuário", description: "Controle o acesso de cada usuário conforme sua responsabilidade.", icon: UsersIcon },
  { title: "Dashboard", description: "Tenha uma visão central da gestão das escalas.", icon: ChartIcon },
  { title: "Estrutura hierárquica", description: "Organize menus e acessos conforme o organograma da empresa.", icon: NetworkIcon },
  { title: "Gestão online", description: "Acesse pelo navegador, sem depender de uma máquina específica.", icon: DeviceIcon },
  { title: "Padronização", description: "Mantenha a criação das escalas consistente entre diferentes setores.", icon: LayersIcon },
] as const;

export const industries = ["Supermercados", "Atacados", "Postos de combustíveis", "Farmácias", "Comércio", "Condomínios", "Indústrias", "Outras operações por turnos"] as const;

export const testimonials = [
  { quote: "O PontoVit simplifica a gestão das escalas 6x1, desdobrando o processo com expertise, facilitando gestão e comunicação com colaboradores. Parceiros de longa data, a ferramenta é constantemente desenvolvida.", name: "Rafael Veratti", company: "Veratti Supermercados" },
  { quote: "A Básica agradece a PONTO VIT pelo software de Gestão de Escalas de Trabalho, trazendo facilidade, economia de tempo e redução de burocracias na folha de pagamento, entre outros benefícios. Super indico a ferramenta.", name: "Tiago Andrade", company: "Básica Administração de Condomínios" },
  { quote: "Com esta ferramenta, o PontoVit, nos tornamos produtivos e conseguimos nos organizar melhor em relação às escalas de trabalho. Recomendo!", name: "Cristiano", company: "Posto de Combustível Vargem Linda" },
] as const;

// Todo o texto abaixo (Quem Somos / Escalas de Trabalho) é copy literal extraída do site
// wordpress original (pontovit.com.br), via scraping das paginas Elementor — nao e copy nova.

export const aboutTimeline = [
  { year: "2011", title: "Vitória Humana Sistemas, em Cuiabá (MT)", text: "Desenvolvida inicialmente como um produto da Vitória Humana Sistemas, traz em seu nome um pouco de sua história na busca de facilitar o controle de ponto em clientes com turnos e jornadas específicas.", icon: CalendarIcon as IconComponent },
  { year: "2018", title: "Constituição como empresa, em Porto Alegre", text: "Com o passar do tempo, ganhou autonomia e vida própria, constituindo-se como empresa em 2018, já em Porto Alegre e atendendo a um número expressivo de clientes satisfeitos com seus resultados de diferentes segmentos e regiões do Brasil.", icon: ApprovalIcon as IconComponent },
  { year: "Hoje", title: "A PontoVit", text: "PontoVit é a pioneira em gestão de Escalas de Trabalho no Brasil. Nossa missão é resolver um problema que afeta muitas pessoas em seu cotidiano: a distribuição de horários, turnos e jornadas de trabalho.", icon: ChartIcon as IconComponent },
] as const;

export const aboutAudience = {
  title: "Público Alvo",
  text: "Empresas de pequeno e médio porte que utilizam-se de escalas de trabalho em sua operação.",
};

export const aboutPurpose = {
  title: "Nosso Propósito",
  text: "Oferecer segurança e facilidade na gestão de escalas de trabalho, facilitando as boas relações entre as pessoas e a empresa e gerando maior lucratividade aos empreendedores.",
};

export const escalasIntro = {
  eyebrow: "Sobre o sistema de Escalas de Trabalho",
  heroTitle: "Com o PontoVit você monta todas as Escalas de Trabalho de acordo com as regras da consolidação das leis trabalhistas com rapidez e facilidade.",
  oPontoVit: [
    "O módulo Escalas de Trabalho do Sistema PontoVit foi criado para eliminar definitivamente problemas com a elaboração e a gestão de escalas de todos os tipos.",
    "Uma ferramenta prática, 100% adequada a CLT que facilita a montagem das Escalas garantindo total conformidade na organização dos horários e das jornadas, tudo via Web em alguns minutos.",
    "Sistema Multiusuário e Multiempresa. Entre em contato e saiba mais ou acesse nosso blog.",
  ],
  gestaoDasEscalas: "A exigência de trabalho contínuo através da gestão de escalas é frequentemente uma fonte de problemas para o gestor e para a empresa. Montar escalas de trabalho é preciso conciliar diversos fatores como: a operação e o número de colaboradores, regras da CLT, convenções trabalhistas e acordos da categoria.",
  sistemaViaWeb: "Para cada necessidade e modelo de Escala, o Módulo Escalas de Trabalho do Sistema PontoVit oferece a vantagem de Montar e Controlar de forma fácil e rápida, concentrando todas as informações necessárias para a excelente gestão das jornadas e turnos, aumentando a produtividade da empresa. Tecnologia Software as a Service (SaaS).",
  lucratividade: "Muitas empresas têm perdas significativas, que reduzem sua margem de lucro em virtude de desgastes entre pessoas, turnover e mesmo com contenciosos trabalhistas relacionados às jornadas de trabalho de seus colaboradores. Com o Sistema PontoVit, módulo Escalas de Trabalho é possível eliminar estes problemas, aumentando a produtividade e a lucratividade de sua empresa!",
};

export const scaleTypes: { title: string; text: string; href?: string; icon: IconComponent }[] = [
  { title: "Escala de Trabalho 4x3", text: "Você já ouviu falar na escala de trabalho 4x3? A escala 4x3 é uma jornada diferenciada, onde o colaborador trabalha 4 dias consecutivos e descansa 3. Mas como garantir que sua empresa esteja dentro da legislação e otimizando a produtividade?", href: "/blog/como-funciona-a-escala-de-trabalho-4x3/", icon: CalendarIcon },
  { title: "Escala Personalizada", text: "Você pode criar o tipo de Escala de Trabalho que precisar, conforme seu Acordo Coletivo.", icon: LayersIcon },
  { title: "Escala de Trabalho 12x36", text: "Você já considerou a escala 12x36 para a sua empresa? Se sua operação exige cobertura 24 horas, seja no setor de saúde, segurança ou indústrias, a escala 12x36 pode ser a solução ideal.", href: "/blog/como-funciona-a-escala-de-trabalho-12x36/", icon: ChartIcon },
  { title: "Escala de Trabalho 5x1", text: "A escala de trabalho 5x1 é um modelo em que os funcionários trabalham cinco dias consecutivos e folgam um dia, antes de retornarem para mais cinco dias de trabalho. Comum em indústrias que necessitam de operação contínua.", href: "/blog/como-funciona-a-escala-de-trabalho-5x1/", icon: ApprovalIcon },
  { title: "Escala de Trabalho 5x2", text: "A escala de trabalho 5x2 é um dos modelos mais comuns e tradicionais de jornada, onde os funcionários trabalham cinco dias e folgam dois, geralmente sábado e domingo. Amplamente utilizada em ambientes corporativos e escritórios.", href: "/blog/como-funciona-a-escala-de-trabalho-5x2/", icon: NetworkIcon },
  { title: "Escala de Trabalho 6x1", text: "A escala de trabalho 6x1 é um tipo de escala onde os funcionários trabalham seis dias consecutivos seguidos por um dia de folga. Comum em setores que exigem operação contínua, como varejo, hospitalidade e saúde.", href: "/blog/como-funciona-a-escala-de-trabalho-6x1/", icon: DeviceIcon },
];

export const escalasBenefits: { title: string; text: string; icon: IconComponent }[] = [
  { title: "Servidor na nuvem", text: "Montagem da Escala via Web online, gerando praticidade. Nosso sistema está em servidores em nuvem, ou seja, suas informações estão seguras e disponíveis sempre.", icon: DeviceIcon },
  { title: "Folha de pagamento", text: "Velocidade na transmissão de informações para sua folha de pagamento. Com o PontoVit você têm informações mais rápidas e precisas para montar a folha de pagamento dos seus funcionários.", icon: ChartIcon },
  { title: "Facilidade", text: "Montagem em etapas: montagem, análise, autorização e impressão. Além disso RH e funcionários podem acessar o sistema por computador, celular ou tablet que tenha acesso à internet.", icon: ApprovalIcon },
  { title: "Jornada de Trabalho", text: "Montagem em etapas: montagem, análise, autorização e impressão. Monte escalas 12x36, 5x1, 5x2, 6x1, e acompanhe se estão sendo cumpridas.", icon: CalendarIcon },
  { title: "Organização", text: "Escalas organizadas, com padronização na montagem de escala em todos os setores da empresa, proporcionando menores desgastes empregado e empregador.", icon: LayersIcon },
  { title: "Incidências", text: "Planejamento de horas trabalhadas, livre de excedentes com diminuição de incidência jurídica, pois o módulo escalas de trabalho do PontoVit é 100% adequado a CLT.", icon: CompanyIcon },
  { title: "Acompanhamento", text: "Controle de forma precisa das jornadas dos colaboradores com acompanhamentos de ocorrências por meios de relatórios, possibilitando ações corretivas e preventivas.", icon: NetworkIcon },
  { title: "Documentação", text: "Produção de documentação legítima por meio de relatórios com embasamento legal para produção de prova em eventual demanda trabalhista quanto ao cumprimento da jornada do contrato de trabalho.", icon: UsersIcon },
];
