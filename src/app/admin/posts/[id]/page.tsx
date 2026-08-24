"use client";

import { useParams, useRouter } from "next/navigation";
import { AdminModal } from "@/components/admin/admin-modal";
import { PostEditor } from "@/components/admin/post-editor";

export default function EditPostPage() {
  const router = useRouter(); const params = useParams<{ id: string }>();
  return <AdminModal open title="Editar post" description="Atualize o conteúdo e os metadados sem sair da listagem." onClose={() => router.push("/admin/posts")} size="wide"><PostEditor id={params.id} /></AdminModal>;
}
