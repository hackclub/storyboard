<script lang="ts">
	function goBack(e: any) {
		e.preventDefault();
		history.back();
	}
</script>

<div
	class="placeholder flex h-screen w-screen flex-col items-center justify-center bg-[url('/bg-window.png')] bg-cover text-center"
>
	<div class="z-10 flex flex-col items-center justify-center gap-4 p-12">
		<button onclick={goBack} class="text-glow text-xl text-teal underline hover:decoration-wavy"
			><i>← back</i></button
		>
		<br />
		<h1 class="text-glow text-2xl text-pretty text-whiteish md:text-3xl lg:text-4xl">
			looks like this page doesn't exist yet.
		</h1>
		<br />
		<p class="text-glow text-lg text-pretty text-yellow md:text-xl lg:text-2xl">
			it will soon though!! once storyboard fully launches, you shouldn't be able to find this page.
			<br />
			<br />if you do, PLSPLSPLS dm
			<a
				href="https://hackclub.enterprise.slack.com/team/U08H34LLQQJ"
				class="text-pink-purple underline hover:decoration-wavy">@kat</a
			>
			on slack or email
			<a href="mailto:storyboard@hackclub.com" class="text-pink-purple underline hover:decoration-wavy"
				>storyboard@hackclub.com</a
			>
			and tell her how you got here.
			<br />
			<br /> uh oh....
		</p>
	</div>
</div>

<style>
	.placeholder::before {
		position: absolute;
		backdrop-filter: blur(4px);
		content: '';
		width: 100vw;
		height: 100vh;
		background-color: color-mix(in srgb, black 60%, transparent);
	}
</style>
