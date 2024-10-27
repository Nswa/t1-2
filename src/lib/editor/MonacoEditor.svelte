<script lang="ts">
	import { onMount } from 'svelte';
	import loader from '@monaco-editor/loader';

	export let value = '';
	export let language = 'javascript';
	export let theme = 'default';

	let editor: any;
	let monacoElement: HTMLElement;

	onMount(() => {
		const initializeEditor = async () => {
			try {
				const monaco = await loader.init();
				editor = monaco.editor.create(monacoElement, {
					value,
					language,
					theme,
					automaticLayout: true
				});
			} catch (error) {
				console.error('Failed to initialize Monaco editor:', error);
			}
		};

		initializeEditor();

		// Return synchronous cleanup function
		return () => editor?.dispose();
	});
</script>

<div bind:this={monacoElement} class="editor-container"></div>

<style>
	@import '$lib/editor/editor.css';
</style>
