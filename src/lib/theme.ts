export type Theme = "light" | "dark";

// Must stay self-contained (no imports or outer references): it is serialized
// with toString() and runs inline in <head> before the bundle loads, which is
// why it uses native Date instead of Day.js.
export function resolveTheme(override?: Theme): Theme {
	const DAY_START_HOUR = 6;
	const DAY_END_HOUR = 18;
	const OVERRIDE_KEY = "theme-override";
	const THEME_KEY = "theme";

	// Shifting by DAY_START_HOUR keeps a night that crosses midnight in a single period.
	const shifted = new Date(Date.now() - DAY_START_HOUR * 60 * 60 * 1000);
	const isDay = shifted.getHours() < DAY_END_HOUR - DAY_START_HOUR;
	const period = `${shifted.getFullYear()}-${shifted.getMonth() + 1}-${shifted.getDate()}-${isDay ? "day" : "night"}`;

	let theme: Theme = isDay ? "light" : "dark";

	try {
		if (override) {
			localStorage.setItem(
				OVERRIDE_KEY,
				JSON.stringify({ theme: override, period }),
			);
		}

		const stored: unknown = JSON.parse(
			localStorage.getItem(OVERRIDE_KEY) ?? "null",
		);

		if (
			typeof stored === "object" &&
			stored !== null &&
			"period" in stored &&
			"theme" in stored &&
			stored.period === period &&
			(stored.theme === "light" || stored.theme === "dark")
		) {
			theme = stored.theme;
		} else {
			localStorage.removeItem(OVERRIDE_KEY);
		}

		localStorage.setItem(THEME_KEY, theme);
	} catch {
		// Storage unavailable (private mode, blocked): fall back to the time-based theme.
	}

	return theme;
}

export const themeScript = `(${resolveTheme.toString()})()`;
