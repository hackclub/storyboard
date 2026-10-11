<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="docs-content">
	<header class="docs-page-head">
		<h1 class="docs-page-title">
			{page.status === 404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		{#if page.error}
			<p class="docs-page-desc">{page.error.message}</p>
		{/if}
	</header>

	<article class="docs-prose">
		<p>
			this documentation page couldn't be loaded! it may have been moved or deleted. Head back to the docs overview and try again from the sidebar.
		</p>
		<p>
			<a href="/docs">read the docs</a> · <a href="/">back to home</a>
		</p>
	</article>
</div>
