<script lang="ts">
	import { getDoc } from '$lib/docs';
	import DocsArticle from '$lib/components/docs/DocsArticle.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const doc = $derived(getDoc(data.slug));
</script>

<svelte:head>
	<title>{data.title} · Storyboard Docs</title>
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
</svelte:head>

{#if doc}
	<DocsArticle slug={doc.slug} component={doc.component} />
{/if}
