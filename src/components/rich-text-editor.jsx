'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function RichTextEditorField({ value, onChange }) {
	const editor = useEditor({
		extensions: [StarterKit],
		content: value,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) return <div>Loading editor...</div>;

	return (
		<div className='border rounded p-2 min-h-[140px]'>
			<EditorContent editor={editor} />
		</div>
	);
}
