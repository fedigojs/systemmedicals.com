'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

export default function RichTextEditor({ value, onChange, langKey }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
        ],
        content: value || '',
        editorProps: {
            attributes: {
                class: 'min-h-[150px] border p-2 rounded focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '');
        }
    }, [langKey]);

    return (
        <div>
            <div className="flex gap-2 mb-2">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded text-sm">Bold</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded text-sm">Italic</button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded text-sm">H2</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded text-sm">• List</button>
                <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 py-1 border rounded text-sm">Clear</button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}