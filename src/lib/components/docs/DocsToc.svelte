<script lang="ts">
	export interface TocHeading {
		id: string;
		text: string;
		level: number;
	}

	interface Props {
		headings: TocHeading[];
	}

	let { headings }: Props = $props();
	let activeId = $state('');

	$effect(() => {
		const list = headings;
		if (list.length === 0 || typeof document === 'undefined') {
			activeId = '';
			return;
		}

		const elements = list
			.map((heading) => document.getElementById(heading.id))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) activeId = visible[0].target.id;
			},
			{ rootMargin: '-80px 0px -70% 0px', threshold: 0 }
		);

		elements.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

{#if headings.length > 0}
	<nav class="docs-toc" aria-label="On this page">
		<p class="docs-toc-title">On this page</p>
		<ul class="docs-toc-list">
			{#each headings as heading (heading.id)}
				<li class:depth-3={heading.level === 3}>
					<a
						href={`#${heading.id}`}
						class:is-active={activeId === heading.id}
						aria-current={activeId === heading.id ? 'location' : undefined}>{heading.text}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
