<script lang="ts">
	import { page } from '$app/state';
	import { navGroups } from '$lib/docs';

	interface Props {
		onNavigate?: () => void;
	}

	let { onNavigate }: Props = $props();

	const currentPath = $derived(page.url.pathname);
</script>

<nav aria-label="Documentation">
	<div class="docs-nav-group">
		<p class="docs-nav-category">Overview</p>
		<ul class="docs-nav-list">
			<li>
				<a
					class="docs-nav-link"
					href="/docs"
					aria-current={currentPath === '/docs' ? 'page' : undefined}
					onclick={onNavigate}>Documentation Home</a
				>
			</li>
		</ul>
	</div>

	{#each navGroups as group (group.category)}
		<div class="docs-nav-group">
			<p class="docs-nav-category">{group.category}</p>
			<ul class="docs-nav-list">
				{#each group.items as doc (doc.slug)}
					<li>
						<a
							class="docs-nav-link"
							href={`/docs/${doc.slug}`}
							aria-current={currentPath === `/docs/${doc.slug}` ? 'page' : undefined}
							onclick={onNavigate}>{doc.title}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
