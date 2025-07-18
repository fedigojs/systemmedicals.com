'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useEffect } from 'react';
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

export default function RichTextEditor({ value, onChange, langKey }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            Heading.configure({ levels: [1, 2, 3] }),
            BulletList,
            OrderedList,
            ListItem,
            Link,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
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

    if (!editor) return null;

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className="px-2 py-1 border rounded text-sm">Bold</button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className="px-2 py-1 border rounded text-sm">Italic</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="px-2 py-1 border rounded text-sm">H2</button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className="px-2 py-1 border rounded text-sm">• Bullet</button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className="px-2 py-1 border rounded text-sm">1. Ordered</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className="px-2 py-1 border rounded text-sm">Left</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className="px-2 py-1 border rounded text-sm">Center</button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className="px-2 py-1 border rounded text-sm">Right</button>
                <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} className="px-2 py-1 border rounded text-sm">Clear</button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}