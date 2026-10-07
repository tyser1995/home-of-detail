"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Palette, RotateCcw, X } from "lucide-react";
import { defaultTheme, isHexColor, themePresets, themeStorageKey, themeTokens, type Theme, type ThemeKey } from "@/lib/theme";

function readSavedTheme(): Theme | null {
  try {
    const saved = JSON.parse(localStorage.getItem(themeStorageKey) ?? "null");
    if (!saved || typeof saved !== "object") return null;
    // Merge over the default so newly added tokens still get a value.
    const merged = { ...defaultTheme };
    for (const t of themeTokens) if (isHexColor(saved[t.key] ?? "")) merged[t.key] = saved[t.key];
    return merged;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  for (const t of themeTokens) root.style.setProperty(t.cssVar, theme[t.key]);
}

function sameTheme(a: Theme, b: Theme) {
  return themeTokens.every((t) => a[t.key].toLowerCase() === b[t.key].toLowerCase());
}

export function ThemeEditor() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  // Hex text fields can hold half-typed values; only valid colors are applied.
  const [drafts, setDrafts] = useState<Partial<Record<ThemeKey, string>>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function openEditor() {
    setTheme(readSavedTheme() ?? defaultTheme);
    setDrafts({});
    setOpen(true);
  }

  function update(next: Theme) {
    setTheme(next);
    applyTheme(next);
    try {
      if (sameTheme(next, defaultTheme)) localStorage.removeItem(themeStorageKey);
      else localStorage.setItem(themeStorageKey, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode); the preview still works for this visit.
    }
  }

  function setColor(key: ThemeKey, value: string) {
    setDrafts((d) => ({ ...d, [key]: value }));
    if (isHexColor(value)) update({ ...theme, [key]: value.toLowerCase() });
  }

  async function copyCode() {
    const body = themeTokens.map((t) => `  ${t.key}: "${theme[t.key]}",`).join("\n");
    const code = `export const defaultTheme: Theme = {\n${body}\n};`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this into src/lib/theme.ts:", code);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openEditor}
        aria-label="Open theme editor"
        className="glow-accent fixed bottom-24 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent text-on-accent transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        <Palette className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="theme-editor-title">
          <button type="button" aria-label="Close theme editor" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
          <aside className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-panel shadow-2xl">
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 id="theme-editor-title" className="font-display text-lg font-semibold text-white">
                  Theme editor
                </h2>
                <p className="text-xs text-mist">Changes preview live and save in this browser.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-mist">Presets</h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {themePresets.map((p) => {
                  const active = sameTheme(p.theme, theme);
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => {
                        setDrafts({});
                        update(p.theme);
                      }}
                      aria-pressed={active}
                      className={`rounded-xl border p-2.5 text-left transition-colors ${
                        active ? "border-accent" : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <span className="flex h-6 overflow-hidden rounded-md" aria-hidden="true">
                        {(["background", "surface", "primary", "secondary", "heading"] as const).map((k) => (
                          <span key={k} className="flex-1" style={{ background: p.theme[k] }} />
                        ))}
                      </span>
                      <span className="mt-2 flex items-center justify-between text-xs font-medium text-white">
                        {p.name}
                        {active && <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <h3 className="mt-7 text-xs font-semibold uppercase tracking-widest text-mist">Colors</h3>
              <ul className="mt-3 grid gap-3">
                {themeTokens.map((t) => {
                  const draft = drafts[t.key] ?? theme[t.key];
                  return (
                    <li key={t.key} className="flex items-center gap-3">
                      <input
                        type="color"
                        value={theme[t.key]}
                        onChange={(e) => setColor(t.key, e.target.value)}
                        aria-label={`${t.label} color`}
                        className="h-10 w-10 shrink-0 cursor-pointer rounded-lg border border-white/15 bg-transparent p-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">{t.label}</p>
                        <p className="truncate text-xs text-mist">{t.hint}</p>
                      </div>
                      <input
                        value={draft}
                        onChange={(e) => setColor(t.key, e.target.value.trim())}
                        aria-label={`${t.label} hex value`}
                        spellCheck={false}
                        maxLength={7}
                        className={`w-[5.5rem] rounded-lg border bg-ink px-2 py-1.5 font-mono text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                          isHexColor(draft) ? "border-white/15" : "border-red-500"
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            <footer className="grid gap-2 border-t border-white/10 px-5 py-4">
              <button
                type="button"
                onClick={copyCode}
                className="glow-accent inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy theme code"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDrafts({});
                  update(defaultTheme);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:border-accent hover:text-accent"
              >
                <RotateCcw className="h-4 w-4" /> Reset to default
              </button>
              <p className="pt-1 text-center text-[0.7rem] leading-relaxed text-mist">
                To make this theme the default for every visitor, paste the copied code into <code>src/lib/theme.ts</code>.
              </p>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}
