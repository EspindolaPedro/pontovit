"use client";

import { useRouter } from "next/navigation";
import { AdminModal } from "@/components/admin/admin-modal";
import { PostEditor } from "@/components/admin/post-editor";

export default function NewPostPage() {
  const router = useRouter();
  return <AdminModal open title="Novo post" description="Crie o conteúdo, organize as categorias e configure o SEO." onClose={() => router.push("/admin/posts")} size="wide"><PostEditor /></AdminModal>;
}
