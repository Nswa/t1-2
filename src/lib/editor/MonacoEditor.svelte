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

				// Update placeholder decoration color to match light theme
				const placeholderDecoration = {
					range: new monaco.Range(1, 1, 1, 1),
					options: {
						after: {
							content: ' continue typing...',
							color: '#9E9E9E', // Changed from #4B5563 to a lighter gray
							fontStyle: 'italic',
							margin: '0 0 0 2px' // Reduced margin
						},
						isWholeLine: false, // Changed to false
						stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges
					}
				};

				editor = monaco.editor.create(monacoElement, {
					value,
					language,
					theme, // Use the theme prop here
					automaticLayout: true,
					wordWrap: 'on',
					minimap: { enabled: false }
				});

				// Track decorations
				let activeDecorations: string[] = [];

				// Update placeholder decorations when content changes
				editor.onDidChangeModelContent(() => {
					const model = editor.getModel();
					const decorations = [];

					for (let lineNumber = 1; lineNumber <= model.getLineCount(); lineNumber++) {
						const lineContent = model.getLineContent(lineNumber);
						if (lineContent.trim() === '~') {
							decorations.push({
								range: new monaco.Range(
									lineNumber,
									2, // Position after the ~
									lineNumber,
									2
								),
								options: placeholderDecoration.options
							});
						}
					}

					activeDecorations = editor.deltaDecorations(activeDecorations, decorations);
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
