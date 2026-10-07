// Site color theme.
//
// `defaultTheme` is what every visitor sees. To change it permanently, edit the values
// below, or design a theme in the on-site Theme Editor, click "Copy theme code" and paste it here.
//
// The Theme Editor (palette button, bottom-right) lets you preview colors live. Changes made there
// are saved only in your own browser. Set `showThemeEditor` to false to hide the editor before launch.

export const showThemeEditor = true;

export const themeStorageKey = "hod-theme";

export type ThemeKey = "primary" | "onPrimary" | "secondary" | "background" | "backgroundAlt" | "surface" | "heading" | "text" | "muted";

export type Theme = Record<ThemeKey, string>;

/** Each theme color, the CSS variable it drives, and a description for the editor. */
export const themeTokens: { key: ThemeKey; label: string; cssVar: string; hint: string }[] = [
  { key: "primary", label: "Primary", cssVar: "--color-accent", hint: "Buttons, links, highlights" },
  { key: "onPrimary", label: "Text on primary", cssVar: "--color-on-accent", hint: "Text inside primary buttons" },
  { key: "secondary", label: "Secondary", cssVar: "--color-secondary", hint: "Stars, membership & offers" },
  { key: "background", label: "Background", cssVar: "--color-ink", hint: "Main page background" },
  { key: "backgroundAlt", label: "Alternate background", cssVar: "--color-ink-2", hint: "Every other section, footer" },
  { key: "surface", label: "Surface", cssVar: "--color-panel", hint: "Cards, panels, dropdowns" },
  { key: "heading", label: "Headings", cssVar: "--color-white", hint: "Headings, strong text, borders" },
  { key: "text", label: "Body text", cssVar: "--color-body", hint: "Paragraph text" },
  { key: "muted", label: "Muted text", cssVar: "--color-mist", hint: "Descriptions, captions" },
];

export const defaultTheme: Theme = {
  primary: "#2ec5e6",
  onPrimary: "#07090c",
  secondary: "#e8c26b",
  background: "#07090c",
  backgroundAlt: "#0d1117",
  surface: "#121821",
  heading: "#ffffff",
  text: "#e8edf3",
  muted: "#9aa7b6",
};

export const themePresets: { name: string; theme: Theme }[] = [
  { name: "Aqua Gloss", theme: defaultTheme },
  {
    name: "Gold Luxury",
    theme: {
      primary: "#d4af37",
      onPrimary: "#0b0a08",
      secondary: "#f1e3b5",
      background: "#0b0a08",
      backgroundAlt: "#12100c",
      surface: "#1a1712",
      heading: "#ffffff",
      text: "#ece6da",
      muted: "#a69c8a",
    },
  },
  {
    name: "Racing Red",
    theme: {
      primary: "#e5383b",
      onPrimary: "#ffffff",
      secondary: "#f4c430",
      background: "#0a0a0b",
      backgroundAlt: "#121214",
      surface: "#1a1a1d",
      heading: "#ffffff",
      text: "#ebebee",
      muted: "#a1a1aa",
    },
  },
  {
    name: "Emerald",
    theme: {
      primary: "#10b981",
      onPrimary: "#04120c",
      secondary: "#a3e635",
      background: "#06100c",
      backgroundAlt: "#0a1712",
      surface: "#10201a",
      heading: "#ffffff",
      text: "#e3efe9",
      muted: "#93a89e",
    },
  },
  {
    name: "Royal Purple",
    theme: {
      primary: "#8b5cf6",
      onPrimary: "#ffffff",
      secondary: "#f472b6",
      background: "#09070f",
      backgroundAlt: "#100d1a",
      surface: "#171326",
      heading: "#ffffff",
      text: "#e9e5f5",
      muted: "#a29cb8",
    },
  },
  {
    name: "Clean Light",
    theme: {
      primary: "#0891b2",
      onPrimary: "#ffffff",
      secondary: "#c2410c",
      background: "#f6f8fb",
      backgroundAlt: "#eaeef4",
      surface: "#ffffff",
      heading: "#0b1220",
      text: "#1f2937",
      muted: "#5b6675",
    },
  },
];

export function isHexColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

/** CSS that applies a theme to the whole page. */
export function themeCss(theme: Theme) {
  return `:root{${themeTokens.map((t) => `${t.cssVar}:${theme[t.key]}`).join(";")}}`;
}

/**
 * Inline script that applies a theme saved in this browser before first paint (prevents a color flash).
 * Kept self-contained because it runs before React loads.
 */
export function savedThemeScript() {
  const vars = Object.fromEntries(themeTokens.map((t) => [t.key, t.cssVar]));
  return `try{var t=JSON.parse(localStorage.getItem(${JSON.stringify(themeStorageKey)})||"null");var v=${JSON.stringify(vars)};if(t)for(var k in v)if(/^#[0-9a-fA-F]{6}$/.test(t[k]||""))document.documentElement.style.setProperty(v[k],t[k]);}catch(e){}`;
}
