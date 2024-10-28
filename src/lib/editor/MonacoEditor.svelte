<script lang="ts">
	import { onMount } from 'svelte';
	import loader from '@monaco-editor/loader';
	import { configureGenesisDarkTheme } from './theme/genesis-dark'; // Import the theme configuration
	import { setupGenesisLanguage } from './lang/genesis'; // Import Genesis language setup

	export let value = '';
	export let language = 'genesis'; // Change default to 'genesis'
	export let theme = 'genesis-theme'; // Change default to 'genesis'

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

				// Handle Enter key
				editor.onKeyDown((e: any) => {
					if (e.keyCode === monaco.KeyCode.Enter) {
						e.preventDefault();
						const selection = editor.getSelection();
						const position = selection.getPosition();

						editor.executeEdits('insert-newline', [
							{
								range: new monaco.Range(
									position.lineNumber,
									position.column,
									position.lineNumber,
									position.column
								),
								text: '\n~'
							}
						]);
					}
				});

				// Handle initial content
				if (value && !value.startsWith('~')) {
					editor.setValue('~' + value);
				}
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
