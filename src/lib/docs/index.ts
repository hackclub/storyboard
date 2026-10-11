import type { Component } from 'svelte';

/** Frontmatter that a documentation page may declare. */
export interface DocMeta {
	title?: string;
	description?: string;
	order?: number;
	category?: string;
}

/** A single documentation page, resolved from a Markdown file. */
export interface Doc {
	/** URL slug, derived from the filename (e.g. `getting-started`). */
	slug: string;
	title: string;
	description?: string;
	order: number;
	category: string;
	/** The Markdown file compiled to a Svelte component by mdsvex. */
	component: Component;
}

/** Preference order for known categories; unknown ones fall in after, alphabetically. */
const CATEGORY_ORDER = ['Getting Started', 'Guides', 'Reference'];

// Every `.md` file under this directory becomes a page. Files prefixed with an
// underscore are treated as partials and skipped so they never show in the nav.
const modules = import.meta.glob('/src/lib/docs/**/*.md', { eager: true }) as Record<
	string,
	{ default: Component; metadata?: DocMeta }
>;

function fileToSlug(path: string): string {
	const file = path.split('/').pop() ?? path;
	return file.replace(/\.md$/i, '');
}

function slugToTitle(slug: string): string {
	return slug
		.split('-')
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

function categoryRank(category: string): number {
	const index = CATEGORY_ORDER.indexOf(category);
	return index === -1 ? CATEGORY_ORDER.length : index;
}

/** All documentation pages, sorted by category then `order` then title. */
export const docs: Doc[] = Object.entries(modules)
	.filter(([path]) => {
		const file = path.split('/').pop() ?? '';
		return !file.startsWith('_');
	})
	.map(([path, mod]) => {
		const slug = fileToSlug(path);
		const meta = mod.metadata ?? {};
		return {
			slug,
			title: meta.title ?? slugToTitle(slug),
			description: meta.description,
			order: typeof meta.order === 'number' ? meta.order : Number.MAX_SAFE_INTEGER,
			category: meta.category ?? 'Documentation',
			component: mod.default
		} satisfies Doc;
	})
	.sort(
		(a, b) =>
			categoryRank(a.category) - categoryRank(b.category) ||
			a.order - b.order ||
			a.title.localeCompare(b.title)
	);

/** A category and the pages that belong to it, for grouped navigation. */
export interface NavGroup {
	category: string;
	items: Doc[];
}

/** Pages grouped by category, preserving the sorted order. */
export const navGroups: NavGroup[] = docs.reduce<NavGroup[]>((groups, doc) => {
	const existing = groups.find((group) => group.category === doc.category);
	if (existing) existing.items.push(doc);
	else groups.push({ category: doc.category, items: [doc] });
	return groups;
}, []);

/** The page shown at `/docs` when no specific slug is requested. */
export const defaultDoc: Doc | undefined = docs[0];

/** Look up a page by its URL slug. */
export function getDoc(slug: string): Doc | undefined {
	return docs.find((doc) => doc.slug === slug);
}
