import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';



export default function Notepad() {
    const content =
    `
    <h2 style="text-align: center">Welcome to the AI Notepad ✨</h2>
    <p style="text-align: center">Brainstorm essay outlines with the integrated <strong>Create Outline</strong> button or jot down any notes here!</p>
    <ul><li><p>Paste links here to populate your essay works cited page ✅</p></li><li><p>Include references and images for later ✅</p></li><li><p>General text formatting: <strong>bold</strong>, <em>italic</em>, underline, <s>strike-through</s> ✅</p></li><li><p>Ordered </p><ul><li><p>and bullet lists ✅</p></li></ul></li></ul>
    `

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}