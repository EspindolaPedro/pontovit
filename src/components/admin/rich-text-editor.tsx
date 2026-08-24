"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = { value: unknown; onChange: (value: unknown) => void };

function toEditorValue(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) return value;
  if (Array.isArray(value)) {
    return {
      type: "doc",
      content: value.map((block) => {
        if (!block || typeof block !== "object") return { type: "paragraph" };
        const item = block as { type?: string; text?: string; html?: string; items?: string[] };
        if (item.type === "h2" || item.type === "h3") return { type: "heading", attrs: { level: item.type === "h3" ? 3 : 2 }, content: [{ type: "text", text: item.text ?? "" }] };
        if (item.type === "ul") return { type: "bulletList", content: (item.items ?? []).map((text) => ({ type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text }] }] })) };
        if (item.type === "quote") return { type: "blockquote", content: [{ type: "paragraph", content: [{ type: "text", text: item.text ?? "" }] }] };
        return { type: "paragraph", content: [{ type: "text", text: (item.html ?? item.text ?? "").replace(/<[^>]+>/g, "") }] };
      }),
    };
  }
  return { type: "doc", content: [{ type: "paragraph" }] };
}

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: toEditorValue(value),
    immediatelyRender: false,
    editorProps: { attributes: { class: "pv-rich-editor-content" } },
    onUpdate: ({ editor: current }) => onChange(current.getJSON()),
  });

  useEffect(() => {
    if (!editor) return;
    const next = JSON.stringify(toEditorValue(value));
    if (next !== JSON.stringify(editor.getJSON())) editor.commands.setContent(JSON.parse(next), { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return <div className="pv-rich-editor-loading">Carregando editor...</div>;
  return (
    <div className="pv-rich-editor">
      <div className="pv-rich-editor-toolbar" role="toolbar" aria-label="Formatação">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive("bold") ? "is-active" : ""}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive("italic") ? "is-active" : ""}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>Lista</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()}>Citação</button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
