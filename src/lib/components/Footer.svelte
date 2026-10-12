<script lang="ts">
	interface teamMember {
		name: string;
		src: string;
		link: string;
	}

	const teamMembers: teamMember[] = [
		{
			name: 'kat wang',
			src: '/pfp_kat.webp',
			link: 'https://kat.wang'
		},
		{
			name: 'kaylee dinh',
			src: '/pfp_kaylee.webp',
			link: 'https://github.com/kaylz-d'
		},
		{
			name: 'yunfei shuai',
			src: '/pfp_yunfei.webp',
			link: 'https://small-n-stupid.vercel.app/'
		},
		{
			name: 'susan zheng',
			src: '/pfp_susan.png',
			link: 'https://github.com/uselesslyuseful'
		},
		{
			name: 'sophia duan',
			src: '/cat.webp',
			link: 'https://sophiaduan.dev'
		},
		{
			name: 'herby',
			src: '/pfp_herby.webp',
			link: 'https://herbeon.github.io/links/'
		}
	];
</script>

<div class="footer flex flex-col items-center justify-center gap-2 p-8 text-center md:p-18">
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
