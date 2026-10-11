<script lang="ts">
	import './docs.css';
	import { page } from '$app/state';
	import DocsSidebar from '$lib/components/docs/DocsSidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let open = $state(false);

	// Close the mobile sidebar whenever the route changes.
	$effect(() => {
		page.url.pathname;
		open = false;
	});
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (open = false)} />

<div class="docs-shell">
	<aside
		id="docs-sidebar"
		class="docs-sidebar"
		class:is-open={open}
		aria-label="Documentation navigation"
	>
		<a href="https://hackclub.com" target="_blank">
			<img src="/hc-flag.png" alt="hackclub flag" class="absolute top-3 left-6 w-12" />
		</a>
		<a class="docs-brand" href="/">
			<img src="/cat.png" alt="" />
			<b>Storyboard Docs</b>
		</a>
		<DocsSidebar onNavigate={() => (open = false)} />
	</aside>

	{#if open}
		<button
			class="docs-backdrop"
			type="button"
			aria-label="Close navigation"
			onclick={() => (open = false)}
		></button>
	{/if}

	<div class="docs-main">
		<button
			class="docs-menu-btn"
			type="button"
			aria-expanded={open}
			aria-controls="docs-sidebar"
			onclick={() => (open = !open)}
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				aria-hidden="true"
			>
				<line x1="2" y1="3" x2="14" y2="3" />
				<line x1="2" y1="8" x2="14" y2="8" />
				<line x1="2" y1="13" x2="14" y2="13" />
			</svg>
			<span>Documentation</span>
		</button>
		{@render children()}
		<Footer />
	</div>
</div>
