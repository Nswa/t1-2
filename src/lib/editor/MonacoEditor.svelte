<script lang="ts">
	import { onMount } from 'svelte';
	import loader from '@monaco-editor/loader';
	import { configureGenesisDarkTheme } from './theme/genesis-dark';
	import { setupGenesisLanguage } from './lang/genesis';
	import type * as Monaco from 'monaco-editor';

	export let value = '';
	export let language = 'genesis';
	export let theme = 'genesis-theme';

	let editor: Monaco.editor.IStandaloneCodeEditor;
	let monacoElement: HTMLElement;
	let monaco: typeof Monaco;

	// Method to get editor content
	export const getContent = () => {
		if (editor) {
			return editor.getValue();
		}
		return '';
	};

	onMount(() => {
		const initializeEditor = async () => {
			try {
				monaco = await loader.init();
				configureGenesisDarkTheme(monaco);
				setupGenesisLanguage(monaco);

				editor = monaco.editor.create(monacoElement, {
					value,
					language,
					theme,
					automaticLayout: true,
					wordWrap: 'on',
					minimap: { enabled: false },
					fontSize: 16,
					fontFamily: "'Source Serif Pro', 'Crimson Pro', Georgia, serif",
					lineHeight: 24,
					fontLigatures: true,
					placeholder: '~continue typing...'
				});

				// Only add event listeners after editor is initialized
				if (editor) {
					// Handle Enter key
					editor.onKeyDown((e: Monaco.IKeyboardEvent) => {
						if (e.keyCode === monaco.KeyCode.Enter) {
							e.preventDefault();
							const selection = editor.getSelection();
							const position = selection?.getPosition();

							if (position) {
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
						}
					});

					// Handle content changes
					editor.onDidChangeModelContent(() => {
						const model = editor.getModel();
						if (model) {
							const content = model.getValue();
							if (content && !content.startsWith('~')) {
								editor.setValue('~' + content);
							}
						}
					});
				}
			} catch (error) {
				console.error('Failed to initialize Monaco editor:', error);
			}
		};

		initializeEditor();

		return () => {
			if (editor) {
				editor.dispose();
			}
		};
	});
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<div bind:this={monacoElement} class="editor-container" />

<style>
	@import '$lib/editor/editor.css';
</style>
