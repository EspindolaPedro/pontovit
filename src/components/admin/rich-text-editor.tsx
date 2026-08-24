"use client";

import { EditorContent, useEditor } from "@tiptap/react";
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

  const run = (command: () => boolean) => { command(); editor.commands.focus(); };
  return (
    <div className="pv-rich-editor">
      <div className="pv-rich-editor-toolbar" role="toolbar" aria-label="Formatação do conteúdo">
        <div className="pv-rich-editor-group">
          <button type="button" aria-label="Negrito" aria-pressed={editor.isActive("bold")} onClick={() => run(() => editor.chain().toggleBold().run())} className={editor.isActive("bold") ? "is-active" : ""}>B</button>
          <button type="button" aria-label="Itálico" aria-pressed={editor.isActive("italic")} onClick={() => run(() => editor.chain().toggleItalic().run())} className={editor.isActive("italic") ? "is-active" : ""}>I</button>
          <button type="button" aria-label="Título 2" aria-pressed={editor.isActive("heading", { level: 2 })} onClick={() => run(() => editor.chain().toggleHeading({ level: 2 }).run())} className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>H2</button>
          <button type="button" aria-label="Título 3" aria-pressed={editor.isActive("heading", { level: 3 })} onClick={() => run(() => editor.chain().toggleHeading({ level: 3 }).run())} className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}>H3</button>
        </div>
        <div className="pv-rich-editor-group">
          <button type="button" aria-label="Lista com marcadores" aria-pressed={editor.isActive("bulletList")} onClick={() => run(() => editor.chain().toggleBulletList().run())} className={editor.isActive("bulletList") ? "is-active" : ""}>• Lista</button>
          <button type="button" aria-label="Lista numerada" aria-pressed={editor.isActive("orderedList")} onClick={() => run(() => editor.chain().toggleOrderedList().run())} className={editor.isActive("orderedList") ? "is-active" : ""}>1. Lista</button>
          <button type="button" aria-label="Citação" aria-pressed={editor.isActive("blockquote")} onClick={() => run(() => editor.chain().toggleBlockquote().run())} className={editor.isActive("blockquote") ? "is-active" : ""}>Citação</button>
        </div>
        <div className="pv-rich-editor-group pv-rich-editor-history">
          <button type="button" aria-label="Desfazer" disabled={!editor.can().undo()} onClick={() => run(() => editor.chain().undo().run())}>↶</button>
          <button type="button" aria-label="Refazer" disabled={!editor.can().redo()} onClick={() => run(() => editor.chain().redo().run())}>↷</button>
        </div>
      </div>
      <EditorContent editor={editor} />
      <div className="pv-rich-editor-footer"><span>Use títulos, listas e citações para deixar a leitura mais escaneável.</span></div>
    </div>
  );
}
