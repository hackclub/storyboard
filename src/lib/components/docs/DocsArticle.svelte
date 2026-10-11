<script lang="ts">
	import type { Component } from 'svelte';
	import DocsToc, { type TocHeading } from './DocsToc.svelte';

	interface Props {
		slug: string;
		component: Component;
	}

	let { slug, component: Doc }: Props = $props();

	let articleEl: HTMLElement | undefined = $state();
	let headings = $state<TocHeading[]>([]);

	function slugify(text: string): string {
		const slug = text
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, '')
			.replace(/[\s_]+/g, '-')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '');
		return slug || 'section';
	}

	// Assign heading ids and collect them for the TOC. Reading `slug` keeps this in
	// sync when navigating from one documentation page to another.
	$effect(() => {
		void slug;
		const el = articleEl;
		if (!el) {
			headings = [];
			return;
		}

		const used = new Set<string>();
		headings = [...el.querySelectorAll('h2, h3')].map((node) => {
			const text = (node.textContent ?? '').trim();
			let id = node.id || slugify(text);
			let candidate = id;
			let n = 2;
			while (used.has(candidate)) candidate = `${id}-${n++}`;
			used.add(candidate);
			node.id = candidate;
			return { id: candidate, text, level: Number(node.tagName.slice(1)) };
		});
	});
</script>

<div class="docs-content" class:has-toc={headings.length > 0}>
	<DocsToc {headings} />

	<div class="docs-article-col">
		<article class="docs-prose" bind:this={articleEl}>
			<Doc />
		</article>
	</div>
</div>
