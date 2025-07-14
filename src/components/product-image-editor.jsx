import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';

export function ProductImagesEditor({ images = [], onChange }) {
	// images: [{url, name}], onChange: (newImages) => void

	const [uploading, setUploading] = useState(false);

	// Загрузка одной/нескольких фоток
	async function handleFileChange(e) {
		const files = Array.from(e.target.files || []);
		if (!files.length) return;

		setUploading(true);
		let uploaded = [];
		for (const file of files) {
			const filename = `${Date.now()}_${file.name}`;
			const { error } = await supabase.storage
				.from('products')
				.upload(filename, file);
			if (error) {
				alert(error.message);
				continue;
			}
			const {
				data: { publicUrl },
			} = supabase.storage.from('products').getPublicUrl(filename);
			uploaded.push({ url: publicUrl, name: file.name });
		}
		setUploading(false);
		onChange([...(images || []), ...uploaded]);
	}

	function handleRemove(idx) {
		const updated = [...images];
		updated.splice(idx, 1);
		onChange(updated);
	}

	function handleSetMain(idx) {
		if (idx === 0) return;
		const reordered = [
			images[idx],
			...images.slice(0, idx),
			...images.slice(idx + 1),
		];
		onChange(reordered);
	}

	return (
		<div>
			<input
				type='file'
				multiple
				accept='image/*'
				onChange={handleFileChange}
			/>
			<div className='flex gap-4 flex-wrap mt-2'>
				{images.map((img, idx) => (
					<div
						key={img.url}
						className='relative group border rounded p-1 flex flex-col items-center'>
						<img
							alt={img.name || 'Product image'}
							src={img.url}
							className='w-24 h-24 object-cover rounded mb-1'
						/>
						<div className='text-xs text-center mb-1'>
							{idx === 0 ? <b>Main</b> : ''}
						</div>
						<div className='flex gap-1'>
							{idx !== 0 && (
								<Button
									size='xs'
									variant='secondary'
									onClick={() => handleSetMain(idx)}>
									Set Main
								</Button>
							)}
							<Button
								size='xs'
								variant='destructive'
								onClick={() => handleRemove(idx)}>
								Delete
							</Button>
						</div>
					</div>
				))}
			</div>
			{uploading && (
				<div className='text-xs mt-2 text-gray-500'>Uploading...</div>
			)}
		</div>
	);
}
