<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="btn-row">
	<a href={resolve('/')}>Generator</a>
	<a href={resolve('/update')}>Update existing CSS</a>
</nav>

{@render children()}
