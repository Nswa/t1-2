import * as monaco from 'monaco-editor';

monaco.languages.registerCompletionItemProvider('genesis', {
    provideCompletionItems: (model, position) => {
        // Get the word at current position
        const wordInfo = model.getWordUntilPosition(position);
        const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: wordInfo.startColumn,
            endColumn: wordInfo.endColumn
        };

        const suggestions = [
            {
                label: '##',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '## \ncloset',
                documentation: 'Create an envelope',
                range: range
            },
            {
                label: '~',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: '~ ',
                documentation: 'Create a registration line',
                range: range
            }
        ];

        return { suggestions };
    }
});
