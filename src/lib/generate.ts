import postcss from "postcss";
import { appState } from "./appState.svelte";
import { createCache } from "./cache.svelte";

export const CSS_BASE_URL =
    "https://raw.githubusercontent.com/echodotvbs/echos-css-snippets/refs/heads/main/echos%20discord%20quality%20fixer%20thing/stable.css";

export const cssCache = createCache<string, string>(async (url) => {
    const res = await fetch(url);
    return res.text();
});

type Key = keyof typeof appState;
// "str" = copied as is, "onoff" = on/off, "bit" = 1/0
type Kind = "str" | "onoff" | "bit";

export const VARS: [cssVar: string, key: Key, kind: Kind][] = [
    ["--user-banner", "userBanner", "onoff"],
    ["--tint-profiles", "tintProfiles", "onoff"],
    ["--account-hider", "dotsHiding", "onoff"],
    ["--userbar-autohide", "autoHideUsr", "bit"],
    ["--accent", "accentColr", "str"],
    ["--dm-btn-idle", "dmButtonColr", "str"],
    ["--dm-btn-hover", "dmButtonHoverColr", "str"],
    ["--menu-max-height", "menuHei", "str"],
    ["--menu-max-width", "menuWid", "str"],
    ["--menu-border-radius", "menuBor", "str"],
    ["--pop-up-color", "acrylicPopUpColr", "str"],
    ["--blur-popup", "acrylicBlurPopup", "str"],
    ["--image-viewer-blur", "imageViewerBlur", "str"],
    ["--image-overlay-color", "imageOverlayColr", "str"],
    ["--image-overlay-radius", "imageOverlayRadius", "str"],
    ["--server-highlight-fade-in", "serverFadeIn", "str"],
    ["--server-highlight-fade-out", "serverFadeOut", "str"],
    ["--server-highlight-dim", "serverDim", "str"],
    ["--message-highlight-fade-in", "msgFadeIn", "str"],
    ["--message-highlight-fade-out", "msgFadeOut", "str"],
    ["--typing-one", "singleTyping", "str"],
    ["--typing-many", "moreThan2Typing", "str"],
    ["--typing-several", "severalTyping", "str"],
    ["--spoiler-blur-hover", "miscSpoilBlur", "str"],
    ["--message-hover-shift", "miscMesShift", "str"],
    ["--hover-highlight-strength", "mischighLight", "str"],
    ["--glass-blur", "miscglassBlur", "str"],
];

const encode = (v: unknown, kind: Kind) =>
    kind === "onoff" ? (v ? "on" : "off") : kind === "bit" ? (v ? "1" : "0") : String(v);

const decode = (v: string, kind: Kind) =>
    kind === "onoff" ? v === "on" : kind === "bit" ? v === "1" : v;

export async function generate(): Promise<{ css: string; url: string }> {
    const cssContent = await cssCache.get(CSS_BASE_URL);
    const root = postcss.parse(cssContent);

    root.walkRules(":root", (rule) => {
        for (const [cssVar, key, kind] of VARS) {
            rule.walkDecls(cssVar, (decl) => {
                decl.value = encode(appState[key], kind);
            });
        }
    });

    const query = new URLSearchParams();
    for (const [, key, kind] of VARS) {
        query.set(key, encode(appState[key], kind));
    }

    return { css: root.toString(), url: `?${query}` };
}

export function importCss(css: string) {
    const found: Record<string, string> = {};
    postcss.parse(css).walkRules(":root", (rule) => {
        rule.walkDecls((decl) => {
            if (decl.prop.startsWith("--")) found[decl.prop] = decl.value.trim();
        });
    });

    let count = 0;
    for (const [cssVar, key, kind] of VARS) {
        if (cssVar in found) {
            (appState as Record<Key, unknown>)[key] = decode(found[cssVar], kind);
            count++;
        }
    }
    return count;
}

export async function updateCss(oldCss: string) {
    const count = importCss(oldCss);
    const generated = await generate()
    return { count, css: generated.css, url: generated.url };
}
