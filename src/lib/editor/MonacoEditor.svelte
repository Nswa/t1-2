<script lang="ts">
	import { onMount } from 'svelte';
	import loader from '@monaco-editor/loader';
	import { configureGenesisDarkTheme } from './theme/genesis-dark'; // Import the theme configuration
	import { setupGenesisLanguage } from './lang/genesis'; // Import Genesis language setup

	export let value = '';
	export let language = 'default';
	export let theme = 'default'; // This will be used to set the theme

	let editor: any;
	let monacoElement: HTMLElement;

	onMount(() => {
		const initializeEditor = async () => {
			try {
				const monaco = await loader.init();
				configureGenesisDarkTheme(monaco); // Configure the custom theme
				setupGenesisLanguage(monaco); // Initialize Genesis language support

				editor = monaco.editor.create(monacoElement, {
					value,
					language,
					theme, // Use the theme prop here
					automaticLayout: true,
					wordWrap: 'on',
					minimap: { enabled: false }
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
