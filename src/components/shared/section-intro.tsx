import { cn } from "@/lib/utils";

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionIntro({ eyebrow, title, description, align = "left", className }: SectionIntroProps) {
  return (
    <div className={cn("pv-section-intro max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-balance text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-[4rem] lg:leading-[1.03]">{title}</h2>
      {description && <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>}
    </div>
  );
}
