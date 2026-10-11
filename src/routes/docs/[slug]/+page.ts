import { error } from '@sveltejs/kit';
import { getDoc } from '$lib/docs';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const doc = getDoc(params.slug);
	if (!doc) throw error(404, `No documentation page named "${params.slug}".`);
	return { slug: doc.slug, title: doc.title, description: doc.description };
};
