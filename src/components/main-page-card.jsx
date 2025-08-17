'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

export default function MainPageCard() {
    const t = useTranslations();
	return (
		<section className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-16'>
			<Link href='/category/dental-equipment'>
				<div className='rounded-xl p-6 flex items-center justify-between bg-cyan-600 text-white hover:shadow-lg transition-shadow cursor-pointer'>
					<div className='max-w-[60%]'>
						<h3 className='text-2xl font-bold mb-2'>
                            {t("main.dental_equipment")}
						</h3>
						<p className='text-sm mb-4'>
                            {t("main.catalog_of_medical_equipment")}
						</p>
						<Button
							variant='outline'
							className='bg-white text-cyan-700 hover:bg-gray-100'>
                            {t("button.view")}
						</Button>
					</div>
					<img src="images/promo/stomatology_equipment.png" className="w-28 md:w-36 object-contain"/>
				</div>
			</Link>

			<Link href='/category/medical-equipment'>
				<div className='rounded-xl p-6 flex items-center justify-between bg-yellow-300 text-slate-900 hover:shadow-lg transition-shadow cursor-pointer'>
					<div className='max-w-[60%]'>
						<h3 className='text-2xl font-bold mb-2'>
                            {t("main.medical_equipment")}
						</h3>
						<p className='text-sm mb-4'>
                            {t("main.catalog_of_medical_equipment")}
						</p>
						<Button
							variant='outline'
							className='bg-white text-yellow-800 hover:bg-yellow-100'>
                            {t("button.view")}
						</Button>
					</div>
					<img src="images/promo/general_equipment.png" className="w-28 md:w-36 object-contain"/>
				</div>
			</Link>
		</section>
	);
}
