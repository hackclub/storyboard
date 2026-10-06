/**
 * Storyboardtober calendar data + reveal rules.
 *
 * ── how to add your stickers ────────────────────────────────────────────────
 *   drop the file in `static/` and point that day's `image` at it:
 *   `image: '/stickers/oct-07.png'`
 *
 *   Every day is independent, so add them one at a time as you draw them. A day
 *   with `image: null` renders an empty slot until you fill it in.
 *
 *   NOTE: days 1-5 currently point at `cat.png` as a stand-in because their
 *   stickers ship revealed — swap those for the real art before launch.
 *
 * NOTE: this file ships to the browser, so any path you fill in is readable in
 * the page source. That's fine for a "peek early" calendar. If you ever need
 * the unrevealed stickers to be genuinely unguessable, keep them outside
 * `static/` and serve them from a private bucket, or from a server route that
 * checks the current date before responding (see `isRevealed`).
 */

export const CALENDAR_YEAR = 2026;

/** 10 = October. `Date` months are 0-indexed, hence the -1 in `unlockDate`. */
export const CALENDAR_MONTH = 10;

export const MONTH_LABEL = 'October';

/** Days 1-5 ship already revealed so the calendar isn't empty on launch. */
export const PREREVEALED_THROUGH = 4;

export interface StoryboardtoberDay {
	/** Day of October, 1-31. */
	day: number;
	/** Always visible, even while the sticker is still locked. */
	word: string;
	/** Path to this day's sticker, or `null` while you're still drawing it. */
	image: string | null;
}

export const storyboardtober: StoryboardtoberDay[] = [
	// days 1-5 ship already revealed, so they need a real image right away
	{ day: 1, word: 'Apple', image: '/theme-stickers/apple.png' },
	{ day: 2, word: 'Relic', image: '/theme-stickers/relic.png' },
	{ day: 3, word: 'Miniature', image: '/theme-stickers/miniature.png' },
	{ day: 4, word: 'Cactus', image: '/theme-stickers/cactus.png' },
	{ day: 5, word: 'Smack', image: '/theme-stickers/smack-hc.png' },
	{ day: 6, word: 'Ogre', image: '/theme-stickers/OgreInktober2026.png' },
	{ day: 7, word: 'Panic', image: '/theme-stickers/panic.png' },
	{ day: 8, word: 'Stinky', image: '/theme-stickers/stinky.png' },
	{ day: 9, word: 'Ram', image: '/theme-stickers/ram.png' },
	{ day: 10, word: 'Mystical', image: '/theme-stickers/mystical.png' },
	{ day: 11, word: 'Rescue', image: null },
	{ day: 12, word: 'Toss', image: null },
	{ day: 13, word: 'Flimsy', image: null },
	{ day: 14, word: 'Lady', image: null },
	{ day: 15, word: 'Hooray', image: null },
	{ day: 16, word: 'Gangly', image: null },
	{ day: 17, word: 'Contraption', image: null },
	{ day: 18, word: 'Flightless', image: null },
	{ day: 19, word: 'Confused', image: null },
	{ day: 20, word: 'Lounge', image: null },
	{ day: 21, word: 'Hero', image: null },
	{ day: 22, word: 'Beacon', image: null },
	{ day: 23, word: 'Dapper', image: null },
	{ day: 24, word: 'Bake', image: null },
	{ day: 25, word: 'Fracture', image: null },
	{ day: 26, word: 'Zip', image: null },
	{ day: 27, word: 'Dumb', image: null },
	{ day: 28, word: 'Trophy', image: null },
	{ day: 29, word: 'Tusk', image: null },
	{ day: 30, word: 'Cookie', image: null },
	{ day: 31, word: 'Flex', image: null }
];

/** Sunday-first, to match `Date#getDay`. */
export const WEEKDAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;

/** Empty cells before October 1st (Oct 1 2026 is a Thursday → 4). */
export const LEADING_BLANKS = new Date(CALENDAR_YEAR, CALENDAR_MONTH - 1, 1).getDay();

/** Local midnight that a given day's sticker unlocks at. */
export function unlockDate(day: number): Date {
	return new Date(CALENDAR_YEAR, CALENDAR_MONTH - 1, day);
}

/** True once `now` has passed this day's unlock moment. Stays true forever after. */
export function isRevealed(entry: StoryboardtoberDay, now: Date): boolean {
	if (entry.day <= PREREVEALED_THROUGH) return true;
	return now.getTime() >= unlockDate(entry.day).getTime();
}

/**
 * The next moment at which a still-locked day flips to revealed, or `null` if
 * every day is already out. Used to schedule an exact timer instead of polling.
 */
export function nextReveal(now: Date): Date | null {
	for (const entry of storyboardtober) {
		if (isRevealed(entry, now)) continue;
		return unlockDate(entry.day);
	}
	return null;
}
