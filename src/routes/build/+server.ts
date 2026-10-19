import { appState } from '#lib/appState.svelte.ts';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import postcss from 'postcss';
import { CSS_BASE_URL, cssCache, VARS } from '#lib/generate.ts';

type Key = keyof typeof appState;
type Kind = "str" | "onoff" | "bit";


function isKey(k: string): k is Key {
	return k in appState;
}

function encodeParam(value: string, kind: Kind): string {
	switch (kind) {
		case "onoff":
			return ["on", "1", "true"].includes(value) ? "on" : "off";
		case "bit":
			return ["1", "on", "true"].includes(value) ? "1" : "0";
		case "str":
			return value;
	}
}

const VAR_BY_KEY = new Map<Key, { cssVar: string; kind: Kind }>(
	VARS.map(([cssVar, key, kind]) => [key, { cssVar, kind }])
);

async function generate(params: Iterable<[string, string]>) {
	const cssContent = await cssCache.get(CSS_BASE_URL);
	const root = postcss.parse(cssContent);

	const overrides = new Map<string, string>();
	for (const [key, value] of params) {
		const entry = VAR_BY_KEY.get(key as Key);
		if (!entry) continue;
		overrides.set(entry.cssVar, encodeParam(value, entry.kind));
	}

	root.walkRules((rule) => {
		const selectors = rule.selector.split(',').map((s) => s.trim());
		if (!selectors.includes(':root')) return;

		rule.walkDecls((decl) => {
			const next = overrides.get(decl.prop);
			if (next !== undefined) decl.value = next;
		});
	});

	return root.toString();
}

export const GET: RequestHandler = async ({ url }) => {
	for (const [key] of url.searchParams) {
		if (!isKey(key)) throw error(400, `Unknown param: ${key}`);
	}

	return new Response(await generate(url.searchParams), {
		headers: { 'Content-Type': 'text/plain' }
	});
};