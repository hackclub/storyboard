<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CALENDAR_MONTH,
		CALENDAR_YEAR,
		LEADING_BLANKS,
		MONTH_LABEL,
		WEEKDAYS,
		isRevealed,
		nextReveal,
		storyboardtober
	} from '$lib/storyboardtober';

	/** Drives every reveal check. Reassigned wholesale on a timer, never mutated. */
	let now = $state(new Date());

	const blanks = Array.from({ length: LEADING_BLANKS });

	const accents = [
		'var(--color-magenta)',
		'var(--color-blue)',
		'var(--color-teal)',
		'var(--color-pink-purple)',
		'var(--color-yellow)',
		'var(--color-purple-mid)'
	];

	const revealedCount = $derived(storyboardtober.filter((day) => isRevealed(day, now)).length);

	const isToday = (day: number) =>
		now.getFullYear() === CALENDAR_YEAR &&
		now.getMonth() === CALENDAR_MONTH - 1 &&
		now.getDate() === day;

	onMount(() => {
		const refresh = () => (now = new Date());

		/** setTimeout is capped at ~24.8 days, and sleepers never fire on time. */
		const schedule = () => {
			clearTimeout(timer);
			const next = nextReveal(now);
			if (!next) return;

			const delay = Math.min(Math.max(next.getTime() - Date.now() + 500, 1_000), 2_147_483_647);
			timer = setTimeout(() => {
				refresh();
				schedule();
			}, delay);
		};

		let timer: ReturnType<typeof setTimeout>;

		refresh();
		schedule();

		// Tabs get throttled and laptops sleep, so re-check whenever we wake up.
		const onWake = () => {
			if (document.hidden) return;
			refresh();
			schedule();
		};
		document.addEventListener('visibilitychange', onWake);
		window.addEventListener('focus', onWake);

		// Safety net for clock changes and clamped timers.
		const interval = setInterval(refresh, 60_000);

		return () => {
			clearTimeout(timer);
			clearInterval(interval);
			document.removeEventListener('visibilitychange', onWake);
			window.removeEventListener('focus', onWake);
		};
	});
</script>

<section class="sbtb-calendar" aria-label="{MONTH_LABEL} {CALENDAR_YEAR} theme calendar">
	<header class="sbtb-cal-header">
		<h3 class="sbtb-cal-title">{MONTH_LABEL} THEMES!</h3>
		<p class="sbtb-cal-sub">
			every day has a theme + a sticker! stickers pop out every day @ midnight 
			<br> ✦ <b
				>{revealedCount}/31</b
			> out so far
		</p>
	</header>

	<div class="sbtb-cal-grid">
		{#each WEEKDAYS as weekday (weekday)}
			<span class="sbtb-cal-weekday" aria-hidden="true">{weekday}</span>
		{/each}

		{#each blanks as _, i (i)}
			<span class="sbtb-cal-blank" aria-hidden="true"></span>
		{/each}

		{#each storyboardtober as entry, i (entry.day)}
			{@const revealed = isRevealed(entry, now)}
			<article
				class="sbtb-cal-day"
				class:sbtb-cal-day--locked={!revealed}
				class:sbtb-cal-day--today={isToday(entry.day)}
				style="--accent: {accents[i % accents.length]}; --i: {i}"
				aria-label="October {entry.day}: {entry.word}, {revealed
					? 'sticker revealed'
					: 'sticker not revealed yet'}"
			>
				<span class="sbtb-cal-tape" aria-hidden="true"></span>
				<span class="sbtb-cal-date">{entry.day}</span>

				<div class="sbtb-cal-art">
					{#if !revealed}
						<span class="sbtb-cal-mystery" aria-hidden="true">?</span>
					{:else if entry.image}
						<img
							class="sbtb-cal-sticker"
							src={entry.image}
							alt="{entry.word} sticker"
							loading="lazy"
							decoding="async"
						/>
					{:else}
						<span class="sbtb-cal-empty" aria-hidden="true"></span>
					{/if}
				</div>

				<h4 class="sbtb-cal-word">{entry.word}</h4>
			</article>
		{/each}
	</div>
</section>
