import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="PontoVit, início" className="inline-flex shrink-0 items-center">
      <Image src="/assets/product/pontovit-logo.png" alt="PontoVit" width={187} height={32} priority />
    </Link>
  );
}
