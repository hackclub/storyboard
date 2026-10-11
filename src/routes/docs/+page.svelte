<script lang="ts">
	import { navGroups } from '$lib/docs';
</script>

<svelte:head>
	<title>Storyboard Docs</title>
	<meta name="description" content="Guides and reference for Storyboardtober." />
</svelte:head>

<div class="docs-content">
	<header class="docs-page-head">
		<h1 class="docs-page-title">Storyboard Docs</h1>
		<p class="docs-page-desc">
			Want to participate in Storyboard but don't know how to start? Or maybe just looking for some resources? We have tons of guide & resource docs for you to use!
		</p>
	</header>

	<article class="docs-prose">
		<p>New here? Start with the <a href="/docs/getting-started">Getting Started</a> guide.</p>
	</article>

	{#each navGroups as group (group.category)}
		<section>
			<h2 class="docs-section-title">{group.category}</h2>
			<div class="docs-landing-grid">
				{#each group.items as doc (doc.slug)}
					<a class="docs-card" href={`/docs/${doc.slug}`}>
						<h3>{doc.title}</h3>
						{#if doc.description}<p>{doc.description}</p>{/if}
					</a>
				{/each}
			</div>
		</section>
	{/each}
</div>
