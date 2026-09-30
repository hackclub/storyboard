<script lang="ts">
	interface Prize {
		title: string;
		hours: string;
		description: string;
		src: string;
	}

	interface FAQItem {
		question: string;
		answer: string;
	}

	interface teamMember {
		name: string;
		src: string;
		link: string;
	}

	const teamMembers: teamMember[] = [
		{
			name: 'kat wang',
			src: '/pfp_kat.png',
			link: 'https://kat.wang'
		},
		{
			name: 'kaylee dinh',
			src: '/pfp_kaylee.png',
			link: 'https://github.com/kaylz-d'
		},
		{
			name: 'yunfei shuai',
			src: '/pfp_yunfei.png',
			link: 'https://small-n-stupid.vercel.app/'
		}
	];

	const prizes: Prize[] = [
		{
			title: 'Steam Dev License',
			hours: '30 hours',
			description: 'upload your game to steam!!! get big money?',
			src: '/prizes/steamlicense.jpg'
		},
		{
			title: 'Hoodie? 👀👀👀👀👀',
			hours: '15 hours',
			description: 'sparkly shiny and theres a funny cat too',
			src: '/prizes/hoodie.png'
		},
		{
			title: 'Drawing Tablet',
			hours: '50 hours',
			description: 'draw a visual novel & get a drawing tablet to... draw more visual novels',
			src: '/prizes/drawingtablet.webp'
		},
		{
			title: 'Fat Cat Plushie',
			hours: '15 hours',
			description: 'SOO CUTE',
			src: '/prizes/plushie.jpg'
		},
		{
			title: 'Stickers',
			hours: '1 hour',
			description: 'cool stickers drawn by the supercoolawesome storyboard team!',
			src: '/prizes/stickersheet.png'
		},
		{
			title: 'Keyboard',
			hours: '20 hours',
			description: 'click click clack clack',
			src: '/prizes/keyboard.webp'
		},
		{
			title: 'Steam Dev License',
			hours: '30 hours',
			description: 'upload your game to steam!!! get big money?',
			src: '/prizes/steamlicense.jpg'
		},
		{
			title: 'Hoodie? 👀👀👀👀👀',
			hours: '15 hours',
			description: 'sparkly shiny and theres a funny cat too',
			src: '/prizes/hoodie.png'
		},
		{
			title: 'Drawing Tablet',
			hours: '50 hours',
			description: 'draw a visual novel & get a drawing tablet to... draw more visual novels',
			src: '/prizes/drawingtablet.webp'
		},
		{
			title: 'Fat Cat Plushie',
			hours: '15 hours',
			description: 'SOO CUTE',
			src: '/prizes/plushie.jpg'
		},
		{
			title: 'Stickers',
			hours: '1 hour',
			description: 'cool stickers drawn by the supercoolawesome storyboard team!',
			src: '/prizes/stickersheet.png'
		},
		{
			title: 'Keyboard',
			hours: '20 hours',
			description: 'click click clack clack',
			src: '/prizes/keyboard.webp'
		}
	];

	const prizeColors = [
		{ bg: 'var(--color-magenta)', text: 'var(--color-whiteish)' },
		{ bg: 'var(--color-blue)', text: 'var(--color-whiteish)' },
		{ bg: 'var(--color-teal)', text: 'var(--color-purple-darkest)' },
		{ bg: 'var(--color-pink-purple)', text: 'var(--color-purple-darkest)' },
		{ bg: 'var(--color-yellow)', text: 'var(--color-purple-darkest)' },
		{ bg: 'var(--color-purple-mid)', text: 'var(--color-whiteish)' }
	];

	const faqs: FAQItem[] = [
		{
			question: 'Can I participate?',
			answer: "If you're a teen from ages 13-18, yes you can! Storyboard is free!"
		},
		{
			question: 'Do I need to know how to code & draw?',
			answer:
				'Nope! We encourage everyone - from experienced game developers & artists to absolute beginners - to participate in Storyboard.  Ren\u2019Py makes it easy to code, and there are tons of free drawing softwares (ex. Krita, Gimp, Kleki, ibisPaint X, Autodesk Sketchbook, LibreSprite, etc...) & tutorials online to help you get started. You can even team up with others!'
		},
		{
			question: 'How do I track my hours?',
			answer:
				'Coding hours are tracked with Hackatime, and art hours are tracked with Lapse. Check out the "How to Track Hours" guide above if you\u2019re not sure how it works!'
		},
		{
			question: 'What can I use to make my visual novel?',
			answer:
				'Anything! Ren\u2019Py is a great starting point, but you are free to use whatever you like.'
		},
		{
			question: 'Do I NEED Slack? What even is Slack??',
			answer:
				'Yes! Slack is like Hack Club\u2019s Discord. Join to chat with loads of other teens who like to make projects, and recieve updates from the Storyboard team! :)'
		}
	];

	import { onMount } from 'svelte';
	import StoryboardtoberCalendar from '$lib/components/StoryboardtoberCalendar.svelte';

	let scrollRef: HTMLElement | undefined;
	let trackRef: HTMLElement | undefined;
	let hovering = false;

	onMount(() => {
		const track = trackRef!;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const setEl = track.firstElementChild as HTMLElement;
		let setWidth = setEl.offsetWidth;
		const ro = new ResizeObserver(() => {
			setWidth = setEl.offsetWidth;
		});
		ro.observe(setEl);

		const BASE_SPEED = 90;
		const HOVER_SPEED = 28;
		let speed = BASE_SPEED;
		let pos = 0;
		let last = performance.now();
		let raf = requestAnimationFrame(frame);

		function frame(now: number) {
			const dt = Math.min((now - last) / 1000, 0.1);
			last = now;

			const target = hovering ? HOVER_SPEED : BASE_SPEED;
			speed += (target - speed) * Math.min(1, dt * 4);

			pos -= speed * dt;
			if (pos <= -setWidth) pos += setWidth;
			track.style.transform = `translate3d(${pos}px, 0, 0)`;

			raf = requestAnimationFrame(frame);
		}

		return () => {
			cancelAnimationFrame(raf);
			ro.disconnect();
		};
	});
</script>

<div>
	<!-- navbar -->
	<div
		class="navbar fixed top-0 z-20 flex w-screen items-center justify-between bg-black/50 p-6 px-12 backdrop-blur-xs"
	>
		<a href="https://hackclub.com" target="_blank">
			<img src="hc-flag.png" class="w-30 duration-200 hover:scale-105" alt="hack club flag" />
		</a>
		<div class="flex gap-8">
			<a class="text-glow text-3xl text-yellow decoration-wavy hover:underline" href="#how">about</a
			>
			<a class="text-glow text-3xl text-yellow decoration-wavy hover:underline" href="#prizes"
				>prizes</a
			>
			<a class="text-glow text-3xl text-yellow decoration-wavy hover:underline" href="#FAQ">FAQ</a>
			<a class="text-glow text-3xl text-teal decoration-wavy hover:underline" href="#hero"
				><i><b>sign up!</b></i></a
			>
		</div>
	</div>
	<!-- hero -->
	<div
		id="hero"
		class="hero flex h-screen w-screen flex-col items-center justify-center gap-2 bg-[url('/bg-hero.png')] bg-cover"
	>
		<img
			src="/logo-with-caption.png"
			alt="hack club's storyboard: for teens 13-18"
			class="m-4 w-3/4 md:w-1/3"
		/>
		<h1 class="text-glow text-center text-2xl text-teal md:text-3xl">
			make a visual novel, get cool prizes!
		</h1>
		<h1 class="text-glow text-center text-xl text-yellow md:text-3xl">
			<b>Storyboardtober is currently running!</b> make a visual novel in 1 month, and get prizes EVERY
			DAY.
		</h1>
		<div class="m-6 flex w-full flex-col items-center justify-center gap-4 md:w-1/2 md:flex-row">
			<a
				class="w-4/5 rounded-4xl bg-teal p-4 text-2xl outline outline-purple-darkest drop-shadow-sm drop-shadow-purple-darkest duration-200 hover:scale-105 hover:bg-whiteish hover:drop-shadow-md hover:drop-shadow-purple-darkest md:w-auto"
				href="#how"
			>
				GET STARTED
			</a>
			<a
				class="w-4/5 rounded-4xl bg-pink-purple p-4 text-2xl outline outline-purple-darkest drop-shadow-sm drop-shadow-purple-darkest duration-200 hover:scale-105 hover:bg-whiteish hover:drop-shadow-md hover:drop-shadow-purple-darkest md:w-auto"
				href="/placeholder"
			>
				SUBMIT!
			</a>
			<!-- <input
				type="email"
				name="email"
				autocomplete="email"
				class="w-4/5 rounded-4xl bg-whiteish p-3 px-5 text-xl text-purple-mid outline-2 outline-purple-dark drop-shadow-sm drop-shadow-purple-darkest md:w-2/3"
				placeholder="your@email.com"
			/>
			<button
				class="ok-btn w-4/5 rounded-4xl p-4 text-2xl outline outline-purple-darkest drop-shadow-sm drop-shadow-purple-darkest hover:drop-shadow-md hover:drop-shadow-purple-darkest md:w-auto"
				>OK!</button
			> -->
		</div>
	</div>
	<!-- windows -->
	<div
		class="window flex flex-col items-center justify-center gap-4 bg-purple-darkest bg-[url('/bg-window.png')] bg-cover text-center"
	>
		<!-- how it work? -->
		<div class="flex flex-col items-center justify-center gap-4" id="how">
			<h1 class=" text-glow mt-16 text-4xl text-whiteish">HOW DOES STORYBOARD WORK?</h1>
			<h2 class="text-glow m-4 text-2xl text-teal">learn how to make a visual novel...</h2>
			<div class="grid w-full grid-cols-1 md:w-2/3 md:grid-cols-3 md:grid-rows-2">
				<div class="how-container">
					<div class="flex flex-row items-center justify-start gap-6">
						<div class="how-number bg-magenta">1</div>
						<h1 class="text-3xl text-purple-darkest">sign up!</h1>
					</div>
					<p class="mt-2 leading-5 text-purple-darkest">
						sign up w/email & make sure to join the
						<a
							href="https://slack.hackclub.com"
							class="text-purple-mid underline hover:decoration-wavy">hack club slack!</a
						>
					</p>
					<img class="mx-auto mt-4 w-full outline" alt="" src="/how_signup.png" />
				</div>
				<div class="how-container">
					<div class="flex flex-row items-center justify-start gap-6">
						<div class="how-number bg-teal">2</div>
						<h1 class="text-3xl text-purple-darkest">write a story</h1>
					</div>
					<p class="mt-2 leading-5 text-purple-darkest">
						think of a project idea & write up characters, dialogue, and try to include lots of
						interactive options.
					</p>
					<img class="mx-auto mt-4 w-full outline" alt="" src="/how_write.png" />
				</div>
				<div class="how-container">
					<div class="flex flex-row items-center justify-start gap-6">
						<div class="how-number bg-yellow">3</div>
						<h1 class="text-3xl text-purple-darkest">draw</h1>
					</div>
					<p class="mt-2 leading-5 text-purple-darkest">
						draw up sprites, backgrounds, logos, and other assets for your game!
					</p>
					<img class="mx-auto mt-4 w-full outline" alt="" src="/how_draw.png" />
				</div>
				<div class="how-container">
					<div class="flex flex-row items-center justify-start gap-6">
						<div class="how-number bg-blue">4</div>
						<h1 class="text-3xl text-purple-darkest">code</h1>
					</div>
					<p class="mt-2 leading-5 text-purple-darkest">
						First ever coding project? We reccomend using <a
							href="https://www.renpy.org/"
							target="_blank"
							class="text-purple-mid underline hover:decoration-wavy">Ren'Py</a
						>. Check out our
						<a href="/placeholder" class="text-purple-mid underline hover:decoration-wavy"
							>guides!</a
						>
						You can use whatever you want, though!
					</p>
					<img class="mx-auto mt-4 w-full outline" alt="" src="/how_code.png" />
				</div>
				<div class="how-container">
					<div class="flex flex-row items-center justify-start gap-6">
						<div class="how-number bg-pink-purple">5</div>
						<h1 class="text-3xl text-purple-darkest">publish to itch.io</h1>
					</div>
					<p class="mt-2 leading-5 text-purple-darkest">
						upload your game to <a
							href="https://itch.io"
							target="_blank"
							class="text-purple-mid underline hover:decoration-wavy">itch.io</a
						> so anyone on the internet can play it!
					</p>
					<img class="mx-auto mt-4 w-full outline" alt="" src="/how_ship.png" />
				</div>
				<div class="how-container">
					<div class="flex flex-row items-center justify-start gap-6">
						<div class="how-number bg-[#b2b1f0]">6</div>
						<h1 class="text-3xl text-purple-darkest">submit for prize!!!</h1>
					</div>
					<p class="mt-2 leading-5 text-purple-darkest">
						CONGRATULATIONS!! submit your game to Storyboard, and get some super-cool hard-earned
						prizes :D
					</p>
					<img class="mx-auto mt-4 w-full outline" alt="" src="/how_prize.png" />
				</div>
			</div>
			<div class="sbtb-box">
				<h1 class="m-6 text-3xl text-purple-darkest underline">
					wait, what about <b>Storyboardtober</b>?
				</h1>
				<ul class="text-2xl leading-12 text-purple-dark">
					d <li>1. choose your theme(s) from the calendar below...</li>
					<li>
						2. work on your visual novel for just 1 hour every day! (yes, you can work on it for
						longer.)
					</li>
					<li>3. get a unique sticker for every day that you work on your project!</li>
					<li>4. get a bigger prize at the end!!!</li>
					<li>
						5. you'll have YOUR OWN visual novel, a bunch of stickers & and an awesome prize :D
					</li>
				</ul>
			</div>
			<StoryboardtoberCalendar />
		</div>

		<h2 class="prizes-text m-4 text-2xl text-white" id="prizes">...and we'll send you prizes!</h2>
		<!-- scrolling prizes  -->
		<!-- <div
			class="prize-scroll"
			bind:this={scrollRef}
			role="region"
			aria-label="prizes"
			onmouseenter={() => (hovering = true)}
			onmouseleave={() => (hovering = false)}
		>
			<div class="prize-track" bind:this={trackRef}>
				<div class="prize-set">
					{#each prizes as prize, i}
						<div
							class="prize-card flex flex-col items-center justify-between p-4 text-center"
							style="background-color: {prizeColors[i % prizeColors.length]
								.bg}; color: {prizeColors[i % prizeColors.length].text}"
						>
							<h1 class="mt-4 text-3xl underline">{prize.title}</h1>
							<p class="mt-4 text-lg">{prize.description}</p>
							<img
								src={prize.src}
								alt={prize.title}
								class="m-4 min-h-0 w-full flex-1 rounded-sm object-contain"
							/>
							<p class="text-lg">{prize.hours}</p>
						</div>
					{/each}
				</div>
				<div class="prize-set" aria-hidden="true">
					{#each prizes as prize, i}
						<div
							class="prize-card flex flex-col items-center justify-between p-4 text-center"
							style="background-color: {prizeColors[i % prizeColors.length]
								.bg}; color: {prizeColors[i % prizeColors.length].text}"
						>
							<h1 class="mt-4 text-3xl underline">{prize.title}</h1>
							<p class="mt-4 text-lg">{prize.description}</p>
							<img
								src={prize.src}
								alt={prize.title}
								class="m-4 min-h-0 w-full flex-1 rounded-sm object-contain"
							/>
							<p class="text-lg">{prize.hours}</p>
						</div>
					{/each}
				</div>
			</div>
		</div> -->
		<div>
			<div class="">
				<div class="grid grid-cols-4 grid-rows-4 place-items-center gap-4 space-y-8">
					{#each prizes as prize, i}
						<div
							class="prize-card flex flex-col items-center justify-between p-6 text-center"
							style="background-color: {prizeColors[i % prizeColors.length]
								.bg}; color: {prizeColors[i % prizeColors.length].text}"
						>
							<h1 class="mt-4 text-2xl underline">{prize.title}</h1>
							<p class="mt-4 text-base">{prize.description}</p>
							<!-- <img
								src={prize.src}
								alt={prize.title}
								class="m-4 min-h-0 w-full flex-1 rounded-sm object-contain"
							/> -->
							<p class="dark mt-auto rounded-xs text-lg">{prize.hours}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<!-- guides -->
		<div class="guides flex w-full flex-col items-center justify-center gap-4 text-center">
			<h2 class="text-glow text-2xl text-white"><b>we have step-by-step guides to help:</b></h2>
			<div
				class="guides-grid m-6 grid w-full grid-cols-1 md:w-3/4 md:grid-cols-2 lg:w-2/3 xl:w-1/2"
			>
				<a
					href="https://docs.google.com/document/d/1tfEr_6A3tlXod_1El_F757lU6MpuZNft8vFeGw0q808/edit?usp=sharing"
					class="guide-container"
				>
					<img src="/cat.png" alt="" class="h-20 w-25" />
					<div class="flex w-full flex-col gap-2 text-left">
						<h1 class="text-xl leading-5">
							How to Track Hours <i class="text-sm">(so you can get prizes!)</i>
						</h1>
						<p>by @Susan</p>
					</div>
				</a>
				<a
					href="https://www.canva.com/design/DAGwcjmWlZQ/cUCpoAELlKlByVjLzmoCRw/view?embed"
					class="guide-container"
				>
					<img src="/cat.png" alt="" class="h-20 w-25" />
					<div class="flex w-full flex-col gap-2 text-left">
						<h1 class="text-xl leading-5">Storywriting Guide</h1>
						<p>by @yunfei</p>
					</div>
				</a>
				<a href="https://ikealoverkat.github.io/storyboard2/" class="guide-container">
					<img src="/cat.png" alt="" class="h-20 w-25" />
					<div class="flex w-full flex-col gap-2 text-left">
						<p class="text-sm">HOW TO CODE A VISUAL NOVEL</p>
						<h1 class="text-xl leading-5">Ren'Py Quickstart Doc</h1>
						<p>by @kat</p>
					</div>
				</a>
				<a
					href="https://www.canva.com/design/DAGwqnw-zrA/3dG1zywd0SWtJ3xOUwylVA/view?embed"
					class="guide-container"
				>
					<img src="/cat.png" alt="" class="h-20 w-25" />
					<div class="flex w-full flex-col gap-2 text-left">
						<p class="text-sm">HOW TO CODE A VISUAL NOVEL</p>
						<h1 class="text-xl leading-5">Ren'Py Quickstart Slide</h1>
						<p>by @shyla</p>
					</div>
				</a>
				<a
					href="https://www.canva.com/design/DAGwqnw-zrA/3dG1zywd0SWtJ3xOUwylVA/view?embed"
					class="guide-container"
				>
					<img src="/cat.png" alt="" class="h-20 w-25" />
					<div class="flex w-full flex-col gap-2 text-left">
						<h1 class="text-xl leading-4">...</h1>
						<p>by @...</p>
					</div>
				</a>
				<div class="guide-container">
					<img src="/cat.png" alt="" class="h-20 w-25" />
					<div class="flex w-full flex-col gap-2 text-left">
						<h1 class="text-xl leading-4">...</h1>
						<p>by @...</p>
					</div>
				</div>
			</div>
			<a
				href="placeholder"
				class="text-glow z-10 -mt-20 text-2xl text-yellow underline hover:decoration-wavy"
				>view more →</a
			>
			<div class="collection mt-12">
				<h2 class="text-glow z-10 my-8 text-2xl text-whiteish">
					and a collection of <a
						href="/placeholder"
						class="text-pink-purple underline hover:decoration-wavy">free resources</a
					> for you to use! :)
				</h2>
			</div>
		</div>
	</div>
</div>
<!-- examples & faq -->
<div
	class="examples flex flex-col items-center justify-center gap-2 bg-black p-8 pt-16 text-center text-whiteish md:p-8 md:pt-24"
>
	<!-- examples -->
	<!-- <div class="flex flex-col gap-4">
		<h1 class="m-4 text-3xl text-teal">example projects</h1>
		<p class="examples-text-gradient-pink text-xl">
			Look at these cool projects other Storyboarders have made & get inspired!
			<br />Stuck on ideas? explore the <a href="/placeholder">#storyboard</a> channel & feel free to ask
			questions.
		</p>
		<!-- TV w projects - make a componentn later or sum -->
	<!-- <div class="m-6 bg-teal/15 p-4"></div> -->
	<!-- </div> -->
	<!-- faq -->
	<div class="mb-12 flex w-full flex-col gap-4" id="FAQ">
		<h1 class="examples-text-gradient-blue m-4 text-4xl"><b>FAQ</b></h1>
		<iframe
			frameborder="0"
			src="https://itch.io/embed-upload/19478916?color=e8e9f7"
			class="mx-auto"
			title="storyboard-faq-game"
			width="1280"
			height="740"
			><a href="https://ikealoverkat.itch.io/storyboard-faq-game"
				>Play storyboard-faq-game on itch.io</a
			></iframe
		>
		<h2 class="m-8 text-xl leading-loose">
			More questions? ask in <a
				href="https://hackclub.enterprise.slack.com/archives/C09JZLBKS65"
				class="mx-2 rounded-lg bg-linear-to-b from-purple-mid/30 to-purple-darkest/50 p-2 text-whiteish outline outline-purple-mid/60 duration-200 hover:rounded-xl hover:p-3 hover:underline"
				>#storyboard-help</a
			>
			or email
			<a
				href="mailto:storyboard@hackclub.com"
				class="text-pink-purple underline hover:decoration-wavy">storyboard@hackclub.com</a
			>
		</h2>
	</div>
</div>
<!-- footer -->
<div
	class="footer flex flex-col items-center justify-center gap-2 bg-[#0C0C1B] p-8 text-center md:p-18"
>
	<h1 class="text-2xl text-pink-purple">
		made with <b class="text-4xl text-magenta">♡</b> by teens, for teens
	</h1>
	<!-- team -->
	<div class="m-6 flex flex-row gap-2 duration-200">
		{#each teamMembers as member}
			<div class="group mx-2 flex flex-col transition-all duration-200 hover:scale-110">
				<img
					src={member.src}
					alt={member.name}
					class="mb-2 h-20 w-20 rounded-[4rem] object-cover outline outline-whiteish"
				/>
				<p class="caption-fadein hidden text-whiteish group-hover:block">{member.name}</p>
			</div>
		{/each}
	</div>
	<p class="text-xl text-pink-purple">
		<a href="https://hackclub.com" target="_blank" class="hover:decration-wavy underline"
			>hack club</a
		>
		✦
		<a href="https://slack.hackclub.com" target="_blank" class="hover:decration-wavy underline"
			>slack</a
		>
		✦
		<a href="https://clubs.hackclub.com" target="_blank" class="hover:decration-wavy underline"
			>clubs</a
		>
		✦
		<a href="https://conduct.hackclub.com" target="_blank" class="hover:decration-wavy underline"
			>code of conduct</a
		>
	</p>
	<p class="text-xl text-pink-purple">
		this website is <a
			href="https://github.com/hackclub/storyboard"
			class="text-teal underline hover:decoration-wavy">open source!</a
		>
	</p>
</div>
