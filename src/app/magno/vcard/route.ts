import { buildMagnoVCard } from "@/config/magno";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildMagnoVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="magno-bais-pontovit.vcf"',
    },
  });
}
